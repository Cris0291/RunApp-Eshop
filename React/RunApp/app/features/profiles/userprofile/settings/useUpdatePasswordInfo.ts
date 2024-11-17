import { UpdatePasswordInfo } from "@/app/services/apiSettings";
import { useMutation } from "@tanstack/react-query";
import { PasswordUpdatedSettings } from "./contracts";

export default function useUpdatePasswordInfo(token: string){

    const {mutate: updatePassword, isPending: updatingPassword} = useMutation({
        mutationFn: (passwordInfo: PasswordUpdatedSettings) => UpdatePasswordInfo({passwordInfo, token})
    })

    return {updatePassword, updatingPassword};
}