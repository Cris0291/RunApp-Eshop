import { useAppSelector } from "@/app/hooks/reduxHooks";
import { useQuery } from "@tanstack/react-query";
import { getUserToken } from "../../registration/userSlice";
import GetUserReviews from "@/app/services/apiUserProfle";

export default function useGetUserProfileReview(){
    const token = useAppSelector(getUserToken)
    useQuery({
        queryKey: ["userReviews"],
        queryFn: () => GetUserReviews(token)
    })
}