import { StoryService } from "@/api/service/StoryService";
import CardItem from "@/components/Card";
import NavBar from "@/components/NavBar";
import type { StoryDto } from "@/model/StoryDto";
import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

const SearchPage: React.FC = () => {
  const { search } = useLocation();
  const searchQuery = new URLSearchParams(search).get("query");
  const [stories, setStories] = useState<StoryDto[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const loaderRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      if (!searchQuery) return;
      setLoading(true);
      const response = await StoryService.searchStories(searchQuery, currentPage, itemsPerPage);
      setStories(response.content);
      setHasMore(!response.last);
      setCurrentPage(response.number);
      setLoading(false);
    };

    fetchData();
  }, [search]);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      async (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && hasMore && !loading) {
          setLoading(true);
          if (!searchQuery) return;
          const response = await StoryService.searchStories(searchQuery, currentPage + 1, itemsPerPage);

          if (response.content.length > 0) {
            setStories((prev) => [...prev, ...response.content]);
            setHasMore(!response.last);
            setCurrentPage(response.number);
          }

          setLoading(false);
        }
      },
      { threshold: 1 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, loading, searchQuery]);

  return (
    <>
      <NavBar />
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-4 text-center">Search results</h1>
        {stories.length > 0 ? (
          <section>
            <div className="relative w-full flex items-center justify-center">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-items-center">
                {stories.map((story) => (
                  <div key={story.id} className="w-full max-w-sm flex-shrink-0">
                    <CardItem story={story} />
                  </div>
                ))}
              </div>
              {hasMore && (
                <div ref={loaderRef} className="flex items-center justify-center py-4">
                  {loading ? (
                    <div className="flex items-center">
                      <svg
                        className="animate-spin h-6 w-6 text-gray-500 mr-2"
                        viewBox="0 0 24 24"
                      >
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                      </svg>
                      <span>Loading more stories...</span>
                    </div>
                  ) : (
                    <span>Scroll down to load more</span>
                  )}
                </div>
              )}
            </div>
          </section>
        ) : (
          <p>Not found</p>
        )}
      </div>
    </>
  );
};

export default SearchPage;
