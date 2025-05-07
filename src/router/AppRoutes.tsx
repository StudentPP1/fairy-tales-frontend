import { AuthContext } from "@/context/AuthContext";
import type { AuthState } from "@/context/AuthContext";
import AuthPage from "@/pages/Auth";
import CreateStoryPage from "@/pages/CreateStory";
import HomePage from "@/pages/Home";
import LikedPage from "@/pages/Liked";
import SearchPage from "@/pages/Search";
import UserSettingsPage from "@/pages/Settings";
import StoryDetailsPage from "@/pages/StoryDetails";
import React, { useContext, type JSX } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user } = useContext<AuthState>(AuthContext);
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<AuthPage />} />
      <Route path="/search" element={<SearchPage />} />

      <Route path="/favorites" element={
        <ProtectedRoute>
          <LikedPage />
        </ProtectedRoute>
      }/>
      <Route path="/setting" element={
        <ProtectedRoute>
          <UserSettingsPage />
        </ProtectedRoute>
      }/>
      <Route path="/story/:id" element={
        <ProtectedRoute>
          <StoryDetailsPage />
        </ProtectedRoute>
      }/>
      <Route path="/create-story" element={
        <ProtectedRoute>
          <CreateStoryPage />
        </ProtectedRoute>
      }/>
      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
