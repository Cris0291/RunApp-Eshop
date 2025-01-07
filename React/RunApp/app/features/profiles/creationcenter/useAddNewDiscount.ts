import { useAppSelector } from "@/app/hooks/reduxHooks";
import { getUserToken } from "../../registration/userSlice";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AddNewDiscount } from "@/app/services/apiProduct";
import { newPromotionDto } from "./contracts";
import toast from "react-hot-toast";

export default function useAddNewDiscount(){
    const token = useAppSelector(getUserToken);
    const queryClient = useQueryClient();

    const {mutate: addDiscount} = useMutation({
        mutationFn: ({newDiscount, productId}: {newDiscount: newPromotionDto, productId: string}) => AddNewDiscount({newDiscount, productId, token}),
        onSuccess: () => {
            toast.success("requested action was successful")
            queryClient.invalidateQueries({
                queryKey: ["CreatedProducts"]
            })
        },
        onError: (error) =>  {
            toast.error(error.message);
        },
    });

    return {addDiscount}
}