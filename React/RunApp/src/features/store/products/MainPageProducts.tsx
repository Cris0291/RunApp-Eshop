import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  ShoppingCart,
  Star,
} from "lucide-react";
import FilterOptionsStars from "./FilterOptionsStars";
import LikeButton from "@/ui/LikeButton";
import useAddOrRemoveLikeHook from "@/hooks/useAddOrRemoveLikeHook";
import { ProductForCard } from "./contracts";
import categoriesSet from "@/utils/categories";
import Spinner from "@/ui/Spinner";
import NoProductsFound from "@/ui/NoProductsFound";
import { Link } from "react-router";
import ProductLoadingPage from "@/ui/ProductLoadingPage";

interface Props {
  handleSelectedCategories: (categories: string[]) => void;
  handlePriceRange: (priceRange: number[]) => void;
  handleSortBy: (sortBy: string) => void;
  priceRange: number[];
  sortBy: string;
  selectedCategories: string[];
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleStarFilterChange: (star: number) => void;
  starFilters: number[];
  products: ProductForCard[] | undefined;
  error: Error | null;
  isError: boolean;
  isLoading: boolean;
}

function MainPageProducts({
  handleSelectedCategories,
  handlePriceRange,
  handleSortBy,
  priceRange,
  sortBy,
  selectedCategories,
  handleSubmit,
  handleStarFilterChange,
  starFilters,
  products,
  error,
  isError,
  isLoading,
}: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const { AddOrRemoveLikeMutation } = useAddOrRemoveLikeHook();
  const productsPerPage = 6;

  const handleLike = (liked: boolean, productId: string) => {
    AddOrRemoveLikeMutation({ liked, productId });
  };

  const indexOfLastProduct = productsPerPage * currentPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const filteredProducts = products;

  const currentProducts = filteredProducts?.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const pageNumbers: number[] = [];

  if (filteredProducts !== undefined) {
    for (
      let i = 1;
      i <= Math.ceil(filteredProducts.length / productsPerPage);
      i++
    ) {
      pageNumbers.push(i);
    }
  }

  return (
    <main className="flex-1 container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-black">Fitness Products</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-1/4">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2 text-black">
                Categories
              </h3>
              <div className="space-y-2">
                {isLoading ? (
                  <Spinner size="lg" color="secondary" />
                ) : (
                  Array.from(categoriesSet).map((category) => (
                    <label key={category} className="flex items-center">
                      <input
                        type="checkbox"
                        className="form-checkbox text-green-600"
                        checked={selectedCategories.includes(category)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            handleSelectedCategories([
                              ...selectedCategories,
                              category,
                            ]);
                          } else {
                            handleSelectedCategories(
                              selectedCategories.filter((c) => c !== category)
                            );
                          }
                        }}
                      />
                      <span className="text-gray-700 ml-2">{category}</span>
                    </label>
                  ))
                )}
              </div>
            </div>
            <div>
              {isLoading ? (
                <Spinner size="lg" color="secondary" />
              ) : (
                <>
                  <h3 className="text-lg font-semibold mb-2">Price Range</h3>
                  <Slider
                    min={0}
                    max={4000}
                    step={10}
                    value={priceRange}
                    onValueChange={(value) => {
                      handlePriceRange(value);
                    }}
                    className="my-4"
                  />
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">
                      ${priceRange[0]}
                    </span>
                    <span className="text-sm text-gray-600">
                      ${priceRange[1]}
                    </span>
                  </div>
                </>
              )}
            </div>
            <div className="flex items-center justify-between gap-2 w-full">
              {isLoading ? (
                <Spinner size="lg" color="secondary" />
              ) : (
                <FilterOptionsStars
                  handleStarFilterChange={handleStarFilterChange}
                  starFilters={starFilters}
                />
              )}
            </div>
            {isLoading ? (
              <Spinner size="lg" color="secondary" />
            ) : (
              <form onSubmit={handleSubmit}>
                <Button className="w-full bg-green-500 text-white hover:bg-green-600">
                  Search
                </Button>
              </form>
            )}
          </div>
        </aside>
        <div className="w-full lg:w-3/4">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            {isLoading ? (
              <Spinner size="sm" color="secondary" />
            ) : (
              <p className="text-gray-600">
                {filteredProducts !== undefined && !isError
                  ? `${filteredProducts.length} products found`
                  : "0 products found"}
              </p>
            )}
            {isLoading ? (
              <Spinner size="lg" color="secondary" />
            ) : (
              <Select
                value={sortBy}
                onValueChange={(value) => {
                  handleSortBy(value);
                }}
              >
                <SelectTrigger className="w-full sm:w-48 border-black">
                  <SelectValue>
                    <p className="text-black">select a filter option</p>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Options</SelectLabel>
                    <SelectItem value="SimpleOrder">Default</SelectItem>
                    <SelectItem value="PriceAscendingOrder">
                      Price: Low to High
                    </SelectItem>
                    <SelectItem value="PriceDescendingOrder">
                      Price: High to Low
                    </SelectItem>
                    <SelectItem value="AverageRatingAscendingOrder">
                      Rating: Low to High
                    </SelectItem>
                    <SelectItem value="AverageRatingDescendingOrder">
                      Rating: High to Low
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          </div>
          {isLoading ? (
            <ProductLoadingPage />
          ) : currentProducts !== undefined && !isError ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {currentProducts.map((product) => (
                <div
                  key={product.productId}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                >
                  <img
                    alt={product.name}
                    className="object-cover w-full h-48"
                    height="200"
                    style={{
                      aspectRatio: "200/200",
                      objectFit: "cover",
                    }}
                    width="200"
                    src={product.mainImage || "/placeholder.svg"}
                  />
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-lg font-semibold mb-1 text-gray-500">
                        {product.name.slice(0, 20)}
                      </h3>
                      <LikeButton
                        initialLiked={
                          product.userLike !== null ? product.userLike : false
                        }
                        onLikeChange={(like) =>
                          handleLike(like, product.productId)
                        }
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-500 mb-2">
                        {product.categoryNames[0]}
                      </p>
                      <div className="flex items-center gap-1 ">
                        <span className="ml-1 text-sm text-gray-600">
                          {product.numberOflikes}
                        </span>
                        <Heart className="w-5 h-5 fill-current text-red-500" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      {product.priceWithDiscount === null ? (
                        <span className="text-xl font-bold text-green-600">
                          ${product.actualPrice.toFixed(2)}
                        </span>
                      ) : (
                        <div className="flex gap-2">
                          <span className="text-yellow-500 text-lg line-through">
                            ${product.actualPrice.toFixed(2)}
                          </span>
                          <span className="font-semibold text-red-500 text-lg">
                            ${product.priceWithDiscount}
                          </span>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <span className="ml-1 text-sm text-gray-600">
                          {product.averageRatings}
                        </span>
                        <Star className="w-5 h-5 fill-current text-yellow-500" />
                      </div>
                    </div>
                    <Button
                      className="w-full bg-green-600 hover:bg-green-700 text-white"
                      asChild
                    >
                      <Link to={`${product.productId}`}>
                        Buy
                        <ShoppingCart className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <NoProductsFound />
          )}
          <div className="mt-8 flex justify-center">
            {isLoading ? (
              <Spinner size="sm" color="secondary" />
            ) : currentProducts !== undefined && !isError ? (
              <nav className="inline-flex rounded-md flex-wrap justify-center">
                <Button
                  variant="outline"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="rounded-l-md border-black text-black"
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
                {pageNumbers.map((number) => (
                  <Button
                    key={number}
                    variant={currentPage === number ? "default" : "outline"}
                    onClick={() => setCurrentPage(number)}
                    className={`${
                      currentPage !== number ? "border-black text-black" : ""
                    } hidden sm:inline-flex`}
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
                  className="rounded-r-md border-black text-black"
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </nav>
            ) : null}
          </div>
        </div>
      </div>
    </main>
  );
}

export default MainPageProducts;
