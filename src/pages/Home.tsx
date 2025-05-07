import React, { useState } from "react";
import StoriesCarousel from "../components/StoriesCarousel";
import InfiniteStoriesSection from "../components/InfiniteStoriesSection";
import type { Story } from "@/model/StoryDto";

const initialStories: Story[] = [
  {
    id: "1",
    title: "Story 1",
    description: "Description for story 1",
    imageUrl: "https://i.pinimg.com/736x/b8/78/97/b878975dc2ba1407777ba8f7f243ee8d.jpg",
    liked: 10,
    read: true,
  },
  {
    id: "2",
    title: "Story 2",
    description: "Description for story 2",
    imageUrl: "https://images.squarespace-cdn.com/content/v1/5493706de4b0ecaa4047b871/b54492bc-c791-4a31-bedd-db4baee85aff/When+Do+Hippos+Play+Cover+Thumbnail.jpeg",
    liked: 1,
    read: false,
  },
  {
    id: "3",
    title: "Story 3",
    description: "Description for story 3",
    imageUrl: "https://i.pinimg.com/736x/b8/78/97/b878975dc2ba1407777ba8f7f243ee8d.jpg",
    liked: 2,
    read: false,
  },
  {
    id: "4",
    title: "Story 4",
    description: "Description for story 4",
    imageUrl: "https://i.pinimg.com/736x/b8/78/97/b878975dc2ba1407777ba8f7f243ee8d.jpg",
    liked: 3,
    read: true,
  },
  {
    id: "5",
    title: "Story 5",
    description: "Description for story 5",
    imageUrl: "https://i.pinimg.com/736x/b8/78/97/b878975dc2ba1407777ba8f7f243ee8d.jpg",
    liked: 0,
    read: false,
  },
];

const HomePage: React.FC = () => {
  const [stories, setStories] = useState<Story[]>(initialStories);
  const [hasMore, setHasMore] = useState<boolean>(true);

  // Simulate fetching additional stories.
  const fetchMoreStories = async (): Promise<Story[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newStories: Story[] = Array.from({ length: 3 }, (_, i) => {
          const id = (stories.length + i + 1).toString();
          return {
            id,
            title: `Story ${id}`,
            description: `Description for story ${id}`,
             imageUrl: "https://i.pinimg.com/736x/b8/78/97/b878975dc2ba1407777ba8f7f243ee8d.jpg",
            liked: Math.random() * 10,
            read: Math.random() > 0.5,
          };
        });
        setStories((prevStories) => {
          const updated = [...prevStories, ...newStories];
          if (updated.length >= 50) {
            setHasMore(false);
          }
          return updated;
        });
        resolve(newStories);
      }, 1500);
    });
  };

  return (
    <div className="min-h-screen">

      <main className="p-4 space-y-10">
        {/* Most Liked Stories Section */}
        <section>
          <h2 className="text-xl font-semibold text-center mb-4">Most Liked Stories</h2>
          <StoriesCarousel
            stories={stories}
            fetchMoreStories={fetchMoreStories}
            hasMore={hasMore}
          />
        </section>

        {/* Not Read Stories Section */}
        <section>
        <h2 className="text-xl font-semibold text-center mb-4">Not Read Stories</h2>
          <StoriesCarousel
            stories={stories}
            fetchMoreStories={fetchMoreStories}
            hasMore={hasMore}
          />
        </section>

        {/* All Stories Section with infinite scrolling triggered by end of page */}
        <section>
        <h2 className="text-xl font-semibold text-center mb-4">All Stories</h2>
          <InfiniteStoriesSection
            stories={stories}
            fetchMoreStories={fetchMoreStories}
            hasMore={hasMore}
          />
        </section>
      </main>
    </div>
  );
};

export default HomePage;
