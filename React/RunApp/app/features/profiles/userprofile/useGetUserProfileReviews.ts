import { useAppSelector } from "@/app/hooks/reduxHooks";
import { useQuery } from "@tanstack/react-query";
import { getUserToken } from "../../registration/userSlice";
import GetUserReviews from "@/app/services/apiUserProfle";

export default function useGetUserProfileReviews(){
    const token = useAppSelector(getUserToken);
    
    const {data: userReviews, isLoading: loadingReviews} = useQuery({
        queryKey: ["userReviews"],
        queryFn: () => GetUserReviews(token)
    })

    return {userReviews, loadingReviews}
}