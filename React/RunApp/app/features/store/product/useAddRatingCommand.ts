import { useAppSelector } from "@/app/hooks/reduxHooks";
import AddRating from "@/app/services/apiRatings";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getUserToken } from "../../registration/userSlice";

export default function useAddRatingCommand(){
    const token  = useAppSelector(getUserToken)
    const queryClient = useQueryClient()

    const {isPending, mutate: addRating} = useMutation({
        mutationFn: ({rating, productId}: {rating: number, productId: string}) => AddRating({rating, productId, token}),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["product"]
            })
        }
    })

    return {isPending, addRating}

}