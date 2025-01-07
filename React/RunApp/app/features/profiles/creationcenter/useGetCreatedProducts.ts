import { useAppSelector } from "@/app/hooks/reduxHooks";
import { getUserToken } from "../../registration/userSlice";
import { useQuery } from "@tanstack/react-query";
import { GetCreatedProducts } from "@/app/services/apiProduct";

export default function useGetCreatedProducts(){
    const token = useAppSelector(getUserToken);

    const {data: productCreated, isLoading, error, isError} = useQuery({
        queryKey: ["CreatedProducts"],
        queryFn: () => GetCreatedProducts(token)
    })

    return {productCreated, isLoading, error, isError};
}