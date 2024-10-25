import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dumbbell, Menu, Search, ShoppingCart } from "lucide-react";
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
        <Link className="flex items-center justify-center" href="#">
          <Dumbbell className="h-8 w-8 text-green-600" />
          <span className="ml-2 text-2xl font-bold text-gray-900">FitGear</span>
        </Link>
        <div className="flex-1 max-w-xl mx-auto px-4">
          <div className="relative">
            <form onSubmit={handleSubmit}>
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              className="pl-10 pr-4 py-2 w-full"
              placeholder="Search for fitness products..."
              type="search"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
            />
            </form>
          </div>
        </div>
        <div className="flex items-center">
          <Button className="mr-2" size="icon" variant="outline">
            <ShoppingCart className="h-5 w-5" />
            <span className="sr-only">Cart</span>
          </Button>
          <Button variant="outline" size="icon">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Menu</span>
          </Button>
        </div>
      </div>
    </header>
  );
}

export default HeaderProducts;
