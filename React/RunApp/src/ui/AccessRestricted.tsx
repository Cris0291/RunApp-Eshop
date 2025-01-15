import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Lock, UserPlus, LogIn } from "lucide-react";
import { useNavigate } from "react-router";

export default function AccessRestricted() {
  let navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-100 flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <Lock className="w-16 h-16 text-indigo-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Access Restricted
        </h1>
        <p className="text-gray-600">
          Please log in or register to access this content.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Get Access</CardTitle>
            <CardDescription>
              Choose an option to access the restricted content.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              className="w-full bg-indigo-500 hover:bg-indigo-600 text-white"
              onClick={handleLogin}
            >
              <LogIn className="mr-2 h-4 w-4" /> Login
            </Button>
            <Button
              className="w-full bg-purple-500 hover:bg-purple-600 text-white"
              onClick={handleRegister}
            >
              <UserPlus className="mr-2 h-4 w-4" /> Register
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-8 text-center text-sm text-gray-500"
      >
        <p>
          By accessing this content, you agree to our Terms of Service and
          Privacy Policy.
        </p>
      </motion.div>
    </div>
  );
}
