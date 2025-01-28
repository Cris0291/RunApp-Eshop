import { OrderDto } from "@/features/payment/checkout/contracts";
import { CreateOrderRequest } from "@/services/apiOrders";
import { useMutation } from "@tanstack/react-query";

export default function useCreateOrder() {
  const {
    mutate: createOrder,
    isError,
    isPending,
  } = useMutation({
    mutationFn: (order: OrderDto) => CreateOrderRequest(order),
  });

  return { createOrder, isError, isPending };
}
