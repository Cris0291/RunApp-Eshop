import { useMutation } from "@tanstack/react-query";
import AddOrRemoveLike from "../services/apiAddOrRemoveLike";
import { useAppSelector } from "./reduxHooks";
import { getUserToken } from "../features/registration/userSlice";

export default function useAddOrRemoveLikeHook(){
    const token = useAppSelector(getUserToken)
    const {mutate: AddOrRemoveLikeMutation} = useMutation({
        mutationFn: ({liked, productId}: {liked: boolean, productId: string}) => AddOrRemoveLike({productId, liked, token})
    })

    return {AddOrRemoveLikeMutation}
}