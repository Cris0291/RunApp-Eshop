import { useMutation } from "@tanstack/react-query";
import { AddressSettingsForm } from "./contracts";
import { CreateAddressInfo, UpdateAddressInfo } from "@/services/apiSettings";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

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
    onSuccess: () => toast.success("User address was updated"),
    onError: () => {
      toast.error("Something unexpected happened");
    },
  });

  return { updateOrCreateAddress, updatingOrCreatingAddress };
}
