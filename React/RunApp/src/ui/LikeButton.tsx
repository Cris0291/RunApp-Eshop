import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LikeButtonProps {
  initialLiked?: boolean;
  onLikeChange?: (liked: boolean) => void;
  size?: "sm" | "md" | "lg";
  color?: string;
  className?: string;
}

export default function LikeButton({
  initialLiked = false,
  onLikeChange,
  size = "md",
  color = "pink",
  className,
}: LikeButtonProps) {
  const [liked, setLiked] = useState(initialLiked);
  const [counter, setCounter] = useState(0);

  const handleClick = () => {
    setLiked((prev) => !prev);
    if (counter == 0) setCounter((prev) => prev + 1);
  };

  useEffect(() => {
    if (counter > 0) {
      if (onLikeChange) {
        onLikeChange(liked);
      }
    }
  }, [counter, liked]);

  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleClick}
      aria-label={liked ? "Unlike" : "Like"}
      className={cn(
        `relative rounded-md border-2`,
        `border-${color}-500 hover:bg-${color}-50 focus:ring-${color}-500`,
        sizeClasses[size],
        className
      )}
    >
      <motion.div
        animate={{ scale: liked ? [1, 1.2, 1] : 1 }}
        transition={{ duration: 0.3 }}
      >
        <Heart
          className={cn(
            iconSizes[size],
            liked ? `fill-pink-500 text-pink-500` : `text-pink-500`,
            "transition-colors duration-300"
          )}
        />
      </motion.div>
      {liked && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1, 0] }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div
            className={`w-full h-full bg-${color}-100 rounded-md opacity-30`}
          />
        </motion.div>
      )}
    </Button>
  );
}
