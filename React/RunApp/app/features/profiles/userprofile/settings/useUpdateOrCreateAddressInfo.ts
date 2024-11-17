import { useMutation } from "@tanstack/react-query";
import { AddressSettingsForm } from "./contracts";
import { CreateAddressInfo, UpdateAddressInfo } from "@/app/services/apiSettings";

export default function useUpdateOrCreateAddressInfo(token: string){

    const {mutate: updateOrCreateAddress, isPending: updatingOrCreatingAddress} = useMutation({
        mutationFn: ({addressInfo, wasCreated}: {addressInfo: AddressSettingsForm, wasCreated: boolean}) => {
            const result = wasCreated ? UpdateAddressInfo : CreateAddressInfo;
            return result({addressInfo, token});

        }
    })

    return {updateOrCreateAddress, updatingOrCreatingAddress}
}