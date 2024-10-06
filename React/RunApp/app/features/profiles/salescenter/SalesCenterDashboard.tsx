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
  TrendingUp,
  User,
  Users,
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function SalesCenterDashboard() {
  const [activeLink, setActiveLink] = useState("Dasboard");

  const navItems = [
    { name: "Dashboard", icon: Home },
    { name: "Sales", icon: DollarSign },
    { name: "Products", icon: Package },
    { name: "Analytics", icon: BarChart },
    { name: "Orders", icon: ShoppingCart },
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
                            activeLink === item.name
                              ? "bg-yellow-500 text-black"
                              : ""
                          }`}
                          onClick={() => setActiveLink(item.name)}
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
            <h1 className="text-3xl font-bold text-black">Sales Dashboard</h1>
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
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-white border-gray-200">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium text-black">
                  Total Revenue
                </CardTitle>
                <DollarSign className="w-4 h-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$45,231.89</div>
                <p className="etxt-xs text-gray-500">+20.1% from last month</p>
              </CardContent>
            </Card>
            <Card className="bg-white border-gray-200">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium text-black">
                  Active Customer
                </CardTitle>
                <Users className="w-4 h-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-black">+2350</div>
                <p className="text-xs text-gray-500">+180.1% from last month</p>
              </CardContent>
            </Card>
            <Card className="bg-white border-gray-200">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium text-black">
                  Products Sold
                </CardTitle>
                <Package className="w-4 h-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-black">+12,234</div>
                <p className="text-xs text-gray-500">+19% from last month</p>
              </CardContent>
            </Card>
            <Card className="bg-white border-gray-200">
              <CardHeader className="flex flex-row items-cneter justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium text-black">
                  Growth Rate
                </CardTitle>
                <TrendingUp className="w-4 h-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-black">+15.3%</div>
                <p className="">+4% from last month</p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-white border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Select>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="order_id">Order ID</SelectItem>
                    <SelectItem value="customer">Customer</SelectItem>
                    <SelectItem value="product">Product</SelectItem>
                    <SelectItem value="date">Date</SelectItem>
                    <SelectItem value="amout">Amount</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Order" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="asc">Ascending</SelectItem>
                    <SelectItem value="desc">Descending</SelectItem>
                  </SelectContent>
                </Select>
                <Button className="bg-yellow-500 text-black hover:bg-yellow-600">
                  Apply
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200">
            <CardHeader>
              <CardTitle className="text-black">Recent Order</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-black">Order ID</TableHead>
                    <TableHead className="text-black">Customer</TableHead>
                    <TableHead className="text-black">Product</TableHead>
                    <TableHead className="text-black">Date</TableHead>
                    <TableHead className="text-black">Amount</TableHead>
                    <TableHead className="text-black">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">#3210</TableCell>
                    <TableCell>John Doe</TableCell>
                    <TableCell>Premium Package</TableCell>
                    <TableCell>2023-07-14</TableCell>
                    <TableCell>$299.99</TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-yellow-100 text-yellow-700 border-yellow-300 hover:bg-yellow-200"
                      >
                        Shipped
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">#3209</TableCell>
                    <TableCell>Jane Smith</TableCell>
                    <TableCell>Annual Subscription</TableCell>
                    <TableCell>2023-07-13</TableCell>
                    <TableCell>$999.00</TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-yelloe*100 text-yellow-700 border-yellow-300 hover:bg-yellow-200"
                      >
                        Processing
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">#3208</TableCell>
                    <TableCell>Bob Johnson</TableCell>
                    <TableCell>Starter Kit</TableCell>
                    <TableCell>2023-07-12</TableCell>
                    <TableCell>$149.99</TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-yellow-100 text-yellow-700 border-yellow-300 hover:bg-yellow-200"
                      >
                        Delivered
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">#3207</TableCell>
                    <TableCell>Alice Brown</TableCell>
                    <TableCell>Pro Bundle</TableCell>
                    <TableCell>2023-07-11</TableCell>
                    <TableCell>$599.99</TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-yellow-100 text-yellow-700 border-yellow-300 hover:bg-yellow-200"
                      >
                        Shipped
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">#3206</TableCell>
                    <TableCell>Charlie Wilson</TableCell>
                    <TableCell>Basic Plan</TableCell>
                    <TableCell>2023-07-10</TableCell>
                    <TableCell>$79.99</TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-yellow-100 text-yellow-700 border-yellow-300 hover:bg-yellow-200"
                      >
                        Delivered
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-black">Billing Address</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-black">
                <p>
                  <strong>John Doe</strong>
                </p>
                <p>123 Min St</p>
                <p>Apt 48</p>
                <p>New York, NY 10001</p>
                <p>United States</p>
                <p>Phone: (555) 123-4567</p>
                <Button
                  size="sm"
                  className="mt-4 bg-yellow-500 text-black hover:bg-yellow-600"
                >
                  Edit Address
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

export default SalesCenterDashboard;
