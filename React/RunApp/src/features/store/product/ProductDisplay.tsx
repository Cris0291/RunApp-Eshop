import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Star,
  Truck,
  RefreshCcw,
  ChevronRight,
  Pencil,
  MessageSquare,
} from "lucide-react";
import useGetProductQuery from "./useGetProductQuery";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import ReviewForm from "../../../ui/ReviewForm";
import useCreateReviewCommand from "./useCreateReviewCommand";
import {
  getUserAddress,
  getUserPaymentMethod,
} from "../../registration/userSlice";
import LikeButton from "@/ui/LikeButton";
import useAddOrRemoveLikeHook from "@/hooks/useAddOrRemoveLikeHook";
import useCreateOrderOrAddItem from "@/utils/useCreateOrderOrAddItem";
import {
  addError,
  getIsCurrentOrder,
  getOrderError,
} from "../../payment/checkout/orderSlice";
import StatusPopup from "@/ui/SatusPopup";
import { Product, Review } from "./contracts";
import ProductNotFound from "@/ui/ProductNotFound";
import NoImagePlaceholder from "@/ui/NoImagePlaceholder";
import { iconsForCategories } from "@/utils/categories";
import {
  getIsProductBought,
  getIsProductBoughtAndHasReview,
} from "./productSlice";
import useUpdateUserReview from "../../profiles/userprofile/useUpdateUserReview";
import ProductLoadingCard from "@/ui/ProductLoadingCard";
import toast from "react-hot-toast";
import {
  addCartError,
  getCartError,
} from "../../payment/shoppingcart/cartSlice";
import { setSearch } from "../products/productsQuerySlice";
import HeaderProducts from "../products/HeaderProducts";
import { useLocation, useNavigate } from "react-router";

const reviews: Review[] | undefined = [
  {
    reviewId: "0",
    userName: "test",
    rating: 0,
    date: "",
    comment:
      "This watch exceeded my expectations. The craftsmanship is impeccable, and it looks even better in person. Highly recommended!",
    reviewDescription: "Good",
  },
  {
    reviewId: "1",
    userName: "A",
    rating: 5,
    date: "2023-05-15",
    comment:
      "This watch exceeded my expectations. The craftsmanship is impeccable, and it looks even better in person. Highly recommended!",
    reviewDescription: "Good quality",
  },
  {
    reviewId: "2",
    userName: "B",
    rating: 4,
    date: "2023-05-10",
    comment:
      "Great watch for the price. The only reason I'm not giving it 5 stars is because the strap took a while to break in. Otherwise, it's perfect.",
    reviewDescription: "Bad",
  },
  {
    reviewId: "3",
    userName: "C",
    rating: 5,
    date: "2023-05-05",
    comment:
      "I've been wearing this watch daily for a month now, and it's holding up beautifully. The timekeeping is precise, and I love the classic design.",
    reviewDescription: "neutral",
  },
  {
    reviewId: "4",
    userName: "D",
    rating: 0,
    date: "",
    comment:
      "This watch exceeded my expectations. The craftsmanship is impeccable, and it looks even better in person. Highly recommended!",
    reviewDescription: "normal",
  },
];

const productTest: Product | undefined = {
  productId: "1",
  name: "Elegant Timepiece",
  actualPrice: 299.99,
  priceWithDiscount: 100,
  promotionalText: "Good test discounts",
  discount: 60,
  averageRatings: 4.5,
  numberOfreviews: 128,
  numberOflikes: 50,
  description:
    "A sophisticated watch that combines classic design with modern functionality. Perfect for both casual and formal occasions.",
  bulletPoints: [
    "Swiss movement",
    "Sapphire crystal glass",
    "Water-resistant up to 50 meters",
    "Genuine leather strap",
    "1-year warranty",
  ],
  categoryNames: ["Yoga", "HIIT"],
  mainImage: "/placeholder.svg?height=400&width=400",
  reviews: reviews,
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-5 w-5 ${
            star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
}

export default function ProductDisplay() {
  const { pathname } = useLocation();
  const productIdArray = pathname.split("/");
  const productId = productIdArray[productIdArray.length - 1];
  const { isLoading, product, error, isGetProductError } =
    useGetProductQuery(productId);
  const { AddOrRemoveLikeMutation } = useAddOrRemoveLikeHook();
  const { isPending, AddReview } = useCreateReviewCommand();
  const [quantity, setQuantity] = useState(1);
  const [isAddedTocart, setIsAddedToCart] = useState(false);
  const [isError, setIsError] = useState(false);
  const createOrderOrAddItem = useCreateOrderOrAddItem();
  const dispatch = useAppDispatch();
  const [currentReviewsPage, setCurrentReviewsPage] = useState(1);
  const existOrder = useAppSelector(getIsCurrentOrder);
  const userAddress = useAppSelector(getUserAddress);
  const userPaymentMethod = useAppSelector(getUserPaymentMethod);
  const isBoughtProduct = useAppSelector(getIsProductBought(productId));
  const isBoughtProductHasReview = useAppSelector(
    getIsProductBoughtAndHasReview(productId)
  );
  const { updateReviewsMutation, updatingReviews } = useUpdateUserReview();
  const cartError = useAppSelector(getCartError);
  const orderError = useAppSelector(getOrderError);
  const [searchProduct, setSearchProduct] = useState("");
  let navigate = useNavigate();
  const reviewsPerPage = 5;

  useEffect(() => {
    if (cartError !== undefined) {
      const tempCartError = cartError;
      dispatch(addCartError(undefined));
      throw new Error(tempCartError);
    }
    if (orderError !== undefined) {
      const tempOrderError = orderError;
      dispatch(addError(undefined));
      throw new Error(tempOrderError);
    }
  }, [cartError, orderError]);

  if (isGetProductError)
    toast.error(
      `${error?.message}: Product could not be downloaded from server`
    );

  const lastIndex = currentReviewsPage * reviewsPerPage;
  const initialIndex = 0;

  const currentReviews =
    productTest !== undefined && productTest.reviews !== undefined
      ? productTest.reviews.slice(initialIndex, lastIndex)
      : [];

  const isRendered =
    productTest !== undefined && productTest.reviews !== undefined
      ? lastIndex < productTest.reviews.length
      : 0;

  const handleAddToCartState = () => {
    if (productTest !== undefined) {
      const productForCart = {
        name: productTest.name,
        id: productTest.productId,
        quantity: quantity,
        price: productTest.actualPrice,
        priceWithDiscount: productTest.priceWithDiscount,
        totalPrice: productTest.actualPrice * quantity,
      };

      if (!isNaN(quantity) && quantity !== 0) {
        createOrderOrAddItem(
          productForCart,
          existOrder,
          userAddress,
          userPaymentMethod
        );
        setIsAddedToCart(true);
      } else {
        setIsError(true);
      }
    }
  };

  const handleLike = (liked: boolean) => {
    if (productTest !== undefined)
      AddOrRemoveLikeMutation({ liked, productId: productTest.productId });
  };

  const onSubmit = ({
    sentiment,
    content,
    rating,
  }: {
    sentiment: string;
    content: string;
    rating: number;
  }) => {
    if (productTest !== undefined) {
      const reviewDto = {
        comment: content,
        reviewDescription: sentiment,
        rating: rating,
      };
      AddReview({ reviewDto, productId: productTest.productId });
    }
  };

  const handleReviewUpdate = ({
    sentiment,
    reviewId,
    content,
    rating,
  }: {
    sentiment: string;
    reviewId: string;
    content: string;
    rating: number;
  }) => {
    if (productTest !== undefined) {
      const reviewDto = {
        comment: content,
        reviewDescription: sentiment,
        rating,
      };
      updateReviewsMutation({ reviewDto, reviewId });
    }
  };

  const handleSearch = (search: string) => {
    setSearchProduct(search);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      setSearch({
        sortBy: "",
        search: searchProduct,
        categories: [],
        priceRange: [],
        starFilters: [],
      })
    );
    navigate("/products");
  };

  return isLoading ? (
    <ProductLoadingCard />
  ) : productTest !== undefined && !isGetProductError ? (
    <div className="min-h-screen bg-gradient-to-br from-white to-pink-50">
      <div>
        <HeaderProducts
          handleSearch={handleSearch}
          search={searchProduct}
          handleSubmit={handleSubmit}
        />
        <Card className="overflow-hidden bg-white shadow-xl hover:shadow-2xl transition-shadow duration-300">
          <CardContent className="p-6 sm:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* Product Images */}
              <div className="space-y-4">
                <div className="aspect-square relative overflow-hidden rounded-lg bg-gray-100 group">
                  {productTest.mainImage === undefined ? (
                    <NoImagePlaceholder />
                  ) : (
                    <img
                      src={productTest.mainImage}
                      alt={productTest.name}
                      className="group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity duration-300" />
                </div>
              </div>

              {/* Product Details */}
              <div className="space-y-6">
                <h1 className="text-3xl font-bold text-gray-900 hover:text-pink-600 transition-colors duration-300">
                  {productTest.name}
                </h1>
                <div className="flex items-center space-x-2">
                  <StarRating rating={productTest.averageRatings} />
                  <span className="text-sm text-gray-500 hover:text-pink-500 transition-colors duration-300">
                    ({productTest.numberOfreviews} reviews)
                  </span>
                </div>
                <p className="text-3xl font-bold text-gray-900 hover:text-pink-600 transition-colors duration-300">
                  ${productTest.actualPrice.toFixed(2)}
                </p>
                <p className="text-gray-600 hover:text-gray-800 transition-colors duration-300">
                  {productTest.description}
                </p>

                {/* Category Icons */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">
                    Product Categories
                  </h3>
                  <div className="flex flex-wrap gap-4">
                    {productTest.categoryNames.map((category) => (
                      <div
                        key={category}
                        className="flex flex-col items-center group"
                      >
                        <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center group-hover:bg-pink-200 transition-colors duration-300">
                          {iconsForCategories.map((categoryIcon) =>
                            categoryIcon.name === category ? (
                              <categoryIcon.icon className="w-6 h-6 text-pink-500" />
                            ) : (
                              ""
                            )
                          )}
                        </div>
                        <span className="mt-1 text-xs text-gray-600 group-hover:text-pink-600 transition-colors duration-300">
                          {category}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quantity Selection */}
                <div className="flex items-center space-x-3">
                  <Label
                    htmlFor="quantity"
                    className="text-sm font-medium text-gray-900"
                  >
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
                  {isAddedTocart ? (
                    <>
                      <div className="flex-1 text-center bg-green-500 text-white">
                        Your item was added
                      </div>
                    </>
                  ) : (
                    <>
                      <Button
                        className="flex-1 bg-pink-500 text-white hover:bg-pink-600 transition-colors duration-300 transform hover:scale-105"
                        onClick={handleAddToCartState}
                      >
                        Add to Cart
                      </Button>
                      {isError ? (
                        <StatusPopup
                          status="failure"
                          message="Item quantity cannot be zero or empty"
                          actionLabel="Change your item's quantity"
                          onAction={() => setQuantity(1)}
                        />
                      ) : (
                        ""
                      )}
                    </>
                  )}
                  <LikeButton size="sm" onLikeChange={handleLike} />
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
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger
                  value="features"
                  className="hover:bg-pink-50 transition-colors duration-300"
                >
                  Features
                </TabsTrigger>
                <TabsTrigger
                  value="reviews"
                  className="hover:bg-pink-50 transition-colors duration-300"
                >
                  Reviews
                </TabsTrigger>
              </TabsList>
              <TabsContent value="features" className="mt-6">
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  {productTest.bulletPoints.map((feature, index) => (
                    <li
                      key={index}
                      className="hover:text-pink-600 transition-colors duration-300"
                    >
                      {feature}
                    </li>
                  ))}
                </ul>
              </TabsContent>
              <TabsContent value="reviews" className="mt-6">
                <div className="space-y-8">
                  {/* Review Summary */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 hover:text-pink-600 transition-colors duration-300">
                        Customer Reviews
                      </h3>
                      <div className="flex items-center mt-1">
                        <StarRating rating={productTest.averageRatings} />
                        <span className="ml-2 text-sm text-gray-500 hover:text-pink-500 transition-colors duration-300">
                          {productTest.averageRatings} out of 5
                        </span>
                      </div>
                    </div>
                    {isBoughtProduct && !isBoughtProductHasReview ? (
                      <ReviewForm onSubmit={onSubmit} isSubmitting={isPending}>
                        <Pencil className="mr-2 h-4 w-4" /> Add Review
                      </ReviewForm>
                    ) : isBoughtProduct && isBoughtProductHasReview ? (
                      <ReviewForm
                        size="sm"
                        className="border-green-600 text-green-600 hover:bg-pink-50"
                        onSubmit={({
                          sentiment,
                          content,
                          rating,
                        }: {
                          sentiment: string;
                          content: string;
                          rating: number;
                        }) =>
                          handleReviewUpdate({
                            sentiment,
                            reviewId: productTest.productId,
                            content,
                            rating,
                          })
                        }
                        isSubmitting={updatingReviews}
                      >
                        <Star className="mr-2 h-4 w-4" /> Edit Review
                      </ReviewForm>
                    ) : (
                      <Button className=" bg-red-500 text-white hover:bg-red-600 transition-colors duration-300 transform hover:scale-105">
                        Only Bought Products can be reviewd
                      </Button>
                    )}
                  </div>

                  {/* Individual Reviews */}
                  <div className="space-y-6">
                    {productTest.reviews === undefined ? (
                      <Card className="w-full max-w-md mx-auto">
                        <CardContent className="flex flex-col items-center justify-center p-6">
                          <MessageSquare className="w-12 h-12 text-gray-400 mb-4" />
                          <h3 className="text-xl font-semibold text-gray-800 mb-2">
                            No Reviews Yet
                          </h3>
                          <p className="text-gray-600 text-center">
                            Be the first to share your thoughts on this product!
                          </p>
                        </CardContent>
                      </Card>
                    ) : (
                      productTest.reviews.map((review) => (
                        <div
                          key={review.reviewId}
                          className="border-t border-gray-200 pt-6 group"
                        >
                          <div className="flex items-center mb-4">
                            <Avatar className="h-10 w-10 group-hover:ring-2 group-hover:ring-pink-500 transition-all duration-300">
                              <AvatarFallback>{review.userName}</AvatarFallback>
                            </Avatar>
                            <div className="ml-4">
                              <h4 className="text-sm font-semibold text-gray-900 group-hover:text-pink-600 transition-colors duration-300">
                                {review.userName}
                              </h4>
                              <div className="flex items-center">
                                <StarRating rating={review.rating} />
                                <span className="ml-2 text-sm text-gray-500 group-hover:text-pink-500 transition-colors duration-300">
                                  {review.date}
                                </span>
                              </div>
                            </div>
                          </div>
                          <p className="text-gray-600 mb-4 group-hover:text-gray-800 transition-colors duration-300">
                            {review.comment}
                          </p>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Load More Reviews */}

                  <div className="text-center">
                    {isRendered ? (
                      <Button
                        variant="outline"
                        className="text-pink-500 hover:text-pink-600 hover:bg-pink-50 transition-colors duration-300 transform hover:scale-105"
                        onClick={() =>
                          setCurrentReviewsPage((prev) => prev + 1)
                        }
                      >
                        Load More Reviews
                        <ChevronRight className="h-4 w-4 ml-2" />
                      </Button>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  ) : (
    <ProductNotFound />
  );
}
