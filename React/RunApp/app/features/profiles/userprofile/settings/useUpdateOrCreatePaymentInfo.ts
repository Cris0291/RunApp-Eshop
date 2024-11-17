import { useMutation } from "@tanstack/react-query";
import { PaymentSettingsForm } from "./contracts";
import { CreatePaymentMethod, UpdatePaymentMethod } from "@/app/services/apiSettings";

export default function useUpdateOrCreatePaymentInfo(token: string){

    const {mutate: updateOrCreatePayment, isPending: updatingOrCreatingPayment} = useMutation({
        mutationFn: ({paymentInfo, wasCreated}: {paymentInfo: PaymentSettingsForm, wasCreated: boolean}) => {
            const result = wasCreated ? UpdatePaymentMethod : CreatePaymentMethod

            return result({paymentInfo, token});
        }
    })

    return {updateOrCreatePayment, updatingOrCreatingPayment}
}