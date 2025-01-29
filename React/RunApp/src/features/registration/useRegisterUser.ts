import registerRequest from "@/services/apiRegister";
import { useMutation } from "@tanstack/react-query";
import { setUser } from "./userSlice";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { TokenModel, UserSession } from "./contracts";
import { useLocation, useNavigate } from "react-router";
import Cookies from "js-cookie";
import { useAuth } from "@/utils/AuhtProvider";
import { createOrder } from "../payment/checkout/orderSlice";

export default function useRegisterUser() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { setAuthSignal } = useAuth();

  const { mutate, isPending } = useMutation({
    mutationFn: registerRequest,
    onSuccess: (data) => {
      toast.success("User was registered correctly");

      const userSession: UserSession = {
        name: data.name,
        userName: data.userName,
        email: data.email,
      };

      const token: TokenModel = {
        token: data.token,
        refreshToken: data.refreshToken,
        refreshTokenExpirationDate: data.refreshTokenExpirationDate,
      };

      Cookies.set("Token", JSON.stringify(token));
      Cookies.set("Session", JSON.stringify(userSession));

      setAuthSignal(true);
      console.log("was registerd");

      dispatch(
        setUser({ name: data.name, userName: data.userName, email: data.email })
      );

      dispatch(createOrder());
      navigate("/");
    },
    onError: (error) => {
      toast.error(
        `${error.message}: User was not registered. Something unexpected happened`
      );
    },
  });
  return { mutate, isPending };
}
