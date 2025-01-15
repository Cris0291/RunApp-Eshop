import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ErrorFallback({ error }: { error: Error }) {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      scale: [1, 1.1, 1],
      transition: { duration: 2, repeat: Infinity, repeatType: "reverse" },
    });
  }, [controls]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.div animate={controls}>
            <AlertTriangle className="w-24 h-24 text-yellow-500 mx-auto mb-6" />
          </motion.div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Oops! Something went wrong
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            {error.message || "An unexpected error has occurred."}
          </p>
          <div className="space-y-4">
            <Button
              onClick={() => window.location.replace("/")}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-lg py-2 px-6 rounded-lg transition-colors duration-300"
            >
              <Home className="w-5 h-5 mr-2" />
              Go to Home Page
            </Button>
            <Button
              onClick={() => window.location.reload()}
              className="w-full bg-gray-700 hover:bg-gray-600 text-white text-lg py-2 px-6 rounded-lg transition-colors duration-300"
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              Refresh Page
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
