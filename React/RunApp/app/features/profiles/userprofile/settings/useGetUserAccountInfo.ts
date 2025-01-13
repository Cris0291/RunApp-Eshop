import { GetuserInfo } from "@/app/services/apiSettings";
import { useQuery } from "@tanstack/react-query";

export default function useGetUserAccountInfo(){

    const {data: userInfo, isLoading, error, isError} = useQuery({
        queryKey: ["userInfo"],
        queryFn: () => GetuserInfo()
    })

    return {userInfo, isLoading, error, isError};
}