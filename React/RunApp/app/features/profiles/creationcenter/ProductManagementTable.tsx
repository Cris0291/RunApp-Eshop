"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trash2, Upload, DollarSign, Tag,  AlertCircle } from 'lucide-react'
import {newCategoryDto, newPromotionDto, ProductCreated} from "./contracts"
import { SubmitHandler, useForm } from "react-hook-form"
import useAddNewDiscount from "./useAddNewDiscount"
import useAddNewCategory from "./useAddNewCategory"
import useDeleteCreatedProduct from "./useDeleteCreatedProduct"
import useGetCreatedProducts from "./useGetCreatedProducts"
import useDeleteNewDiscount from "./useDeleteNewDiscount"
import ProductLoadingCard from "@/app/ui/ProductLoadingCard"
import NoProductsFound from "@/app/ui/NoProductsFound"

interface Product {
  productId: string
  name: string
  price: number
  discountedPrice: number | null
  image: string | null
  category: string[]
}

const categories = ["Equipment", "Apparel", "Nutrition", "Cardio", "Wellness", "Supplements", "Yoga", "HIIT", "Weight Loss", "Group Fitness"]

export default function ProductManagementTable({onHandleCurrentProduct}: {onHandleCurrentProduct: (link: string, product: ProductCreated) => void}) {
  const [products, setProducts] = useState<Product[] | undefined>([
    { productId: "1", name: "Wireless Earbuds", price: 129.99, discountedPrice: 99.99, image: "/placeholder.svg?height=100&width=100", category: ["Electronics"] },
    { productId: "2", name: "Smart Watch", price: 199.99, discountedPrice: null, image: null, category: ["Electronics"] },
    { productId: "3", name: "4K TV", price: 799.99, discountedPrice: 699.99, image: "/placeholder.svg?height=100&width=100", category: ["Electronics"] },
    { productId: "4", name: "Bluetooth Speaker", price: 79.99, discountedPrice: null, image: null, category: ["Electronics"] },
    { productId: "5", name: "Gaming Console", price: 399.99, discountedPrice: 349.99, image: "/placeholder.svg?height=100&width=100", category: ["Electronics"] },
  ])
  const {productCreated, isLoading, error, isError} = useGetCreatedProducts();

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentProductId, setCurrentProductId] = useState<string>("");
  const [isPriceDialogOpen, setIsPriceDialogOpen] = useState(false);
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [newCategory, setNewCategory] = useState<string>("");
  const [discountErrors, setDiscountErrors] = useState<(string | undefined)[]>([]);
  const [categoryErrors, setCategoryErrors] = useState<(string | undefined)[]>([]);
  const {register: registerDiscount, handleSubmit: handleSubmitDiscount, formState: {errors: errorsDiscount}} = useForm<newPromotionDto>();
  const {addDiscount} = useAddNewDiscount();
  const {addCategory} = useAddNewCategory();
  const {deleteCreatedProduct} = useDeleteCreatedProduct();
  const {deleteDiscount} = useDeleteNewDiscount()

  const handleDeleteProduct = (id: string) => {
    deleteCreatedProduct(id);
  }

  const handleDeleteDiscount = (id: string) => {
    deleteDiscount(id);
  }

  const handleImageUpload = (product: ProductCreated) => {
    onHandleCurrentProduct("Images", product);
  }

  const handlePriceUpdate = (id: string) => {
    setCurrentProductId(id);
    setIsPriceDialogOpen(true)
  }

  const onSubmitPrice: SubmitHandler<newPromotionDto> = (data) => {
    addDiscount({newDiscount: data, productId: currentProductId});
    setIsPriceDialogOpen(false);
  }

  const onErrorPrice = () => {
    const newErrors: (string | undefined)[] = [];
    const values = Object.values(errorsDiscount);
    values.forEach(value => newErrors.push(value.message));
    setDiscountErrors(newErrors);
  }


  const handleCategoryUpdate = (id: string) => {
    setCurrentProductId(id);
    setIsCategoryDialogOpen(true);
  }

  const onSubmitCategory = (e: React.FormEvent) => {
    e.preventDefault();


    const errors = categoryValidation();

    if(errors.length === 0){
      const categoryData = {
        category: newCategory
      }
  
      addCategory({newCategory: categoryData, productId: currentProductId});
      setIsCategoryDialogOpen(false);
    }
  }

  const categoryValidation = () => {
    const newErrors: (string | undefined)[] = [];
    
    if(newCategory.trim().length === 0) newErrors.push("The new category cannot be empty");

    const product = products?.find(x => x.productId === currentProductId);
    if(product === undefined) newErrors.push("Selected product was not found. Something unexpected happened");

    const isCategoryIncluded = product?.category.includes(newCategory);
    if(isCategoryIncluded) newErrors.push("The selected category was already included. Please select another one");

    setCategoryErrors(newErrors);

    return newErrors;
  }

  return (
    <div className="container mx-auto p-4 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Product Management</h1>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          {isLoading? <ProductLoadingCard/>: products !== undefined && !isError? <Table>
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
                <TableRow key={product.productId} className="hover:bg-gray-50">
                  <TableCell className="font-medium text-black">{product.name}</TableCell>
                  <TableCell className="text-black">${product.price.toFixed(2)}</TableCell>
                  <TableCell>
                    {product.discountedPrice 
                      ? <span className="text-green-600 font-semibold">${product.discountedPrice.toFixed(2)}</span>
                      : <span className="text-gray-400">No discount</span>}
                  </TableCell>
                  <TableCell className="text-black">{product.category[0]}</TableCell>
                  <TableCell>
                    {product.image 
                      ? <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-md" /> 
                      : <span className="text-gray-400">No image</span>}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        onClick={() => handleDeleteProduct(product.productId)}
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
                        onClick={() => handlePriceUpdate(product.productId)}
                        variant="outline"
                        size="sm"
                        className="bg-yellow-500 text-white hover:bg-yellow-600"
                      >
                        <DollarSign className="w-4 h-4" />
                      </Button>
                      <Button 
                        onClick={() => handleDeleteDiscount  (product.productId)}
                        variant="destructive"
                        size="sm"
                        className="bg-red-500 hover:bg-red-600"
                      >
                        <DollarSign className="w-4 h-4" />
                      </Button>
                      <Button 
                        onClick={() => handleCategoryUpdate(product.productId)}
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
          </Table>: <NoProductsFound/>}
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
                className="col-span-3 text-black"
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
          <div className="space-y-6">
          {discountErrors.length > 0 && (
             <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                 {discountErrors.map((error, index) => (
                    <p key={index}>{error}</p>
                    ))}
              </AlertDescription>
             </Alert>
              )}
          <div className="flex justify-between space-x-2">
            <Button onClick={() => setIsPriceDialogOpen(false)} variant="outline" className="text-black">Cancel</Button>
            <Button type="submit" className="bg-yellow-500 text-white hover:bg-yellow-600">Update</Button>
          </div>
          </div>
        </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isCategoryDialogOpen} onOpenChange={setIsCategoryDialogOpen} >
        <DialogContent className="bg-gray-50">
          <DialogHeader>
            <DialogTitle className="text-black">Update Category for {selectedProduct?.name}</DialogTitle>
          </DialogHeader>
          <form onSubmit={onSubmitCategory}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right text-black">
                Category
              </Label>
              <Select onValueChange={setNewCategory} value={newCategory}>
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
          {categoryErrors.length > 0 && (
             <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                 {categoryErrors.map((error, index) => (
                    <p key={index}>{error}</p>
                    ))}
              </AlertDescription>
             </Alert>
              )}
          <div className="flex justify-end space-x-2">
            <Button onClick={() => setIsCategoryDialogOpen(false)} variant="outline" className="text-black">Cancel</Button>
            <Button type="submit" className="bg-yellow-500 text-white hover:bg-yellow-600">Update</Button>
          </div>
        </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}