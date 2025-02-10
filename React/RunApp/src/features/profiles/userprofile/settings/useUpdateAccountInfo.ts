import { UpdateAccountInfo } from "@/services/apiSettings";
import { useMutation } from "@tanstack/react-query";
import { AccountSettingsForm } from "./contracts";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

export default function useUpdateAccountInfo() {
  const { mutate: updateUserAccountInfo, isPending: updatingUserAccount } =
    useMutation({
      mutationFn: (accountInfo: AccountSettingsForm) =>
        UpdateAccountInfo({ accountInfo }),
      onSuccess: () => toast.success("User account was updated succesfully"),
      onError: (error) => {
        const axiosError = error as AxiosError;
        toast.error(
          `${
            axiosError.response !== undefined
              ? axiosError.response.data
              : axiosError.message
          }`
        );
        return error;
      },
    });

  return { updateUserAccountInfo, updatingUserAccount };
}
