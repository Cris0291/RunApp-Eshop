import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import { useGlobal } from "@/utils/GlobalProvider";
import { useNavigate } from "react-router";

interface SearchBarProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
}

export default function SearchBar({
  onSearch,
  placeholder = "Search...",
}: SearchBarProps) {
  const { searchQuery, setSearchQuery } = useGlobal();
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  let navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/products");
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/" && !isFocused) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isFocused]);

  return (
    <div className="w-full max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Input
            ref={inputRef}
            type="text"
            placeholder={placeholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="w-full pl-12 pr-24 py-3 text-lg focus:ring-pink-500 focus:border-pink-500 transition-all duration-300 bg-white hover:bg-gray-50 rounded-none shadow-md text-black"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-black" />
        </div>
        <Button
          type="submit"
          size="lg"
          className="absolute right-0 top-0 h-full bg-pink-500 hover:bg-pink-600 text-white transition-all duration-300 rounded-none px-6"
        >
          Search
        </Button>
      </form>
      <div className="text-xs text-gray-500 text-center mt-2">
        Press "/" to focus search
      </div>
    </div>
  );
}
