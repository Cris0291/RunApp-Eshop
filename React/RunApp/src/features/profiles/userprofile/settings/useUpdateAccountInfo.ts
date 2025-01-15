import { UpdateAccountInfo } from "@/app/services/apiSettings";
import { useMutation} from "@tanstack/react-query";
import { AccountSettingsForm } from "./contracts";

export default function useUpdateAccountInfo(){

    const {mutate: updateUserAccountInfo, isPending: updatingUserAccount} = useMutation({
        mutationFn: (accountInfo : AccountSettingsForm) => UpdateAccountInfo({accountInfo}),
    })

    return {updateUserAccountInfo, updatingUserAccount}
}