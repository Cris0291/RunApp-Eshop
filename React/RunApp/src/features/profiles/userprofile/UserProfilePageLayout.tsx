"use client";

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
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import UserProfileLayoutWrapper from "./UserProfileLayoutWrapper";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { clearUser } from "../../registration/userSlice";
import { useNavigate } from "react-router";

const navItems = [
  { name: "Dashboard", icon: Home },
  { name: "Sections", icon: MapPin },
  { name: "Discounts", icon: CircleDollarSign },
  { name: "Settings", icon: ShoppingBag },
];

export default function UserProfilePageLayout() {
  const [activeLink, setActiveLink] = useState("Dashboard");
  const dispatch = useAppDispatch();
  let navigate = useNavigate();

  const handleActiveLink = (newLink: string) => {
    setActiveLink(newLink);
  };

  const logoutUser = () => {
    dispatch(clearUser());
    navigate("/login");
  };

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
                    <LogOut className="mr-2 h-4 w-4" />
                    <Button onClick={logoutUser}>Log out</Button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <nav className="flex-1 overflow-y-auto">
              <ul className="p-1 space-y-2">
                {navItems.map((item) =>
                  item.name !== "Settings" ? (
                    <li key={item.name}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            className={`flex items-center justify-center rounded-lg transition-colors duration-200 ${
                              activeLink === item.name
                                ? "bg-pink-600 text-white"
                                : "text-gray-400 hover:bg-gray-800 hover:text-white"
                            }`}
                            onClick={() => setActiveLink(item.name)}
                          >
                            <item.icon className="w-5 h-5" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                          <p>{item.name}</p>
                        </TooltipContent>
                      </Tooltip>
                    </li>
                  ) : (
                    ""
                  )
                )}
              </ul>
            </nav>
            <div className="p-1 space-y-2 border-t border-gray-800">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    className={`flex items-center justify-center rounded-lg transition-colors duration-200 ${
                      activeLink === "Settings"
                        ? "bg-pink-600 text-white"
                        : "text-gray-400 hover:bg-gray-800 hover:text-white"
                    }`}
                    onClick={() => setActiveLink("Settings")}
                  >
                    <Settings className="w-5 h-5" />
                  </Button>
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
        <UserProfileLayoutWrapper
          item={activeLink}
          onSetActiveLink={handleActiveLink}
        />
      </main>
    </div>
  );
}
