import { useAppSelector } from "@/app/hooks/reduxHooks";
import { getUserToken } from "../../registration/userSlice";
import { useMutation } from "@tanstack/react-query";
import uploadImageForProduct from "@/app/services/apiImage";

export default function useUploadProductImage(){
    const token = useAppSelector(getUserToken);

    const {mutate: uploadImage, isPending: uploadingImage, isError} = useMutation({
        mutationFn: ({formData, productId}: {formData: FormData, productId: string}) => uploadImageForProduct({imageFile: formData, productId: productId, token: token})
    });

    return {uploadImage, uploadingImage}
}