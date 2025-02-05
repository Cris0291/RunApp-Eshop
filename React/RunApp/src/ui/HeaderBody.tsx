import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGlobal } from "@/utils/GlobalProvider";
import { FilePlus2, Search, ShoppingCart, User } from "lucide-react";
import { Link, useNavigate } from "react-router";

export function HeaderBody({ isRegisterd }: { isRegisterd: boolean }) {
  const { searchQuery, setSearchQuery } = useGlobal();
  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate("/products");
  };
  if (!isRegisterd) {
    return (
      <div className="flex items-center space-x-4">
        <nav className="md:flex space-x-4">
          <Button
            className="border-green-500 text-green-500 hover:bg-green-50"
            variant="outline"
            asChild
          >
            <Link to="/login">Login</Link>
          </Button>
          <Button
            className="bg-green-500 text-white hover:bg-green-600"
            asChild
            variant="outline"
          >
            <Link to="/register">Register</Link>
          </Button>
        </nav>
      </div>
    );
  }

  return (
    <>
      <div className="flex-1 max-w-xl mx-4">
        <div className="relative">
          <form onSubmit={handleSubmit}>
            <Input
              className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent text-black"
              placeholder="Search for products..."
              type="search"
              name="search"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
          </form>
        </div>
      </div>
      <div className="flex items-center space-x-1">
        <nav className="hidden md:flex space-x-6">
          <Button
            className="border-green-500 text-green-500 hover:bg-green-50"
            variant="outline"
            asChild
            size="icon"
          >
            <Link to="/userprofile">
              <User />
            </Link>
          </Button>
          <Button
            className="bg-green-500 text-white hover:bg-green-600"
            asChild
            variant="outline"
          >
            <Link to="/userprofile/creationcenter">
              <FilePlus2 />
            </Link>
          </Button>
        </nav>
        <Button
          className="mr-2 border-green-500 text-black"
          size="icon"
          variant="outline"
          asChild
        >
          <Link to="/orders/cart">
            <ShoppingCart className="h-5 w-5" />
            <span className="sr-only">Cart</span>
          </Link>
        </Button>
      </div>
    </>
  );
}
