import { useMutation } from "@tanstack/react-query";
import AddOrRemoveLike from "../services/apiAddOrRemoveLike";
import toast from "react-hot-toast";

export default function useAddOrRemoveLikeHook() {
  const { mutate: AddOrRemoveLikeMutation } = useMutation({
    mutationFn: ({ liked, productId }: { liked: boolean; productId: string }) =>
      AddOrRemoveLike({ productId, liked }),
    onSuccess: () => toast.success("requested action was successful"),
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { AddOrRemoveLikeMutation };
}
