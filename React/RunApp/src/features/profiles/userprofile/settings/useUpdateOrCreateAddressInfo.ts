import { useMutation } from "@tanstack/react-query";
import { AddressSettingsForm } from "./contracts";
import { CreateAddressInfo, UpdateAddressInfo } from "@/services/apiSettings";

export default function useUpdateOrCreateAddressInfo() {
  const {
    mutate: updateOrCreateAddress,
    isPending: updatingOrCreatingAddress,
  } = useMutation({
    mutationFn: ({
      addressInfo,
      wasCreated,
    }: {
      addressInfo: AddressSettingsForm;
      wasCreated: boolean;
    }) => {
      const result = wasCreated ? UpdateAddressInfo : CreateAddressInfo;
      return result({ addressInfo });
    },
  });

  return { updateOrCreateAddress, updatingOrCreatingAddress };
}
