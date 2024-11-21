"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Upload, X, Check } from 'lucide-react'

export default function ProductImageUpload() {
  const [image, setImage] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => setImage(e.target?.result as string)
      reader.readAsDataURL(file)
    }
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragging(false)
    const file = event.dataTransfer.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => setImage(e.target?.result as string)
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveImage = () => {
    setImage(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsUploading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsUploading(false)
    setUploadSuccess(true)
    setTimeout(() => {
      setUploadSuccess(false)
      setImage(null)
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }, 3000)
  }

  return (
    <div className="container mx-auto p-4 max-w-md">
      <Card className="overflow-hidden shadow-lg">
        <CardHeader className="bg-gradient-to-r from-yellow-400 to-yellow-500">
          <CardTitle className="text-2xl font-bold text-center text-white">Upload Product Image</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="p-6">
            <motion.div 
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                isDragging ? "border-yellow-500 bg-yellow-50" : "border-gray-300 hover:border-yellow-500 hover:bg-yellow-50"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <AnimatePresence mode="wait">
                {image ? (
                  <motion.div
                    key="image"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="relative"
                  >
                    <img src={image} alt="Product preview" className="max-w-full h-auto mx-auto rounded-md" />
                    <Button
                      type="button"
                      variant="secondary"
                      size="icon"
                      className="absolute top-2 right-2 bg-white hover:bg-gray-100 text-black"
                      onClick={handleRemoveImage}
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Remove image</span>
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="upload"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Upload className="mx-auto h-16 w-16 text-yellow-500" />
                    <p className="mt-4 text-lg font-semibold text-black">Drag and drop your image here</p>
                    <p className="mt-2 text-sm text-gray-600">or</p>
                    <Label htmlFor="image-upload" className="mt-4 inline-block">
                      <Button type="button" variant="outline" className="bg-white text-yellow-500 border-yellow-500 hover:bg-yellow-50">
                        Select Image
                      </Button>
                    </Label>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
            <Input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              ref={fileInputRef}
              id="image-upload"
            />
          </CardContent>
          <CardFooter>
            <Button 
              type="submit" 
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 rounded-md transition-all duration-300 ease-in-out transform hover:scale-105"
              disabled={!image || isUploading}
            >
              {isUploading ? (
                <motion.div
                  className="flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                  Uploading...
                </motion.div>
              ) : uploadSuccess ? (
                <motion.div
                  className="flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <Check className="w-5 h-5 mr-2" />
                  Upload Successful!
                </motion.div>
              ) : (
                "Upload Image"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}