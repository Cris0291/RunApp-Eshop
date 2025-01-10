import registerRequest from "@/app/services/apiRegister";
import { useMutation } from "@tanstack/react-query";
import { setUser } from "./userSlice";
import { useRouter } from 'next/navigation'
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { TokenModel, UserSession } from "./contracts";


export default function useRegisterUser(){
    const router = useRouter();
    const dispatch = useDispatch();

    const {mutate, isPending, data: user} = useMutation({
        mutationFn: registerRequest,
        onSuccess: (data) => {
            toast.success("User was registered correctly");

            const accessToken: TokenModel = {token: data.token, refreshToken: data.refreshToken, refreshTokenExpirationDate: data.refreshTokenExpirationDate}; 
            localStorage.setItem("tokenModel", JSON.stringify(accessToken));

            const user: UserSession = {name: data.name, userName: data.userName, email: data.email};
            localStorage.setItem("userSession", JSON.stringify(user)); 

            dispatch(setUser({name: data.name, userName: data.userName, email: data.email}))
            router.push("/")
        },
        onError: (error) =>  {
            toast.error(`${error.message}: User was not registered. Something unexpected happened`);
        },
    });
    return {mutate, isPending};
}