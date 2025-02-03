import { Heart, ShoppingCart, Star } from "lucide-react";
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
import SpinnerCard from "@/ui/SpinnerCard";
import ReviewForm from "@/ui/ReviewForm";
import useUpdateUserReview from "./useUpdateUserReview";
import useGetuserBoughtProducts from "./useGetUserBoughtProducts";
import useAddOrRemoveLikeHook from "@/hooks/useAddOrRemoveLikeHook";
import MapCategories from "@/services/categoryMapper";
import SearchBar from "@/ui/SearchBar";
import NoProductsFound from "@/ui/NoProductsFound";
import { Link } from "react-router";
import LikeButton from "@/ui/LikeButton";

function UserProfilePageHome() {
  const [activeTab, setActiveTab] = useState("liked");
  const [unliked, setUnliked] = useState(false);
  const [key, setKey] = useState<string>();
  const {
    userReviews,
    loadingReviews,
    errorReviews,
    isErrorReview,
    reviewsFetch,
  } = useGetUserProfileReviews();
  const {
    userBoughtProducts,
    boughtFetch,
    loadingProducts,
    errorBoughtProducts,
    isErrorBoughtProduct,
  } = useGetuserBoughtProducts();
  const { userLikes, loadingLikes, errorLikes, isErrorLike, likesFetch } =
    useGetUserProfileLikes();
  const { updateReviewsMutation, updatingReviews } = useUpdateUserReview();
  const { AddOrRemoveLikeMutation } = useAddOrRemoveLikeHook();
  console.log(userLikes);
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
    const reviewDto = {
      comment: content,
      reviewDescription: sentiment,
      rating,
    };
    updateReviewsMutation({ reviewDto, productId: reviewId });
  };

  const handleLike = ({
    productId,
    like,
  }: {
    productId: string;
    like: boolean;
  }) => {
    AddOrRemoveLikeMutation({ liked: like, productId: productId });
  };

  switch (activeTab) {
    case "liked":
      likesFetch();
      break;
    case "reviewed":
      reviewsFetch();
      break;
    case "bought":
      boughtFetch();
      break;
  }

  return (
    <div className="container mx-auto space-y-6">
      <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md">
        <SearchBar />
      </div>

      <Tabs
        defaultValue="liked"
        className="space-y*4"
        value={activeTab}
        onValueChange={setActiveTab}
      >
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
          {loadingLikes ? (
            <SpinnerCard />
          ) : userLikes !== undefined && !isErrorLike ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {userLikes.map((product) => (
                  <TableRow key={product.productId}>
                    <TableCell className="font-medium text-black">
                      {product.productName}
                    </TableCell>
                    <TableCell className="font-medium text-black">
                      {`${product.productPrice}`}
                    </TableCell>
                    <TableCell className="text-right">
                      {
                        <LikeButton
                          initialLiked={product.like}
                          onLikeChange={(like: boolean) =>
                            handleLike({
                              productId: product.productId,
                              like: like,
                            })
                          }
                        />
                      }
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <NoProductsFound />
          )}
        </TabsContent>
        <TabsContent
          value="reviewed"
          className="bg-white p-6 rounded-lg shadow-md"
        >
          {loadingReviews ? (
            <SpinnerCard />
          ) : userReviews !== undefined && !isErrorReview ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Review Date</TableHead>
                  <TableHead>Review Description</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {userReviews.map((product) => (
                  <TableRow key={product.productId}>
                    <TableCell className="font-medium text-black">
                      {product.productName}
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
                      {
                        <ReviewForm
                          size="sm"
                          className="border-pink-600 text-pink-600 hover:bg-pink-50"
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
                              reviewId: product.productId,
                              content,
                              rating,
                            })
                          }
                          isSubmitting={updatingReviews}
                        >
                          <Star className="mr-2 h-4 w-4" /> Edit Review
                        </ReviewForm>
                      }
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <NoProductsFound />
          )}
        </TabsContent>
        <TabsContent
          value="bought"
          className="bg-white p-6 rounded-lg shadow-md"
        >
          {loadingProducts ? (
            <SpinnerCard />
          ) : userBoughtProducts !== undefined && !isErrorBoughtProduct ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {userBoughtProducts.map((product) => (
                  <TableRow key={product.productId}>
                    <TableCell className="font-medium text-black">
                      {product.name}
                    </TableCell>
                    <TableCell className="font-medium text-black">
                      {product.productPrice}
                    </TableCell>
                    <TableCell>
                      {
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${MapCategories(
                            product.category
                          )}`}
                        >
                          {product.category}
                        </span>
                      }
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-green-600 hover:bg-green-700 text-white"
                        asChild
                      >
                        {
                          <Link to={`/products/${product.productId}`}>
                            Buy Again
                            <ShoppingCart className="ml-2 h-4 w-4" />
                          </Link>
                        }
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <NoProductsFound />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default UserProfilePageHome;
