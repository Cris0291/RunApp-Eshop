"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { SelectValue } from "@radix-ui/react-select";
import { ChevronLeft, ChevronRight, ShoppingCart, Star } from "lucide-react";
import { useState } from "react";

const products = [
  {
    id: 1,
    name: "Premium Yoga Mat",
    price: 49.99,
    category: "Yoga",
    rating: 4.5,
  },
  {
    id: 2,
    name: "Adjustable Dumbbell Set",
    price: 299.99,
    category: "Weights",
    rating: 4.8,
  },
  {
    id: 3,
    name: "Resistance Bands Pack",
    price: 29.99,
    category: "Strength Training",
    rating: 4.2,
  },
  {
    id: 4,
    name: "Smart Fitness Watch",
    price: 199.99,
    category: "Electronics",
    rating: 4.7,
  },
  {
    id: 5,
    name: "Foam Roller",
    price: 34.99,
    category: "Recovery",
    rating: 4.4,
  },
  {
    id: 6,
    name: "Protein Powder (2lbs)",
    price: 59.99,
    category: "Nutrition",
    rating: 4.6,
  },
  { id: 7, name: "Jump Rope", price: 19.99, category: "Cardio", rating: 4.3 },
  {
    id: 8,
    name: "Workout Gloves",
    price: 24.99,
    category: "Accessories",
    rating: 4.1,
  },
  { id: 9, name: "Kettlebell", price: 44.99, category: "Weights", rating: 4.5 },
  {
    id: 10,
    name: "Gym Bag",
    price: 39.99,
    category: "Accessories",
    rating: 4.2,
  },
  {
    id: 11,
    name: "Yoga Block Set",
    price: 19.99,
    category: "Yoga",
    rating: 4.3,
  },
  {
    id: 12,
    name: "Resistance Tubes",
    price: 24.99,
    category: "Strength Training",
    rating: 4.0,
  },
];

function MainPageProducts() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number[]>([0, 300]);
  const [sortBy, setSortBy] = useState("featured");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  const filteredProducts = products
    .filter(
      (product) =>
        (selectedCategories.length === 0 ||
          selectedCategories.includes(product.category)) &&
        product.price >= priceRange[0] &&
        product.price <= priceRange[1]
    )
    .sort((a, b) => {
      if (sortBy === "priceLowToHigh") return a.price - b.price;
      if (sortBy === "priceHighToLow") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });

  const indexOfLastProduct = currentPage * productsPerPage;
  const indextOfFistProduct = indexOfLastProduct - productsPerPage;
  const currentproducts = filteredProducts.slice(
    indextOfFistProduct,
    indexOfLastProduct
  );

  const pageNumbers: number[] = [];

  for (
    let i = 1;
    i <= Math.ceil(filteredProducts.length / productsPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  return (
    <main className="flex-1 container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Fitness Products</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-1/4">
          <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Categories</h3>
              <div className="space-y-2">
                {Array.from(new Set(products.map((p) => p.category))).map(
                  (category) => (
                    <label key={category} className="flex items-center">
                      <input
                        type="checkbox"
                        className="form-checkbox text-green-600"
                        checked={selectedCategories.includes(category)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedCategories([
                              ...selectedCategories,
                              category,
                            ]);
                          } else {
                            setSelectedCategories(
                              selectedCategories.filter((c) => c !== category)
                            );
                          }
                        }}
                      />
                      <span className="text-gray-700 ml-2">{category}</span>
                    </label>
                  )
                )}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Price Range</h3>
              <Slider
                min={0}
                max={300}
                step={10}
                value={priceRange}
                onValueChange={setPriceRange}
                className="my-4"
              />
              <div className="flex justify-between">
                <span className="txt-sm text-gray-600">${priceRange[0]}</span>
                <span className="text-sm text-gray-600">${priceRange[1]}</span>
              </div>
            </div>
          </div>
        </aside>
        <div className="w-full md:w-3/4">
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">
              {filteredProducts.length} products found
            </p>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="select a filter option" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Options</SelectLabel>
                  <SelectItem value="fetured">Featured</SelectItem>
                  <SelectItem value="priceLowToHigh">
                    Price: Low to High
                  </SelectItem>
                  <SelectItem value="priceHighToLow">
                    Price: High to Low
                  </SelectItem>
                  <SelectItem value="rating">Top Rated</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentproducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                <img
                  alt={product.name}
                  className="objext-cover w-full h-48"
                  height="200"
                  style={{
                    aspectRatio: "200/200",
                    objectFit: "cover",
                  }}
                  width="200"
                  src="https://images.unsplash.com/photo-1594534475808-b18fc33b045e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
                  <p className="text-sm text-gray-500 mb-2">
                    {product.category}
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xl font-bold text-green-600">
                      ${product.price.toFixed(2)}
                    </span>
                    <div className="flex items-center">
                      <Star className="w-5 h-5 fill-current text-yellow-500" />
                      <span className="ml-1 text-sm text-gray-600">
                        {product.price.toFixed(1)}
                      </span>
                    </div>
                  </div>
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                    Add to Cart
                    <ShoppingCart className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <nav className="inline-flex rounded-m">
              <Button
                variant="outline"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="rounded-l-md"
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>
              {pageNumbers.map((number) => (
                <Button
                  key={number}
                  variant={currentPage === number ? "default" : "outline"}
                >
                  {number}
                </Button>
              ))}
              <Button
                variant="outline"
                onClick={() =>
                  setCurrentPage((prev) =>
                    Math.min(prev + 1, pageNumbers.length)
                  )
                }
                disabled={currentPage === pageNumbers.length}
                className="rounded-l-md"
              >
                Next
                <ChevronRight className="H-4 W-4 ML-2" />
              </Button>
            </nav>
          </div>
        </div>
      </div>
    </main>
  );
}

export default MainPageProducts;
