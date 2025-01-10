import { useQuery } from "@tanstack/react-query";
import { GetUserLikedProducts } from "@/app/services/apiUserProfle";

export default function useGetUserProfileLikes(){
   
    const {data: userLikes, isLoading: loadingLikes, error: errorLikes, isError: isErrorLike} = useQuery({
        queryKey: ["userLikes"],
        queryFn: () => GetUserLikedProducts()
    })

    return {userLikes, loadingLikes, errorLikes, isErrorLike}
}