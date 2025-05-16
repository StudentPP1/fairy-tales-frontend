import React, { useEffect, useRef, useState } from "react";
import CardItem from "@/components/Card";
import type { StoryDto } from "@/model/StoryDto";
import type { Page } from "@/model/Page";
import Loading from "./Loading";

interface InfiniteStoriesSectionProps {
  stories: Page<StoryDto> | null;
  setStories: React.Dispatch<React.SetStateAction<Page<StoryDto> | null>>;
  fetchMoreStories: (page: number, size: number) => Promise<Page<StoryDto>>;
  hasMore: boolean;
  setHasMore: React.Dispatch<React.SetStateAction<boolean>>;
}

const InfiniteStoriesSection: React.FC<InfiniteStoriesSectionProps> = ({
  stories,
  setStories,
  fetchMoreStories,
  hasMore,
  setHasMore,
}) => {
  const loaderRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    const observer = new IntersectionObserver(
      async (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && hasMore && !loading) {
          setLoading(true);
          const response = await fetchMoreStories(currentPage + 1, itemsPerPage);
          
          if (response.content.length > 0) {
            setStories((prev) => {
              if (!prev) return null;
              return { ...prev, content: [...prev.content, ...response.content] };
            });
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
  }, [hasMore, loading]);

  return (
    <div className="relative w-full flex items-center justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-items-center">
        {stories?.content.map((story) => (
          <div key={story.id} className="w-full max-w-sm flex-shrink-0">
            <CardItem story={story} />
          </div>
        ))}
      </div>
      {hasMore && (
        <div ref={loaderRef} className="flex items-center justify-center py-4">
          {loading ? (
            <Loading/>
          ) : (
            <span>Scroll down to load more</span>
          )}
        </div>
      )}
    </div>
  );
};

export default InfiniteStoriesSection;
