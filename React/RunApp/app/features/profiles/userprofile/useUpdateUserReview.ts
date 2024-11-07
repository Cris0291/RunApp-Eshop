import { useAppSelector } from "@/app/hooks/reduxHooks";
import { getUserToken } from "../../registration/userSlice";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateReview } from "@/app/services/apiReviews";
import { ReviewDto } from "../../store/product/contracts";

export default function useUpdateUserReview(){
    const token = useAppSelector(getUserToken)
    const queryClient = useQueryClient()

    const {mutate: updateReviewsMutation, isPending: updatingReviews} = useMutation({
        mutationFn: ({reviewDto, reviewId}: {reviewDto: ReviewDto, reviewId: string}) => UpdateReview({reviewDto, reviewId, token}),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["userReviews"]
            })

        }
    })

    return {updateReviewsMutation, updatingReviews}
}