import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState, useEffect, type FC } from "react";
import type { Story } from "@/model/Story";
import ChangeStory from "@/components/ChangeStory";

const dummyStory: Story = {
  id: "1",
  title: "Story 1",
  description: "Description for story 1",
  imageUrl:
    "https://i.pinimg.com/736x/b8/78/97/b878975dc2ba1407777ba8f7f243ee8d.jpg",
  liked: 10,
  fullText: "Full text for story 1",
  read: false,
};

const StoryDetailsPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [story, setStory] = useState<Story | null>(null);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [isRead, setIsRead] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [updatedTitle, setUpdatedTitle] = useState<string>("");
  const [updatedImageUrl, setUpdatedImageUrl] = useState<string>("");
  const [updatedDescription, setUpdatedDescription] = useState<string>("");
  const [updatedText, setUpdatedText] = useState<string>("");
  const isAdmin = true; // Simulated admin check

  // Simulate fetching the story data
  useEffect(() => {
    setTimeout(() => {
      setStory(dummyStory);
      setUpdatedTitle(dummyStory.title);
      setUpdatedImageUrl(dummyStory.imageUrl);
      setUpdatedDescription(dummyStory.description);
      setUpdatedText(dummyStory.fullText);
      setIsRead(dummyStory.read);
    }, 500);
  }, [id, navigate]);

  if (!story) return <p className="text-center p-8">Loading...</p>;

  // --- Edit Mode ---
  if (isEditing) {
    return (
      <ChangeStory
        updatedTitle={updatedTitle}
        setUpdatedTitle={setUpdatedTitle}
        updatedImageUrl={updatedImageUrl}
        setUpdatedImageUrl={setUpdatedImageUrl}
        updatedDescription={updatedDescription}
        setUpdatedDescription={setUpdatedDescription}
        updatedText={updatedText}
        setUpdatedText={setUpdatedText}
        handleUpdate={handleUpdate}
        setIsEditing={setIsEditing}
      />
    );
  }

  // --- Read-Only Mode ---
  return (
    <div className="p-8 mx-auto bg-gray-50 container">
      {/* First Block */}
      <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col md:flex-row">
        {/* Left Side: Picture */}
        <div className="w-1/3 h-2/3 pr-4">
          <img
            src={story.imageUrl}
            alt={story.title}
            className="w-full rounded-lg object-cover"
          />
        </div>

        {/* Right Side: Title, Description, Icons & Admin Buttons */}
        <div className="md:w-2/3 w-full md:pl-6 mt-4 md:mt-0">
          <h1 className="text-4xl font-bold mb-4">{story.title}</h1>
          <p className="text-gray-600 text-lg mb-4">{story.description}</p>

          {/* Action Icons: Like/Unlike & Read/Unread */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className="focus:outline-none"
              aria-label="Toggle Like"
            >
              {isFavorite ? (
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
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
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
              )}
            </button>

            <button
              onClick={() => setIsRead(!isRead)}
              className="focus:outline-none"
              aria-label="Toggle Read Status"
            >
              {isRead ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="yellow"
                  viewBox="0 0 24 24"
                  stroke="yellow"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v18l-7-3-7 3V5z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="yellow"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v18l-7-3-7 3V5z"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Admin Actions */}
          {isAdmin && (
            <div className="flex gap-4 mt-4">
              <Button className="danger" onClick={handleDelete}>
                Delete Story
              </Button>
              <Button onClick={() => setIsEditing(true)}>Edit Story</Button>
            </div>
          )}
        </div>
      </div>

      {/* Second Block: Full Text */}
      <div className="mt-6 bg-white shadow-lg rounded-lg p-6">
        <p className="text-gray-700 leading-relaxed">{story.fullText}</p>
      </div>
    </div>
  );

  // --- Handlers ---
  function handleUpdate() {

    // Dummy simulated API update delay
    setTimeout(() => {
      if (!story) return;
      story.imageUrl = updatedImageUrl;
      story.title = updatedTitle;
      story.description = updatedDescription;
      story.fullText = updatedText;
      setStory(story)
      setIsEditing(false);
      alert("Story updated (dummy)");
    }, 500);
  }

  function handleDelete() {
    if (window.confirm("Are you sure you want to delete this story?")) {
      setTimeout(() => {
        console.log("Deleting story", id);
        alert("Story deleted (dummy)");
        navigate("/");
      }, 500);
    }
  }
};

export default StoryDetailsPage;
