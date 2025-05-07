import React, { type FC } from "react";
import { Input } from "@/components/ui/input";

interface SearchInputProps {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onClear: () => void;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
}

const SearchInput: FC<SearchInputProps> = ({ value, onChange, onClear, onKeyDown }) => {
  return (
    <div className="relative w-full max-w-md">
      <Input
        placeholder="Search..."
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        className="w-full pr-10" // додаткове праве відступ для кнопки
      />
      {value && (
        <button
          onClick={onClear}
          className="absolute inset-y-0 right-0 flex items-center pr-3"
          aria-label="Clear search"
        >
          {/* SVG-іконка "X" */}
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
  );
};

export default SearchInput;
