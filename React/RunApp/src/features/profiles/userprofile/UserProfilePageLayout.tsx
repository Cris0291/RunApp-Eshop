import React, { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  LogOut,
  Home,
  MapPin,
  Settings,
  ShoppingBag,
  User,
  CircleDollarSign,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import UserProfileLayoutWrapper from "./UserProfileLayoutWrapper";
import { useAuth } from "@/utils/AuhtProvider";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navItems = [
  { name: "Dashboard", icon: Home },
  { name: "Sections", icon: MapPin },
  { name: "Discounts", icon: CircleDollarSign },
  { name: "Settings", icon: ShoppingBag },
];

export default function UserProfilePageLayout() {
  const [activeLink, setActiveLink] = useState("Dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { logout } = useAuth();

  const handleActiveLink = (newLink: string) => {
    setActiveLink(newLink);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gradient-to-br from-pink-50 to-white">
      <TooltipProvider>
        <aside className="w-full md:w-16 bg-black text-white">
          <div className="flex md:flex-col h-full">
            <div className="flex items-center justify-between md:justify-center h-16 border-b border-gray-800 px-4 md:px-0">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" className="p-0 md:hidden">
                    <Menu className="w-6 h-6 text-white" />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="left"
                  className="w-[300px] sm:w-[400px] bg-black text-white"
                >
                  <nav className="flex flex-col h-full">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-bold">Menu</h2>
                      <SheetTrigger asChild>
                        <Button variant="ghost" className="p-0">
                          <X className="w-6 h-6 text-white" />
                        </Button>
                      </SheetTrigger>
                    </div>
                    <ul className="space-y-4 flex-grow">
                      {navItems.map((item) => (
                        <li key={item.name}>
                          <Button
                            className={`w-full flex items-center justify-start rounded-lg transition-colors duration-200 ${
                              activeLink === item.name
                                ? "bg-pink-600 text-white"
                                : "text-gray-400 hover:bg-gray-800 hover:text-white"
                            }`}
                            onClick={() => handleActiveLink(item.name)}
                          >
                            <item.icon className="w-5 h-5 mr-2" />
                            <span>{item.name}</span>
                          </Button>
                        </li>
                      ))}
                    </ul>
                    <Button
                      variant="ghost"
                      className="justify-start"
                      onClick={logout}
                    >
                      <LogOut className="w-5 h-5 mr-2" />
                      <span>Log out</span>
                    </Button>
                  </nav>
                </SheetContent>
              </Sheet>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="p-0">
                    <User className="w-6 h-6 text-pink-600" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onSelect={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <nav className="hidden md:block flex-1 overflow-y-auto">
              <ul className="p-1 space-y-4">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          className={`w-full flex items-center justify-center rounded-lg transition-colors duration-200 ${
                            activeLink === item.name
                              ? "bg-pink-600 text-white"
                              : "text-gray-400 hover:bg-gray-800 hover:text-white"
                          }`}
                          onClick={() => handleActiveLink(item.name)}
                        >
                          <item.icon className="w-5 h-5" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        <p>{item.name}</p>
                      </TooltipContent>
                    </Tooltip>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </aside>
      </TooltipProvider>

      <main className="flex-1 overflow-y-auto p-4 md:p-6">
        <UserProfileLayoutWrapper
          item={activeLink}
          onSetActiveLink={handleActiveLink}
        />
      </main>
    </div>
  );
}
