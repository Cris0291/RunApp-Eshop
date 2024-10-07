"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react"

interface Product {
  id: number
  name: string
  price: number
  image: string
}

const initialProducts: Product[] = [
  { id: 1, name: "Wireless Earbuds", price: 79.99, image: "/placeholder.svg?height=200&width=200" },
  { id: 2, name: "Smart Watch", price: 199.99, image: "/placeholder.svg?height=200&width=200" },
  { id: 3, name: "Bluetooth Speaker", price: 59.99, image: "/placeholder.svg?height=200&width=200" },
]

function ShoppingCartPage() {
  const [cartItems, setCartItems] = useState(
    initialProducts.map(product => ({ ...product, quantity: 1 }))
  )

  const updateQuantity = (id: number, newQuantity: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: Math.max(0, newQuantity) } : item
      )
    )
  }

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id))
  }

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-white text-black">
      <h1 className="text-3xl font-bold mb-8 flex items-center text-black">
        <ShoppingCart className="mr-2" /> Your Shopping Cart
      </h1>
      {cartItems.length === 0 ? (
        <Card className="bg-white border-yellow-400">
          <CardContent className="pt-6">
            <p className="text-center text-black">Your cart is empty</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
          <div className="space-y-6">
            {cartItems.map(item => (
              <div key={item.id} className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4 pb-6 border-b border-yellow-200 last:border-b-0 transition-all duration-300 ease-in-out hover:bg-yellow-50 hover:shadow-md rounded-lg p-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full sm:w-40 h-40 object-cover rounded-md transition-transform duration-300 ease-in-out hover:scale-105"
                />
                <div className="flex-grow space-y-2">
                  <h2 className="text-xl font-semibold text-black">{item.name}</h2>
                  <p className="text-2xl font-bold text-yellow-500">${item.price.toFixed(2)}</p>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      aria-label="Decrease quantity"
                      className="border-yellow-400 text-black hover:bg-yellow-100 transition-colors duration-300"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Input
                      type="number"
                      min="0"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                      className="w-16 text-center border-yellow-400 text-black"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      aria-label="Increase quantity"
                      className="border-yellow-400 text-black hover:bg-yellow-100 transition-colors duration-300"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeItem(item.id)}
                  className="text-black hover:text-yellow-600 hover:bg-yellow-100 self-start sm:self-end transition-colors duration-300"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Remove
                </Button>
              </div>
            ))}
          </div>
          <div>
            <Card className="sticky top-4 bg-white border-yellow-400">
              <CardHeader>
                <CardTitle className="text-black">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-black">Subtotal ({itemCount} items)</span>
                  <span className="text-black">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-black">Shipping</span>
                  <span className="text-black">Free</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-black">Taxes</span>
                  <span className="text-black">Calculated at checkout</span>
                </div>
                <Separator className="bg-yellow-200" />
                <div className="flex justify-between items-center text-lg font-semibold">
                  <span className="text-black">Total</span>
                  <span className="text-yellow-500">${total.toFixed(2)}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-yellow-400 text-black hover:bg-yellow-500 transition-colors duration-300" size="lg">
                  Proceed to Checkout
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}

export default ShoppingCartPage;