"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trash2, Upload, DollarSign, Tag } from 'lucide-react'
import {newPromotionDto, ProductResponseDto } from "./contracts"
import { useForm } from "react-hook-form"

interface Product {
  id: string
  name: string
  price: number
  discountedPrice: number | null
  image: string | null
  category: string
}

const categories = ["Electronics", "Clothing", "Home & Garden", "Sports", "Books"]

export default function ProductManagementTable({onHandleCurrentProduct}: {onHandleCurrentProduct: (link: string, product: ProductResponseDto) => void}) {
  const [products, setProducts] = useState<Product[]>([
    { id: "1", name: "Wireless Earbuds", price: 129.99, discountedPrice: 99.99, image: "/placeholder.svg?height=100&width=100", category: "Electronics" },
    { id: "2", name: "Smart Watch", price: 199.99, discountedPrice: null, image: null, category: "Electronics" },
    { id: "3", name: "4K TV", price: 799.99, discountedPrice: 699.99, image: "/placeholder.svg?height=100&width=100", category: "Electronics" },
    { id: "4", name: "Bluetooth Speaker", price: 79.99, discountedPrice: null, image: null, category: "Electronics" },
    { id: "5", name: "Gaming Console", price: 399.99, discountedPrice: 349.99, image: "/placeholder.svg?height=100&width=100", category: "Electronics" },
  ])

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isPriceDialogOpen, setIsPriceDialogOpen] = useState(false);
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [newDiscountedPrice, setNewDiscountedPrice] = useState<string>("");
  const [newCategory, setNewCategory] = useState<string>("");
  const {register: registerDiscount, handleSubmit: handleSubmitDiscount, formState: {errors: errorsDiscount}} = useForm<newPromotionDto>()

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter(product => product.id !== id))
  }

  const handleImageUpload = (product: any) => {
    onHandleCurrentProduct("Images", product);
  }

  const handlePriceUpdate = () => {
    setIsPriceDialogOpen(true)
  }

  const onSubmitPrice = () => {

  }

  const onErrorPrice = () => {

  }

  const handlePriceSubmit = () => {
    if (selectedProduct) {
      setProducts(products.map(product => 
        product.id === selectedProduct.id 
          ? { ...product, discountedPrice: newDiscountedPrice ? parseFloat(newDiscountedPrice) : null } 
          : product
      ))
      setIsPriceDialogOpen(false)
    }
  }

  const handleCategoryUpdate = (id: string) => {
    const product = products.find(p => p.id === id)
    if (product) {
      setSelectedProduct(product)
      setNewCategory(product.category)
      setIsCategoryDialogOpen(true)
    }
  }

  const handleCategorySubmit = () => {
    if (selectedProduct && newCategory) {
      setProducts(products.map(product => 
        product.id === selectedProduct.id 
          ? { ...product, category: newCategory } 
          : product
      ))
      setIsCategoryDialogOpen(false)
    }
  }

  return (
    <div className="container mx-auto p-4 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Product Management</h1>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-yellow-100">
                <TableHead className="font-bold">Name</TableHead>
                <TableHead className="font-bold">Price</TableHead>
                <TableHead className="font-bold">Discounted Price</TableHead>
                <TableHead className="font-bold">Category</TableHead>
                <TableHead className="font-bold">Image</TableHead>
                <TableHead className="font-bold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium text-black">{product.name}</TableCell>
                  <TableCell className="text-black">${product.price.toFixed(2)}</TableCell>
                  <TableCell>
                    {product.discountedPrice 
                      ? <span className="text-green-600 font-semibold">${product.discountedPrice.toFixed(2)}</span>
                      : <span className="text-gray-400">No discount</span>}
                  </TableCell>
                  <TableCell className="text-black">{product.category}</TableCell>
                  <TableCell>
                    {product.image 
                      ? <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-md" /> 
                      : <span className="text-gray-400">No image</span>}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        onClick={() => handleDeleteProduct(product.id)}
                        variant="destructive"
                        size="sm"
                        className="bg-red-500 hover:bg-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                      <Button 
                        onClick={() => handleImageUpload(product)}
                        variant="outline"
                        size="sm"
                        className="bg-yellow-500 text-white hover:bg-yellow-600"
                      >
                        <Upload className="w-4 h-4" />
                      </Button>
                      <Button 
                        onClick={() => handlePriceUpdate()}
                        variant="outline"
                        size="sm"
                        className="bg-yellow-500 text-white hover:bg-yellow-600"
                      >
                        <DollarSign className="w-4 h-4" />
                      </Button>
                      <Button 
                        onClick={() => handleCategoryUpdate(product.id)}
                        variant="outline"
                        size="sm"
                        className="bg-yellow-500 text-white hover:bg-yellow-600"
                      >
                        <Tag className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <Dialog open={isPriceDialogOpen} onOpenChange={setIsPriceDialogOpen}>
        <DialogContent className="bg-gray-50">
          <DialogHeader>
            <DialogTitle className="text-black">Update Price for {selectedProduct?.name}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmitDiscount(onSubmitPrice, onErrorPrice)}>
          <div>
              <div className="space-y-2">
              <Label htmlFor="discountedPrice" className="text-right text-black">
                Discounted Price
              </Label>
              <Input
                id="discountedPrice"
                type="number"
                step="0.01"
                {...registerDiscount("newPriceWithDiscount", {
                  required: "New price with discount is required"
                })}
                className="col-span-3"
                placeholder="Enter discounted price or leave blank to remove"
              />
              </div>
              <div className="space-y-2">
                 <Label htmlFor="promotionalText" className="text-black font-semibold">Promotional Text</Label>
                <Input 
                  id="promotionalText"
                  type="text"
                  {...registerDiscount("newPromotionalText", {
                    required: "New promotional text is required"
                  })} 
                  placeholder="Enter promotional text" 
                  className="border-black focus:ring-yellow-500 focus:border-yellow-500 bg-white text-black" 
                    />
                  </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button onClick={() => setIsPriceDialogOpen(false)} variant="outline" className="text-black">Cancel</Button>
            <Button onClick={handlePriceSubmit} className="bg-yellow-500 text-white hover:bg-yellow-600">Update</Button>
          </div>
        </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isCategoryDialogOpen} onOpenChange={setIsCategoryDialogOpen} >
        <DialogContent className="bg-gray-50">
          <DialogHeader>
            <DialogTitle className="text-black">Update Category for {selectedProduct?.name}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right text-black">
                Category
              </Label>
              <Select onValueChange={setNewCategory} defaultValue={selectedProduct?.category}>
                <SelectTrigger className="col-span-3 text-black">
                  <SelectValue placeholder="Select a category"/>
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button onClick={() => setIsCategoryDialogOpen(false)} variant="outline" className="text-black">Cancel</Button>
            <Button onClick={handleCategorySubmit} className="bg-yellow-500 text-white hover:bg-yellow-600">Update</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}