import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState, useEffect, type FC, useContext } from "react";
import type { Story } from "@/model/Story";
import ChangeStory from "@/components/ChangeStory";
import { AuthContext, type AuthState } from "@/context/AuthContext";
import { StoryService } from "@/api/service/StoryService";
import { UserService } from "@/api/service/UserService";
import NavBar from "@/components/NavBar";
import { toast } from "react-toastify";

const StoryDetailsPage: FC = () => {
  const { user } = useContext<AuthState>(AuthContext);
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
  const isAdmin = user?.role === "ADMIN";

  useEffect(() => {
    const fetchStory = async () => {
      if (!id) return;
      const fetchedStory = await StoryService.getStory(Number.parseInt(id));
      setStory(fetchedStory);
      setUpdatedTitle(fetchedStory.title);
      setUpdatedImageUrl(fetchedStory.imgUrl);
      setUpdatedDescription(fetchedStory.description);
      setUpdatedText(fetchedStory.text);
      setIsFavorite(fetchedStory.liked);
      setIsRead(fetchedStory.read);
    }
    fetchStory();
  }, [id]);

  if (!story) return <p className="text-center p-8">Loading...</p>;

  // --- Edit Mode ---
  if (isEditing) {
    return (
      <>
        <NavBar />
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
      </>
    );
  }

  // --- Read-Only Mode ---
  return (
    <>
      <NavBar />
      <div className="p-8 mx-auto bg-gray-50 container">
        {/* First Block */}
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col md:flex-row">
          {/* Left Side: Picture */}
          <div className="w-1/3 h-2/3 pr-4">
            <img
              src={story.imgUrl}
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
                onClick={async () => {
                  setIsFavorite(!isFavorite)
                  if (!isFavorite) {
                    await UserService.addLikedStory(story.id);
                  }
                  else {
                    await UserService.removeLikedStory(story.id);
                  }
                }}
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
                onClick={async () => {
                  setIsRead(!isRead)
                  if (!isRead) {
                    await UserService.addReadStory(story.id);
                  }
                  else {
                    await UserService.removeReadStory(story.id);
                  }
                }}
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
          <p className="text-gray-700 leading-relaxed">{story.text}</p>
        </div>
      </div>
    </>
  );

  // --- Handlers ---
  async function handleUpdate() {
    if (!story) return;
    story.imgUrl = updatedImageUrl;
    story.title = updatedTitle;
    story.description = updatedDescription;
    story.text = updatedText;
    setStory(story)
    setIsEditing(false);
    await StoryService.updateStory(story.id, updatedTitle, updatedDescription, updatedImageUrl, updatedText).then((s) => {
      toast.success("Story updated successfully!", { position: "top-right" });
      navigate("/story/" + s.id);
    })
  }

  async function handleDelete() {
    if (!story) return;
    StoryService.deleteStory(story.id);
    toast.success("Story deleted successfully!", { position: "top-right" });
    navigate("/");
  }
};

export default StoryDetailsPage;
