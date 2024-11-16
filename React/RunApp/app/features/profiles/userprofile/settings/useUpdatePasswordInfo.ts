import { getUserToken } from "@/app/features/registration/userSlice";
import { useAppSelector } from "@/app/hooks/reduxHooks";
import { UpdatePasswordInfo } from "@/app/services/apiSettings";
import { useMutation } from "@tanstack/react-query";
import { PasswordUpdatedSettings } from "./contracts";

export default function useUpdatePasswordInfo(){
    const token = useAppSelector(getUserToken)

    const {mutate: updatePassword, isPending: updatingPassword} = useMutation({
        mutationFn: (passwordInfo: PasswordUpdatedSettings) => UpdatePasswordInfo({passwordInfo, token})
    })

    return {updatePassword, updatingPassword};
}