import { useAppSelector } from "@/app/hooks/reduxHooks";
import { getUserToken } from "../../registration/userSlice";
import { useMutation } from "@tanstack/react-query";
import { AddNewCategory } from "@/app/services/apiProduct";
import { newCategoryDto } from "./contracts";

export default function useAddNewCategory(){
    const token = useAppSelector(getUserToken);

    const {mutate: addCategory} = useMutation({
        mutationFn: ({newCategory, productId}: {newCategory: newCategoryDto, productId: string}) => AddNewCategory({newCategory, productId, token})
    })

    return {addCategory};
}