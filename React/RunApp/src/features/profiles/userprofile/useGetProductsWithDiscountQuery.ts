import { getProductsWithDiscount } from "@/services/apiProducts";
import { useQuery } from "@tanstack/react-query";

export default function useGetProductsWithDiscountQuery() {
  const {
    data: productsWithDiscount,
    isLoading: loadingProductsWithDiscount,
    error,
    isError,
  } = useQuery({
    queryKey: ["ProductsWithDiscount"],
    queryFn: () => getProductsWithDiscount(),
  });

  return { productsWithDiscount, loadingProductsWithDiscount, error, isError };
}
