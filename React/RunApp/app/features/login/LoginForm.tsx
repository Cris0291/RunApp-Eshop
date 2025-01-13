"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EyeOff, Eye } from "lucide-react";
import Link from "next/link";
import { useActionState, useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle} from "lucide-react";
import SubmitButton from "@/app/ui/SubmitButton";
import { LoginUser } from "@/_lib/actions";

export default function LoginFrom() {
  const [showPassword, setShowPassword] = useState(false);
  const [state, loginAction] = useActionState(LoginUser, undefined);

  const submittedErrors: string[] = [];
  if(state !== undefined){
    for(const error in state){
      submittedErrors.push(error);
    }
  } 

  return (
    <form className="space-y-4" action ={loginAction}>
          <div className="sapce-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-black">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              className="bg-white/50 text-black"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium text-black">
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                className="bg-white/50 pr-10 text-black"
              />
              <button
                type="button"
                onClick={() => setShowPassword(prev => !prev)}
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
            <Link className="text-sm text-indigo-600 hover:underline" href="#">
              Forgot password
            </Link>
          </div>
          {submittedErrors.length > 0 && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    {submittedErrors.map((error, index) => (
                      <p key={index}>{error}</p>
                    ))}
                  </AlertDescription>
                </Alert>
              )}
          <SubmitButton text={"Sign in"} classStyle={"w-full bg-indigo-600 hover:bg-indigo-700"}/>
        </form>
  );
}

