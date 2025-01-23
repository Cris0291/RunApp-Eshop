import { useMutation } from "@tanstack/react-query";
import uploadImageForProduct from "@/services/apiImage";

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
  });

  return { uploadImage, uploadingImage };
}
