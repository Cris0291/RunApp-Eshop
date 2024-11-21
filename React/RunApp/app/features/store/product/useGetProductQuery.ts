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

