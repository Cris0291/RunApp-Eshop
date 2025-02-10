import { UpdatePasswordInfo } from "@/services/apiSettings";
import { useMutation } from "@tanstack/react-query";
import { PasswordUpdatedSettings } from "./contracts";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

export default function useUpdatePasswordInfo() {
  const { mutate: updatePassword, isPending: updatingPassword } = useMutation({
    mutationFn: (passwordInfo: PasswordUpdatedSettings) =>
      UpdatePasswordInfo({ passwordInfo }),
    onSuccess: () => toast.success("Password was updated correctly"),
    onError: (error) => {
      const axiosError = error as AxiosError;
      const dataResponse: any = axiosError.response?.data;
      toast.error(
        `${
          axiosError.response !== undefined
            ? dataResponse.detail
            : axiosError.message
        }`
      );
      return error;
    },
  });

  return { updatePassword, updatingPassword };
}
