import { getUserToken } from "@/app/features/registration/userSlice";
import { useAppSelector } from "@/app/hooks/reduxHooks";
import { GetuserInfo } from "@/app/services/apiSettings";
import { useQuery } from "@tanstack/react-query";

export default function useGetUserAccountInfo(){
    const token = useAppSelector(getUserToken);

    const {data: userInfo, isLoading} = useQuery({
        queryKey: ["userInfo"],
        queryFn: () => GetuserInfo(token)
    })

    return {userInfo, isLoading};
}