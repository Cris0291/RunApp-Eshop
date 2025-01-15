import { useMutation } from "@tanstack/react-query";
import { setUser } from "../registration/userSlice";
import { setLogin } from "./loginSlice";
import toast from "react-hot-toast";
import { UserDto } from "../registration/contracts";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { useLocation, useNavigate } from "react-router";
import loginRequest from "@/services/apiLogin";
import Cookies from "js-cookie";
import { useAuth } from "@/utils/AuhtProvider";

export default function useLoginUser() {
  const dispatch = useAppDispatch();
  let navigate = useNavigate();
  const location = useLocation();
  const { setAuthSignal } = useAuth();

  const { mutate: loginUser, isPending } = useMutation({
    mutationFn: loginRequest,
    onSuccess: (data) => {
      toast.success("log in was successful");

      const userSession: UserDto = {
        token: data.token,
        refreshToken: data.refreshToken,
        refreshTokenExpirationDate: data.refreshTokenExpirationDate,
        name: data.name,
        userName: data.userName,
        email: data.email,
      };

      Cookies.set("Session", JSON.stringify(userSession));
      setAuthSignal(true);
      console.log("was log in");

      dispatch(
        setUser({ name: data.name, userName: data.userName, email: data.email })
      );
      setLogin();

      const from = location.state?.from || "/";
      navigate(from);
    },
    onError: () =>
      toast.error("Something unexpected happened. User could not be logged in"),
  });

  return { loginUser, isPending };
}
