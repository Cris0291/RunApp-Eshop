"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, CreditCard, DollarSign, Package, Truck } from "lucide-react";
import { useState } from "react";

export default function CheckoutPage(){
  const [paymentMethod, setPaymentMethod] = useState("credit-card");

    interface OrderItem {
        id: number
        name: string
        price: number
        quantity: number
        image: string
      };

    const orderItems: OrderItem[] = [
        { id: 1, name: "Wireless Earbuds", price: 79.99, quantity: 1, image: "/placeholder.svg?height=80&width=80" },
        { id: 2, name: "Smart Watch", price: 199.99, quantity: 1, image: "/placeholder.svg?height=80&width=80" },
      ];

      const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const shipping = 10;
      const tax = subtotal * 0.1;
      const total = subtotal + shipping + tax;

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
              {orderItems.map(item => (
                <div key={item.id} className="flex items-center space-x-4 mb-4 pb-4 border-b border-gray-100 last:border-b-0 last:pb-0 last:mb-0">
                 <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-md"/>
                 <div className="flex-grow">
                   <h3 className="font-semibold text-lg">{item.name}</h3>
                   <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                 </div>
                 <p className="font-semibold text-lg">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </CardContent>
          </Card>

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
          </Card>

          <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
            <CardHeader className="bg-gray-50 border-b border-gray-200">
              <CardTitle className="text-xl text-gray-800 flex items-center">
                <CreditCard className="mr-2 text-yellow-500"/> Payment Method
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                <div className="flex items-center space-x-2 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                  <RadioGroupItem value="credit-card" id="credit-card" className="border-yellow-400 text-yellow-500"/>
                  <Label htmlFor="credit-card" className="flex-grow cursor-pointer">Credit Card</Label>
                  <CreditCard className="text-gray-400"/>
                </div>
                <div className="flex items-center space-x-2 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                  <RadioGroupItem value="paypal" id="paypal" className="border-yellow-400 text-yellow-500"/>
                  <Label htmlFor="paypal" className="flex-grow cursor-pointer">Paypal</Label>
                  <img src="/placeholder.svg?height=24&width=24" alt="PayPal" className="w-6 h-6" />
                </div>
              </RadioGroup>
              {paymentMethod == "credit-card" && (
                <div className="mt-6 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="card number">Card Number</Label>
                    <Input id="card-number" placeholder="1234 5678 9012 3456" className="border-gray-300 focus:border-yellow-400"/>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry-date">Expiry Date</Label>
                      <Input id="expiry-date" placeholder="MM/YY" className="border-gray-300 focus:border-yellow-400"/>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input id="cvv" placeholder="123" className="border-gray-300 focus:border-yellow-400"/>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
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
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <Separator className="my-3"/>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-yellow-500">${total.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-gray-50 P-6">
               <Button className="w-full bg-yellow-400 text-gray-900 hover:bg-yellow-500 transition-colors duration-300 text-lg font-semibold py-6" size="lg">
                 <DollarSign className="mr-2 h-5 w-5"/> Pay ${total.toFixed(2)}
               </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  </div>
)
}