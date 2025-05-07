import React, { useState, type FC } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const NavBar: FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const navigate = useNavigate();
  const isAdmin = true; // For demonstration, assume the user is an admin.
  const user = false;

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Обробка натискання клавіші Enter у полі пошуку
  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (searchTerm.trim()) {
        navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
      }
    }
  };

  // Функція очищення пошукового запиту та повернення на головну сторінку
  const clearSearch = () => {
    setSearchTerm("");
    navigate("/");
  };

  return (
    <nav className="flex items-center justify-between px-4 py-2 border-b">
      {/* Left: Logo & Create Story Button */}
      <div className="flex-1 flex justify-start items-center">
        <div className="flex cursor-pointer" onClick={() => navigate("/")} role="button" tabIndex={0} aria-label="Home">
          Home
        </div>
        {isAdmin && (
          <Button
            variant="ghost"
            role="button" tabIndex={1} aria-label="Create Story"
            className="flex cursor-pointer"
            onClick={() => navigate("/create-story")}
          >
            Create Story
          </Button>
        )}
      </div>

      {/* Center: Search Input з кнопкою очищення */}
      <div className="flex-1 flex justify-center relative justify-items-center">
        <Input
          placeholder="Search..."
          value={searchTerm}
          onChange={onSearchChange}
          onKeyDown={handleKeyDown}
          className="max-w pr-10" // правий padding для "X"-кнопки
        />
        {searchTerm && (
          <button
            onClick={clearSearch}
            className="absolute inset-y-0 right-0 flex items-center pr-3"
            aria-label="Clear search"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400 hover:text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Right: Heart Button & User Avatar */}
      <div className="flex-1 flex justify-end items-center">
        <Button variant="ghost" className="p-2" onClick={() => {user ? navigate("/favorites") : navigate("/login")}}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.682l-7.682-7.682a4.5 4.5 0 010-6.364z"
            />
          </svg>
        </Button>

        <Button variant="ghost" className="p-2" onClick={() => {user ? navigate("/settings") : navigate("/login")}}>
          <Avatar className="cursor-pointer">
            <AvatarImage
              src="https://cs4.pikabu.ru/post_img/big/2016/06/12/6/1465724507186691432.jpg"
              alt="User Avatar"
              className="h-10 w-10"
            />
            <AvatarFallback />
          </Avatar>
        </Button>

      </div>
    </nav>
  );
};

export default NavBar;
