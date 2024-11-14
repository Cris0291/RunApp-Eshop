"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Mail, MapPin, Check, Eye, EyeOff, Lock, MapPinHouse, CreditCard } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { AccountSettingsForm, AddressSettingsForm, PaymentSettingsForm } from "../sections/contracts"
import { useForm, SubmitHandler } from "react-hook-form";

export default function UserSettingsPage() {
  const [isSaved, setIsSaved] = useState(false)
  const [activeTab, setActiveTab] = useState("account");
  const [showPassword, setShowPassword] = useState(false);
  

  const {register: accountRegister, getValues: getAccountValues, handleSubmit: handleAccountSubmit, formState: {errors: accountErrors}} = useForm<AccountSettingsForm>({
    defaultValues: {
      email: "test@example.com",
      confirmemail: "test@example.com",
      username: "test",
      name: "test",
      password: "",
      confirmpassword: "",
    }
  });
  const {register: addressRegister, handleSubmit: handleAddressSubmit, formState: {errors: addressErrors}} = useForm<AddressSettingsForm>({
    defaultValues: {
      address: "test St",
      city: "",
      state: "NYC",
      zipcode: "",
      country: "",
    }
  });
  const {register: paymentRegister, handleSubmit: handlePaymentSubmit, formState: {errors: paymentErrors}} = useForm<PaymentSettingsForm>({
    defaultValues: {
      cardnumber: "55555577777",
      cardname: "",
      expirydate: "",
      cvv: "",
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
              <TabsList className="grid w-full grid-cols-3 mb-8">
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
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <form>
                    <TabsContent value="account">
                      <CardHeader>
                        <CardTitle>Account Information</CardTitle>
                        <CardDescription>Make changes to your account here.</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="username">Username</Label>
                          <div className="relative">
                          <User
                           className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                          size={18}
                          />
                          <Input id="username"
                                 type="text" 
                                 className="pl-10 transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                                 {...accountRegister("username", {
                                  required: "User name is required"
                                 })}/>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <div className="relative">
                          <User
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            size={18}
                  />
                          <Input id="name"
                                 type="text" 
                                 className="pl-10 transition-all duration-300 focus:ring-2 focus:ring-blue-500" 
                                 {...accountRegister("name", {
                                  required: "Name is required"
                                 })}/>
                          </div>
                        </div>
                    <div className="space-y-2">
                          <Label htmlFor="password" className="text-sm font-medium">
                            Password
                         </Label>
                      <div className="relative">
                          <Lock
                           className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                           size={18}
                           />
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            {...accountRegister("password", {required: "Password is required", min: {
                              value: 8,
                             message: "Password must be at least 8 characters"
                              }})}
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
                       <Lock
                           className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                           size={18}
                           />
                       <Input
                         id="confirmpassword"
                         type={showPassword ? "text" : "password"}
                         {...accountRegister("confirmpassword", {required: "Password is required", 
                             validate: (value) => value === getAccountValues("password") || "Passwords do not match"
                         })}
                         className="pl-10 pr-10 transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                       />
                       </div>
                    </div>
                    <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <div className="relative">
                            <Mail
                              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                              size={18}
                              />
                          
                          <Input id="email" 
                                 type="email" 
                                 className="pl-10 transition-all duration-300 focus:ring-2 focus:ring-blue-500" 
                                 {...accountRegister("email", {
                                  required: "Email is required", 
                                  pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: "Email is invalid"
                                  }
                                 })}/>
                         </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirmemail">Confirm Email</Label>
                          <div className="relative">
                          <Mail
                              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                              size={18}
                              />
                          <Input id="confirmemail" 
                                 type="email" 
                                 className="pl-10 transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                                 {...accountRegister("confirmemail", {
                                  required: "Confirmation email is required",
                                  validate: (value) => value === getAccountValues("email") || "Email and confirmation email do not match"
                                 })} />
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between items-center mt-6">
                         <Button type="submit" className="bg-pink-500 hover:bg-pink-600 transition-colors">
                            Save Changes
                         </Button>
                      </CardFooter>
                    </TabsContent>
                    </form>
                    <form>
                    <TabsContent value="address">
                      <CardHeader>
                        <CardTitle>Shipping Address</CardTitle>
                        <CardDescription>Update your shipping address.</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="address">Address</Label>
                          <div className="relative">

                          <MapPinHouse
                              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                              size={18}
                              />
                          <Input id="address" 
                                 type="text"
                                 className="pl-10 transition-all duration-300 focus:ring-2 focus:ring-blue-500" 
                                 {...addressRegister("address", {
                                  required: "Address is required"
                                 })}/>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="city">City</Label>
                            <div className="relative">
                            <MapPinHouse
                              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                              size={18}
                              />
                            <Input id="city" 
                                   type="text"
                                   className="pl-10 transition-all duration-300 focus:ring-2 focus:ring-blue-500" 
                                   {...addressRegister("city", {
                                    required: "City is required"
                                   })}/>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="state">State</Label>
                            <div className="relative">
                            <MapPinHouse
                              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                              size={18}
                              />
                            <Input id="state"
                                   type="text" 
                                   className="pl-10 transition-all duration-300 focus:ring-2 focus:ring-blue-500" 
                                   {...addressRegister("state", {
                                    required: "State is required"
                                   })}/>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="zipcode">ZIP Code</Label>
                          <div className="relative">
                          <MapPinHouse
                              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                              size={18}
                              />
                          <Input id="zipcode"
                                 type="number" 
                                 className="pl-10 transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                                 {...addressRegister("zipcode", {
                                    required: "Zipcode is required",
                                    pattern: {
                                      value: /^\d{5}(?:[-\s]\d{4})?$/i,
                                      message: "Zipcode is invalid"
                                    }
                                 })} />
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between items-center mt-6">
                         <Button type="submit" className="bg-pink-500 hover:bg-pink-600 transition-colors">
                            Save Changes
                         </Button>
                      </CardFooter>
                    </TabsContent>
                    </form>
                    <form>
                    <TabsContent value="payment">
                      <CardHeader>
                        <CardTitle>Payment Method</CardTitle>
                        <CardDescription>Update your payment information.</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <div className="relative">
                          <CreditCard
                              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                              size={18}
                              />
                          <Input id="cardNumber"
                                 type="number" 
                                 className="pl-10 transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                                 {...paymentRegister("cardnumber", {
                                  required: "Card number is required"
                                 })} />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="expiryDate">Expiry Date</Label>
                            <div className="relative">
                            <CreditCard
                              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                              size={18}
                              />
                            <Input id="expiryDate"
                                   type="text" 
                                   className="pl-10 transition-all duration-300 focus:ring-2 focus:ring-blue-500" 
                                   {...paymentRegister("expirydate", {
                                    required: "Expiry date is required"
                                   })}/>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cvv">CVV</Label>
                            <div className="relative">
                            <CreditCard
                              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                              size={18}
                              />
                            <Input id="cvv"
                                   typeof="number" 
                                   type="password" 
                                   className="pl-10 transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                                   {...paymentRegister("cvv",{
                                    required: "Cvv is required"
                                   })} />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between items-center mt-6">
                         <Button type="submit" className="bg-pink-500 hover:bg-pink-600 transition-colors">
                            Save Changes
                         </Button>
                      </CardFooter>
                    </TabsContent>
                    </form>
                  </motion.div>
                </AnimatePresence>
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