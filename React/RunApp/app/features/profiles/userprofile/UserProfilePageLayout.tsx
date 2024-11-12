"use client"

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
    Star,
    User,
    CircleDollarSign
  } from "lucide-react";
  import Link from "next/link";
import { usePathname,useRouter } from "next/navigation";
import { useState } from "react";


const navItems = [
    { name: "Dashboard", icon: Home, path: "/userprofile/home" },
    { name: "Sapp Sections", icon: MapPin, path: "/userprofile/sections"},
    { name: "Discounts", icon:  CircleDollarSign, path: "/userprofile/discounts" },
    { name: "Purchased", icon: ShoppingBag, path: "" },
  ];

export default function UserProfilePageLayout({children}: {children: React.ReactNode}){
    const pathname = usePathname();
    const router = useRouter();
    const [activeLink, setActiveLink] = useState(() => {
        const firstItem = navItems.find(x => x.path === pathname)
        return firstItem?.name

    });
    



    return (
        <div className="flex h-screen bg-gradient-to-br from-pink-50 to-white">
          <TooltipProvider>
            <aside className="w-16 bg-black text-white">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-center h-16 border-b border-gray-800">
                <DropdownMenu>
                <DropdownMenuTrigger asChild>
                   <User className="w-6 h-6 text-pink-600" />
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
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
                </div>
                <nav className="flex-1 overflow-y-auto">
                  <ul className="p-2 space-y-2">
                    {navItems.map((item) => (
                      <li key={item.name}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Link
                              href={item.path}
                              className={`flex items-center justify-center p-2 rounded-lg transition-colors duration-200 ${
                                activeLink === item.name
                                  ? "bg-pink-600 text-white"
                                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
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
                        className="flex items-center justify-center text-gray-400 hover:text-white transition-colors duration-200"
                        href="/userprofile/settings"
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
    
          <main className="flex-1 overflow-y-auto p-6">
            {children}
          </main>
        </div>
      );
    }
