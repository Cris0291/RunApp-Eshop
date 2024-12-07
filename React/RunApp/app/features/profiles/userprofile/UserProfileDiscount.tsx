"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Heart, Check } from "lucide-react"
import useGetProductsWithDiscountQuery from "./useGetProductsWithDiscountQuery"
import LikeButton from "@/app/ui/LikeButton"
import useAddOrRemoveLikeHook from "@/app/hooks/useAddOrRemoveLikeHook"
import useCreateOrderOrAddItem from "@/app/utils/useCreateOrderOrAddItem"
import { getIsCurrentOrder } from "../../payment/checkout/orderSlice"
import { useAppSelector } from "@/app/hooks/reduxHooks"
import { getUserAddress, getUserPaymentMethod } from "../../registration/userSlice"
import { ProductForCardWithDiscount } from "../../store/products/contracts"



const products: ProductForCardWithDiscount[] = [
  { productId: "1", productName: "Wireless Earbuds", price: 129.99, priceWithDiscount: 20, discount: 20, image: "https://images.unsplash.com/photo-1594534475808-b18fc33b045e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", size: "medium" },
  { productId: "2", productName: "Smart Watch", price: 199.99, priceWithDiscount: 20, discount: 15, image: "https://images.unsplash.com/photo-1594534475808-b18fc33b045e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", size: "small" },
  { productId: "3", productName: "4K TV", price: 799.99, priceWithDiscount: 20, discount: 30, image: "https://images.unsplash.com/photo-1594534475808-b18fc33b045e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", size: "large" },
  { productId: "4", productName: "Bluetooth Speaker", price: 79.99, priceWithDiscount: 20, discount: 10, image: "https://images.unsplash.com/photo-1594534475808-b18fc33b045e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", size: "small" },
  { productId: "5", productName: "Gaming Console", price: 399.99, priceWithDiscount: 20, discount: 25, image: "https://images.unsplash.com/photo-1594534475808-b18fc33b045e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", size: "medium" },
]

export default function UserProfileDiscount() {
  const [isAddedTocart, setIsAddedToCart] = useState<string[]>([]);
  const {productsWithDiscount, loadingProductsWithDiscount} = useGetProductsWithDiscountQuery();
  const {AddOrRemoveLikeMutation} = useAddOrRemoveLikeHook();
  const createOrderOrAddItem = useCreateOrderOrAddItem();
  const existOrder = useAppSelector(getIsCurrentOrder);
  const userAddress = useAppSelector(getUserAddress);
  const userPaymentMethod = useAppSelector(getUserPaymentMethod);


  const handleAddToCartState = (product: ProductForCardWithDiscount) => {
    const productForCart = {name: product.productName, id: product.productId, quantity: 1, price: product.price, priceWithDiscount: product.priceWithDiscount, 
      totalPrice: product.price * 1, image: product.image}

    createOrderOrAddItem(productForCart, existOrder,userAddress, userPaymentMethod);
    setIsAddedToCart(prev => {
      const isIncluded = prev.includes(product.productId);

      if(isIncluded) return prev;

      return [...prev, product.productId]
    });
  }
  

  return (
    <>
      <h1 className="text-4xl font-bold text-center mb-8 text-pink-600">Special Offers</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <motion.div
            key={product.productId}
            className={`${
              product.size === "small" ? "col-span-1 row-span-1" :
              product.size === "medium" ? "col-span-1 row-span-2" :
              "col-span-2 row-span-2"
            }`}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          >
            <Card className="h-full overflow-hidden bg-white border-pink-500 border-2 shadow-lg ">
              <CardHeader className="p-0">
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.productName}
                    className="w-full h-48 object-cover"
                  />
                  <Badge className="absolute top-2 right-2 bg-pink-500 text-white">
                    {product.discount}% OFF
                  </Badge>
                  
                </div>
              </CardHeader>
              <CardContent className="p-4">
              <div className="flex justify-between items-center space-x-2">
                <CardTitle className="text-xl mb-2 text-gray-800">{product.productName}</CardTitle>
                <LikeButton  onLikeChange={(like: boolean) => AddOrRemoveLikeMutation({liked: like, productId: product.productId})}/>
              </div>
                
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold text-pink-600">
                    %15
                  </span>
                  <span className="text-sm line-through text-gray-500">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
              </CardContent>
              <CardFooter>
                {isAddedTocart.includes(product.productId) ? 
                <Button className="w-full bg-green-500  text-white ">
                  <Check className="mr-2 h-4 w-4" /> Your item was added to the cart
               </Button>
                : 
                <Button className="w-full bg-pink-500 hover:bg-pink-600 text-white transition-colors duration-300" onClick={() => handleAddToCartState(product)}>
                  <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                </Button>}
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </>
  )
}