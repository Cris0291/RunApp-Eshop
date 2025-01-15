import { useQuery } from "@tanstack/react-query";
import GetUserReviews from "@/services/apiUserProfle";

export default function useGetUserProfileReviews() {
  const {
    data: userReviews,
    isLoading: loadingReviews,
    error: errorReviews,
    isError: isErrorReview,
  } = useQuery({
    queryKey: ["userReviews"],
    queryFn: () => GetUserReviews(),
  });

  return { userReviews, loadingReviews, errorReviews, isErrorReview };
}
