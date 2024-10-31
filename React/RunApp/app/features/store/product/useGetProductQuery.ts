import GetProduct from "@/app/services/apiProduct";
import { useQuery } from "@tanstack/react-query";
import { Product } from "./contracts";



export default function useGetProductQuery(query: string){
    const {isLoading, data: product, error} = useQuery({
        queryFn: () => GetProduct(query),
        queryKey: ["product"]
    });

   const newProduct =product ?? {
    id: "",
    name: "",
    description: "",
    price: 0,
    bulletPoints: [],
    priceWithDiscount: undefined,
    promotionalText: undefined,
    discount: undefined,
    numberOfreviews: 0,
    averageRating: 0,
    reviews: [],
    images: [],
}

    return {isLoading, newProduct, error}
}

