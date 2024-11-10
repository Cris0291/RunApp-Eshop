"use client";

import {
  Heart,
  ShoppingCart,
  Star,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import useGetUserProfileReviews from "./useGetUserProfileReviews";
import useGetUserProfileLikes from "./useGetUserProfileLikes";
import SpinnerCard from "@/app/ui/SpinnerCard";
import ReviewForm from "@/app/ui/ReviewForm";
import useUpdateUserReview from "./useUpdateUserReview";
import useGetuserBoughtProducts from "./useGetUserBoughtProducts";
import useAddOrRemoveLikeHook from "@/app/hooks/useAddOrRemoveLikeHook";
import MapCategories from "@/app/services/categoryMapper";
import SearchBar from "@/app/ui/SearchBar";
import AnimatedButton from "@/app/ui/AnimatedButton";
import { useAppDispatch } from "@/app/hooks/reduxHooks";
import { setSearch } from "../../store/products/productsQuerySlice";
import { useRouter } from "next/navigation";

function UserProfilePageHome() {
  const [unliked, setUnliked] = useState(false);
  const [key, setKey] = useState<string>()
  const [activeForm, setActiveForm] = useState(false)
  const {userReviews, loadingReviews} = useGetUserProfileReviews()
  const {userBoughtProducts, loadingProducts} = useGetuserBoughtProducts()
  const {userLikes, loadingLikes} = useGetUserProfileLikes()
  const {updateReviewsMutation, updatingReviews} = useUpdateUserReview()
  const {AddOrRemoveLikeMutation} = useAddOrRemoveLikeHook()
  const dispatch = useAppDispatch();
  const router = useRouter()


  const handleReviewUpdate = ({sentiment, reviewId, content, rating}: {sentiment: string, reviewId: string, content: string, rating: number}) => {
    const reviewDto = {comment: content, reviewDescription: sentiment, rating}
    updateReviewsMutation({reviewDto, reviewId});
  }

  const handleLike = ({productId, like}: {productId: string, like: boolean}) => {
    AddOrRemoveLikeMutation({liked: like, productId: productId})
  }

  const handleSearch = (searchTerm: string) => {
    dispatch(setSearch({sortBy: "", search: searchTerm, categories: [], priceRange: [], starFilters: [],}))
    router.push("/products")
  }


  const products = [
    {
      id: "1",
      name: "Wireless Earbuds",
      price: "$79.99",
      image: "/placeholder.svg?height=50&width=50",
      rating: 4,
      status: "Delivered",
      categories: ["Yoga"]
    },
    {
      id: "2",
      name: "Smart Watch",
      price: "$199.99",
      image: "/placeholder.svg?height=50&width=50",
      rating: 5,
      status: "Shipped",
      categories: ["swimming"]
    },
    {
      id: "3",
      name: "Bluetooth Speaker",
      price: "$59.99",
      image: "/placeholder.svg?height=50&width=50",
      rating: 3,
      status: "Processing",
      categories: ["Running"]
    },
    {
      id: "4",
      name: "Laptop Stand",
      price: "$29.99",
      image: "/placeholder.svg?height=50&width=50",
      rating: 4,
      status: "Delivered",
      categories: ["test"]
    },
  ];

  return (
        <div className="container mx-auto space-y-6">
          <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md">
             <SearchBar onSearch={(search: string) => handleSearch(search)}/>
              <AnimatedButton size="md"/>
          </div>

          <Tabs defaultValue="liked" className="space-y*4">
            <TabsList className="bg-black p-1 rounded-lg shadow-md sm:w-full md:w-1/2">
              <TabsTrigger
                value="liked"
                className="data-[state=active]:bg-pink-600 data-[state=active]:text-white w-full"
              >
                Liked 
              </TabsTrigger>
              <TabsTrigger
                value="reviewed"
                className="data-[state=active]:bg-pink-600 data-[state=active]:text-white w-full"
              >
                Reviewed
              </TabsTrigger>
              <TabsTrigger
                value="bought"
                className="data-[state=active]:bg-pink-600 data-[state=active]:text-white w-full"
              >
                Bought 
              </TabsTrigger>
            </TabsList>
            <TabsContent
              value="liked"
              className="bg-white p-6 rounded-lg shadow-md"
            >
              {loadingLikes ? <SpinnerCard/> : <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12  object-cover rounded-md"
                        />
                      </TableCell>
                      <TableCell className="font-medium text-black">
                        {product.name}
                      </TableCell>
                      <TableCell className="font-medium text-black">
                        {product.price}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          className={`bg-pink-500 text-white hover:bg-pink-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${unliked && product.id === key ? "border-pink-600 bg-white text-pink-600 hover:bg-pink-50" : ""}`}
                          onClick={() => {
                            setKey(product.id)
                            handleLike({productId: product.id, like: unliked})
                            setUnliked(prev =>  !prev)
                          }}
                        >
                          <Heart className="mr-2 h-4 w-4" />
                          Unlike
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>}
            </TabsContent>
            <TabsContent
              value="reviewed"
              className="bg-white p-6 rounded-lg shadow-md"
            >
              {loadingReviews ? <SpinnerCard/> : <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded-md"
                        />
                      </TableCell>
                      <TableCell className="font-medium text-black">
                        {product.name}
                      </TableCell>
                      <TableCell className="font-medium text-black">
                        {product.price}
                      </TableCell>
                      <TableCell>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < product.rating
                                  ? "text-yellow-500 fill-current"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <ReviewForm size="sm" className="border-pink-600 text-pink-600 hover:bg-pink-50" onSubmit={({sentiment, content, rating}: {sentiment: string, content: string, rating: number}) => handleReviewUpdate({sentiment, reviewId: product.id, content, rating})} isSubmitting={updatingReviews}>
                          <Star className="mr-2 h-4 w-4" /> Edit Review
                        </ReviewForm>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>}
            </TabsContent>
            <TabsContent
              value="bought"
              className="bg-white p-6 rounded-lg shadow-md"
            >
              {loadingProducts ? <SpinnerCard/> : <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <img
                          src={product.image}
                          className="w-12 h-12 object-cover rounded-md"
                        />
                      </TableCell>
                      <TableCell className="font-medium text-black">
                        {product.name}
                      </TableCell>
                      <TableCell className="font-medium text-black">
                        {product.price}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            MapCategories(product.categories[0])
                          }`}
                        >
                          {product.categories[0]}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-green-600 hover:bg-green-700 text-white"
                          asChild
                        >
                          <Link href={`/products/${product.id}`}>
                             Buy Again
                           <ShoppingCart className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>}
            </TabsContent>
          </Tabs>
        </div>
  );
}

export default UserProfilePageHome;
