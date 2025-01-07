import { useAppSelector } from "@/app/hooks/reduxHooks";
import { getUserToken } from "../../registration/userSlice";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AddNewCategory } from "@/app/services/apiProduct";
import { newCategoryDto } from "./contracts";
import toast from "react-hot-toast";

export default function useAddNewCategory(){
    const token = useAppSelector(getUserToken);
    const queryClient = useQueryClient();

    const {mutate: addCategory} = useMutation({
        mutationFn: ({newCategory, productId}: {newCategory: newCategoryDto, productId: string}) => AddNewCategory({newCategory, productId, token}),
        onSuccess: () => {
            toast.success("requested action was successful")
            queryClient.invalidateQueries({
                queryKey: ["CreatedProducts"]
            })
        },
        onError: (error) =>  {
            toast.error(error.message);
        },
    })

    return {addCategory};
}