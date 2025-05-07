import React, { useEffect, useRef, useState } from "react";
import CardItem from "@/components/Card";
import type { Story } from "@/model/StoryDto";

interface InfiniteStoriesSectionProps {
  stories: Story[];
  fetchMoreStories: () => Promise<Story[]>;
  hasMore: boolean;
}

const InfiniteStoriesSection: React.FC<InfiniteStoriesSectionProps> = ({
  stories,
  fetchMoreStories,
  hasMore,
}) => {
  const loaderRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!loaderRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && hasMore && !loading) {
          setLoading(true);
          fetchMoreStories().finally(() => {
            setLoading(false);
          });
        }
      },
      { threshold: 1 }
    );

    observer.observe(loaderRef.current);

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [loaderRef, hasMore, loading, fetchMoreStories]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-items-center">
        {stories.map((story) => (
          <div key={story.id} className="w-full h-w-full max-w-sm flex-shrink-0">
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
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
              <span>Loading more stories...</span>
            </div>
          ) : (
            <span>Scroll down to load more</span>
          )}
        </div>
      )}
    </div>
  );
};

export default InfiniteStoriesSection;
