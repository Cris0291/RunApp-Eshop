import registerRequest from "@/app/services/apiRegister";
import { useMutation } from "@tanstack/react-query";
import { setUser } from "./userSlice";


export default function useRegisterUser(){
    const {mutate, isPending, isSuccess, data: user} = useMutation({
        mutationFn: registerRequest,
        onSuccess: (data) => {
            setUser(data);
        },
    });
    return {mutate, isPending, isSuccess};
}