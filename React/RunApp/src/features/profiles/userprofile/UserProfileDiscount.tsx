import { useEffect, useState } from "react";
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
import { useAppSelector } from "@/hooks/reduxHooks";
import { ProductForCardWithDiscount } from "../../store/products/contracts";
import ProductLoadingCard from "@/ui/ProductLoadingCard";
import NoProductsFound from "@/ui/NoProductsFound";
import {
  addCartError,
  addItem,
  getCartError,
} from "../../payment/shoppingcart/cartSlice";
import { useDispatch } from "react-redux";
import NoImagePlaceholder from "@/ui/NoImagePlaceholder";

export default function UserProfileDiscount() {
  const dispatch = useDispatch();
  const [isAddedTocart, setIsAddedToCart] = useState<string[]>([]);
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
  }, [cartError]);

  const handleAddToCartState = (product: ProductForCardWithDiscount) => {
    const productForCart = {
      name: product.productName,
      id: product.productId,
      quantity: 1,
      price: product.price,
      priceWithDiscount:
        product.priceWithDiscount === null
          ? undefined
          : product.priceWithDiscount,
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
    <>
      <h1 className="text-4xl font-bold text-center mb-8 text-pink-600">
        Special Offers
      </h1>
      <div
        className={
          products !== undefined && !isError && !loadingProductsWithDiscount
            ? "grid grid-cols-1 md:grid-cols-3 gap-6"
            : ""
        }
      >
        {loadingProductsWithDiscount ? (
          <ProductLoadingCard />
        ) : products !== undefined && !isError ? (
          products.map((product) => (
            <motion.div
              key={product.productId}
              className={`${
                product.size === "small"
                  ? "col-span-1 row-span-1"
                  : product.size === "medium"
                  ? "col-span-1 row-span-2"
                  : "col-span-2 row-span-2"
              }`}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            >
              <Card className="h-full overflow-hidden bg-white border-pink-500 border-2 shadow-lg ">
                <CardHeader className="p-0">
                  <div className="relative">
                    {product.image !== null ? (
                      <img
                        src={product.image}
                        alt={product.productName}
                        className="w-full h-48 object-cover"
                      />
                    ) : (
                      <NoImagePlaceholder />
                    )}
                    <Badge className="absolute top-2 right-2 bg-pink-500 text-white">
                      {product.discount}% OFF
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center space-x-2">
                    <CardTitle className="text-xl mb-2 text-gray-800">
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

                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-pink-600">
                      %15
                    </span>
                    <span className="text-sm line-through text-gray-500">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>
                </CardContent>
                <CardFooter>
                  {isAddedTocart.includes(product.productId) ? (
                    <Button className="w-full bg-green-500  text-white ">
                      <Check className="mr-2 h-4 w-4" /> Your item was added to
                      the cart
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
    </>
  );
}
