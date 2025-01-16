import { ProductsQuery } from "./contracts";
import HeaderProducts from "./HeaderProducts";
import MainPageProductsServerSide from "./MainPageProductsServerSide";
import { useState } from "react";
import useGetProductsQuery from "./useGetProductsQuery";
import toast from "react-hot-toast";
import { useGlobal } from "@/utils/GlobalProvider";

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
      <HeaderProducts
        handleSearch={handleSearch}
        search={search}
        handleSubmit={handleSubmit}
      />
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
