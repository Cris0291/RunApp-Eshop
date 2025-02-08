import { HeaderBody } from "@/ui/HeaderBody";
import { useAuth } from "@/utils/AuhtProvider";
import { ShoppingCart, Truck, Award } from "lucide-react";

import { Link } from "react-router";

export default function HomePage() {
  const { authStatus } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white shadow-sm">
        <div className="container max-auto px-4 py-4 flex flex-col items-center space-y-4 sm:flex-row sm:justify-between sm:space-y-0">
          <Link className="flex items-center justify-center" to="/">
            <ShoppingCart className="h-6 w-6 text-green-600" />
            <span className="ml-2 text-xl font-bold text-gray-800">
              FitStore
            </span>
          </Link>
          <HeaderBody isRegisterd={authStatus} />
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-black">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <img
                alt="Hero"
                height="550"
                width="550"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg: order-last"
                src="https://images.unsplash.com/photo-1517964603305-11c0f6f66012?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              />
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter text-white sm:text-5xl xl:text-6xl/none">
                    Elevate Your Fitness Journey
                  </h1>
                  <p className="max-w-[600px] text-gray-300 md:text-xl">
                    Discover premium fitness gear to help you reach your goals.
                    Shop our curated collection of high-quality equipment and
                    accessories.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    className="inline-flex h-10 items-center justify-center rounded-md bg-white px-8 text-sm font-medium text-black shadow transition-colors hover:bg-gray-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
                    to={authStatus ? "/products" : "/register"}
                  >
                    {authStatus ? "Shop Now" : "Register"}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-8 text-black">
              Why Choose Us
            </h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <ShoppingCart className="h-12 w-12 mb-4  text-green-600" />
                <h3 className="text-xl font-bold mb-2 text-black">
                  Wide Selection
                </h3>
                <p className="text-gray-500">
                  Curated collection of top-quality fitness equipment and
                  accessories.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Truck className="h-12 w-12 mb-4 text-green-600" />
                <h3 className="text-xl font-bold mb-2 text-black">
                  Fast Shipping
                </h3>
                <p className="text-gray-500">
                  Quick and reliable delivery to your doorstep.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Award className="h-12 w-12 mb-4 text-green-600" />
                <h3 className="text-xl font-bold mb-2 text-black">
                  Expert Advice
                </h3>
                <p className="text-gray-500">
                  Get guidance from fitness professionals to make informed
                  choices.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-black">
        <p className="text-xs text-gray-500">
          © 2023 FitGear Inc. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6"></nav>
      </footer>
    </div>
  );
}
