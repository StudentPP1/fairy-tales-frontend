import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export interface Story {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  liked: boolean;
  read: boolean;
}

interface AllStoriesCarouselProps {
  stories: Story[];
  fetchMoreStories: () => Promise<Story[]>;
  hasMore: boolean;
  itemsPerPage?: number;
}

const StoriesCarousel: React.FC<AllStoriesCarouselProps> = ({
  stories,
  fetchMoreStories,
  hasMore,
  itemsPerPage = 3,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);

  // Recalculate pages based on the latest number of stories.
  const numPages = Math.ceil(stories.length / itemsPerPage);

  const displayedStories = stories.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  );

  const handlePrev = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const handleNext = async () => {
    // If there are more pages locally, simply paginate.
    if (currentPage < numPages - 1) {
      setCurrentPage(currentPage + 1);
    }
    // Otherwise, if more stories can be fetched, load them.
    else if (hasMore && !loadingMore) {
      setLoadingMore(true);
      await fetchMoreStories();
      setLoadingMore(false);
      // After new stories are in place, recalculate page count and move to next page.
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <div className="relative w-full flex items-center justify-center">
      <div className="flex space-x-4">
        {displayedStories.map((story) => (
          <Card key={story.id} className="min-w-[200px] shadow flex-shrink-0">
            <img
              src={story.imageUrl}
              alt={story.title}
              className="object-cover h-40 w-full"
            />
            <CardHeader>
              <CardTitle>{story.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{story.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {currentPage > 0 && (
        <Button
          onClick={handlePrev}
          variant="ghost"
          className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Button>
      )}

      {(currentPage < numPages - 1 || (hasMore && !loadingMore)) && (
        <Button
          onClick={handleNext}
          variant="ghost"
          className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2"
          disabled={loadingMore}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Button>
      )}
    </div>
  );
};

export default StoriesCarousel;
