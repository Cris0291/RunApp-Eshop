import { Image } from "../features/store/product/contracts";
import { axiosInstance } from "./axiosInstance";

export default async function uploadImageForProduct({
  imageFile,
  productId,
}: {
  imageFile: FormData;
  productId: string;
}) {
  return axiosInstance
    .post<Image>(`api/products/${productId}/photos`, imageFile, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => response.data);
}
