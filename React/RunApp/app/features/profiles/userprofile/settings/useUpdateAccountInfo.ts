import { UpdateAccountInfo } from "@/app/services/apiSettings";
import { useMutation } from "@tanstack/react-query";
import { AccountSettingsForm } from "./contracts";

export default function useUpdateAccountInfo(token: string){

    const {mutate: updateUserAccountInfo, isPending: updatingUserAccount} = useMutation({
        mutationFn: (accountInfo : AccountSettingsForm) => UpdateAccountInfo({accountInfo, token})
    })

    return {updateUserAccountInfo, updatingUserAccount}
}