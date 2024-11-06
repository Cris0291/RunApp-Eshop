import { useAppSelector } from "@/app/hooks/reduxHooks";
import { getUserToken } from "../../registration/userSlice";
import { useQuery } from "@tanstack/react-query";
import { GetUserLikedProducts } from "@/app/services/apiUserProfle";

export default function useGetUserProfileLikes(){
    const token = useAppSelector(getUserToken);

    const {data: userLikes, isLoading: loadingLikes} = useQuery({
        queryKey: ["userLikes"],
        queryFn: () => GetUserLikedProducts(token)
    })

    return {userLikes, loadingLikes}
}