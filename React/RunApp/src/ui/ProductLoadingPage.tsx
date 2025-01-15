import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function ProductLoadingPage() {
  // Number of skeleton cards to display
  const skeletonCount = 8;

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Loading Products...
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(skeletonCount)].map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-md p-4 h-64"
            >
              <div className="animate-pulse flex flex-col h-full">
                <div className="bg-gray-300 h-40 rounded-md mb-4"></div>
                <div className="bg-gray-300 h-4 w-3/4 rounded mb-2"></div>
                <div className="bg-gray-300 h-4 w-1/2 rounded mb-2"></div>
                <div className="bg-gray-300 h-4 w-1/4 rounded"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
      <div className="flex justify-center mt-8">
        <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
      </div>
      <p className="text-center text-gray-600 mt-4">
        Please wait while we load the products...
      </p>
    </div>
  );
}
