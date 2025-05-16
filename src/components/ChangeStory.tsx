import type { FC } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface ChangeStoryProps {
  updatedTitle: string;
  setUpdatedTitle: (title: string) => void;
  updatedImageUrl: string;
  setUpdatedImageUrl: (url: string) => void;
  updatedDescription: string;
  setUpdatedDescription: (description: string) => void;
  updatedText: string;
  setUpdatedText: (text: string) => void;
  handleUpdate: () => void;
  setIsEditing: (value: boolean) => void;
}

const ChangeStory: FC<ChangeStoryProps> = ({
  updatedTitle,
  setUpdatedTitle,
  updatedImageUrl,
  setUpdatedImageUrl,
  updatedDescription,
  setUpdatedDescription,
  updatedText,
  setUpdatedText,
  handleUpdate,
  setIsEditing,
}) => {
  return (
    <div className="p-8 max-w-3xl mx-auto bg-gray min-h-screen">
      <div className="bg-gray shadow-lg rounded-lg p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <Input
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
            placeholder="Enter title"
            className="mt-1 w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Image URL
          </label>
          <Input
            value={updatedImageUrl}
            onChange={(e) => setUpdatedImageUrl(e.target.value)}
            placeholder="Enter image URL"
            className="mt-1 w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <Input
            value={updatedDescription}
            onChange={(e) => setUpdatedDescription(e.target.value)}
            placeholder="Enter description"
            className="mt-1 w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Full Text
          </label>
          <textarea
            value={updatedText}
            onChange={(e) => setUpdatedText(e.target.value)}
            placeholder="Enter full text"
            className="mt-1 w-full p-3 border rounded-lg"
            rows={6}
          />
        </div>
        <div className="flex gap-4">
          <Button onClick={handleUpdate}>Save Changes</Button>
          <Button
            onClick={() => setIsEditing(false)}
            className="bg-gray-300 text-gray-800 hover:bg-gray-400"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChangeStory;
