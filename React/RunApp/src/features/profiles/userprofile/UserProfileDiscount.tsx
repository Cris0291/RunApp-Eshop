import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Check } from "lucide-react";
import useGetProductsWithDiscountQuery from "./useGetProductsWithDiscountQuery";
import LikeButton from "@/ui/LikeButton";
import useAddOrRemoveLikeHook from "@/hooks/useAddOrRemoveLikeHook";
import { useAppSelector, useAppDispatch } from "@/hooks/reduxHooks";
import { ProductForCardWithDiscount } from "../../store/products/contracts";
import ProductLoadingCard from "@/ui/ProductLoadingCard";
import NoProductsFound from "@/ui/NoProductsFound";
import {
  addCartError,
  addItem,
  getCartError,
} from "../../payment/shoppingcart/cartSlice";
import NoImagePlaceholder from "@/ui/NoImagePlaceholder";

export default function UserProfileDiscount() {
  const dispatch = useAppDispatch();
  const [isAddedToCart, setIsAddedToCart] = useState<string[]>([]);
  const { products, loadingProductsWithDiscount, error, isError } =
    useGetProductsWithDiscountQuery();
  const { AddOrRemoveLikeMutation } = useAddOrRemoveLikeHook();
  const cartError = useAppSelector(getCartError);

  useEffect(() => {
    if (cartError !== undefined) {
      const tempCartError = cartError;
      dispatch(addCartError(undefined));
      throw new Error(tempCartError);
    }
  }, [cartError, dispatch]);

  const handleAddToCartState = (product: ProductForCardWithDiscount) => {
    const productForCart = {
      name: product.productName,
      id: product.productId,
      quantity: 1,
      price: product.price,
      priceWithDiscount:
        product.priceWithDiscount === null ? null : product.priceWithDiscount,
      totalPrice: product.price * 1,
    };

    dispatch(addItem(productForCart));
    setIsAddedToCart((prev) => {
      const isIncluded = prev.includes(product.productId);
      if (isIncluded) return prev;
      return [...prev, product.productId];
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 text-pink-600">
        Special Offers
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loadingProductsWithDiscount ? (
          <ProductLoadingCard />
        ) : products !== undefined && !isError ? (
          products.map((product) => (
            <motion.div
              key={product.productId}
              className="h-full"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            >
              <Card className="h-full flex flex-col overflow-hidden bg-white border-pink-500 border-2 shadow-lg">
                <CardHeader className="p-0 flex-shrink-0">
                  <div className="relative aspect-w-16 aspect-h-9">
                    {product.image !== null ? (
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.productName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <NoImagePlaceholder />
                    )}
                    <Badge className="absolute top-2 right-2 bg-pink-500 text-white">
                      {product.discount?.toFixed()}% OFF
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-4 flex-grow">
                  <div className="flex justify-between items-start space-x-2 mb-2">
                    <CardTitle className="text-lg sm:text-xl text-gray-800 line-clamp-2">
                      {product.productName}
                    </CardTitle>
                    <LikeButton
                      onLikeChange={(like: boolean) =>
                        AddOrRemoveLikeMutation({
                          liked: like,
                          productId: product.productId,
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center space-x-2 mt-2">
                    <span className="text-xl sm:text-2xl font-bold text-pink-600">
                      ${product.priceWithDiscount?.toFixed(2)}
                    </span>
                    <span className="text-sm line-through text-gray-500">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  {isAddedToCart.includes(product.productId) ? (
                    <Button className="w-full bg-green-500 text-white">
                      <Check className="mr-2 h-4 w-4" /> Added to cart
                    </Button>
                  ) : (
                    <Button
                      className="w-full bg-pink-500 hover:bg-pink-600 text-white transition-colors duration-300"
                      onClick={() => handleAddToCartState(product)}
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </motion.div>
          ))
        ) : (
          <NoProductsFound />
        )}
      </div>
    </div>
  );
}
