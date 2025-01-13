import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dumbbell, Menu, Search, ShoppingCart, User } from "lucide-react";
import Link from "next/link";

interface Props {
  handleSearch: (search: string) => void,
  search: string,
  handleSubmit: (e : React.FormEvent<HTMLFormElement>) => void
}

function HeaderProducts({handleSearch, search, handleSubmit}: Props) {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link className="flex items-center justify-center" href="/">
          <Dumbbell className="h-8 w-8 text-green-600" />
          <span className="ml-2 text-2xl font-bold text-gray-900">FitGear</span>
        </Link>
        <div className="flex-1 max-w-xl mx-auto px-4">
          <div className="relative">
            <form onSubmit={handleSubmit}>
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              className="pl-10 pr-4 py-2 w-full text-black"
              placeholder="Search for fitness products..."
              type="search"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
            />
            </form>
          </div>
        </div>
        <div className="flex items-center">
          <Button className="mr-2 border-green-500 text-black" size="icon" variant="outline" asChild>
            <Link href="/orders/cart">
            <ShoppingCart className="h-5 w-5" />
            <span className="sr-only">Cart</span>
            </Link>
          </Button>
          <Button variant="outline" size="icon" className="border-black text-black">
            <Link href="/userprofile">
            <User className="h-5 w-5" />
            <span className="sr-only">Menu</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

export default HeaderProducts;
