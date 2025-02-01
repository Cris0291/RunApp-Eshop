import { useQuery } from "@tanstack/react-query";
import { GetCreatedProducts } from "@/services/apiProduct";

export default function useGetCreatedProducts() {
  const {
    data: products,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["CreatedProducts"],
    queryFn: () => GetCreatedProducts(),
  });

  return { products, isLoading, error, isError };
}
