import getProducts from "@/app/services/apiProducts";
import { useQuery } from "@tanstack/react-query";
import { ProductsQuery } from "./contracts";

export default function useGetProductsQuery(queryValues : ProductsQuery){
   
    const {isLoading, data: products, error} = useQuery({
        queryFn: () => getProducts(queryValues),
        queryKey: ["products"]
    })

    return {isLoading, products, error}
}