import { GetuserInfo } from "@/app/services/apiSettings";
import { useQuery } from "@tanstack/react-query";

export default function useGetUserAccountInfo(token: string){

    const {data: userInfo, isLoading} = useQuery({
        queryKey: ["userInfo"],
        queryFn: () => GetuserInfo(token)
    })

    return {userInfo, isLoading};
}