import { useState, type FC } from "react";
import { useNavigate } from "react-router-dom";
import ChangeStory from "@/components/ChangeStory";
import { StoryService } from "@/api/service/StoryService";

const CreateStoryPage: FC = () => {
  const navigate = useNavigate();

  // Local state for the form fields.
  const [title, setTitle] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [fullText, setFullText] = useState<string>("");

  const handleCreate = () => {
    StoryService.createStory(title, imageUrl, description, fullText).then(() => {
      navigate("/");
    });
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