import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeleteProduct } from "@/services/apiProduct";
import toast from "react-hot-toast";

export default function useDeleteCreatedProduct() {
  const queryClient = useQueryClient();

  const { mutate: deleteCreatedProduct } = useMutation({
    mutationFn: (productId: string) => DeleteProduct({ productId }),
    onSuccess: () => {
      toast.success("requested action was successful");
      queryClient.invalidateQueries({
        queryKey: ["CreatedProducts"],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { deleteCreatedProduct };
}
