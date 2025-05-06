import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Story } from "./StoriesCarousel";

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
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {stories.map((story) => (
          <Card key={story.id} className="bg-gray-800 shadow">
            <img
              src={story.imageUrl}
              alt={story.title}
              className="object-cover h-40 w-full"
            />
            <CardHeader>
              <CardTitle className="text-white">{story.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <p>{story.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      {hasMore && (
        <div ref={loaderRef} className="text-center py-4">
          {loading ? "Loading more stories..." : "Scroll down to load more"}
        </div>
      )}
    </div>
  );
};

export default InfiniteStoriesSection;
