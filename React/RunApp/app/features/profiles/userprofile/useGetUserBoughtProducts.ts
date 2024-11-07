import { useAppSelector } from "@/app/hooks/reduxHooks";
import { GetUserBoughtProducts } from "@/app/services/apiUserProfle";
import { useQuery } from "@tanstack/react-query";
import { getUserToken } from "../../registration/userSlice";

export default function useGetuserBoughtProducts(){
    const token = useAppSelector(getUserToken)

    const {data: userBoughtProducts, isLoading: loadingProducts} = useQuery({
        queryKey: ["userBoughtProducts"],
        queryFn: () => GetUserBoughtProducts(token)
    })
    return {userBoughtProducts, loadingProducts}
}