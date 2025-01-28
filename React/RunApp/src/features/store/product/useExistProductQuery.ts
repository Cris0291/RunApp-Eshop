import { ExistProduct } from "@/services/apiProduct";
import { useQuery } from "@tanstack/react-query";

export default function useExistProductQuery(id: string) {
  const {
    refetch: existProduct,
    isError,
    isLoading,
    data,
  } = useQuery({
    queryKey: ["ExistProduct"],
    queryFn: () => ExistProduct(id),
    enabled: false,
  });

  return { existProduct, isError, isLoading, data };
}
