import { useMutation } from "@tanstack/react-query";
import { ModifyOrderAddress } from "@/services/apiOrders";
import { AddressSettingsForm } from "./contracts";
import toast from "react-hot-toast";

export default function useModifyOrderAddress() {
  const { mutate: updateOrderAddress } = useMutation({
    mutationFn: ({
      orderId,
      addressInfo,
    }: {
      orderId: string;
      addressInfo: AddressSettingsForm;
    }) => ModifyOrderAddress({ orderId, addressInfo }),
    onSuccess: () => {
      toast.success("Your order address was updated correctly");
    },
    onError: () =>
      toast.error(
        "Something unexpected happened. Your order order address was not updated"
      ),
  });

  return { updateOrderAddress };
}
