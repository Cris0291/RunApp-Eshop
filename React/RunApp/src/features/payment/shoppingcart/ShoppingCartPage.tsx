"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import {
  addCartError,
  changeItemQuantity,
  decreaseItemQuantity,
  deleteItem,
  getCartError,
  getCartItems,
  getTotalItems,
  getTotalPrice,
  increaseItemQuantity,
} from "./cartSlice";
import Spinner from "@/ui/Spinner";
import { setSearch } from "../../store/products/productsQuerySlice";
import HeaderProducts from "../../store/products/HeaderProducts";
import { useNavigate } from "react-router";

function ShoppingCartPage() {
  const [isRedirected, setIsRedirected] = useState(false);
  const [searchProduct, setSearchProduct] = useState("");
  let navigate = useNavigate();

  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(getCartItems);
  const total = useAppSelector(getTotalPrice);
  const itemCount = useAppSelector(getTotalItems);
  const cartError = useAppSelector(getCartError);

  useEffect(() => {
    if (cartError !== undefined) {
      const tempCartError = cartError;
      dispatch(addCartError(undefined));
      throw new Error(tempCartError);
    }
  }, [cartError]);

  const handleCheckout = () => {
    if (cartItems.length > 0) {
      navigate("checkout");
    } else {
      navigate("/products");
    }
    setIsRedirected(true);
  };

  const handleEmptyCart = () => {
    navigate("/products");
    setIsRedirected(true);
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

  return (
    <div>
      <HeaderProducts
        handleSearch={handleSearch}
        search={searchProduct}
        handleSubmit={handleSubmit}
      />
      <Separator />
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100 text-black">
        <h1 className="text-3xl font-bold mb-8 flex items-center text-black">
          <ShoppingCart className="mr-2" /> Your Shopping Cart
        </h1>
        {cartItems.length === 0 ? (
          <Card className="bg-white border-yellow-400">
            <CardContent className="pt-6">
              <Button
                className="w-full bg-yellow-400 text-black hover:bg-yellow-500 transition-colors duration-300"
                onClick={handleEmptyCart}
              >
                {isRedirected ? (
                  <Spinner />
                ) : (
                  "Your cart is empty!!! Go buy some products"
                )}
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4 pb-6 border-b border-yellow-200 last:border-b-0 transition-all duration-300 ease-in-out hover:bg-yellow-50 hover:shadow-md rounded-lg p-4"
                >
                  <div className="flex-grow space-y-2">
                    <h2 className="text-xl font-semibold text-black">
                      {item.name}
                    </h2>
                    <div className="flex justify-start items-center gap-2">
                      {item.priceWithDiscount === undefined ? (
                        <p className="font-semibold text-lg text-yellow-500">
                          $
                          {(
                            item.price *
                            (item.quantity === null ? 0 : item.quantity)
                          ).toFixed(2)}
                        </p>
                      ) : (
                        <>
                          <p className="text-yellow-500 text-lg line-through">
                            $
                            {(
                              item.price *
                              (item.quantity === null ? 0 : item.quantity)
                            ).toFixed(2)}
                          </p>
                          <p className="font-semibold text-red-500 text-lg">
                            $
                            {(
                              item.priceWithDiscount *
                              (item.quantity === null ? 0 : item.quantity)
                            ).toFixed(2)}
                          </p>
                        </>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => dispatch(decreaseItemQuantity(item.id))}
                        aria-label="Decrease quantity"
                        className="border-yellow-400 text-black hover:bg-yellow-100 transition-colors duration-300"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Input
                        type="number"
                        min="0"
                        value={item.quantity === null ? "" : item.quantity}
                        onChange={(e) =>
                          dispatch(
                            changeItemQuantity({
                              productId: item.id,
                              newQuantity: parseInt(e.target.value),
                            })
                          )
                        }
                        className="w-16 text-center border-yellow-400 text-black"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => dispatch(increaseItemQuantity(item.id))}
                        aria-label="Increase quantity"
                        className="border-yellow-400 text-black hover:bg-yellow-100 transition-colors duration-300"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => dispatch(deleteItem(item.id))}
                    className="text-black hover:text-yellow-600 hover:bg-yellow-100 self-start sm:self-end transition-colors duration-300"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Remove
                  </Button>
                </div>
              ))}
            </div>
            <div>
              <Card className="sticky top-4 bg-white border-yellow-400">
                <CardHeader>
                  <CardTitle className="text-black">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-black">
                      Subtotal ({itemCount} items)
                    </span>
                    <span className="text-black">${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-black">Shipping</span>
                    <span className="text-black">Free</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-black">Taxes</span>
                    <span className="text-black">Calculated at checkout</span>
                  </div>
                  <Separator className="bg-yellow-200" />
                  <div className="flex justify-between items-center text-lg font-semibold">
                    <span className="text-black">Total</span>
                    <span className="text-yellow-500">${total.toFixed(2)}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full bg-yellow-400 text-black hover:bg-yellow-500 transition-colors duration-300"
                    size="lg"
                    onClick={handleCheckout}
                    disabled={cartItems.length === 0}
                  >
                    {isRedirected ? (
                      <Spinner />
                    ) : cartItems.length > 0 ? (
                      "Proceed to Checkout"
                    ) : (
                      "Your cart is empty!!! Go buy some products"
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ShoppingCartPage;
