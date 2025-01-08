import loginRequest from "@/app/services/apiLogin";
import { useMutation } from "@tanstack/react-query";
import { setUser } from "../registration/userSlice";
import { setLogin } from "./loginSlice";
import { useAppDispatch } from "@/app/hooks/reduxHooks";
import toast from "react-hot-toast";
import { useRouter } from 'next/navigation'
import { TokenModel, UserSession } from "../registration/contracts";



export default function useLoginUser(){
    const dispatch = useAppDispatch();
    const router = useRouter();

    const {mutate : loginUser, isPending} = useMutation({
        mutationFn: loginRequest,
        onSuccess: (data) => {
            toast.success("log in was successful");

            const accessToken: TokenModel = {token: data.token, refreshToken: data.refreshToken, refreshTokenExpirationDate: data.refreshTokenExpirationDate}; 
            localStorage.setItem("tokenModel", JSON.stringify(accessToken));

            const user: UserSession = {name: data.name, userName: data.userName, email: data.email};
            localStorage.setItem("userSession", JSON.stringify(user)); 

            dispatch(setUser({name: data.name, userName: data.userName, email: data.email}))
            setLogin();

            router.push("/")
        },
        onError: () => toast.error("Something unexpected happened. User could not be logged in")
    })

    return {loginUser, isPending}
}