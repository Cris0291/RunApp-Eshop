"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Mail, MapPin, CreditCard, Check, AlertCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { UserSettingsForm } from "../sections/contracts"
import { useForm, SubmitHandler } from "react-hook-form";

export default function UserSettingsPage() {
  const [isSaved, setIsSaved] = useState(false)
  const [activeTab, setActiveTab] = useState("account")
  const [formData, setFormData] = useState({
    email: "",
    confirmemail: "",
    username: "",
    name: "",
    password: "",
    consfirmpassword: "",
    cardnumber: "",
    cardname: "",
    expirydate: "",
    cvv: "",
    address: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
  });
  const {register, getValues, handleSubmit, formState: {errors}} = useForm<UserSettingsForm>();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target
    setFormData(prev => ({...prev, [name]: value}));
  }

  const handleSubmitForm = (event: React.FormEvent) => {
    event.preventDefault()
    // Here you would typically send the form data to your backend
    setIsSaved(true)
    setTimeout(() => setIsSaved(false), 3000) // Reset saved state after 3 seconds
  }

  const tabIcons = {
    account: <User className="w-4 h-4" />,
    email: <Mail className="w-4 h-4" />,
    address: <MapPin className="w-4 h-4" />,
    payment: <CreditCard className="w-4 h-4" />,
  }

  return (
    <>
      <div className="container mx-auto max-w-4xl">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-8 text-pink-600"
        >
          User Settings
        </motion.h1>
        <Card className="shadow-lg">
          <CardContent className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-8">
                {Object.entries(tabIcons).map(([key, icon]) => (
                  <TabsTrigger 
                    key={key} 
                    value={key}
                    className="flex items-center justify-center space-x-2 data-[state=active]:bg-pink-100 data-[state=active]:text-pink-600"
                  >
                    {icon}
                    <span className="hidden sm:inline">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
              <form onSubmit={handleSubmitForm}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <TabsContent value="account">
                      <CardHeader>
                        <CardTitle>Account Information</CardTitle>
                        <CardDescription>Make changes to your account here.</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="username">Username</Label>
                          <Input id="username" 
                                 placeholder="johndoe"
                                 value={formData.username}
                                 className="border-pink-200 focus:border-pink-500"
                                 {...register("username", {
                                  required: "user name is required"
                                 })}
                                 name="username"
                                 onChange={handleInputChange}  />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input id="name" defaultValue="John Doe" className="border-pink-200 focus:border-pink-500" />
                        </div>
                      </CardContent>
                    </TabsContent>
                    <TabsContent value="email">
                      <CardHeader>
                        <CardTitle>Email</CardTitle>
                        <CardDescription>Change your email address.</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" defaultValue="john@example.com" className="border-pink-200 focus:border-pink-500" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirmEmail">Confirm Email</Label>
                          <Input id="confirmEmail" type="email" className="border-pink-200 focus:border-pink-500" />
                        </div>
                      </CardContent>
                    </TabsContent>
                    <TabsContent value="address">
                      <CardHeader>
                        <CardTitle>Shipping Address</CardTitle>
                        <CardDescription>Update your shipping address.</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="address">Address</Label>
                          <Input id="address" defaultValue="123 Main St" className="border-pink-200 focus:border-pink-500" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="city">City</Label>
                            <Input id="city" defaultValue="Anytown" className="border-pink-200 focus:border-pink-500" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="state">State</Label>
                            <Input id="state" defaultValue="CA" className="border-pink-200 focus:border-pink-500" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="zip">ZIP Code</Label>
                          <Input id="zip" defaultValue="12345" className="border-pink-200 focus:border-pink-500" />
                        </div>
                      </CardContent>
                    </TabsContent>
                    <TabsContent value="payment">
                      <CardHeader>
                        <CardTitle>Payment Method</CardTitle>
                        <CardDescription>Update your payment information.</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input id="cardNumber" defaultValue="**** **** **** 1234" className="border-pink-200 focus:border-pink-500" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="expiryDate">Expiry Date</Label>
                            <Input id="expiryDate" defaultValue="12/24" className="border-pink-200 focus:border-pink-500" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cvv">CVV</Label>
                            <Input id="cvv" defaultValue="***" type="password" className="border-pink-200 focus:border-pink-500" />
                          </div>
                        </div>
                      </CardContent>
                    </TabsContent>
                  </motion.div>
                </AnimatePresence>
                <CardFooter className="flex justify-between items-center mt-6">
                  <Button type="submit" className="bg-pink-500 hover:bg-pink-600 transition-colors">
                    Save Changes
                  </Button>
                </CardFooter>
              </form>
            </Tabs>
          </CardContent>
        </Card>
      </div>
      <AnimatePresence>
        {isSaved && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-md flex items-center shadow-lg"
          >
            <Check className="mr-2" /> Changes saved successfully!
          </motion.div>
        )}
      </AnimatePresence>
      </>
  )
}