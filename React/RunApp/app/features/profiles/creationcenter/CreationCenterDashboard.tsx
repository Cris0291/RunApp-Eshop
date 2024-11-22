"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import {
  BarChart,
  DollarSign,
  Home,
  LogOut,
  Package,
  Settings,
  ShoppingCart,
  User,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import CreationForm from "./CreationForm";
import ProductImageUpload from "./ProductImageUpload";
import ProductManagementTable from "./ProductManagementTable";

function SalesCenterDashboard() {
  const [activeLink, setActiveLink] = useState<{name: string, component: React.FC}>({name: "Dasboard", component: CreationForm});

  const navItems = [
    { name: "Dashboard", icon: Home, component:  CreationForm},
    { name: "Sales", icon: DollarSign, component: ProductImageUpload},
    { name: "Products", icon: Package, component: ProductManagementTable},
    { name: "Analytics", icon: BarChart, component: ProductImageUpload},
    { name: "Orders", icon: ShoppingCart, component: ProductImageUpload},
  ];

  return (
    <div className="flex h-screen bg-white">
      <TooltipProvider>
        <aside className="w-16 bg-black text-white">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-center h-16 border-b border-gray-800">
              <ShoppingCart className="w-6 h-6" />
            </div>
            <nav className="flex-1 overflow-y-auto">
              <ul className="p-2 space-y-2">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link
                          href="#"
                          className={`flex items-center justify-center p-2 rounded hover:bg-gray-800 ${
                            activeLink.name === item.name
                              ? "bg-yellow-500 text-black"
                              : ""
                          }`}
                          onClick={() => setActiveLink({name: item.name, component: item.component})}
                        >
                          <item.icon className="w-5 h-5" />
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        <p>{item.name}</p>
                      </TooltipContent>
                    </Tooltip>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="p-4 border-t border-gray-800">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href="#"
                    className="flex items-center justify-center hover:text-yellow-500"
                  >
                    <Settings className="w-5 h-5" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Settings</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </aside>
      </TooltipProvider>
      <main className="flex-1 overflow-y-auto p-4">
        <div className="container mx-auto space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-black">Creation Dashboard</h1>
            <div className="flex items-center space-x-4">
              <Input
                className="w-64 bg-white border-gray-300"
                placeholder="Search..."
                type="search"
              />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage src="" alt="user" />
                    <AvatarFallback>US</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-2 w-4" />
                    <span>Log Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <activeLink.component/>
        </div>
      </main>
    </div>
  );
}

export default SalesCenterDashboard;
