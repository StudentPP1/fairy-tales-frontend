import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AuthContext, type AuthState } from "@/context/AuthContext";
import type { StoryDto } from "@/model/StoryDto";
import { useContext, type FC } from "react";

import { Link } from "react-router-dom";

const CardItem: FC<{ story: StoryDto }> = ({ story }) => {
    const {user} = useContext<AuthState>(AuthContext);

    return (
        <Link to={user ? `/story/${story.id}` : `/login`}>
            <Card
                key={story.id}
                className="w-80 flex-shrink-0 rounded-lg shadow-lg bg-gray hover:shadow-2xl transition duration-300 cursor-pointer"
            >
                <div className="relative w-full h-60 overflow-hidden">
                    <img
                        src={story.imgUrl}
                        alt={story.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 ease-in-out transform hover:scale-105"
                    />
                </div>
                <CardHeader className="p-4">
                    <CardTitle className="text-xl font-bold text-white">
                        {story.title}
                        <div className="flex items-center mt-2 text-white">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="red"
                                viewBox="0 0 24 24"
                                stroke="red"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4.318 6.318A4.5 4.5 0 0112 3a4.5 4.5 0 017.682 3.318c0 1.61-.77 3.22-2.318 4.808L12 21.5l-5.364-10.374C5.088 9.537 4.318 7.928 4.318 6.318z"
                                />
                            </svg>
                            <div className="ml-2 text-md font-semibold text-white">
                                {story.likedCount}
                            </div>
                        </div>
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                    <p className="text-white text-sm truncate">{story.description}</p>
                </CardContent>
            </Card>
        </Link>
    );
};
export default CardItem;