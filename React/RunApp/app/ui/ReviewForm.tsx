"use client"

import { useState} from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Star, ThumbsUp, ThumbsDown, Meh, Smile, Frown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface ReviewFormData {
  sentiment: string
  content: string,
  rating: number,
}

interface Props {
  onSubmit: (data: ReviewFormData) => void,
  isSubmitting: boolean,
  size?: "sm" | "lg",
  children?: React.ReactNode,
  className?: string
}

const sentimentOptions = [
  { value: "excellent", label: "Excellent", icon: ThumbsUp },
  { value: "good", label: "Good", icon: Smile },
  { value: "average", label: "Average", icon: Meh },
  { value: "poor", label: "Poor", icon: Frown },
  { value: "terrible", label: "Terrible", icon: ThumbsDown },
]

export default function ReviewForm({ onSubmit, isSubmitting, size="sm", children, className = "bg-pink-500 text-white hover:bg-pink-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg" }: Props) {
  const [sentiment, setSentiment] = useState("average")
  const [content, setContent] = useState("")
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [isOpen, setIsOpen] = useState(false)

  
  const handleSubmit =  (e: React.FormEvent) => {
    e.preventDefault()
    
    onSubmit({ sentiment, content, rating })
    setSentiment("")
    setContent("")
    setIsOpen(false)
    setRating(0)
  }
 //<Pencil className="w-4 h-4 mr-2" /> Write a Review
          
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          size={size}
          variant="outline"
          className={className}
        >
         {children}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] overflow-hidden bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-pink-600">Write a Review</DialogTitle>
          <DialogDescription className="text-gray-600">
            Share your thoughts about the product. Your review will help other customers make informed decisions.
          </DialogDescription>
        </DialogHeader>
        <motion.form
          onSubmit={handleSubmit}
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="space-y-4">
          <div className="space-y-2">
              <Label htmlFor="rating" className="text-sm font-medium text-gray-700">
                Rating
              </Label>
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className="focus:outline-none"
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(star)}
                  >
                    <Star
                      className={`w-8 h-8 ${
                        star <= (hoverRating || rating)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      } transition-colors duration-200`}
                    />
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="sentiment" className="text-sm font-medium text-gray-700">
                Overall Experience
              </Label>
              <Select value={sentiment} onValueChange={setSentiment} required>
                <SelectTrigger className="w-full border-gray-300 focus:border-pink-500 focus:ring-pink-500 transition-all duration-300 hover:border-pink-400 text-black">
                  <SelectValue placeholder="Select your overall experience" />
                </SelectTrigger>
                <SelectContent>
                  <AnimatePresence>
                    {sentimentOptions.map((option) => (
                      <motion.div
                        key={option.value}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <SelectItem value={option.value} className="flex items-center space-x-2 cursor-pointer">
                          <option.icon className="w-5 h-5 text-pink-500" />
                          <span>{option.label}</span>
                        </SelectItem>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="content" className="text-sm font-medium text-gray-700">
                Your Review
              </Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full h-32 border-gray-300 focus:border-pink-500 focus:ring-pink-500 resize-none transition-all duration-300 hover:border-pink-400 text-black"
                placeholder="Tell us about your experience with the product..."
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="w-full bg-pink-500 text-white hover:bg-pink-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <motion.div
                  className="flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Submitting...
                </motion.div>
              ) : (
                "Submit Review"
              )}
            </Button>
          </DialogFooter>
        </motion.form>
      </DialogContent>
    </Dialog>
  )
}