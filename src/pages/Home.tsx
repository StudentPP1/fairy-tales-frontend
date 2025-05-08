import React, { useContext, useEffect, useState } from "react";
import StoriesCarousel from "../components/StoriesCarousel";
import InfiniteStoriesSection from "../components/InfiniteStoriesSection";
import type { StoryDto } from "@/model/StoryDto";
import { StoryService } from "@/api/service/StoryService";
import NavBar from "@/components/NavBar";
import { AuthContext, type AuthState } from "@/context/AuthContext";
import type { Page } from "@/model/Page";

const HomePage: React.FC = () => {
  const { user } = useContext<AuthState>(AuthContext);
  const [likedStories, setLikedStories] = useState<Page<StoryDto> | null>(null);
  const [hasLikedStoryMore, setHasLikedStoryMore] = useState<boolean>(true);

  const [notReadStories, setNotReadStories] = useState<Page<StoryDto> | null>(null);
  const [hasNotReadMore, setHasNotReadMore] = useState<boolean>(true);

  const [stories, setStories] = useState<Page<StoryDto> | null>(null);
  const [hasStoriesMore, setHasStoriesMore] = useState<boolean>(true);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const likedResponse = await StoryService.getTopStories(0, 5);
        setLikedStories(likedResponse);
        setHasLikedStoryMore(!likedResponse.last);

        const storiesResponse = await StoryService.getStories(0, 10);
        setStories(storiesResponse);
        setHasStoriesMore(!storiesResponse.last);

      } catch (error) {
        console.error("Error fetching initial stories:", error);
      }
    };

    fetchInitialData();
  }, []);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        if (user) {
          const notReadResponse = await StoryService.getNotReadStories(0, 5);
          setNotReadStories(notReadResponse);
          setHasNotReadMore(!notReadResponse.last);
        }
      } catch (error) {
        console.error("Error fetching initial stories:", error);
      }
    };

    fetchInitialData();
  }, [user]);

  return (
    <>
      <NavBar />
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
            {user ?
              <StoriesCarousel
                stories={notReadStories}
                setStories={setNotReadStories}
                fetchMoreStories={StoryService.getNotReadStories}
                hasMore={hasNotReadMore}
                setHasMore={setHasNotReadMore}
              /> :
              <StoriesCarousel
                stories={stories}
                setStories={setStories}
                fetchMoreStories={StoryService.getStories}
                hasMore={hasStoriesMore}
                setHasMore={setHasStoriesMore}
              />
            }
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
    </>
  );
};

export default HomePage;
