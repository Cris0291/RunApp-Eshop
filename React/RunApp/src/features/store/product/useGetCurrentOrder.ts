import { GetCurrentOrder } from "@/services/apiOrders";
import { useQuery } from "@tanstack/react-query";

export default function useGetCurrentOrder() {
  const {
    isError,
    isLoading,
    data: orderWrapper,
    isSuccess,
  } = useQuery({
    queryKey: ["CurrentOrder"],
    queryFn: () => GetCurrentOrder(),
  });

  return { isError, isLoading, orderWrapper, isSuccess };
}
