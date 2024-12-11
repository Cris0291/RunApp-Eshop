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
import { Star, Truck, RefreshCcw, ChevronRight, ThumbsUp, ThumbsDown, Watch, Droplet, Shield, Clock, Pencil, Check } from "lucide-react"
import { usePathname } from "next/navigation"
import useGetProductQuery from "./useGetProductQuery"
import { useAppDispatch, useAppSelector } from "@/app/hooks/reduxHooks"
import { addItem, deleteItem } from "../../payment/shoppingcart/cartSlice"
import ReviewForm from "../../../ui/ReviewForm"
import useCreateReviewCommand from "./useCreateReviewCommand"
import LoadingModal from "@/app/ui/LoadingModal"
import { getUserAddress, getUserId, getUserPaymentMethod } from "../../registration/userSlice"
import useAddRatingCommand from "./useAddRatingCommand"
import LikeButton from "@/app/ui/LikeButton"
import useAddOrRemoveLikeHook from "@/app/hooks/useAddOrRemoveLikeHook"
import useCreateOrderOrAddItem from "@/app/utils/useCreateOrderOrAddItem"
import { useDispatch } from "react-redux"
import { getIsCurrentOrder } from "../../payment/checkout/orderSlice"
import StatusPopup from "@/app/ui/SatusPopup"
import { Product, Review } from "./contracts"
import ProductNotFound from "@/app/ui/ProductNotFound"
import NoImagePlaceholder from "@/app/ui/NoImagePlaceholder"
import { iconsForCategories } from "@/app/utils/categories"

const reviews: Review[] = [
  {
    id: "0",
    userName: "test",
    rating: 0,
    date: "",
    comment: "This watch exceeded my expectations. The craftsmanship is impeccable, and it looks even better in person. Highly recommended!",
    reviewDescription: "Good",
  },
  {
    id: "1",
    userName: "A",
    rating: 5,
    date: "2023-05-15",
    comment: "This watch exceeded my expectations. The craftsmanship is impeccable, and it looks even better in person. Highly recommended!",
    reviewDescription: "Good quality",
  },
  {
    id: "2",
    userName: "B",
    rating: 4,
    date: "2023-05-10",
    comment: "Great watch for the price. The only reason I'm not giving it 5 stars is because the strap took a while to break in. Otherwise, it's perfect.",
    reviewDescription: "Bad",
  },
  {
    id: "3",
    userName: "C",
    rating: 5,
    date: "2023-05-05",
    comment: "I've been wearing this watch daily for a month now, and it's holding up beautifully. The timekeeping is precise, and I love the classic design.",
    reviewDescription: "neutral",
  },
  {
    id: "4",
    userName: "D",
    rating: 0,
    date: "",
    comment: "This watch exceeded my expectations. The craftsmanship is impeccable, and it looks even better in person. Highly recommended!",
    reviewDescription: "normal",
  },
]

const productTest: Product = {
  productId: "1",
  name: "Elegant Timepiece",
  actualPrice: 299.99,
  priceWithDiscount: 100,
  promotionalText: "Good test discounts",
  discount: 60,
  averageRating: 4.5,
  numberOfreviews: 128,
  numberOflikes: 50,
  description: "A sophisticated watch that combines classic design with modern functionality. Perfect for both casual and formal occasions.",
  bulletPoints: [
    "Swiss movement",
    "Sapphire crystal glass",
    "Water-resistant up to 50 meters",
    "Genuine leather strap",
    "1-year warranty"
  ],
  categories: [
    "Yoga",
    "HIIT",
  ],
  mainImage: "/placeholder.svg?height=400&width=400",
  reviews: reviews,
}

const categories1 = [
  { name: "Analog", icon: Watch },
  { name: "Water Resistant", icon: Droplet },
  { name: "Durable", icon: Shield },
  { name: "Precise", icon: Clock },
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
  const {isLoading, product, error} = useGetProductQuery(pathname);
  const {AddOrRemoveLikeMutation} = useAddOrRemoveLikeHook();
  const {isPending, AddReview} = useCreateReviewCommand();
  const [quantity, setQuantity] = useState(1)
  const [isAddedTocart, setIsAddedToCart] = useState(false);
  const [isError, setIsError] = useState(false)
  const [mainImage, setMainImage] = useState(productTest.mainImage)
  const createOrderOrAddItem = useCreateOrderOrAddItem();
  const dispatch = useDispatch();
  const {addRating} = useAddRatingCommand();
  const [currentReviewsPage, setCurrentReviewsPage] = useState(1);
  const existOrder = useAppSelector(getIsCurrentOrder);
  const userAddress = useAppSelector(getUserAddress);
  const userPaymentMethod = useAppSelector(getUserPaymentMethod);
  const reviewsPerPage = 5;

  const lastIndex = currentReviewsPage * reviewsPerPage;
  const initialIndex = 0

  const currentReviews = reviews.slice(initialIndex, lastIndex)

  const isRendered = lastIndex < reviews.length

  const handleAddToCartState = () => {
    
    if(productTest !== undefined){
      const productForCart = {name: productTest.name, id: productTest.productId, quantity: quantity, price: productTest.actualPrice, priceWithDiscount: productTest.priceWithDiscount, 
        totalPrice: productTest.actualPrice * quantity, image: productTest.mainImage}
    
                            
    if(!isNaN(quantity) && quantity !== 0){
      createOrderOrAddItem(productForCart, existOrder, userAddress, userPaymentMethod);
      setIsAddedToCart(true)
    }
    else{
      setIsError(true);
    }
    }
  }

  const handleLike = (liked: boolean) => {
    if(productTest !== undefined)AddOrRemoveLikeMutation({liked, productId: productTest.productId});
  }

  const onSubmit = ({sentiment, content, rating}: {sentiment: string, content: string, rating: number}) => {
    //Todo: check whether the product has been bought
    //Todo: check if i already have a review on this product
    //Todo: handle errors like the ones mention above or could not submitt review

    if(productTest !== undefined){
      const reviewDto = {comment: content, reviewDescription: sentiment, rating: rating}
      AddReview({reviewDto, productId: productTest.productId})
    }
  }

  return (
    productTest == undefined ? 
    <ProductNotFound/> : 
    <div className="min-h-screen bg-gradient-to-br from-white to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Card className="overflow-hidden bg-white shadow-xl hover:shadow-2xl transition-shadow duration-300">
          {isLoading? <LoadingModal/> : <CardContent className="p-6 sm:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* Product Images */}
              <div className="space-y-4">
                <div className="aspect-square relative overflow-hidden rounded-lg bg-gray-100 group">
                  {productTest.mainImage === undefined ? <NoImagePlaceholder/> : 
                  <Image
                    src={productTest.mainImage}
                    alt={productTest.name}
                    layout="fill"
                    objectFit="cover"
                    className="group-hover:scale-105 transition-transform duration-300"
                  />}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity duration-300" />
                </div>
              </div>

              {/* Product Details */}
              <div className="space-y-6">
                <h1 className="text-3xl font-bold text-gray-900 hover:text-pink-600 transition-colors duration-300">{productTest.name}</h1>
                <div className="flex items-center space-x-2">
                  <StarRating rating={productTest.averageRating} />
                  <span className="text-sm text-gray-500 hover:text-pink-500 transition-colors duration-300">({productTest.numberOfreviews} reviews)</span>
                </div>
                <p className="text-3xl font-bold text-gray-900 hover:text-pink-600 transition-colors duration-300">${productTest.actualPrice.toFixed(2)}</p>
                <p className="text-gray-600 hover:text-gray-800 transition-colors duration-300">{productTest.description}</p>

                {/* Category Icons */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Product Categories</h3>
                  <div className="flex flex-wrap gap-4">
                    {productTest.categories.map((category) => (
                      <div key={category} className="flex flex-col items-center group">
                        <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center group-hover:bg-pink-200 transition-colors duration-300">
                          {iconsForCategories.map((categoryIcon) => (
                            categoryIcon.name === category ? <categoryIcon.icon className="w-6 h-6 text-pink-500"/> : ""
                          ))}
                        </div>
                        <span className="mt-1 text-xs text-gray-600 group-hover:text-pink-600 transition-colors duration-300">{category}</span>
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
                  <div className="flex-1 text-center bg-green-500 text-white">
                   Your item was added
                 </div>
                </>  :  
                <>
                 <Button className="flex-1 bg-pink-500 text-white hover:bg-pink-600 transition-colors duration-300 transform hover:scale-105" onClick={handleAddToCartState}>
                  Add to Cart
                </Button>
                {isError ? <StatusPopup status="failure" message="Item quantity cannot be zero or empty" actionLabel="Change your item's quantity" onAction={() => setQuantity(1)}/> : ""}
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
                  {productTest.bulletPoints.map((feature, index) => (
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
                        <StarRating rating={productTest.averageRating} />
                        <span className="ml-2 text-sm text-gray-500 hover:text-pink-500 transition-colors duration-300">{productTest.averageRating} out of 5</span>
                      </div>
                    </div>
                    <ReviewForm onSubmit={onSubmit} isSubmitting={isPending}>
                      <Pencil className="mr-2 h-4 w-4" /> Add Review
                    </ReviewForm>
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
                    {productTest.reviews.map((review) => (
                      <div key={review.id} className="border-t border-gray-200 pt-6 group">
                        <div className="flex items-center mb-4">
                          <Avatar className="h-10 w-10 group-hover:ring-2 group-hover:ring-pink-500 transition-all duration-300">
                            <AvatarFallback>{review.userName}</AvatarFallback>
                          </Avatar>
                          <div className="ml-4">
                            <h4 className="text-sm font-semibold text-gray-900 group-hover:text-pink-600 transition-colors duration-300">{review.userName}</h4>
                            <div className="flex items-center">
                              <StarRating rating={review.rating} />
                              <span className="ml-2 text-sm text-gray-500 group-hover:text-pink-500 transition-colors duration-300">{review.date}</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-600 mb-4 group-hover:text-gray-800 transition-colors duration-300">{review.comment}</p>
                        <div className="flex items-center space-x-4">
                          <Button variant="outline" size="sm" className="text-gray-500 hover:bg-pink-50 hover:text-pink-600 transition-colors duration-300 transform hover:scale-105">
                            <ThumbsUp className="h-4 w-4 mr-2" />
                            Helpful 
                          </Button>
                          <Button variant="outline" size="sm" className="text-gray-500 hover:bg-pink-50 hover:text-pink-600 transition-colors duration-300 transform hover:scale-105">
                            <ThumbsDown className="h-4 w-4 mr-2" />
                              Not Helpful 
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Load More Reviews */}
                
                  <div className="text-center">
                    {isRendered ? <Button variant="outline" className="text-pink-500 hover:text-pink-600 hover:bg-pink-50 transition-colors duration-300 transform hover:scale-105" onClick={() => setCurrentReviewsPage(prev => prev + 1)}>
                      Load More Reviews
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button> : ""}
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