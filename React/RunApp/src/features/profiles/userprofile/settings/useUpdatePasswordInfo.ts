import { UpdatePasswordInfo } from "@/services/apiSettings";
import { useMutation } from "@tanstack/react-query";
import { PasswordUpdatedSettings } from "./contracts";

export default function useUpdatePasswordInfo(){

    const {mutate: updatePassword, isPending: updatingPassword} = useMutation({
        mutationFn: (passwordInfo: PasswordUpdatedSettings) => UpdatePasswordInfo({passwordInfo})
    })

    return {updatePassword, updatingPassword};
}