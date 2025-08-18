import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";
import useRegisterUser from "./useRegisterUser";
import { FormValues } from "./contracts";
import Spinner from "@/ui/Spinner";
import { Link } from "react-router";

function Register() {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const { mutate, isPending } = useRegisterUser();

  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submittedErrors, setSubmittedErrors] = useState<
    (string | undefined)[]
  >([]);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    mutate(data);
  };

  const onError = () => {
    const newErrors: (string | undefined)[] = [];
    const values = Object.values(errors);

    values.forEach((element) => {
      newErrors.push(element.message);
    });

    setSubmittedErrors(newErrors);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <div className="md:w-1/2 relative h-64 md:h-auto">
        <img
          src="https://images.unsplash.com/photo-1528629297340-d1d466945dc5?q=80&w=1522&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Registration background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-75"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-2xl md:text-4xl font-bold text-white text-center px-4">
            Welcome to Our Platform
          </h1>
        </div>
      </div>

      <div className="md:w-1/2 flex items-center justify-center p-4 md:p-8">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              Create an account
            </CardTitle>
            <CardDescription>Enter your details to register</CardDescription>
          </CardHeader>
          <CardContent>
            <form
              className="space-y-4"
              onSubmit={handleSubmit(onSubmit, onError)}
            >
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  Name
                </Label>
                <div className="relative">
                  <User
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <Input
                    id="name"
                    type="text"
                    {...register("name", {
                      required: "Name is required",
                      minLength: {
                        value: 4,
                        message: "Name must be at least 4 characters",
                      },
                      maxLength: {
                        value: 10,
                        message: "Name must be at least 8 characters",
                      },
                    })}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="pl-10 transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm font-medium">
                  User Name
                </Label>
                <div className="relative">
                  <User
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <Input
                    id="username"
                    type="text"
                    {...register("username", {
                      required: "User name is required",
                      minLength: {
                        value: 4,
                        message: "User name must be at least 4 characters",
                      },
                      maxLength: {
                        value: 10,
                        message: "User name must be at least 8 characters",
                      },
                    })}
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="johndoe"
                    className="pl-10 transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email
                </Label>
                <div className="relative">
                  <Mail
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <Input
                    id="email"
                    type="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Email is invalid",
                      },
                    })}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@example.com"
                    className="pl-10 transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Lock
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters",
                      },
                    })}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="********"
                    className="pl-10 pr-10 transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm" className="text-sm font-medium">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Lock
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <Input
                    id="confirm"
                    type={showConfirmPassword ? "text" : "password"}
                    {...register("confirm", {
                      required: "Password confirmation is required",
                      validate: (value) =>
                        value === getValues("password") ||
                        "Passwords do not match",
                    })}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="********"
                    className="pl-10 pr-10 transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
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
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
                disabled={isPending}
              >
                {isPending ? <Spinner /> : "Register"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="justify-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-primary hover:underline"
              >
                Log in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default Register;
