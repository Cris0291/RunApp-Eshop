import { useAppSelector } from "@/app/hooks/reduxHooks";
import { getUserToken } from "../../registration/userSlice";
import { useMutation } from "@tanstack/react-query";
import { ModifyOrderAddress } from "@/app/services/apiOrders";
import { AddressSettingsForm } from "./contracts";
import toast from "react-hot-toast";

export default function useModifyOrderAddress(){
    const token = useAppSelector(getUserToken);

    const {mutate: updateOrderAddress} = useMutation({
        mutationFn: ({orderId, addressInfo}: {orderId: string, addressInfo: AddressSettingsForm}) => ModifyOrderAddress({orderId, addressInfo, token}),
        onSuccess: () => {
            toast.success("Your order address was updated correctly");
          },
          onError: () => toast.error("Something unexpected happened. Your order order address was not updated")
    });

    return {updateOrderAddress};
}