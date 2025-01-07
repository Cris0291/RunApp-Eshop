import { useAppSelector } from "@/app/hooks/reduxHooks";
import { getUserToken } from "../../registration/userSlice";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeleteProduct } from "@/app/services/apiProduct";
import toast from "react-hot-toast";

export default function useDeleteCreatedProduct(){
    const token = useAppSelector(getUserToken);
    const queryClient = useQueryClient();

    const {mutate: deleteCreatedProduct} = useMutation({
        mutationFn: (productId: string) => DeleteProduct({productId, token}),
        onSuccess: () => {
            toast.success("requested action was successful")
            queryClient.invalidateQueries({
                queryKey: ["CreatedProducts"]
            })
        },
        onError: (error) =>  {
            toast.error(error.message);
        },
    })

    return {deleteCreatedProduct};
}