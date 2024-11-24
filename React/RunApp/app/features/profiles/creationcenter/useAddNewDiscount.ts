import { useAppSelector } from "@/app/hooks/reduxHooks";
import { getUserToken } from "../../registration/userSlice";
import { useMutation } from "@tanstack/react-query";
import { AddNewDiscount } from "@/app/services/apiProduct";

export default function useAddNewDiscount(){
    const token = useAppSelector(getUserToken);

    useMutation({
        mutationFn: () => AddNewDiscount()
    });
}