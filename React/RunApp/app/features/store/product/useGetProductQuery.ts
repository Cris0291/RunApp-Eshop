import {GetProduct} from "@/app/services/apiProduct";
import { useQuery } from "@tanstack/react-query";
import { useAppSelector } from "@/app/hooks/reduxHooks";
import { getUserToken } from "../../registration/userSlice";



export default function useGetProductQuery(query: string){
    const token = useAppSelector(getUserToken)
    const {isLoading, data: product, error} = useQuery({
        queryFn: () => GetProduct(query, token),
        queryKey: ["product"]
    });


    return {isLoading, product, error}
}

