import { useState } from "react";
import { Star } from "lucide-react";

interface StarRatingProps {
  initialRating?: number;
  onRatingChange?: (rating: number) => void;
}

export default function StarRatingComponent({
  initialRating = 0,
  onRatingChange,
}: StarRatingProps) {
  const [rating, setRating] = useState(initialRating);
  const [hover, setHover] = useState(0);

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
    if (onRatingChange) {
      onRatingChange(newRating);
    }
  };

  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          className={`focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 rounded-full p-1 transition-colors duration-200 ${
            star <= (hover || rating) ? "text-yellow-400" : "text-gray-300"
          }`}
          onClick={() => handleRatingChange(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          aria-label={`Rate ${star} stars out of 5`}
        >
          <Star
            className={`w-8 h-8 ${
              star <= (hover || rating) ? "fill-current" : "fill-none"
            } transition-all duration-200 ${
              star <= (hover || rating) ? "scale-110" : "scale-100"
            }`}
          />
        </button>
      ))}
      <span className="ml-2 text-gray-600 text-sm">{rating} out of 5</span>
    </div>
  );
}
