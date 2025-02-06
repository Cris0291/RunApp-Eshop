import React, { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import {
  DollarSign,
  Home,
  LogOut,
  Package,
  ShoppingCart,
  User,
  Menu,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router";
import { useAuth } from "@/utils/AuhtProvider";
import { useGlobal } from "@/utils/GlobalProvider";
import CreationProductsWrapper from "./CreationProductsWrapper";
import { ProductCreated, ProductResponseDto } from "./contracts";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const defaultEmptyProduct: ProductResponseDto | ProductCreated = {
  productId: "",
  name: "",
  description: "",
  price: 0,
  bulletPoints: [""],
  priceWithDiscount: null,
  promotionalText: null,
  categories: [],
  brand: "",
  color: "",
  weight: 0,
  type: "",
};

function CreationCenterDashboard() {
  const { logout } = useAuth();
  const [activeLink, setActiveLink] = useState<string>("Dashboard");
  const [productResponse, setProductResponse] = useState<
    ProductResponseDto | ProductCreated
  >(defaultEmptyProduct);
  const { searchQuery, setSearchQuery } = useGlobal();
  const navigate = useNavigate();

  const onHandleCurrentProduct = (link: string, product: ProductCreated) => {
    setProductResponse(product);
    if (link !== activeLink) setActiveLink(link);
  };

  const onHandleAddAnImage = (product: ProductResponseDto) => {
    setProductResponse(product);
  };

  const onHandleAddLink = (link: string) => {
    if (link !== activeLink) setActiveLink(link);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/products");
  };

  const navItems = [
    { name: "Dashboard", icon: Home },
    { name: "Images", icon: DollarSign },
    { name: "Products", icon: Package },
  ];

  const NavContent = ({ isMobile = false }) => (
    <nav className="flex-1">
      <ul className="space-y-2">
        {navItems.map((item) => (
          <li key={item.name}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  className={`w-full justify-start ${
                    activeLink === item.name
                      ? "bg-yellow-500 text-black"
                      : "text-white hover:bg-gray-800"
                  }`}
                  onClick={() => {
                    setActiveLink(item.name);
                    if (isMobile) {
                      const sheetCloseButton = document.querySelector(
                        "[data-radix-collection-item]"
                      );
                      if (sheetCloseButton instanceof HTMLElement) {
                        sheetCloseButton.click();
                      }
                    }
                  }}
                >
                  <item.icon className="w-4 h-4 mr-2" />
                  <span className={isMobile ? "" : "hidden lg:inline-block"}>
                    {item.name}
                  </span>
                </Button>
              </TooltipTrigger>
              {!isMobile && (
                <TooltipContent side="right">
                  <p>{item.name}</p>
                </TooltipContent>
              )}
            </Tooltip>
          </li>
        ))}
      </ul>
    </nav>
  );

  return (
    <TooltipProvider>
      <div className="flex h-screen bg-white">
        <aside className="hidden md:flex flex-col w-16 lg:w-48 bg-black text-white">
          <div className="flex items-center justify-center h-16 border-b border-gray-800">
            <ShoppingCart className="w-6 h-6" />
          </div>
          <NavContent />
          <div className="p-4 border-t border-gray-800">
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  to="/userprofile"
                  className="flex items-center justify-center hover:text-yellow-500"
                >
                  <User className="w-5 h-5" />
                  <span className="hidden lg:inline-block ml-2">
                    User Center
                  </span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>User Center</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </aside>
        <div className="flex flex-col flex-1 overflow-hidden">
          <header className="bg-black text-white p-4 flex justify-between items-center">
            <div className="flex items-center">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" className="md:hidden mr-2">
                    <Menu className="w-6 h-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="left"
                  className="w-64 p-0 bg-black text-white"
                >
                  <div className="flex flex-col h-full">
                    <div className="flex items-center justify-center h-16 border-b border-gray-800">
                      <ShoppingCart className="w-6 h-6" />
                    </div>
                    <NavContent isMobile={true} />
                    <div className="p-4 border-t border-gray-800">
                      <Link
                        to="/userprofile"
                        className="flex items-center justify-center hover:text-yellow-500"
                      >
                        <User className="w-5 h-5 mr-2" />
                        <span>User Center</span>
                      </Link>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
              <h1 className="text-xl font-bold">Creation Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <form onSubmit={handleSubmit} className="hidden sm:block">
                <Input
                  className="w-48 md:w-64 bg-white border-gray-300 text-black"
                  placeholder="Search..."
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </form>
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
                    <LogOut className="mr-2 h-4 w-4" />
                    <Button onClick={logout}>Log Out</Button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          <main className="flex-1 overflow-y-auto p-4">
            <div className="container mx-auto space-y-6">
              <form onSubmit={handleSubmit} className="sm:hidden mb-4">
                <Input
                  className="w-full bg-white border-gray-300 text-black"
                  placeholder="Search..."
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </form>
              <CreationProductsWrapper
                item={activeLink}
                onHandleCurrentProduct={onHandleCurrentProduct}
                product={productResponse}
                onHandleAddAnImage={onHandleAddAnImage}
                onHandleAddLink={onHandleAddLink}
              />
            </div>
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
}

export default CreationCenterDashboard;
