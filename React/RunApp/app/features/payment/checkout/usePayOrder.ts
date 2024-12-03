import { useAppSelector } from "@/app/hooks/reduxHooks";
import { getUserToken } from "../../registration/userSlice";
import { useMutation } from "@tanstack/react-query";
import { PayOrder } from "@/app/services/apiOrders";

export default function usePayOrder(){
    const token = useAppSelector(getUserToken);

    const {mutate: payOrder} = useMutation({
        mutationFn: (orderId: string) => PayOrder({orderId, token})
    });

    return {payOrder};
}