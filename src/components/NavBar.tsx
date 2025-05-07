// NavBar.tsx
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface NavBarProps {
  searchTerm: string;
  onSearchChange: React.ChangeEventHandler<HTMLInputElement>;
}

const NavBar: React.FC<NavBarProps> = ({ searchTerm, onSearchChange }) => {
  return (
    <nav className="flex items-center justify-between px-4 py-2 border-b">
      {/* Left: Logo/empty */}
      <div className="flex-1" />
      
      {/* Center: Search Input */}
      <div className="flex-1 flex justify-center">
        <Input
          placeholder="Search..."
          value={searchTerm}
          onChange={onSearchChange}
          className="max-w-md"
        />
      </div>
      
      {/* Right: Heart Button & User Avatar */}
      <div className="flex-1 flex justify-end items-center space-x-4">
        <Button variant="ghost" className="p-2">
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
        <Button variant="ghost" className="p-2">
          <Avatar>
            <AvatarImage src="https://via.placeholder.com/40" alt="User Avatar" />
            <AvatarFallback>UA</AvatarFallback>
          </Avatar>
        </Button>
      </div>
    </nav>
  );
};

export default NavBar;
