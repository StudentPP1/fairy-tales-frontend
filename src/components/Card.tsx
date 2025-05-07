import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { StoryDto } from "@/model/StoryDto";
import type { FC } from "react";

import { Link } from "react-router-dom";

const CardItem: FC<{ story: StoryDto }> = ({ story }) => {
    return (
        <Link to={`/story/${story.id}`}>
            <Card
                key={story.id}
                className="w-80 flex-shrink-0 rounded-lg shadow-lg bg-white hover:shadow-2xl transition duration-300 cursor-pointer"
            >
                <div className="relative w-full h-60 overflow-hidden">
                    <img
                        src={story.imageUrl}
                        alt={story.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 ease-in-out transform hover:scale-105"
                    />
                </div>
                <CardHeader className="p-4">
                    <CardTitle className="text-xl font-bold text-gray-800">
                        {story.title}
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                    <p className="text-gray-600 text-sm">{story.description}</p>
                </CardContent>
            </Card>
        </Link>
    );
};
export default CardItem;