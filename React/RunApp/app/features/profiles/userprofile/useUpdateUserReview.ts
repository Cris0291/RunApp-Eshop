import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateReview } from "@/app/services/apiReviews";
import { ReviewDto } from "../../store/product/contracts";
import toast from "react-hot-toast";

export default function useUpdateUserReview(){
    const queryClient = useQueryClient()

    const {mutate: updateReviewsMutation, isPending: updatingReviews} = useMutation({
        mutationFn: ({reviewDto, reviewId}: {reviewDto: ReviewDto, reviewId: string}) => UpdateReview({reviewDto, reviewId}),
        onSuccess: () => {
            toast.success("review was updated")
            queryClient.invalidateQueries({
                queryKey: ["userReviews"]
            })
        },
        onError: (error) =>  {
            toast.error(error.message);
        },
    })

    return {updateReviewsMutation, updatingReviews}
}