import { getUserToken } from "@/app/features/registration/userSlice";
import { useAppSelector } from "@/app/hooks/reduxHooks";
import { UpdateAccountInfo } from "@/app/services/apiSettings";
import { useMutation } from "@tanstack/react-query";
import { AccountSettingsForm } from "./contracts";

export default function useUpdateAccountInfo(){
    const token = useAppSelector(getUserToken)

    const {mutate: updateUserAccountInfo, isPending: updatingUserAccount} = useMutation({
        mutationFn: (accountInfo : AccountSettingsForm) => UpdateAccountInfo({accountInfo, token})
    })

    return {updateUserAccountInfo, updatingUserAccount}
}