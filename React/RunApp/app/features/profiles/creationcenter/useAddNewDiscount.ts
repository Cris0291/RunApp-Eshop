import { useAppSelector } from "@/app/hooks/reduxHooks";
import { getUserToken } from "../../registration/userSlice";
import { useMutation } from "@tanstack/react-query";
import { AddNewDiscount } from "@/app/services/apiProduct";
import { newPromotionDto } from "./contracts";

export default function useAddNewDiscount(){
    const token = useAppSelector(getUserToken);

    const {mutate: addDiscount} = useMutation({
        mutationFn: ({newDiscount, productId}: {newDiscount: newPromotionDto, productId: string}) => AddNewDiscount({newDiscount, productId, token})
    });

    return {addDiscount}
}