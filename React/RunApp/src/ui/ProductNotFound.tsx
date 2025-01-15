import { useState } from "react";
import { motion } from "framer-motion";
import { Search, ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDispatch } from "react-redux";
import { setSearch } from "../features/store/products/productsQuerySlice";
import { useNavigate } from "react-router";
export default function ProductNotFound() {
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      setSearch({
        sortBy: "",
        search: searchQuery,
        categories: [],
        priceRange: [],
        starFilters: [],
      })
    );
    navigate("/products");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Oops! Product Not Found
        </h1>
        <p className="text-xl text-gray-600">
          We couldn't find the product you're looking for.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-full max-w-md"
      >
        <form onSubmit={handleSearch} className="flex gap-2 mb-6">
          <Input
            type="text"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-grow text-black"
          />
          <Button type="submit">
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </form>

        <div className="flex justify-center space-x-4">
          <Button
            variant="outline"
            onClick={() => navigate("/products")}
            className="text-black"
          >
            <ArrowLeft className="h-4 w-4 mr-2 text-black" />
            Go Back
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate("/")}
            className="text-black"
          >
            <Home className="h-4 w-4 mr-2 text-black" />
            Home Page
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
