import GetProduct from "@/app/services/apiProduct";
import { useQuery } from "@tanstack/react-query";

export default function useGetProductQuery(query: string){
    const {isLoading, data: product, error} = useQuery({
        queryFn: () => GetProduct(query),
        queryKey: ["product"]
    });

    return {isLoading, product, error}
}