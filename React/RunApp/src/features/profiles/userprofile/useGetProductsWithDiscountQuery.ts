import { getProductsWithDiscount } from "@/services/apiProducts";
import { useQuery } from "@tanstack/react-query";

export default function useGetProductsWithDiscountQuery() {
  const {
    data: products,
    isLoading: loadingProductsWithDiscount,
    error,
    isError,
  } = useQuery({
    queryKey: ["ProductsWithDiscount"],
    queryFn: () => getProductsWithDiscount(),
  });

  return { products, loadingProductsWithDiscount, error, isError };
}
