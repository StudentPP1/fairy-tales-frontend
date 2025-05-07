import { useAuth } from "@/context/AuthContext";
import CreateStoryPage from "@/pages/CreateStory";
import HomePage from "@/pages/Home";
import LikedPage from "@/pages/Liked";
import SearchPage from "@/pages/Search";
import UserSettingsPage from "@/pages/Settings";
import StoryDetailsPage from "@/pages/StoryDetails";
import React, { type JSX } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: JSX.Element;
}

// Компонент для захисту приватних маршрутів
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { accessToken } = useAuth();
  if (!accessToken) {
    return <Navigate to="/" replace />;
  }
  return children;
};

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/favorites" element={<LikedPage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/setting" element={<UserSettingsPage />} />
      <Route path="/story/:id" element={<StoryDetailsPage />} />
      <Route path="/create-story" element={<CreateStoryPage />} />
      {/* Приклад захищеного маршруту */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <div className="p-8">
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p>This is a protected dashboard page.</p>
            </div>
          </ProtectedRoute>
        }
      />
      {/* Редірект або обробка 404 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
