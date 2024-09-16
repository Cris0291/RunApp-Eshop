import Header from "@/app/ui/Header";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Truck, Award } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-black">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <Image
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
                  <p className="max-w-[600px] texr-gray-300 md:text-xl">
                    Discover premium fitness gear to help you reach your goals.
                    Shop our curated collection of high-quality equipment and
                    accessories.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    className="inline-flex h-10 items-center justify-center rounded-md bg-white px-8 text-sm font-medium text-black shadow transition-colors hover:bg-gray-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
                    href="#"
                  >
                    Shop Now
                  </Link>
                  <Link
                    className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
                    href="#"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold text-black tracking-tighter sm:text-5xl text-center mb-8">
              Featured Products
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-col-4">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div className="relative group overflow-hidden rounded-lg">
                  <Image
                    alt={`Product ${item}`}
                    className="object-cover w-full h-60"
                    height="300"
                    src="https://images.unsplash.com/photo-1709258228137-19a8c193be39?q=80&w=1411&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    style={{
                      aspectRatio: "400/300",
                      objectFit: "cover",
                    }}
                    width="400"
                  />
                  <div className="absolute inset-0 flex items-end justify-center p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button className="w-full">Add to Cart</Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-8">
              Why Choose Us
            </h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <ShoppingCart className="h-12 w-12 mb-4  text-green-600" />
                <h3 className="text-xl font-bold mb-2">Wide Selection</h3>
                <p className="text-gray-500">
                  Curated collection of top-quality fitness equipment and
                  accessories.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Truck className="h-12 w-12 mb-4 text-green-600" />
                <h3 className="text-xl font-bold mb-2">Fast Shipping</h3>
                <p className="text-gray-500">
                  Quick and reliable delivery to your doorstep.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Award className="h-12 w-12 mb-4 text-green-600" />
                <h3 className="text-xl font-bold mb-2">Expert Advice</h3>
                <p className="text-gray-500">
                  Get guidance from fitness professionals to make informed
                  choices.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-white">
        <p className="text-xs text-gray-500">
          © 2023 FitGear Inc. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-xs hover:underline underline-offset-4 text-black"
            href="#"
          >
            Terms of Service
          </Link>
          <Link
            className="text-xs hover:underline underline-offset-4 text-black"
            href="#"
          >
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}

export default LandingPage;
