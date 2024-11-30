"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ShippingInfoForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prevData => ({ ...prevData, [name]: value }))
  }

  const handleCountryChange = (value: string) => {
    setFormData(prevData => ({ ...prevData, country: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Shipping Info:", formData)
    // Here you would typically send the form data to your backend
  }

  return (
    
      <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
        <CardHeader className="bg-gray-50 border-b border-gray-200">
          <CardTitle className="text-2xl font-bold text-center">Shipping Information</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-black">Full Name</Label>
              <Input
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="border-yellow-500 focus:ring-yellow-500 focus:border-yellow-500 text-black"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address" className="text-black">Address</Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="border-yellow-500 focus:ring-yellow-500 focus:border-yellow-500 text-black"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city" className="text-black">City</Label>
                <Input
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="border-yellow-500 focus:ring-yellow-500 focus:border-yellow-500 text-black"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state" className="text-black">State</Label>
                <Input
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="border-yellow-500 focus:ring-yellow-500 focus:border-yellow-500 text-black"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="zipCode" className="text-black">ZIP Code</Label>
              <Input
                id="zipCode"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleInputChange}
                className="border-yellow-500 focus:ring-yellow-500 focus:border-yellow-500 text-black"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="country" className="text-black">Country</Label>
              <Select onValueChange={handleCountryChange} value={formData.country}>
                <SelectTrigger className="border-yellow-500 focus:ring-yellow-500 focus:border-yellow-500 text-black">
                  <SelectValue placeholder="Select a country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="usa">United States</SelectItem>
                  <SelectItem value="canada">Canada</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                  <SelectItem value="australia">Australia</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
              Save Shipping Information
            </Button>
          </CardFooter>
        </form>
      </Card>
    
  )
}