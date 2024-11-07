"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Truck, RefreshCcw, Heart, ChevronRight, ThumbsUp, ThumbsDown, Watch, Droplet, Shield, Clock } from "lucide-react"
import { usePathname } from "next/navigation"
import useGetProductQuery from "./useGetProductQuery"
import { useAppDispatch, useAppSelector } from "@/app/hooks/reduxHooks"
import { addItem, deleteItem } from "../../payment/shoppingcart/cartSlice"
import ReviewForm from "../../../ui/ReviewForm"
import useCreateReviewCommand from "./useCreateReviewCommand"
import LoadingModal from "@/app/ui/LoadingModal"
import { getUserId } from "../../registration/userSlice"
import StarRatingComponent from "./StarRatingComponent"
import useAddRatingCommand from "./useAddRatingCommand"
import LikeButton from "@/app/ui/LikeButton"
import useAddOrRemoveLikeHook from "@/app/hooks/useAddOrRemoveLikeHook"

const productTest = {
  name: "Elegant Timepiece",
  price: 299.99,
  rating: 4.5,
  reviews: 128,
  description: "A sophisticated watch that combines classic design with modern functionality. Perfect for both casual and formal occasions.",
  features: [
    "Swiss movement",
    "Sapphire crystal glass",
    "Water-resistant up to 50 meters",
    "Genuine leather strap",
    "1-year warranty"
  ],
  categories: [
    { name: "Analog", icon: Watch },
    { name: "Water Resistant", icon: Droplet },
    { name: "Durable", icon: Shield },
    { name: "Precise", icon: Clock },
  ],
  images: [
    "/placeholder.svg?height=400&width=400",
    "/placeholder.svg?height=400&width=400",
    "/placeholder.svg?height=400&width=400",
    "/placeholder.svg?height=400&width=400"
  ]
}

const reviews = [
  {
    id: 0,
    author: "test",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 0,
    date: "",
    content: "This watch exceeded my expectations. The craftsmanship is impeccable, and it looks even better in person. Highly recommended!",
    helpful: 24,
    notHelpful: 2
  },
  {
    id: 1,
    author: "A",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    date: "2023-05-15",
    content: "This watch exceeded my expectations. The craftsmanship is impeccable, and it looks even better in person. Highly recommended!",
    helpful: 24,
    notHelpful: 2
  },
  {
    id: 2,
    author: "B",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 4,
    date: "2023-05-10",
    content: "Great watch for the price. The only reason I'm not giving it 5 stars is because the strap took a while to break in. Otherwise, it's perfect.",
    helpful: 18,
    notHelpful: 1
  },
  {
    id: 3,
    author: "C",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    date: "2023-05-05",
    content: "I've been wearing this watch daily for a month now, and it's holding up beautifully. The timekeeping is precise, and I love the classic design.",
    helpful: 30,
    notHelpful: 0
  },
  {
    id: 0,
    author: "D",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 0,
    date: "",
    content: "This watch exceeded my expectations. The craftsmanship is impeccable, and it looks even better in person. Highly recommended!",
    helpful: 24,
    notHelpful: 2
  },
  {
    id: 1,
    author: "E",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    date: "2023-05-15",
    content: "This watch exceeded my expectations. The craftsmanship is impeccable, and it looks even better in person. Highly recommended!",
    helpful: 24,
    notHelpful: 2
  },
  {
    id: 2,
    author: "F",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 4,
    date: "2023-05-10",
    content: "Great watch for the price. The only reason I'm not giving it 5 stars is because the strap took a while to break in. Otherwise, it's perfect.",
    helpful: 18,
    notHelpful: 1
  },
  {
    id: 3,
    author: "G",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    date: "2023-05-05",
    content: "I've been wearing this watch daily for a month now, and it's holding up beautifully. The timekeeping is precise, and I love the classic design.",
    helpful: 30,
    notHelpful: 0
  },
  {
    id: 0,
    author: "H",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 0,
    date: "",
    content: "This watch exceeded my expectations. The craftsmanship is impeccable, and it looks even better in person. Highly recommended!",
    helpful: 24,
    notHelpful: 2
  },
  {
    id: 1,
    author: "I",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    date: "2023-05-15",
    content: "This watch exceeded my expectations. The craftsmanship is impeccable, and it looks even better in person. Highly recommended!",
    helpful: 24,
    notHelpful: 2
  },
  {
    id: 2,
    author: "J",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 4,
    date: "2023-05-10",
    content: "Great watch for the price. The only reason I'm not giving it 5 stars is because the strap took a while to break in. Otherwise, it's perfect.",
    helpful: 18,
    notHelpful: 1
  },
  {
    id: 3,
    author: "K",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    date: "2023-05-05",
    content: "I've been wearing this watch daily for a month now, and it's holding up beautifully. The timekeeping is precise, and I love the classic design.",
    helpful: 30,
    notHelpful: 0
  }
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-5 w-5 ${
            star <= rating
              ? "text-yellow-400 fill-current"
              : "text-gray-300"
          }`}
        />
      ))}
    </div>
  )
}

export default function ProductDisplay() {
  const pathname = usePathname();
  const userId = useAppSelector(getUserId);
  const {isLoading, newProduct, error} = useGetProductQuery(pathname);
  const {AddOrRemoveLikeMutation} = useAddOrRemoveLikeHook();
  const {isPending, AddReview} = useCreateReviewCommand();
  const [quantity, setQuantity] = useState(1)
  const [isAddedTocart, setIsAddedToCart] = useState(false);
  const [mainImage, setMainImage] = useState(productTest.images[0])
  const dispatch = useAppDispatch();
  const {addRating} = useAddRatingCommand();
  const [currentReviewsPage, setCurrentReviewsPage] = useState(1);
  const reviewsPerPage = 5;

  const lastIndex = currentReviewsPage * reviewsPerPage;
  const initialIndex = 0

  const currentReviews = reviews.slice(initialIndex, lastIndex)

  const handleAddTocartState = () => {
    const productForCart = {id: newProduct.id, quantity: quantity, price: newProduct.price, priceWithDiscount: newProduct.priceWithDiscount, 
                            totalPrice: newProduct.price * quantity, image: ""}
    dispatch(addItem(productForCart))
    setIsAddedToCart(true)
  }

  const handleDeleteFromCartState = () => {
    dispatch(deleteItem(newProduct.id))
    setIsAddedToCart(false)
  }

  const handleRating = (rating: number) => {
    addRating({rating, productId: newProduct.id})
  }

  const handleLike = (liked: boolean) => {
    AddOrRemoveLikeMutation({liked, productId: newProduct.id});
  }

  const onSubmit = ({sentiment, content}: {sentiment: string, content: string}) => {
    //Todo: check whether the product has been bought
    //Todo: check if i already have a review on this product
    //Todo: handle errors like the ones mention above or could not submitt review

    const reviewDto = {comment: content, reviewDescription: sentiment}
    AddReview({reviewDto, productId: newProduct.id})
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Card className="overflow-hidden bg-white shadow-xl hover:shadow-2xl transition-shadow duration-300">
          {isLoading? <LoadingModal/> : <CardContent className="p-6 sm:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* Product Images */}
              <div className="space-y-4">
                <div className="aspect-square relative overflow-hidden rounded-lg bg-gray-100 group">
                  <Image
                    src={mainImage}
                    alt={productTest.name}
                    layout="fill"
                    objectFit="cover"
                    className="group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity duration-300" />
                </div>
                <div className="grid grid-cols-4 gap-4">
                  {productTest.images.map((img, index) => (
                    <button
                      key={index}
                      className={`aspect-square relative overflow-hidden rounded-lg bg-gray-100 group ${
                        img === mainImage ? 'ring-2 ring-pink-500' : ''
                      }`}
                      onClick={() => setMainImage(img)}
                    >
                      <Image
                        src={img}
                        alt={`${productTest.name} view ${index + 1}`}
                        layout="fill"
                        objectFit="cover"
                        className="group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity duration-300" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Details */}
              <div className="space-y-6">
                <h1 className="text-3xl font-bold text-gray-900 hover:text-pink-600 transition-colors duration-300">{productTest.name}</h1>
                <div className="flex items-center space-x-2">
                  <StarRating rating={productTest.rating} />
                  <span className="text-sm text-gray-500 hover:text-pink-500 transition-colors duration-300">({productTest.reviews} reviews)</span>
                </div>
                <p className="text-3xl font-bold text-gray-900 hover:text-pink-600 transition-colors duration-300">${productTest.price.toFixed(2)}</p>
                <p className="text-gray-600 hover:text-gray-800 transition-colors duration-300">{productTest.description}</p>

                {/* Category Icons */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Product Categories</h3>
                  <div className="flex flex-wrap gap-4">
                    {productTest.categories.map((category) => (
                      <div key={category.name} className="flex flex-col items-center group">
                        <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center group-hover:bg-pink-200 transition-colors duration-300">
                          <category.icon className="w-6 h-6 text-pink-500" />
                        </div>
                        <span className="mt-1 text-xs text-gray-600 group-hover:text-pink-600 transition-colors duration-300">{category.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quantity Selection */}
                <div className="flex items-center space-x-3">
                  <Label htmlFor="quantity" className="text-sm font-medium text-gray-900">
                    Quantity
                  </Label>
                  <Input
                    type="number"
                    id="quantity"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    className="w-20 hover:border-pink-500 focus:border-pink-500 transition-colors duration-300"
                  />
                </div>

                {/* Add to Cart and Wishlist Buttons */}
                <div className="flex space-x-4">
                {
                  isAddedTocart ?  <>
                  <Button className="flex-1 bg-pink-500 text-white hover:bg-pink-600 transition-colors duration-300 transform hover:scale-105" onClick={handleDeleteFromCartState}>
                   Delete from Cart
                 </Button>
                </>  :  
                <>
                 <Button className="flex-1 bg-pink-500 text-white hover:bg-pink-600 transition-colors duration-300 transform hover:scale-105" onClick={handleAddTocartState}>
                  Add to Cart
                </Button>
               </> 
                }
                <LikeButton size="sm" onLikeChange={handleLike}/>
                </div>

                {/* Shipping and Returns */}
                <div className="border-t border-gray-200 pt-4 space-y-2">
                  <div className="flex items-center text-sm text-gray-500 hover:text-pink-500 transition-colors duration-300">
                    <Truck className="h-5 w-5 mr-2" />
                    Free shipping on orders over $50
                  </div>
                  <div className="flex items-center text-sm text-gray-500 hover:text-pink-500 transition-colors duration-300">
                    <RefreshCcw className="h-5 w-5 mr-2" />
                    Free 30-day returns
                  </div>
                </div>
              </div>
            </div>

            {/* Product Tabs */}
            <Tabs defaultValue="features" className="mt-10">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="features" className="hover:bg-pink-50 transition-colors duration-300">Features</TabsTrigger>
                <TabsTrigger value="specs" className="hover:bg-pink-50 transition-colors duration-300">Specifications</TabsTrigger>
                <TabsTrigger value="reviews" className="hover:bg-pink-50 transition-colors duration-300">Reviews</TabsTrigger>
              </TabsList>
              <TabsContent value="features" className="mt-6">
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  {productTest.features.map((feature, index) => (
                    <li key={index} className="hover:text-pink-600 transition-colors duration-300">{feature}</li>
                  ))}
                </ul>
              </TabsContent>
              <TabsContent value="specs" className="mt-6">
                <p className="text-gray-600 hover:text-pink-600 transition-colors duration-300">
                  Detailed specifications for the {productTest.name} would be listed here.
                </p>
              </TabsContent>
              <TabsContent value="reviews" className="mt-6">
                <div className="space-y-8">
                  {/* Review Summary */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 hover:text-pink-600 transition-colors duration-300">Customer Reviews</h3>
                      <div className="flex items-center mt-1">
                        <StarRating rating={productTest.rating} />
                        <span className="ml-2 text-sm text-gray-500 hover:text-pink-500 transition-colors duration-300">{productTest.rating} out of 5</span>
                      </div>
                    </div>
                    <ReviewForm onSubmit={onSubmit} isSubmitting={isPending}/>
                  </div>

                  {/* Rating Distribution */}
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((star) => (
                      <div key={star} className="flex items-center group">
                        <span className="text-sm text-gray-600 w-8 group-hover:text-pink-600 transition-colors duration-300">{star} star</span>
                        <Progress value={star * 20} className="h-2 w-full mx-4 group-hover:bg-pink-100 transition-colors duration-300" />
                        <span className="text-sm text-gray-600 w-12 group-hover:text-pink-600 transition-colors duration-300">{star * 20}%</span>
                      </div>
                    ))}
                  </div>

                  {/* Individual Reviews */}
                  <div className="space-y-6">
                    {currentReviews.map((review) => (
                      <div key={review.id} className="border-t border-gray-200 pt-6 group">
                        <div className="flex items-center mb-4">
                          <Avatar className="h-10 w-10 group-hover:ring-2 group-hover:ring-pink-500 transition-all duration-300">
                            <AvatarImage src={review.avatar} alt={review.author} />
                            <AvatarFallback>{review.author[0]}</AvatarFallback>
                          </Avatar>
                          <div className="ml-4">
                            <h4 className="text-sm font-semibold text-gray-900 group-hover:text-pink-600 transition-colors duration-300">{review.author}</h4>
                            <div className="flex items-center">
                              {review.rating === 0 && review.date === "" ? <span className="ml-2 text-sm text-gray-500 group-hover:text-pink-500 transition-colors duration-300">Not Rated Yet</span> : <><StarRating rating={review.rating} />
                              <span className="ml-2 text-sm text-gray-500 group-hover:text-pink-500 transition-colors duration-300">{review.date}</span></>}
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-600 mb-4 group-hover:text-gray-800 transition-colors duration-300">{review.content}</p>
                        <div className="flex items-center space-x-4">
                          {/*Todo: change below zero for userId*/}
                          {review.id === 0 && review.rating === 0 && review.date === "" ? <StarRatingComponent onRatingChange={handleRating}/> : <><Button variant="outline" size="sm" className="text-gray-500 hover:bg-pink-50 hover:text-pink-600 transition-colors duration-300 transform hover:scale-105">
                            <ThumbsUp className="h-4 w-4 mr-2" />
                            Helpful ({review.helpful})
                          </Button>
                          <Button variant="outline" size="sm" className="text-gray-500 hover:bg-pink-50 hover:text-pink-600 transition-colors duration-300 transform hover:scale-105">
                            <ThumbsDown className="h-4 w-4 mr-2" />
                            Not Helpful ({review.notHelpful})
                          </Button></>}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Load More Reviews */}
                
                  <div className="text-center">
                    <Button variant="outline" className="text-pink-500 hover:text-pink-600 hover:bg-pink-50 transition-colors duration-300 transform hover:scale-105" onClick={() => setCurrentReviewsPage(prev => prev + 1)}>
                      Load More Reviews
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>}
        </Card>
      </div>
    </div>
  )
}