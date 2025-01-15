import { useMutation } from "@tanstack/react-query";
import uploadImageForProduct from "@/services/apiImage";
import toast from "react-hot-toast";

export default function useUploadProductImage() {
  const {
    mutate: uploadImage,
    isPending: uploadingImage,
    isError,
  } = useMutation({
    mutationFn: ({
      formData,
      productId,
    }: {
      formData: FormData;
      productId: string;
    }) => uploadImageForProduct({ imageFile: formData, productId: productId }),
    onSuccess: () => toast.success("Image was upload correctly"),
    onError: (error) => toast.error(`${error.message}: image was not upload`),
  });

  return { uploadImage, uploadingImage };
}
