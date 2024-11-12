import { useAppSelector } from "@/app/hooks/reduxHooks";
import { getProductsWithDiscount } from "@/app/services/apiProducts";
import { useQuery } from "@tanstack/react-query";
import { getUserToken } from "../../registration/userSlice";

export default function useGetProductsWithDiscountQuery(){
    const token = useAppSelector(getUserToken);

    const {data: productsWithDiscount, isLoading: loadingProductsWithDiscount} = useQuery({
        queryKey: ["ProductsWithDiscount"],
        queryFn: () => getProductsWithDiscount(token) 
    })

    return {productsWithDiscount, loadingProductsWithDiscount}
}