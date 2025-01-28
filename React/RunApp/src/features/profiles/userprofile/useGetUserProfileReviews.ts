import { useQuery } from "@tanstack/react-query";
import GetUserReviews from "@/services/apiUserProfle";

export default function useGetUserProfileReviews() {
  const {
    data: userReviews,
    refetch: reviewsFetch,
    isLoading: loadingReviews,
    error: errorReviews,
    isError: isErrorReview,
  } = useQuery({
    queryKey: ["userReviews"],
    queryFn: () => GetUserReviews(),
    enabled: false,
  });

  return {
    userReviews,
    loadingReviews,
    errorReviews,
    isErrorReview,
    reviewsFetch,
  };
}
