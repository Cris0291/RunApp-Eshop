import { useQuery } from "@tanstack/react-query";
import { GetCreatedProducts } from "@/services/apiProduct";

export default function useGetCreatedProducts() {
  const {
    data: productCreated,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["CreatedProducts"],
    queryFn: () => GetCreatedProducts(),
  });

  return { productCreated, isLoading, error, isError };
}
