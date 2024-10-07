"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { EyeOff, Eye } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const toogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-purple-500 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <svg
          className="absolute left-[calc(50%-4rem)] top-10 h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%-18rem)] sm:h-[42.375rem]"
          viewBox="0 0 1155 678"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="rgba(255, 255, 255, 0.1)"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          />
        </svg>
      </div>
      <div className="w-full max-w-md p-8 space-y-6 bg-white/90 backdrop-blur-sm rounded-lg shadow-2xl relative z-10">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
          <p className="text-gray-600">
            Enter your credentials to access your account
          </p>
        </div>
        <form className="space-y-4">
          <div className="sapce-y-2">
            <Label htmlFor="email" className="text-gray-700">
              Email
            </Label>
            <Input
              id="email"
              placeholder="m@example.com"
              required
              type="email"
              className="bg-white/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-700">
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                required
                type={showPassword ? "text" : "password"}
                className="bg-white/50 pr-10"
              />
              <button
                type="button"
                onClick={toogglePasswordVisibility}
                className="absolute inset-y-0 right-0 flex items-center pr-3"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-500" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-500" />
                )}
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox id="remember" />
              <label
                className="text-sm font-medium text-gray-600 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="remenber"
              >
                Remember me
              </label>
            </div>
            <Link className="text-sm text-indifo-600 hover:underline" href="#">
              Forgot password
            </Link>
          </div>
          <Button
            className="w-full bg-indigo-600 hover:bg-indigo-700"
            type="submit"
          >
            Sign in
          </Button>
        </form>
        <div className="text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link className="text-indigo-600 hover:underline" href="#">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;