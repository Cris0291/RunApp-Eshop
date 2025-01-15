"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowRight, Calendar, DollarSign, Package, Search, Star } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

interface Product {
    id: string
    name: string
    price: number
    image: string
    purchaseDate: string
    orderNumber: string
    rating?: number
    category: string
  }
  
  const purchaseHistory: Product[] = [
    { id: "1", name: "Wireless Earbuds", price: 79.99, image: "/placeholder.svg?height=200&width=200", purchaseDate: "2023-05-15", orderNumber: "ORD-001", category: "Electronics" },
    { id: "2", name: "Smart Watch", price: 199.99, image: "/placeholder.svg?height=200&width=200", purchaseDate: "2023-04-22", orderNumber: "ORD-002", rating: 4, category: "Wearables" },
    { id: "3", name: "Bluetooth Speaker", price: 59.99, image: "/placeholder.svg?height=200&width=200", purchaseDate: "2023-03-10", orderNumber: "ORD-003", rating: 5, category: "Audio" },
    { id: "4", name: "Laptop", price: 999.99, image: "/placeholder.svg?height=200&width=200", purchaseDate: "2023-02-05", orderNumber: "ORD-004", rating: 4, category: "Computers" },
  ]

export default function PurchaseHistoryPage(){
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOrder, setSortOrder] = useState("newest");

    const filteredAndSortedHistory = purchaseHistory
       .filter(product => product.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()))
       .sort((a,b) => {
        if(sortOrder == "newest"){
            return new Date(b.purchaseDate).getTime() - new Date(a.purchaseDate).getTime()
        } else{
            return new Date(a.purchaseDate).getTime() - new Date(b.purchaseDate).getTime()
        }
       })

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <h1 className="text-4xl font-bold mb-8 text-center text-blue-900">Your Purchase History</h1>

            <Card className="bg-white shadow-lg rounded-lg overflow-hidden mb-8 border border-purple-200">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                    <div className="relative flex-grow">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400"/>
                        <Input
                           type="text"
                           placeholder="Search products"
                           value={searchTerm}
                           onChange={(e) => setSearchTerm(e.target.value)}
                           className="pl-10 border-purple-200 focus:border-blue-500 w-full"/>
                    </div>
                    <Select value={sortOrder} onValueChange={setSortOrder}>
                      <SelectTrigger className="w-full sm:w-[180px] border-purple-200 focus:border-blue-500">
                        <SelectValue placeholder="Sort by"/>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="newest">Newest First</SelectItem>
                        <SelectItem value="oldest">Oldest First</SelectItem>
                      </SelectContent>
                    </Select>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
                {filteredAndSortedHistory.map((product) => (
                    <Card key={product.id} className="bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-200 hover:shadow-2xl hover:scale-105 border border-purple-200">
                      <div className="relative">
                        <img src={product.image} alt={product.name} className="w-full h-48 object-cover"/>
                        <div className="absolute top-0 right-0 bg-purple-500 text-white px-3 py-1 rounded-bl-lg">
                          {product.category}
                        </div>
                      </div>
                      <CardContent className="py-6">
                        <h2 className="text-2xl font-semibold mb-2 text-blue-900">{product.name}</h2>
                        <div className="flex justify-between items-center mb-4">
                          <p className="text-purple-600 flex items-center">
                            <Calendar className="w-4 h-4 mr-2"/>{new Date(product.purchaseDate).toLocaleDateString()}
                          </p>
                          <p className="text-xl font-bold text-blue-600 flex items-center">
                            <DollarSign className="w-5 h-5 mr-1"/> {product.price.toFixed(2)}
                          </p>
                        </div>
                        {product.rating && (
                          <div className="flex items-center mb-4">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`w-5 h-5 ${i < product.rating! ? "text-purple-400 fill-current" : "text-gray-300" }`}/>
                            ))}
                            <span className="ml-2 text-purple-600">{product.rating}</span>
                          </div>
                        )}
                        <Separator className="my-4 bg-purple-100"/>
                        <div className="flex justify-between items-center">
                          <Button variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-50">
                            View Details
                          </Button>
                          <Button className="bg-purple-500 text-white hover:bg-purple-600 transition-colors duration-300">
                            Buy Again <ArrowRight className="ml-2 w-4 h-4"/>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                ))}
            </div>

            {filteredAndSortedHistory.length === 0 && (
              <Card className="bg-white shadow-lg rounded-lg overflow-hidden mt-6 border border-purple-200">
                <CardContent className="pt-12 text-center">
                  <Package className="mx-auto h-16 w-16 teext-purple-400 mb-4"/>
                  <h2 className="text-2xl font-semibold text-blue-900 mb-2">No purchases found</h2>
                  <p className="text-purple-600">We couldn't find any products matching your search.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
    )
   
}