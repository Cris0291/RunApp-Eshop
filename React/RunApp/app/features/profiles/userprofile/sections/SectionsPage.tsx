"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { 
    ShoppingCart, 
    Users, 
    BarChart2, 
    Settings, 
    Bell, 
    MessageCircle, 
    HelpCircle, 
    FileText, 
    CreditCard,
    ChevronRight
  } from "lucide-react"
import { useState } from "react"

interface AppSection {
    title: string
    description: string
    icon: React.ReactNode
  }
  
  const appSections: AppSection[] = [
    {
      title: "Products",
      description: "Manage your product catalog and inventory",
      icon: <ShoppingCart className="h-8 w-8 text-pink-500" />,
    },
    {
      title: "Customers",
      description: "View and manage customer information and interactions",
      icon: <Users className="h-8 w-8 text-pink-600" />,
    },
    {
      title: "Analytics",
      description: "Track and analyze your business performance metrics",
      icon: <BarChart2 className="h-8 w-8 text-pink-500" />,
    },
    {
      title: "Settings",
      description: "Configure your app preferences and system settings",
      icon: <Settings className="h-8 w-8 text-pink-600" />,
    },
    {
      title: "Notifications",
      description: "Manage your alerts, messages, and communication preferences",
      icon: <Bell className="h-8 w-8 text-pink-500" />,
    },
    {
      title: "Support",
      description: "Get help, contact our team, and access resources",
      icon: <MessageCircle className="h-8 w-8 text-pink-600" />,
    },
    {
      title: "FAQ",
      description: "Find answers to common questions and troubleshooting guides",
      icon: <HelpCircle className="h-8 w-8 text-pink-500" />,
    },
    {
      title: "Reports",
      description: "Generate, view, and export comprehensive business reports",
      icon: <FileText className="h-8 w-8 text-pink-600" />,
    },
    {
      title: "Billing",
      description: "Manage your subscriptions, payments, and billing information",
      icon: <CreditCard className="h-8 w-8 text-pink-500" />,
    },
  ]

export default function SectionPage(){
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

   return (
    <div className="min-h-screen  bg-gradient-to-br from-white to-pink-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
            <h1 className="text-5xl font-extrabold text-center mb-4 text-black">App Sections</h1>
            <p className="text-xl text-center mb-12 text-gray-600">Explore and manage different areas of your application</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {appSections.map((section, index) => (
                    <motion.div key={index}
                                initial={{opacity: 0, y: 20}}
                                animate={{opacity: 1, y: 0}}
                                transition={{duration: 0.3, delay: index * 0.1}}>
                        <Card className="bg-white shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-pink-100 overflow-hidden group"
                               onMouseEnter={() => setHoveredIndex(index)}
                               onMouseLeave={() => setHoveredIndex(null)}>
                           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-pink-50 to-white">
                            <CardTitle className="text-2xl font-bold text-black group-hover:text-pink-600 transition-colors duration-300">
                              {section.title}
                            </CardTitle>
                            <div className="p-2 bg-white rounded-full shadow-md group-hover:shadow-lg transition-all duration-300">
                              {section.icon}
                            </div>
                           </CardHeader>
                           <CardContent className="pt-4">
                            <p className="text-sm text-gray-600 mb-6 h-12 overflow-hidden">{section.description}</p>
                            <Button className="w-full bg-gradient-to-r from-pink-400 to-pink-600 text-white hover:from-pink-500 hover:to-pink-700 transition-all duration-300 shadow-md hover:shadow-lg group-hover:translate-y-[2px]">
                               Go to {section.title}
                               <ChevronRight className={`ml-2 h-4 w-4 transition-transform duration-300 ${hoveredIndex === index ? "translate-x-1": ""}`}/>
                            </Button>
                           </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    </div>
   )
}