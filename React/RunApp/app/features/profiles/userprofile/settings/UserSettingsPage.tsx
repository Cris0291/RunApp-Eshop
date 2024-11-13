"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Mail, MapPin, CreditCard, Check, Eye, EyeOff} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { UserSettingsForm } from "../sections/contracts"
import { useForm, SubmitHandler } from "react-hook-form";

export default function UserSettingsPage() {
  const [isSaved, setIsSaved] = useState(false)
  const [activeTab, setActiveTab] = useState("account");
  const [showPassword, setShowPassword] = useState(false);
  

  const {register, getValues, handleSubmit, formState: {errors}} = useForm<UserSettingsForm>({
    defaultValues: {
      email: "test@example.com",
      confirmemail: "test@example.com",
      username: "test",
      name: "test",
      password: "",
      confirmpassword: "",
      cardnumber: "",
      cardname: "",
      expirydate: "",
      cvv: "",
      address: "test St",
      city: "",
      state: "",
      zipcode: "",
      country: "",
    }
  });


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
                                 type="text" 
                                 className="border-pink-200 focus:border-pink-500"
                                 {...register("username", {
                                  required: "User name is required"
                                 })}/>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input id="name"
                                 type="text" 
                                 className="border-pink-200 focus:border-pink-500" 
                                 {...register("name", {
                                  required: "Name is required"
                                 })}/>
                        </div>
                    <div className="space-y-2">
                          <Label htmlFor="password" className="text-sm font-medium">
                            Password
                         </Label>
                      <div className="relative">
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            {...register("password", {required: "Password is required", min: {
                              value: 8,
                             message: "Password must be at least 8 characters"
                              }})}
                            placeholder="********"
                            className="pl-10 pr-10 transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                           />
                        <button
                           type="button"
                           onClick={() => setShowPassword(!showPassword)}
                           className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                           {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                           </button>
                      </div>
                    </div>
                    <div className="space-y-2">
                       <Label
                         htmlFor="confirmpassword"
                         className="text-sm font-medium"
                       >
                          Confirm Password
                       </Label>
                       <div className="relative">
                       <Input
                         id="confirmpassword"
                         type={showPassword ? "text" : "password"}
                         {...register("confirmpassword", {required: "Password is required", 
                             validate: (value) => value === getValues("password") || "Passwords do not match"
                         })}
                         placeholder="********"
                         className="pl-10 pr-10 transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                       />
                       </div>
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
                          <Input id="email" 
                                 type="email" 
                                 className="border-pink-200 focus:border-pink-500" 
                                 {...register("email", {
                                  required: "Email is required", 
                                  pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: "Email is invalid"
                                  }
                                 })}/>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirmemail">Confirm Email</Label>
                          <Input id="confirmemail" 
                                 type="email" 
                                 className="border-pink-200 focus:border-pink-500"
                                 {...register("confirmemail", {
                                  required: "Confirmation email is required",
                                  validate: (value) => value === getValues("email") || "Email and confirmation email do not match"
                                 })} />
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
                          <Label htmlFor="address">Street</Label>
                          <Input id="address" 
                                 className="border-pink-200 focus:border-pink-500" 
                                 {...register("address", {
                                  required: "Street is required"
                                 })}/>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="city">City</Label>
                            <Input id="city" 
                                   className="border-pink-200 focus:border-pink-500" 
                                   {...register("city", {
                                    required: "City is required"
                                   })}/>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="state">State</Label>
                            <Input id="state" 
                                   className="border-pink-200 focus:border-pink-500" 
                                   {...register("state", {
                                    required: "State is required"
                                   })}/>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="zipcode">ZIP Code</Label>
                          <Input id="zipcode" 
                                 className="border-pink-200 focus:border-pink-500"
                                 {...register("zipcode", {
                                    required: "Zipcode is required",
                                    pattern: {
                                      value: /^\d{5}(?:[-\s]\d{4})?$/i,
                                      message: "Zipcode is invalid"
                                    }
                                 })} />
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
                          <Input id="cardNumber" 
                                 className="border-pink-200 focus:border-pink-500"
                                 {...register("cardnumber", {
                                  required: "Card number is required"
                                 })} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="expiryDate">Expiry Date</Label>
                            <Input id="expiryDate" 
                                   className="border-pink-200 focus:border-pink-500" 
                                   {...register("expirydate", {
                                    required: "Expiry date is required"
                                   })}/>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cvv">CVV</Label>
                            <Input id="cvv" 
                                   type="password" 
                                   className="border-pink-200 focus:border-pink-500"
                                   {...register("cvv",{
                                    required: "Cvv is required"
                                   })} />
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