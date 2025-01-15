import { CreateReview } from "@/services/apiReviews";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ReviewDto } from "./contracts";
import toast from "react-hot-toast";

export default function useCreateReviewCommand() {
  const queryClient = useQueryClient();

  const { isPending, mutate: AddReview } = useMutation({
    mutationFn: ({
      reviewDto,
      productId,
    }: {
      reviewDto: ReviewDto;
      productId: string;
    }) => CreateReview({ reviewDto, productId }),
    onSuccess: () => {
      toast.success("review was created");
      queryClient.invalidateQueries({
        queryKey: ["product"],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { isPending, AddReview };
}
