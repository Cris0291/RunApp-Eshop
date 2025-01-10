import AddRating from "@/app/services/apiRatings";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function useAddRatingCommand(){
    const queryClient = useQueryClient()

    const {isPending, mutate: addRating} = useMutation({
        mutationFn: ({rating, productId}: {rating: number, productId: string}) => AddRating({rating, productId}),
        onSuccess: () => {
            toast.success("requested action was successful")
            queryClient.invalidateQueries({
                queryKey: ["product"]
            })
        },
        onError: (error) =>  {
            toast.error(error.message);
        },
    })

    return {isPending, addRating}

}