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
import { Sliders, Star } from "lucide-react"


export default function FilterOptionsStars() {
  const [starFilter, setStarFilter] = useState<number>()
  

  const handleStarFilterChange = (star: number) => {
    setStarFilter(star)
  }


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full sm:w-auto border-pink-200 text-pink-500 hover:bg-pink-50 hover:text-pink-600">
          <Sliders className="mr-1 h-2 w-2" />
          Filter Options
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-36">
        <DropdownMenuLabel>Filter by Stars</DropdownMenuLabel>
        {[5, 4, 3, 2, 1].map((star) => (
          <DropdownMenuCheckboxItem
            key={`star-${star}`}
            checked={star === starFilter}
            onCheckedChange={() => handleStarFilterChange(star)}
          >
            <div className="flex items-center">
              {star} <Star className="ml-1 h-2 w-2 fill-yellow-400 text-yellow-400" />
              {star === 1 ? " and above" : " stars"}
            </div>
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}