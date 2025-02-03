import getProducts from "@/services/apiProducts";
import { useQuery } from "@tanstack/react-query";
import { ProductsQuery } from "./contracts";
import { useLocation, useNavigate } from "react-router";
import { useEffect } from "react";

export default function useGetProductsQuery({
  sortBy,
  search,
  categories,
  priceRange,
  starFilters,
}: ProductsQuery) {
  const location = useLocation();
  let navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  let queryParams = "";
  let starsString = starFilters.join(",");
  let categoriesString = categories.join(",");

  if (categories.length > 0) {
    params.set(`filterByCategory`, categoriesString);
  } else {
    params.delete(`filterByCategory`);
  }

  if (priceRange.length > 0) {
    for (let i = 0; i < priceRange.length; i++) {
      params.set(`filterByPrice[${i}]`, priceRange[i].toString());
    }
  }

  if (sortBy.length > 0) {
    params.set("sortBy", sortBy);
  }

  if (search.length > 0) {
    params.set("search", search);
  } else {
    params.set("search", "all");
  }

  if (starFilters.length > 0) {
    params.set("filterByStars", starsString);
  } else {
    params.delete("filterByStars");
  }

  queryParams = params.toString();
  console.log(`${queryParams}`);

  useEffect(() => {
    navigate({
      pathname: location.pathname,
      search: params.toString(),
    });
  }, [priceRange, sortBy, search, categories, starFilters]);

  const {
    isLoading,
    data: products,
    refetch,
    error,
    isError,
  } = useQuery({
    queryFn: () => getProducts(queryParams),
    queryKey: ["products", sortBy, search, categories, priceRange],
    enabled: false,
    gcTime: 500,
  });

  return { isLoading, products, refetch, error, isError };
}
