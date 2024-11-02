import { CreateReview } from "@/app/services/apiReviews";
import { useMutation } from "@tanstack/react-query";

export default function useCreateReviewCommand(){
    const {isPending, mutate} = useMutation({
        mutationFn: CreateReview
    })

    return {isPending, mutate}
}