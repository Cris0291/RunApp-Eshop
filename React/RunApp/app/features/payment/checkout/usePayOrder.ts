import { useMutation } from "@tanstack/react-query";
import { PayOrder } from "@/app/services/apiOrders";

export default function usePayOrder(){

    const {mutate: payOrder} = useMutation({
        mutationFn: (orderId: string) => PayOrder({orderId})
    });

    return {payOrder};
}