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
import { UserBoughtProducts, UserLikes, UserReviews } from "./contracts";
import NoImagePlaceholder from "@/app/ui/NoImagePlaceholder";
import FailureSpan from "@/app/ui/FailureSpan";
import NoProductsFound from "@/app/ui/NoProductsFound";
import { useRouter } from "next/navigation";

function UserProfilePageHome() {
  const [unliked, setUnliked] = useState(false);
  const [key, setKey] = useState<string>();
  const {userReviews, loadingReviews, errorReviews, isErrorReview} = useGetUserProfileReviews()
  const {userBoughtProducts, loadingProducts, errorBoughtProducts, isErrorBoughtProduct} = useGetuserBoughtProducts()
  const {userLikes, loadingLikes, errorLikes, isErrorLike} = useGetUserProfileLikes()
  const {updateReviewsMutation, updatingReviews} = useUpdateUserReview()
  const {AddOrRemoveLikeMutation} = useAddOrRemoveLikeHook()
  const dispatch = useAppDispatch();
  const router = useRouter();


  const handleReviewUpdate = ({sentiment, reviewId, content, rating}: {sentiment: string, reviewId?: string, content: string, rating: number}) => {
    if(reviewId === undefined) throw new Error("Product id was undefined. Something unexpected happened");
    const reviewDto = {comment: content, reviewDescription: sentiment, rating}
    updateReviewsMutation({reviewDto, reviewId});
  }

  const handleLike = ({productId, like}: {productId?: string, like: boolean}) => {
    if(productId === undefined) throw new Error("Product id was undefined. Something unexpected happened");
    AddOrRemoveLikeMutation({liked: like, productId: productId})
  }

  const handleSearch = (searchTerm: string) => {
    dispatch(setSearch({sortBy: "", search: searchTerm, categories: [], priceRange: [], starFilters: []}))
    router.push("/products");
  }


  const userReviews1: UserReviews[] | undefined = [
    {
      productId: "1",
      productName: "Wireless Earbuds",
      productImage: "/placeholder.svg?height=50&width=50",
      comment: "test",
      rating: 4,
      reviewDate: "14/07/2027",
      reviewDescription: "another test",
      reviewId: "1"
    },
    {
      productId: undefined,
      productName: undefined,
      productImage: undefined,
      rating: 5,
      reviewDate: "14/07/2027",
      reviewDescription: "another test",
      reviewId: "1",
      comment: "test",
    },
  ];

  const userBoughtProducts1: UserBoughtProducts[] | undefined = [
    {
      productId: "1",
      name: "Wireless Earbuds",
      productPrice: 79.99,
      productImage: "/placeholder.svg?height=50&width=50",
      category: "Yoga"
    },
    {
      productId: "2",
      name: "Smart Watch",
      productPrice: 199.99,
      productImage: undefined,
      category: "swimming"
    },
  ];

  const userLikes1: UserLikes[] | undefined = [
    {
      productId: "1",
      productName: "Wireless Earbuds",
      productPrice: 79.99,
      productImage: "/placeholder.svg?height=50&width=50",
      likeId: "4",
      like: true,
    },
    {
      productId: undefined,
      productName: undefined,
      productPrice: undefined,
      productImage: undefined,
      likeId: "5",
      like: false,
    },
  ]

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
              {loadingLikes ? <SpinnerCard/> : userLikes1 !== undefined && !isErrorLike? <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {userLikes1.map((product) => (
                    <TableRow key={product.productId === undefined ? "NOKEY" : product.productId}>
                      <TableCell>
                        {product.productImage === undefined ? 
                        <NoImagePlaceholder/> :
                        <img
                          src={product.productImage}
                          alt={product.productName}
                          className="w-12 h-12  object-cover rounded-md"
                        />}
                      </TableCell>
                      <TableCell className="font-medium text-black">
                        {product.productName === undefined ? <FailureSpan/> : product.productName}
                      </TableCell>
                      <TableCell className="font-medium text-black">
                        {product.productPrice === undefined ? <FailureSpan/> : product.productPrice}
                      </TableCell>
                      <TableCell className="text-right">
                        {product.productId === undefined ?
                         <FailureSpan/> :
                         <Button
                          variant="outline"
                          size="sm"
                          className={`bg-pink-500 text-white hover:bg-pink-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${unliked && product.productId === key ? "border-pink-600 bg-white text-pink-600 hover:bg-pink-50" : ""}`}
                          onClick={() => {
                            setKey(product.productId)
                            handleLike({productId: product.productId, like: unliked})
                            setUnliked(prev =>  !prev)
                          }}
                        >
                          <Heart className="mr-2 h-4 w-4" />
                          Unlike
                        </Button>}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>: <NoProductsFound/>}
            </TabsContent>
            <TabsContent
              value="reviewed"
              className="bg-white p-6 rounded-lg shadow-md"
            >
              {loadingReviews ? <SpinnerCard/> : userReviews1 !== undefined && !isErrorReview? <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Review Date</TableHead>
                    <TableHead>Review Description</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {userReviews1.map((product) => (
                    <TableRow key={product.productId === undefined ? "NOKEY" : product.productId}>
                      <TableCell>
                      {product.productImage === undefined ? 
                        <NoImagePlaceholder/> :
                        <img
                          src={product.productImage}
                          alt={product.productName}
                          className="w-12 h-12  object-cover rounded-md"
                        />}
                      </TableCell>
                      <TableCell className="font-medium text-black">
                      {product.productName === undefined ? <FailureSpan/> : product.productName}
                      </TableCell>
                      <TableCell className="font-medium text-black">
                        {product.reviewDate}
                      </TableCell>
                      <TableCell className="font-medium text-black">
                        {product.reviewDescription}
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
                        {product.productId === undefined ?
                        <FailureSpan/> : 
                        <ReviewForm size="sm" className="border-pink-600 text-pink-600 hover:bg-pink-50" onSubmit={({sentiment, content, rating}: {sentiment: string, content: string, rating: number}) => handleReviewUpdate({sentiment, reviewId: product.productId, content, rating})} isSubmitting={updatingReviews}>
                          <Star className="mr-2 h-4 w-4" /> Edit Review
                        </ReviewForm>}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>: <NoProductsFound/>}
            </TabsContent>
            <TabsContent
              value="bought"
              className="bg-white p-6 rounded-lg shadow-md"
            >
              {loadingProducts ? <SpinnerCard/> : userBoughtProducts1 !== undefined && !isErrorBoughtProduct? <Table>
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
                  {userBoughtProducts1.map((product) => (
                    <TableRow key={product.productId === undefined ? "NOKEY" : product.productId}>
                      <TableCell>
                      {product.productImage === undefined ? 
                        <NoImagePlaceholder/> :
                        <img
                          src={product.productImage}
                          alt={product.name}
                          className="w-12 h-12  object-cover rounded-md"
                        />}
                      </TableCell>
                      <TableCell className="font-medium text-black">
                        {product.name}
                      </TableCell>
                      <TableCell className="font-medium text-black">
                         {product.productPrice === undefined ? <FailureSpan/> : product.productPrice}
                      </TableCell>
                      <TableCell>
                        {product.productId === undefined ? 
                        <FailureSpan/> :
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            MapCategories(product.category)
                          }`}
                        >
                          {product.category}
                        </span>}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-green-600 hover:bg-green-700 text-white"
                          asChild
                        >
                          {product.productId === undefined ? 
                          <FailureSpan/> : 
                          <Link href={`/products/${product.productId}`}>
                             Buy Again
                           <ShoppingCart className="ml-2 h-4 w-4" />
                          </Link>}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>: <NoProductsFound/>}
            </TabsContent>
          </Tabs>
        </div>
  );
}

export default UserProfilePageHome;
