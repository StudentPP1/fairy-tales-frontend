import { AuthContext } from "@/context/AuthContext";
import AuthPage from "@/pages/Auth";
import CreateStoryPage from "@/pages/CreateStory";
import HomePage from "@/pages/Home";
import LikedPage from "@/pages/Liked";
import SearchPage from "@/pages/Search";
import UserSettingsPage from "@/pages/Settings";
import StoryDetailsPage from "@/pages/StoryDetails";
import { useContext } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

export const AppRoutes = () => {
  const { user } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route element={<ProtectedRoute user={user} />}>
          <Route path="/favorites" element={<LikedPage />} />
          <Route path="/settings" element={<UserSettingsPage />} />
          <Route path="/story/:id" element={<StoryDetailsPage />} />
          <Route path="/create-story" element={ <CreateStoryPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}