import { useState, type FC } from "react";
import { useNavigate } from "react-router-dom";
import ChangeStory from "@/components/ChangeStory";
import type { Story } from "@/model/Story";

const CreateStoryPage: FC = () => {
  const navigate = useNavigate();

  // Local state for the form fields.
  const [title, setTitle] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [fullText, setFullText] = useState<string>("");

  const handleCreate = () => {
    // Create a new story object.
    const newStory: Story = {
      id: new Date().getTime().toString(), // Generate a dummy ID.
      title,
      imageUrl,
      description,
      fullText,
      liked: 0, // Default: no likes.
      read: false,
    };

    // Simulate an API call delay.
    setTimeout(() => {
      console.log("Story created", newStory);
      alert("Story created (dummy)");
      // Redirect to the newly created story's details page.
      navigate(`/story/${newStory.id}`);
    }, 500);
  };

  return (
    <ChangeStory
      updatedTitle={title}
      setUpdatedTitle={setTitle}
      updatedImageUrl={imageUrl}
      setUpdatedImageUrl={setImageUrl}
      updatedDescription={description}
      setUpdatedDescription={setDescription}
      updatedText={fullText}
      setUpdatedText={setFullText}
      handleUpdate={handleCreate}
      setIsEditing={() => navigate(-1)}
    />
  );
};

export default CreateStoryPage;
