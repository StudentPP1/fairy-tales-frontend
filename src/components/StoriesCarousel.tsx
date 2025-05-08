import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import CardItem from "@/components/Card";
import type { StoryDto } from "@/model/StoryDto";
import type { Page } from "@/model/Page";

interface StoriesCarouselProps {
  stories: Page<StoryDto> | null;
  setStories: React.Dispatch<React.SetStateAction<Page<StoryDto> | null>>;
  fetchMoreStories: (page: number, size: number) => Promise<Page<StoryDto>>;
  hasMore: boolean;
  setHasMore: React.Dispatch<React.SetStateAction<boolean>>;
  itemsPerPage?: number;
}

const StoriesCarousel: React.FC<StoriesCarouselProps> = ({
  stories,
  setStories,
  fetchMoreStories,
  hasMore,
  setHasMore,
  itemsPerPage = 3,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);

  const numPages = stories ? Math.ceil(stories.totalElements / itemsPerPage) : 0;
  const displayedStories = stories?.content.slice(currentPage * itemsPerPage, currentPage * itemsPerPage + itemsPerPage);

  const handlePrev = () => {
    if (currentPage > 0) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = async () => {
    if (currentPage < numPages - 1) {
      setCurrentPage((prev) => prev + 1);
    } else if (hasMore && !loadingMore) {
      setLoadingMore(true);
      const response = await fetchMoreStories(currentPage + 1, itemsPerPage);
  
      if (response.content.length > 0) {
        setStories((prev) => {
          if (!prev) return response; // Handle null case
          return { ...prev, content: [...prev.content, ...response.content] };
        });
  
        setHasMore(!response.last);
        setCurrentPage((prev) => prev + 1);
      }
  
      setLoadingMore(false);
    }
  };  

  return (
    <div className="relative w-full flex items-center justify-center">
      {currentPage > 0 && (
        <Button onClick={handlePrev} variant="ghost" className="absolute left-0">
          {"<"}
        </Button>
      )}

      <div className="flex space-x-6 p-4">
        {displayedStories?.map((story) => (
          <CardItem key={story.id} story={story} />
        ))}
      </div>

      {(currentPage < numPages - 1 || (hasMore && !loadingMore)) && (
        <Button onClick={handleNext} variant="ghost" className="absolute right-0" disabled={loadingMore}>
          {">"}
        </Button>
      )}
    </div>
  );
};

export default StoriesCarousel;
