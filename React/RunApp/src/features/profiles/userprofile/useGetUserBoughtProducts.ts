import { GetUserBoughtProducts } from "@/services/apiUserProfle";
import { useQuery } from "@tanstack/react-query";

export default function useGetuserBoughtProducts() {
  const {
    data: userBoughtProducts,
    refetch: boughtFetch,
    isLoading: loadingProducts,
    error: errorBoughtProducts,
    isError: isErrorBoughtProduct,
  } = useQuery({
    queryKey: ["userBoughtProducts"],
    queryFn: () => GetUserBoughtProducts(),
    enabled: false,
  });
  return {
    userBoughtProducts,
    loadingProducts,
    errorBoughtProducts,
    isErrorBoughtProduct,
    boughtFetch,
  };
}
