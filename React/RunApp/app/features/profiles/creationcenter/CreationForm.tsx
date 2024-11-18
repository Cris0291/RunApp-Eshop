"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Upload, Plus, X } from 'lucide-react'
import { motion } from "framer-motion"
import { useForm, SubmitHandler } from "react-hook-form"
import { ProductCreationDto } from "./contracts"

const CATEGORIES = [
  "Electronics", "Clothing", "Books", "Home & Garden", "Toys & Games",
  "Sports & Outdoors", "Beauty & Personal Care", "Automotive", "Health & Wellness"
]

export default function CreationForm() {
  const [hasPromotion, setHasPromotion] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [bulletPoints, setBulletPoints] = useState<string[]>([''])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const {register, getValues, handleSubmit, formState: {errors}, reset} = useForm<ProductCreationDto>();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

 const handleProductSubmit: SubmitHandler<ProductCreationDto> = (data) => {
    console.log(data);
  }

  const handleProductError  = () => {
    console.log(errors)
    console.log("erroros just")
  }

  const handleImageSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    // Here you would typically send the image data to your backend
    console.log("Image form submitted")
  }

  const addBulletPoint = () => {
    setBulletPoints([...bulletPoints, ''])
  }

  const removeBulletPoint = (index: number) => {
    const newBulletPoints = bulletPoints.filter((_, i) => i !== index)
    setBulletPoints(newBulletPoints)
  }

  const updateBulletPoint = (index: number, value: string) => {
    const newBulletPoints = [...bulletPoints]
    newBulletPoints[index] = value
    setBulletPoints(newBulletPoints)
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl bg-white min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full"
      >
        <Card className="border-black border-2 bg-white text-black shadow-xl">
          <CardHeader className="bg-black text-white">
            <CardTitle className="text-3xl font-bold text-center">Create New Product</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 mt-6">
            <form onSubmit={handleSubmit(handleProductSubmit, handleProductError)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="productName" className="text-black font-semibold">Product Name</Label>
                <Input 
                  id="productName"
                  type="text" 
                  placeholder="Enter product name" 
                  className="border-black focus:ring-yellow-500 focus:border-yellow-500 bg-white text-black" 
                  {...register("name", {
                    required: "Product name is required"
                  })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description" className="text-black font-semibold">Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Enter product description" 
                  className="border-black focus:ring-yellow-500 focus:border-yellow-500 bg-white text-black min-h-[100px]" 
                  {...register("description", {
                    required: "Description is required"
                  })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price" className="text-black font-semibold">Price</Label>
                <div className="relative">
                  <Input 
                    id="price" 
                    type="number" 
                    placeholder="0.00" 
                    step="0.01" 
                    min="0" 
                    className="border-black focus:ring-yellow-500 focus:border-yellow-500 bg-white text-black pl-6" 
                    {...register("price", {
                        required: "Price is required"
                    })}
                  />
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="hasPromotion" 
                  checked={hasPromotion} 
                  onCheckedChange={(checked) => setHasPromotion(checked as boolean)}
                />
                <Label htmlFor="hasPromotion" className="text-black font-semibold">
                  This product has a promotion
                </Label>
              </div>
              {hasPromotion && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="discountedPrice" className="text-black font-semibold">Discounted Price</Label>
                    <div className="relative">
                      <Input 
                        id="discountedPrice" 
                        type="number" 
                        placeholder="0.00" 
                        step="0.01" 
                        min="0" 
                        className="border-black focus:ring-yellow-500 focus:border-yellow-500 bg-white text-black pl-6"
                        {...register("priceWithDiscount", {
                            required : "Discounted price is required"
                        })} 
                      />
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="promotionalText" className="text-black font-semibold">Promotional Text</Label>
                    <Input 
                      id="promotionalText"
                      type="text" 
                      placeholder="Enter promotional text" 
                      className="border-black focus:ring-yellow-500 focus:border-yellow-500 bg-white text-black"
                      {...register("promotionalText", {
                        required: "Promotional text is required"
                      })} 
                    />
                  </div>
                </div>
              )}
              <div className="space-y-2">
                <Label className="text-black font-semibold">Categories</Label>
                <Select onValueChange={handleCategoryChange} {
                    ...register("categories", {
                        required: "categories are required"
                    })
                }>
                  <SelectTrigger className="border-black focus:ring-yellow-500 focus:border-yellow-500 bg-white text-black">
                    <SelectValue placeholder="Select categories" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedCategories.map((category) => (
                    <Badge key={category} variant="secondary" className="bg-yellow-100 text-yellow-800">
                      {category}
                      <button
                        onClick={() => handleCategoryChange(category)}
                        className="ml-1 text-yellow-800 hover:text-yellow-900"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="brand" className="text-black font-semibold">Brand</Label>
                  <Input 
                    id="brand"
                    type="text" 
                    placeholder="Enter brand" 
                    className="border-black focus:ring-yellow-500 focus:border-yellow-500 bg-white text-black"
                    {...register("characteristics", {
                        required: "Brand is required"
                    })} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type" className="text-black font-semibold">Type</Label>
                  <Input 
                    id="type" 
                    placeholder="Enter type" 
                    className="border-black focus:ring-yellow-500 focus:border-yellow-500 bg-white text-black"
                    {...register("characteristics", {
                        required: "Type is required"
                    })} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="color" className="text-black font-semibold">Color</Label>
                  <Input 
                    id="color" 
                    placeholder="Enter color" 
                    className="border-black focus:ring-yellow-500 focus:border-yellow-500 bg-white text-black"
                    {...register("characteristics", {
                        required: "Color is required"
                    })} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight" className="text-black font-semibold">Weight</Label>
                  <Input 
                    id="weight" 
                    placeholder="Enter weight" 
                    className="border-black focus:ring-yellow-500 focus:border-yellow-500 bg-white text-black"
                    {...register("characteristics", {
                        required: "Weight is required"
                    })} 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-black font-semibold">Bullet Points</Label>
                {bulletPoints.map((point, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input 
                      value={point}
                      {...register("bulletPoints", {
                        required: "Bulletpoint is required",
                        validate: (value) => value[index] === " " || "Bulletpoint cannot be an empty space",
                        onChange: (e) => updateBulletPoint(index, e.target.value)
                      })}
                      placeholder="Enter bullet point"
                      className="border-black focus:ring-yellow-500 focus:border-yellow-500 bg-white text-black"
                      
                    />
                    <Button 
                      type="button"
                      onClick={() => removeBulletPoint(index)}
                      className="bg-red-500 hover:bg-red-600 text-white p-2"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button 
                  type="button"
                  onClick={addBulletPoint}
                  className="mt-2 bg-green-500 hover:bg-green-600 text-white"
                >
                  <Plus className="mr-2 h-4 w-4" /> Add Bullet Point
                </Button>
              </div>
              <Button 
                type="submit" 
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-black text-lg font-semibold py-6 transition-all duration-300 transform hover:scale-105"
              >
                <Plus className="mr-2 h-5 w-5" /> Create Product
              </Button>
            </form>

            <div className="border-t-2 border-black pt-6">
              <form onSubmit={handleImageSubmit} className="space-y-4">
                <Label htmlFor="image" className="text-black font-semibold">Product Image</Label>
                <div className="flex items-center space-x-4">
                  <Button
                    type="button"
                    onClick={() => document.getElementById('image')?.click()}
                    className="bg-black hover:bg-gray-800 text-white"
                  >
                    <Upload className="mr-2 h-4 w-4" /> Select Image
                  </Button>
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="h-20 w-20 object-cover rounded border-2 border-black" />
                  ) : (
                    <div className="h-20 w-20 bg-gray-200 rounded flex items-center justify-center text-gray-500 border-2 border-black">
                      No Image
                    </div>
                  )}
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-black hover:bg-gray-800 text-white text-lg font-semibold py-4 transition-all duration-300"
                  disabled={!imagePreview}
                >
                  Upload Image
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}