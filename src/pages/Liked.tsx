import { UserService } from "@/api/service/UserService";
import CardItem from "@/components/Card";
import NavBar from "@/components/NavBar";
import type { StoryDto } from "@/model/StoryDto";
import React, { useEffect, useState } from "react";

const LikedPage: React.FC = () => {
    const [stories, setStories] = useState<StoryDto[]>([]);

    useEffect(() => {
        const fetchLikedStories = async () => {
            const response = await UserService.getLikedStories();
            setStories(response);
        };

        fetchLikedStories();
    }, [])

    return (
        <>
            <NavBar />
            <div className="p-8">
                <h1 className="text-3xl font-bold mb-4 text-center">Liked stories</h1>
                <section>
                    <div className="relative w-full flex items-center justify-center">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-items-center">
                            {stories.map((story) => (
                                <div key={story.id} className="w-full max-w-sm flex-shrink-0">
                                    <CardItem story={story} />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default LikedPage;