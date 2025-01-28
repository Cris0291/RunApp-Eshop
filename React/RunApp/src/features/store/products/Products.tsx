import { ProductsQuery } from "./contracts";
import MainPageProductsServerSide from "./MainPageProductsServerSide";
import { useState } from "react";
import useGetProductsQuery from "./useGetProductsQuery";
import { useGlobal } from "@/utils/GlobalProvider";
import { Link } from "react-router";
import { Dumbbell, Search, ShoppingCart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function Products() {
  const { searchQuery } = useGlobal();
  const [firstRefetch, setFirstRefetch] = useState<boolean>();
  const [priceRange, setPriceRange] = useState<number[]>([0, 300]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("SimpleOrder");
  const [starFilters, setStarFilters] = useState<number[]>([]);
  const [search, setSearch] = useState(() => {
    setFirstRefetch(true);
    return searchQuery.trim().length == 0 ? "all" : searchQuery;
  });

  let queryValues: ProductsQuery = {
    sortBy,
    search,
    priceRange,
    categories: selectedCategories,
    starFilters,
  };
  console.log("another test");
  const { isLoading, products, refetch, error, isError } =
    useGetProductsQuery(queryValues);

  if (firstRefetch) {
    setFirstRefetch(false);
    refetch();
  }

  const handleSelectedCategories = (categories: string[]) => {
    setSelectedCategories(categories);
  };

  const handlePriceRange = (priceRange: number[]) => {
    setPriceRange(priceRange);
  };

  const handleSortBy = (sort: string) => {
    setSortBy(sort);
  };

  const handleSearch = (search: string) => {
    setSearch(search);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    queryValues = {
      sortBy,
      search,
      priceRange,
      categories: selectedCategories,
      starFilters,
    };
    refetch();
  };

  const handleStarFilterChange = (star: number) => {
    const updatedStarFilters = starFilters.includes(star)
      ? starFilters.filter((s) => s !== star)
      : [...starFilters, star];
    setStarFilters(updatedStarFilters);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link className="flex items-center justify-center" to="/">
            <Dumbbell className="h-8 w-8 text-green-600" />
            <span className="ml-2 text-2xl font-bold text-gray-900">
              FitGear
            </span>
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
            <Button
              variant="outline"
              size="icon"
              className="border-black text-black"
            >
              <Link to="/userprofile">
                <User className="h-5 w-5" />
                <span className="sr-only">Menu</span>
              </Link>
            </Button>
          </div>
        </div>
      </header>
      <MainPageProductsServerSide
        handleSelectedCategories={handleSelectedCategories}
        handlePriceRange={handlePriceRange}
        handleSortBy={handleSortBy}
        priceRange={priceRange}
        sortBy={sortBy}
        selectedCategories={selectedCategories}
        handleSubmit={handleSubmit}
        handleStarFilterChange={handleStarFilterChange}
        starFilters={starFilters}
        products={products}
        error={error}
        isError={isError}
        isLoading={isLoading}
      />
    </div>
  );
}

export default Products;
