import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateReview } from "@/services/apiReviews";
import { ReviewDto } from "../../store/product/contracts";
import toast from "react-hot-toast";

export default function useUpdateUserReview() {
  const queryClient = useQueryClient();

  const { mutate: updateReviewsMutation, isPending: updatingReviews } =
    useMutation({
      mutationFn: ({
        reviewDto,
        productId,
      }: {
        reviewDto: ReviewDto;
        productId: string;
      }) => UpdateReview({ reviewDto, productId }),
      onSuccess: () => {
        toast.success("review was updated");
        queryClient.invalidateQueries({
          queryKey: ["product"],
        });
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

  return { updateReviewsMutation, updatingReviews };
}
