"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sliders } from "lucide-react"

interface Props{
  handleLikeFilterChange: (likes: number) => void,
  likeFilter: number
}

export default function FilterOptionsLikes({handleLikeFilterChange, likeFilter}: Props) {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full sm:w-auto border-pink-200 text-pink-500 hover:bg-pink-50 hover:text-pink-600">
          <Sliders className="mr-1 h-2 w-2" />
          Filter Options
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-36">
        <DropdownMenuLabel>Filter by Likes</DropdownMenuLabel>
        {[100, 50, 25, 10].map((like) => (
          <DropdownMenuCheckboxItem
            key={`like-${like}`}
            checked={like === likeFilter}
            onCheckedChange={() => handleLikeFilterChange(like)}
          >
            {like}+ likes
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}