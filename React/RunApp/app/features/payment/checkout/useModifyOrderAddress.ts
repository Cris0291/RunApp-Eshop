import { useAppSelector } from "@/app/hooks/reduxHooks";
import { getUserToken } from "../../registration/userSlice";
import { useMutation } from "@tanstack/react-query";
import { ModifyOrderAddress } from "@/app/services/apiOrders";
import { AddressSettingsForm } from "./contracts";

export default function useModifyOrderAddress(){
    const token = useAppSelector(getUserToken);

    const {mutate: updateOrderAddress} = useMutation({
        mutationFn: ({orderId, addressInfo}: {orderId: string, addressInfo: AddressSettingsForm}) => ModifyOrderAddress({orderId, addressInfo, token})
    });

    return {updateOrderAddress};
}