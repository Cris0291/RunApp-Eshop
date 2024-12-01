import { useAppSelector } from "@/app/hooks/reduxHooks";
import { getUserToken } from "../../registration/userSlice";
import { useMutation } from "@tanstack/react-query";
import { ModifyOrderPaymentMethod } from "@/app/services/apiOrders";
import { PaymentSettingsForm } from "./contracts";

export default function useModifyOrderPaymentMethod(){
    const token = useAppSelector(getUserToken);

    const {mutate: updateOrderPamentMethod} = useMutation({
        mutationFn: ({orderId, paymentInfo}: {orderId: string, paymentInfo: PaymentSettingsForm}) => ModifyOrderPaymentMethod({orderId, paymentInfo, token})
    })

    return {updateOrderPamentMethod};
}