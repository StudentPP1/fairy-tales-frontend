import InfiniteStoriesSection from "@/components/InfiniteStoriesSection";
import type { StoryDto } from "@/model/StoryDto";
import React, { useState } from "react";

// Фіктивні дані для демонстрації результатів пошуку
const dummyResults: StoryDto[] = [
    {
        id: "1",
        title: "Story 1",
        description: "Description for story 1",
        imageUrl:
            "https://i.pinimg.com/736x/b8/78/97/b878975dc2ba1407777ba8f7f243ee8d.jpg",
        liked: 10,
        read: true,
    },
    {
        id: "2",
        title: "Story 2",
        description: "Description for story 2",
        imageUrl:
            "https://images.squarespace-cdn.com/content/v1/5493706de4b0ecaa4047b871/b54492bc-c791-4a31-bedd-db4baee85aff/When+Do+Hippos+Play+Cover+Thumbnail.jpeg",
        liked: 1,
        read: false,
    },
    {
        id: "3",
        title: "Story 3",
        description: "Description for story 3",
        imageUrl:
            "https://i.pinimg.com/736x/b8/78/97/b878975dc2ba1407777ba8f7f243ee8d.jpg",
        liked: 2,
        read: false,
    },
    {
        id: "4",
        title: "Story 4",
        description: "Description for story 4",
        imageUrl:
            "https://i.pinimg.com/736x/b8/78/97/b878975dc2ba1407777ba8f7f243ee8d.jpg",
        liked: 3,
        read: true,
    },
    {
        id: "5",
        title: "Story 5",
        description: "Description for story 5",
        imageUrl:
            "https://i.pinimg.com/736x/b8/78/97/b878975dc2ba1407777ba8f7f243ee8d.jpg",
        liked: 0,
        read: false,
    },
];

const LikedPage: React.FC = () => {
    // Отримання параметра запиту з URL
    const [stories, setStories] = useState<StoryDto[]>(dummyResults);
    const [hasMore, setHasMore] = useState<boolean>(true);

    // Simulate fetching additional stories.
    const fetchMoreStories = async (): Promise<StoryDto[]> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const newStories: StoryDto[] = Array.from({ length: 3 }, (_, i) => {
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
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-4">Liked stories</h1>
            <section>
                <InfiniteStoriesSection
                    stories={stories}
                    fetchMoreStories={fetchMoreStories}
                    hasMore={hasMore}
                />
            </section>
        </div>
    );
};

export default LikedPage;