import React, { useState } from "react";
import NavBar from "./NavBar";
import StoriesCarousel, { type Story } from "./StoriesCarousel";
import InfiniteStoriesSection from "./InfiniteStoriesSection";

// Dummy initial data for demonstration
const initialStories: Story[] = [
  {
    id: "1",
    title: "Story 1",
    description: "Description for story 1",
    imageUrl: "https://via.placeholder.com/300x200",
    liked: true,
    read: true,
  },
  {
    id: "2",
    title: "Story 2",
    description: "Description for story 2",
    imageUrl: "https://via.placeholder.com/300x200",
    liked: true,
    read: false,
  },
  {
    id: "3",
    title: "Story 3",
    description: "Description for story 3",
    imageUrl: "https://via.placeholder.com/300x200",
    liked: false,
    read: false,
  },
  {
    id: "4",
    title: "Story 4",
    description: "Description for story 4",
    imageUrl: "https://via.placeholder.com/300x200",
    liked: true,
    read: true,
  },
  {
    id: "5",
    title: "Story 5",
    description: "Description for story 5",
    imageUrl: "https://via.placeholder.com/300x200",
    liked: false,
    read: false,
  },
  // Add more initial stories as needed...
];

const StoriesPage: React.FC = () => {
  const [stories, setStories] = useState<Story[]>(initialStories);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [hasMore, setHasMore] = useState<boolean>(true);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

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
            imageUrl: "https://via.placeholder.com/300x200",
            liked: Math.random() > 0.5,
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

  // Filter stories based on the search term
  const filteredStories = stories.filter(
    (story) =>
      story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      story.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen">
      <NavBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />

      <main className="p-4 space-y-10">
        {/* Most Liked Stories Section */}
        <section>
          <h2 className="text-xl font-semibold mb-4">All Stories</h2>
          <StoriesCarousel
            stories={filteredStories}
            fetchMoreStories={fetchMoreStories}
            hasMore={hasMore}
          />
        </section>

        {/* Not Read Stories Section */}
        <section>
          <h2 className="text-xl font-semibold mb-4">All Stories</h2>
          <StoriesCarousel
            stories={filteredStories}
            fetchMoreStories={fetchMoreStories}
            hasMore={hasMore}
          />
        </section>

        {/* All Stories Section with infinite scrolling triggered by end of page */}
        <section>
          <h2 className="text-xl font-semibold mb-4">All Stories</h2>
          <InfiniteStoriesSection
            stories={filteredStories}
            fetchMoreStories={fetchMoreStories}
            hasMore={hasMore}
          />
        </section>
      </main>
    </div>
  );
};

export default StoriesPage;
