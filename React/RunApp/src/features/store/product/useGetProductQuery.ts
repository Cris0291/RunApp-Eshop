import { GetProduct } from "@/services/apiProduct";
import { useQuery } from "@tanstack/react-query";

export default function useGetProductQuery(query: string) {
  const {
    isLoading,
    data: product,
    error,
    isError: isGetProductError,
  } = useQuery({
    queryFn: () => GetProduct(query),
    queryKey: ["product"],
    gcTime: 500,
  });

  return { isLoading, product, error, isGetProductError };
}
