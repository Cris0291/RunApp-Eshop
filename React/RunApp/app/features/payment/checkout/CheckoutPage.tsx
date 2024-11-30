"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator";
import { CheckCircle, CreditCard, DollarSign, Package, Truck } from "lucide-react";
import { useState } from "react";
import { useAppSelector } from "@/app/hooks/reduxHooks";
import { getCartItems, getTotalPrice } from "../shoppingcart/cartSlice";
import { getUserAddress, getUserPaymentMethod } from "../../registration/userSlice";
import ShippingInfoForm from "./ShippingInfoForm";
import PaymentInfoForm from "./PaymentInfoForm";

export default function CheckoutPage(){
  const cartItems = useAppSelector(getCartItems);
  const totalPrice = useAppSelector(getTotalPrice);
  const userAddress = useAppSelector(getUserAddress);
  const userPaymentMethod = useAppSelector(getUserPaymentMethod);
  const [paymentMethod, setPaymentMethod] = useState("credit-card");

      

return (
  <div className="min-h-screen bg-gray-100 text-gray-900 py-12">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Order Review and Payment
      </h1>
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
            <CardHeader className="bg-gray-50 border-b border-gray-200">
                <CardTitle className="text-xl text-gray-800 flex items-center">
                  <Package/> Order Summary
                </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {cartItems.map(item => (
                <div key={item.id} className="flex items-center space-x-4 mb-4 pb-4 border-b border-gray-100 last:border-b-0 last:pb-0 last:mb-0">
                 <div className="flex-grow">
                   <h3 className="font-semibold text-lg">{item.name}</h3>
                   <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                 </div>
                 {item.priceWithDiscount === undefined ? 
                 <p className="font-semibold text-lg">${(item.price * (item.quantity === null ? 0 : item.quantity)).toFixed(2)}</p> :
                 <>
                 <p className="text-black text-lg line-through">${(item.price * (item.quantity === null ? 0 : item.quantity)).toFixed(2)}</p>
                 <p className="font-semibold text-red-500 text-lg">${(item.priceWithDiscount * (item.quantity === null ? 0 : item.quantity)).toFixed(2)}</p>
                 </> }
                </div>
              ))}
            </CardContent>
          </Card>

          {userAddress === undefined ?
          <ShippingInfoForm/>
          :
          <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
            <CardHeader className="bg-gray-50 border-b border-gray-200">
              <CardTitle className="text-xl text-gray-800 flex items-center">
                <Truck className="mr-2 text-yellow-500"/> Shipping Information
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-2">
                <p className="flex items-center"><CheckCircle className="mr-2 text-green-500"/> <strong>Name:</strong>John Doe</p>
                <p className="flex items-center"><CheckCircle className="mr-2 text-green-500"/> <strong>Address:</strong> 123 Main St, Anytown, ST 12345</p>
                <p className="flex items-center"><CheckCircle className="mr-2 text-green-500" /> <strong>Phone:</strong> (555) 123-4567</p>
              </div>
            </CardContent>
          </Card>}

          {userPaymentMethod === undefined ?
          <PaymentInfoForm/>
          :
          <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
            <CardHeader className="bg-gray-50 border-b border-gray-200">
              <CardTitle className="text-xl text-gray-800 flex items-center">
                <Truck className="mr-2 text-yellow-500"/> Shipping Information
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-2">
                <p className="flex items-center"><CheckCircle className="mr-2 text-green-500"/> <strong>Name:</strong>John Doe</p>
                <p className="flex items-center"><CheckCircle className="mr-2 text-green-500"/> <strong>Address:</strong> 123 Main St, Anytown, ST 12345</p>
                <p className="flex items-center"><CheckCircle className="mr-2 text-green-500" /> <strong>Phone:</strong> (555) 123-4567</p>
              </div>
            </CardContent>
          </Card>}
        </div>

        <div>
          <Card className="sticky top-4 bg-white shadow-lg rounded-lg overflow-hidden">
            <CardHeader className="bg-gray-50 border-b border-gray-200">
              <CardTitle className="text-xl text-gray-800">Order Total</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Sutotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span>Free</span>
                </div>
                <Separator className="my-3"/>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-yellow-500">${totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-gray-50 P-6">
               <Button className="w-full bg-yellow-400 text-gray-900 hover:bg-yellow-500 transition-colors duration-300 text-lg font-semibold py-6" size="lg">
                 <DollarSign className="mr-2 h-5 w-5"/> Pay ${totalPrice.toFixed(2)}
               </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  </div>
)
}