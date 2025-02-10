import { useMutation } from "@tanstack/react-query";
import { PaymentSettingsForm } from "./contracts";
import {
  CreatePaymentMethod,
  UpdatePaymentMethod,
} from "@/services/apiSettings";
import toast from "react-hot-toast";

export default function useUpdateOrCreatePaymentInfo() {
  const {
    mutate: updateOrCreatePayment,
    isPending: updatingOrCreatingPayment,
  } = useMutation({
    mutationFn: ({
      paymentInfo,
      wasCreated,
    }: {
      paymentInfo: PaymentSettingsForm;
      wasCreated: boolean;
    }) => {
      const result = wasCreated ? UpdatePaymentMethod : CreatePaymentMethod;

      return result({ paymentInfo });
    },
    onSuccess: () =>
      toast.success("User payment information was succesfully updated"),
    onError: (error) => {
      toast.error("Something unexpected happened");
      return error;
    },
  });

  return { updateOrCreatePayment, updatingOrCreatingPayment };
}
