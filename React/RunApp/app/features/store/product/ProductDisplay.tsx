"use client";

import { AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar } from "@radix-ui/react-avatar";
import { Check, ShoppingCart, Star, ThumbsUp } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const testReviews = [
  {
    name: "Alex Johnson",
    avatar: "AJ",
    date: "May 15, 2023",
    rating: 5,
    title: "Excellent quality and versatility!",
    comment:
      "I've been using these resistance bands for a month now, and I'm impressed with their quality and versatility. They've really helped me maintain my fitness routine at home.",
    helpful: 24,
  },
  {
    name: "Sarah Lee",
    avatar: "SL",
    date: "April 30, 2023",
    rating: 4,
    title: "Great for home workouts",
    comment:
      "These bands are perfect for my home workouts. They're easy to use and store. The only reason I didn't give 5 stars is that I wish they came with a workout guide.",
    helpful: 18,
  },
  {
    name: "Mike Thompson",
    avatar: "MT",
    date: "April 22, 2023",
    rating: 5,
    title: "Durable and effective",
    comment:
      "I was skeptical at first, but these resistance bands have exceeded my expectations. They're very durable and provide a great workout. Highly recommended!",
    helpful: 31,
  },
];

function ProductDisplay() {
  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="conatiner mx-auto px-4 py-8 bg-white">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <Image
            src="https://images.unsplash.com/photo-1557461761-c7c2b7a5fa97?q=80&w=1530&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Name Of The Product"
            width={400}
            height={400}
            className="w-full rounded-lg"
          />
          <div className="grid grid-cols-4 gap-2">
            {[...Array(4)].map((_, i) => (
              <Image
                key={i}
                src="https://images.unsplash.com/photo-1557461761-c7c2b7a5fa97?q=80&w=1530&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt={`Product thumbnail ${i + 1}`}
                width={100}
                height={100}
                className="w- full rounded-lg cursor-pointer"
              />
            ))}
          </div>
        </div>
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-black">
            Premium Resistance Bands Set
          </h1>
          <div className="flex items-center space-x-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 fill-yellow-400 stroke-yellow-400"
                />
              ))}
            </div>
            <span className="text-sm text-gray-500">(128 reviews)</span>
          </div>
          <p className="text-xl font-bold text-black">$39.99</p>
          <p className="text-green-600 flex items-center">
            <Check className="w-5 h-5 mr-2" /> In Stock
          </p>
          <p className="text-gray-600">
            Elevate your home workouts with our Premium Resistance Bands Set.
            Perfect for all fitness levels, these durable latex bands offer
            varying resistance levels to help you build strength, improve
            flexibility, and achieve your fitness goals.
          </p>
          <div className="flex items-center space-x-4">
            <div className="flex items-center border rounded-md">
              <button
                onClick={decrementQuantity}
                className="px-3 py-1 text-xl text-black"
              >
                -
              </button>
              <span className="px-3 py-1 border-x text-black">{quantity}</span>
              <button
                className="px-3 py-1 text-xl text-black"
                onClick={incrementQuantity}
              >
                +
              </button>
            </div>
            <Button className="flex items-center">
              <ShoppingCart className="w-5 h-5 mr-2" />
              AddTocart
            </Button>
          </div>
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2">Key Features:</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>5 resistance levels for progressive training</li>
                <li>Made from high-quality, durable latex</li>
                <li>Includes door anchor and ankle straps</li>
                <li>Compact and portable for workouts anywhere</li>
                <li>Suitable for all fitness levels</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4 text-black">Customer Reviews</h2>
        <div className="space-y-6">
          {testReviews.map((review, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Avatar>
                    <AvatarFallback>{review.avatar}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{review.name}</h3>
                      <span className="text-sm text-gray-500">
                        {review.date}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="flex">
                        {[...Array(5)].map((_, j) => (
                          <Star
                            key={j}
                            className={`w-4 h-4 ${
                              j < review.rating
                                ? "fill-yellow-400 stroke-yellow-400"
                                : "fill-gray-200 stroke-gray-200"
                            }`}
                          />
                        ))}
                      </div>
                      <Badge variant="secondary">{review.rating}/5</Badge>
                    </div>
                    <h4 className="font-medium mt-2">{review.title}</h4>
                    <p className="text-sm text-gray-600 mt-2">
                      {review.comment}
                    </p>
                    <div className="flex items-center space-x-2 mt-4">
                      <Button variant="outline" size="sm">
                        <ThumbsUp className="w-4 h-4 mr-2" />
                        Helpful ({review.helpful})
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductDisplay;
