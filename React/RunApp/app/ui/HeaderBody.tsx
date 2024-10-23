"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ShoppingCart } from "lucide-react";
import Link from "next/link";

interface Props {
   isRegisterd : boolean
}

export const HeaderBody: React.FC<Props> = ({isRegisterd}) => {
    if(isRegisterd){
        return (
        <div className="flex items-center space-x-4">
          <nav className="md:flex space-x-4">
          <Button variant="outline" className="border-green-500 text-green-500 hover:bg-green-50">
             <Link href="/login">Login</Link>
          </Button>
          <Button className="bg-green-500 text-white hover:bg-green-600">
            <Link href="/register">Register</Link>
          </Button>
          </nav>
        </div>
        )
    } 


    
    return ( 
    <>
    <div className="flex-1 max-w-xl mx-4">
    <div className="relative">
      <Input
        className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
        placeholder="Search for products..."
        type="search"
      />
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
    </div>
  </div>
  <div className="flex items-center space-x-4">
    <nav className="hidden md:flex space-x-4">
      <Link
        className="text-sm font-medium hover:text-green-600 transition-colors text-black"
        href="#"
      >
        Home
      </Link>
      <Link
        className="text-sm font-medium hover:text-green-600 transition-colors text-black"
        href="#"
      >
        Products
      </Link>
      <Link
        className="text-sm font-medium hover:text-green-600 transition-colors text-black"
        href="#"
      >
        About
      </Link>
      <Link
        className="text-sm font-medium hover:text-green-600 transition-colors text-black"
        href="#"
      >
        Contact
      </Link>
    </nav>
    <Button variant="ghost" size="icon">
      <ShoppingCart className="h-5 w-5" />
      <span className="sr-only">Cart</span>
    </Button>
  </div>
  </>
  )
}