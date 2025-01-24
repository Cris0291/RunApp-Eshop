import { useMutation } from "@tanstack/react-query";
import { PaymentSettingsForm } from "./contracts";
import {
  CreatePaymentMethod,
  UpdatePaymentMethod,
} from "@/services/apiSettings";

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
  });

  return { updateOrCreatePayment, updatingOrCreatingPayment };
}
