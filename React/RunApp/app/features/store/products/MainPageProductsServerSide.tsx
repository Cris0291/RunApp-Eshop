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
import { ChevronLeft, ChevronRight, Heart, ShoppingCart, Star } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import FilterOptionsStars from "./FilterOptionsStars";
import LikeButton from "@/app/ui/LikeButton";
import useAddOrRemoveLikeHook from "@/app/hooks/useAddOrRemoveLikeHook"
import { ProductForCard } from "./contracts";
import categoriesSet from "@/app/utils/categories";
import Spinner from "@/app/ui/Spinner";
import NoProductsFound from "@/app/ui/NoProductsFound";

interface Props {
  handleSelectedCategories: (categories: string[]) => void,
  handlePriceRange: (priceRange: number[]) => void,
  handleSortBy: (sortBy: string) => void,
  priceRange: number[],
  sortBy: string ,
  selectedCategories: string[],
  handleSubmit: (e : React.FormEvent<HTMLFormElement>) => void,
  handleStarFilterChange: (star: number) => void,
  starFilters: number[],
  products1: ProductForCard[] | undefined,
  error: Error | null,
  isError: boolean,
  isLoading: boolean
}

const products : ProductForCard[] | undefined = [
  {
    productId: "1",
    name: "Premium Yoga Mat",
    actualPrice: 49.99,
    categoryNames: ["Yoga"],
    averageRating: 4.5,
    mainImage: "https://images.unsplash.com/photo-1594534475808-b18fc33b045e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    priceWithDiscount: 200.5,
    promotionalText: "Just a test",
    discount: 20,
    numberOfLikes: 10,
    numberOfReviews: 5,
    userLike: true,
  },
  {
    productId: "2",
    name: "b",
    actualPrice: 49.99,
    categoryNames: ["Yoga"],
    averageRating: 4.5,
    mainImage: "https://images.unsplash.com/photo-1594534475808-b18fc33b045e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    priceWithDiscount: 200.5,
    promotionalText: "Just a test",
    discount: 20,
    numberOfLikes: 10,
    numberOfReviews: 5,
    userLike: true,
  },
  {
    productId: "3",
    name: "c",
    actualPrice: 49.99,
    categoryNames: ["Yoga"],
    averageRating: 4.5,
    mainImage: "https://images.unsplash.com/photo-1594534475808-b18fc33b045e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    priceWithDiscount: 200.5,
    promotionalText: "Just a test",
    discount: 20,
    numberOfLikes: 10,
    numberOfReviews: 5,
    userLike: true,
  },
  {
    productId: "4",
    name: "d",
    actualPrice: 49.99,
    categoryNames: ["Yoga"],
    averageRating: 4.5,
    mainImage: "https://images.unsplash.com/photo-1594534475808-b18fc33b045e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    priceWithDiscount: 200.5,
    promotionalText: "Just a test",
    discount: 20,
    numberOfLikes: 10,
    numberOfReviews: 5,
    userLike: true,
  },
  {
    productId: "5",
    name: "e",
    actualPrice: 49.99,
    categoryNames: ["Yoga"],
    averageRating: 4.5,
    mainImage: "https://images.unsplash.com/photo-1594534475808-b18fc33b045e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    priceWithDiscount: 200.5,
    promotionalText: "Just a test",
    discount: 20,
    numberOfLikes: 10,
    numberOfReviews: 5,
    userLike: true,
  },
  {
    productId: "6",
    name: "f",
    actualPrice: 49.99,
    categoryNames: ["Yoga"],
    averageRating: 4.5,
    mainImage: "https://images.unsplash.com/photo-1594534475808-b18fc33b045e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    priceWithDiscount: 200.5,
    promotionalText: "Just a test",
    discount: 20,
    numberOfLikes: 10,
    numberOfReviews: 5,
    userLike: true,
  },
  {
    productId: "7",
    name: "gg",
    actualPrice: 49.99,
    categoryNames: ["Yoga"],
    averageRating: 4.5,
    mainImage: "https://images.unsplash.com/photo-1594534475808-b18fc33b045e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    priceWithDiscount: 200.5,
    promotionalText: "Just a test",
    discount: 20,
    numberOfLikes: 10,
    numberOfReviews: 5,
    userLike: true,
  },
  {
    productId: "8",
    name: "h",
    actualPrice: 49.99,
    categoryNames: ["Yoga"],
    averageRating: 4.5,
    mainImage: "https://images.unsplash.com/photo-1594534475808-b18fc33b045e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    priceWithDiscount: 200.5,
    promotionalText: "Just a test",
    discount: 20,
    numberOfLikes: 10,
    numberOfReviews: 5,
    userLike: true,
  },
  {
    productId: "9",
    name: "i",
    actualPrice: 49.99,
    categoryNames: ["Yoga"],
    averageRating: 4.5,
    mainImage: "https://images.unsplash.com/photo-1594534475808-b18fc33b045e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    priceWithDiscount: 200.5,
    promotionalText: "Just a test",
    discount: 20,
    numberOfLikes: 10,
    numberOfReviews: 5,
    userLike: true,
  },
  {
    productId: "10",
    name: "j",
    actualPrice: 49.99,
    categoryNames: ["Yoga"],
    averageRating: 4.5,
    mainImage: "https://images.unsplash.com/photo-1594534475808-b18fc33b045e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    priceWithDiscount: 200.5,
    promotionalText: "Just a test",
    discount: 20,
    numberOfLikes: 10,
    numberOfReviews: 5,
    userLike: true,
  },
  {
    productId: "11",
    name: "k",
    actualPrice: 49.99,
    categoryNames: ["Yoga"],
    averageRating: 4.5,
    mainImage: "https://images.unsplash.com/photo-1594534475808-b18fc33b045e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    priceWithDiscount: 200.5,
    promotionalText: "Just a test",
    discount: 20,
    numberOfLikes: 10,
    numberOfReviews: 5,
    userLike: true,
  },
  {
    productId: "12",
    name: "l",
    actualPrice: 49.99,
    categoryNames: ["Yoga"],
    averageRating: 4.5,
    mainImage: "https://images.unsplash.com/photo-1594534475808-b18fc33b045e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    priceWithDiscount: 200.5,
    promotionalText: "Just a test",
    discount: 20,
    numberOfLikes: 10,
    numberOfReviews: 5,
    userLike: true,
  },
];

function MainPageProductsServerSide({handleSelectedCategories, handlePriceRange, handleSortBy, priceRange, sortBy, selectedCategories, handleSubmit, handleStarFilterChange, starFilters, products1, error, isError, isLoading} : Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const {AddOrRemoveLikeMutation} = useAddOrRemoveLikeHook();
  const productsPerPage = 6;

  const handleLike = (liked: boolean, productId: string) => {
    AddOrRemoveLikeMutation({liked, productId});
  }

  const indexOfLastProduct = productsPerPage * currentPage;
  const indextOfFistProduct = indexOfLastProduct - productsPerPage;

  const filteredProducts = products

  const currentproducts = filteredProducts?.slice(indextOfFistProduct, indexOfLastProduct);

  const pageNumbers: number[] = [];

   if(filteredProducts !== undefined){
    for(let i = 1; i <= Math.ceil(filteredProducts.length/productsPerPage); i++){
      pageNumbers.push(i);
    }
   }
  

  return (
    <main className="flex-1 container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-black">Fitness Products</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-1/4">
          <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2 text-black">Categories</h3>
              <div className="space-y-2">
                {isLoading ? <Spinner size="lg" color="secondary"/> : Array.from(categoriesSet).map(
                  (category) => (
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
                  )
                )}
              </div>
            </div>
            <div>
              {isLoading ? <Spinner size="lg" color="secondary"/> :
              <>
                <h3 className="text-lg font-semibold mb-2">Price Range</h3>
                <Slider
                  min={0}
                  max={300}
                  step={10}
                  value={priceRange}
                  onValueChange={(value) => {
                    handlePriceRange(value)
                  }}
                  className="my-4"
                />
                <div className="flex justify-between">
                  <span className="txt-sm text-gray-600">${priceRange[0]}</span>
                  <span className="text-sm text-gray-600">${priceRange[1]}</span>
                </div>
              </>
              }
            </div>
            <div className="flex items-center justify-between gap-2 w-full">
              {isLoading ? <Spinner size="lg" color="secondary"/> : <FilterOptionsStars handleStarFilterChange={handleStarFilterChange} starFilters={starFilters}/>}
            </div>
            {isLoading ? <Spinner size="lg" color="secondary"/> : <form onSubmit={handleSubmit}>
            <Button className="bg-green-500 text-white hover:bg-green-600">
               Search
          </Button>
          </form>}
          </div>
        </aside>
        <div className="w-full md:w-3/4">
          <div className="flex justify-between items-center mb-6">
            {isLoading ? <Spinner size="sm" color="secondary"/> : <p className="text-gray-600">
              {filteredProducts !== undefined && !isError ? `${filteredProducts.length} products found`: "0 products found"}
            </p>}
            {isLoading ? <Spinner size="lg" color="secondary"/> : <Select value={sortBy} onValueChange={(value) => {
              handleSortBy(value)
            }}>
              <SelectTrigger className="w-48 border-black">
                <SelectValue>
                  <p className="text-black">select a filter option</p>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Options</SelectLabel>
                  <SelectItem value="SimpleOrder">
                    Default
                  </SelectItem>
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
                  <SelectItem value="rating">Top Rated</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? <Spinner size="sm" color="secondary"/> : currentproducts !== undefined && !isError? currentproducts.map((product) => (
              <div
                key={product.productId}
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
                  src={product.mainImage}
                />
                <div className="p-4">
                  <div className="flex justify-between items-center">
                     <h3 className="text-lg font-semibold mb-1 text-gray-500">{product.name}</h3>
                     <LikeButton size="sm" onLikeChange={(like) => handleLike(like, product.productId)}/>
                  </div>
                  <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500 mb-2">
                    {product.categoryNames[0]}
                  </p>
                  <div className="flex items-center">
                    <Heart className="w-5 h-5 fill-current text-red-500" />
                    <span className="ml-1 text-sm text-gray-600">
                      {product.numberOfLikes}
                    </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                  {product.priceWithDiscount === undefined ? 
                   <span className="text-xl font-bold text-green-600">
                     ${product.actualPrice.toFixed(2)}
                   </span> :
                   <div className="flex gap-2">
                   <span className="text-yellow-500 text-lg line-through">${product.actualPrice.toFixed(2)}</span>
                   <span className="font-semibold text-red-500 text-lg">${product.priceWithDiscount.toFixed(2)}</span>
                   </div> }
                    <div className="flex items-center">
                      <Star className="w-5 h-5 fill-current text-yellow-500" />
                      <span className="ml-1 text-sm text-gray-600">
                        {product.averageRating.toFixed()}
                      </span>
                    </div>
                  </div>
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white" asChild>
                    <Link href={`products/${product.productId}`}>
                      Buy
                      <ShoppingCart className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            )): <NoProductsFound/>}
          </div>
          <div className="mt-8 flex justify-center">
            {isLoading ? <Spinner size="sm" color="secondary"/> : currentproducts !== undefined && !isError? <nav className="inline-flex rounded-m">
              <Button
                variant="outline"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="rounded-l-md border-black text-black"
              >
                <ChevronLeft className="h-4 w-4 mr-2 " />
                Previous
              </Button>
              {pageNumbers.map((number) => (
                <Button
                  key={number}
                  variant={currentPage === number ? "default" : "outline"}
                  onClick={() => setCurrentPage(number)}
                  className={currentPage !== number ? "border-black text-black" : ""}
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
                className="rounded-l-md border-black text-black"
              >
                Next
                <ChevronRight className="H-4 W-4 ML-2" />
              </Button>
            </nav>: ""}
          </div>
        </div>
      </div>
    </main>
  );
}

export default MainPageProductsServerSide;
