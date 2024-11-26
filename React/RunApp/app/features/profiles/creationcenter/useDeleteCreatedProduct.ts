import { useAppSelector } from "@/app/hooks/reduxHooks";
import { getUserToken } from "../../registration/userSlice";
import { useMutation } from "@tanstack/react-query";
import { DeleteProduct } from "@/app/services/apiProduct";

export default function useDeleteCreatedProduct(){
    const token = useAppSelector(getUserToken);

    const {mutate: deleteCreatedProduct} = useMutation({
        mutationFn: (productId: string) => DeleteProduct({productId, token})
    })

    return {deleteCreatedProduct};
}