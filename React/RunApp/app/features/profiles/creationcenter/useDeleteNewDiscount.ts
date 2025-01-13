import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeleteNewDiscount } from "@/app/services/apiProduct";
import toast from "react-hot-toast";

export default function useDeleteNewDiscount(){
    const queryClient = useQueryClient();

    const {mutate: deleteDiscount} = useMutation({
        mutationFn: (productId : string) => DeleteNewDiscount({productId}),
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

    return {deleteDiscount}
}