import loginRequest from "@/app/services/apiLogin";
import { useMutation } from "@tanstack/react-query";
import { setUser } from "../registration/userSlice";



export default function useLoginUser(){
    const {mutate : loginUser, isPending} = useMutation({
        mutationFn: loginRequest,
        onSuccess: (data) => {
            setUser(data)
        }
    })

    return {loginUser, isPending}
}