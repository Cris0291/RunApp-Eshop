import { useAppSelector } from "@/app/hooks/reduxHooks";
import { getUserToken } from "../../registration/userSlice";
import { useMutation } from "@tanstack/react-query";
import { ModifyOrderPaymentMethod } from "@/app/services/apiOrders";
import { PaymentSettingsForm } from "./contracts";
import toast from "react-hot-toast";

export default function useModifyOrderPaymentMethod(){
    const token = useAppSelector(getUserToken);

    const {mutate: updateOrderPamentMethod} = useMutation({
        mutationFn: ({orderId, paymentInfo}: {orderId: string, paymentInfo: PaymentSettingsForm}) => ModifyOrderPaymentMethod({orderId, paymentInfo, token}),
        onSuccess: () => {
            toast.success("Your payment method was updated correctly");
          },
          onError: () => toast.error("Something unexpected happened. Your payment method was not updated")
    })

    return {updateOrderPamentMethod};
}