import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface LikeButtonProps {
  initialLiked?: boolean;
  onLikeChange?: (liked: boolean) => void;
  className?: string;
}

export default function LikeButton({
  initialLiked = false,
  onLikeChange,
  className,
}: LikeButtonProps) {
  const [liked, setLiked] = useState(initialLiked);

  const handleClick = () => {
    setLiked((prev) => !prev);
    if (onLikeChange) {
      onLikeChange(!liked);
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleClick}
      className={cn(
        "w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-md",
        "focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50",
        className
      )}
    >
      <motion.div
        animate={{ scale: liked ? [1, 1.2, 1] : 1 }}
        transition={{ duration: 0.3 }}
      >
        <Heart
          className={cn(
            "w-5 h-5",
            liked ? "fill-pink-500 text-pink-500" : "text-gray-400",
            "transition-colors duration-300"
          )}
        />
      </motion.div>
    </motion.button>
  );
}
