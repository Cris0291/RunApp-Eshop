import { CreateReview } from "@/app/services/apiReviews";
import {useMutation, useQueryClient } from "@tanstack/react-query";
import { ReviewDto } from "./contracts";
import { useAppSelector } from "@/app/hooks/reduxHooks";
import { getUserToken } from "../../registration/userSlice";

export default function useCreateReviewCommand(){
    const token = useAppSelector(getUserToken)
    const queryClient = useQueryClient()

    const {isPending, mutate: AddReview} = useMutation({
        mutationFn: ({reviewDto, productId}: {reviewDto: ReviewDto, productId: string}) => CreateReview({reviewDto, productId, token}),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["product"]
            })
        }
    })

    return {isPending, AddReview}
}