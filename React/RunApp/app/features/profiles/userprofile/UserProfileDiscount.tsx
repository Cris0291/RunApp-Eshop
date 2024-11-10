"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Heart } from "lucide-react"

interface Product {
  id: number
  name: string
  price: number
  discount: number
  image: string
  size: "small" | "medium" | "large"
}

const products: Product[] = [
  { id: 1, name: "Wireless Earbuds", price: 129.99, discount: 20, image: "https://images.unsplash.com/photo-1594534475808-b18fc33b045e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", size: "medium" },
  { id: 2, name: "Smart Watch", price: 199.99, discount: 15, image: "https://images.unsplash.com/photo-1594534475808-b18fc33b045e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", size: "small" },
  { id: 3, name: "4K TV", price: 799.99, discount: 30, image: "https://images.unsplash.com/photo-1594534475808-b18fc33b045e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", size: "large" },
  { id: 4, name: "Bluetooth Speaker", price: 79.99, discount: 10, image: "https://images.unsplash.com/photo-1594534475808-b18fc33b045e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", size: "small" },
  { id: 5, name: "Gaming Console", price: 399.99, discount: 25, image: "https://images.unsplash.com/photo-1594534475808-b18fc33b045e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", size: "medium" },
]

export default function UserProfileDiscount() {
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null)
  const [likedProducts, setLikedProducts] = useState<number[]>([])

  const calculateDiscountedPrice = (price: number, discount: number) => {
    return (price * (100 - discount) / 100).toFixed(2)
  }

  const toggleLike = (productId: number) => {
    setLikedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }

  return (
    <>
      <h1 className="text-4xl font-bold text-center mb-8 text-pink-600">Special Offers</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <motion.div
            key={product.id}
            className={`${
              product.size === "small" ? "col-span-1 row-span-1" :
              product.size === "medium" ? "col-span-1 row-span-2" :
              "col-span-2 row-span-2"
            }`}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
            onHoverStart={() => setHoveredProduct(product.id)}
            onHoverEnd={() => setHoveredProduct(null)}
          >
            <Card className="h-full overflow-hidden bg-white border-pink-500 border-2 shadow-lg ">
              <CardHeader className="p-0">
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <Badge className="absolute top-2 right-2 bg-pink-500 text-white">
                    {product.discount}% OFF
                  </Badge>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 left-2 text-pink-500 hover:text-pink-600 hover:bg-pink-100"
                    onClick={() => toggleLike(product.id)}
                  >
                    <Heart className={`h-6 w-6 ${likedProducts.includes(product.id) ? 'fill-pink-500' : 'fill-none'}`} />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="text-xl mb-2 text-gray-800">{product.name}</CardTitle>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold text-pink-600">
                    ${calculateDiscountedPrice(product.price, product.discount)}
                  </span>
                  <span className="text-sm line-through text-gray-500">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-pink-500 hover:bg-pink-600 text-white transition-colors duration-300">
                  <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </>
  )
}