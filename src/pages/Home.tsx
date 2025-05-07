import React, { useState } from "react";
import StoriesCarousel from "../components/StoriesCarousel";
import InfiniteStoriesSection from "../components/InfiniteStoriesSection";
import type { StoryDto } from "@/model/StoryDto";
import { StoryService } from "@/api/service/StoryService";

const HomePage: React.FC = () => {
  const [likedStories, setLikedStories] = useState<StoryDto[]>([]);
  const [hasLikedStoryMore, setHasLikedStoryMore] = useState<boolean>(true);

  const [notReadStories, setNotReadStories] = useState<StoryDto[]>([]);
  const [hasNotReadMore, setHasNotReadMore] = useState<boolean>(true);

  const [stories, setStories] = useState<StoryDto[]>([]);
  const [hasStoriesMore, setHasStoriesMore] = useState<boolean>(true);

  return (
    <div className="min-h-screen">

      <main className="p-4 space-y-10">
        {/* Most Liked Stories Section */}
        <section>
          <h2 className="text-xl font-semibold text-center mb-4">Most Liked Stories</h2>
          <StoriesCarousel
            stories={likedStories}
            setStories={setLikedStories}
            fetchMoreStories={StoryService.getTopStories}
            hasMore={hasLikedStoryMore}
            setHasMore={setHasLikedStoryMore}
          />
        </section>

        {/* Not Read Stories Section */}
        <section>
        <h2 className="text-xl font-semibold text-center mb-4">Not Read Stories</h2>
        <StoriesCarousel
            stories={notReadStories}
            setStories={setNotReadStories}
            fetchMoreStories={StoryService.getNotReadStories}
            hasMore={hasNotReadMore}
            setHasMore={setHasNotReadMore}
          />
        </section>

        {/* All Stories Section with infinite scrolling triggered by end of page */}
        <section>
        <h2 className="text-xl font-semibold text-center mb-4">All Stories</h2>
          <InfiniteStoriesSection
            stories={stories}
            setStories={setStories}
            fetchMoreStories={StoryService.getStories}
            hasMore={hasStoriesMore}
            setHasMore={setHasStoriesMore}
          />
        </section>
      </main>
    </div>
  );
};

export default HomePage;
