import { CreateReview } from "@/app/services/apiReviews";
import { useMutation } from "@tanstack/react-query";
import { ReviewDto } from "./contracts";

export default function useCreateReviewCommand(){
    const {isPending, mutate} = useMutation({
        mutationFn: (reviewDto: ReviewDto) => CreateReview(reviewDto)
    })

    return {isPending, mutate}
}