"use client"

import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useAppSelector } from "../hooks/reduxHooks";
import { getUserConfirmationOfRegistration } from "../features/registration/userSlice";
import {HeaderBody} from "./HeaderBody";

function Header() {
  const isUserRegisterd = useAppSelector(getUserConfirmationOfRegistration)
 console.log(isUserRegisterd);

  return (
    <header className="bg-white shadow-sm">
      <div className="container max-auto px-4 py-4 flex flex-col items-center space-y-4 sm:flex-row sm:justify-between sm:space-y-0">
        <Link className="flex items-center justify-center" href="/">
          <ShoppingCart className="h-6 w-6 text-green-600" />
          <span className="ml-2 text-xl font-bold text-gray-800">FitStore</span>
        </Link>
        <HeaderBody isRegisterd = {true}/>
      </div>
    </header>
  );
}

export default Header;
