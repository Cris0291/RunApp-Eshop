import { useAppSelector } from "@/app/hooks/reduxHooks";
import { getUserToken } from "../../registration/userSlice";
import { useMutation } from "@tanstack/react-query";
import uploadImageForProduct from "@/app/services/apiImage";
import toast from "react-hot-toast";

export default function useUploadProductImage(){
    const token = useAppSelector(getUserToken);

    const {mutate: uploadImage, isPending: uploadingImage, isError} = useMutation({
        mutationFn: ({formData, productId}: {formData: FormData, productId: string}) => uploadImageForProduct({imageFile: formData, productId: productId, token: token}),
        onSuccess: () => toast.success("Image was upload correctly"),
        onError: (error) => toast.error(`${error.message}: image was not upload`)
    });

    return {uploadImage, uploadingImage}
}