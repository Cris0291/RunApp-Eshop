import { useQuery } from "@tanstack/react-query";
import { GetUserLikedProducts } from "@/services/apiUserProfle";

export default function useGetUserProfileLikes() {
  const {
    data: userLikes,
    isLoading: loadingLikes,
    error: errorLikes,
    isError: isErrorLike,
    refetch: likesFetch,
  } = useQuery({
    queryKey: ["userLikes"],
    queryFn: () => GetUserLikedProducts(),
    enabled: false,
  });

  return { userLikes, loadingLikes, errorLikes, isErrorLike, likesFetch };
}
