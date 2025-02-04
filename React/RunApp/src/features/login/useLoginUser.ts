import { useMutation } from "@tanstack/react-query";
import {
  addUserAddress,
  addUserCard,
  setUser,
} from "../registration/userSlice";
import { setLogin } from "./loginSlice";
import toast from "react-hot-toast";
import { TokenModel, UserSession } from "../registration/contracts";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { useLocation, useNavigate } from "react-router";
import loginRequest from "@/services/apiLogin";
import Cookies from "js-cookie";
import { useAuth } from "@/utils/AuhtProvider";
import { createOrder } from "../payment/checkout/orderSlice";
import {
  AddressSettingsForm,
  PaymentSettingsForm,
} from "../payment/checkout/contracts";

export default function useLoginUser() {
  const dispatch = useAppDispatch();
  let navigate = useNavigate();
  const location = useLocation();
  const { setAuthSignal } = useAuth();

  const { mutate: loginUser, isPending } = useMutation({
    mutationFn: loginRequest,
    onSuccess: (data) => {
      toast.success("log in was successful");

      const userSession: UserSession = {
        name: data.name,
        userName: data.username,
        email: data.email,
      };

      const token: TokenModel = {
        token: data.token,
        refreshToken: data.refreshToken,
        refreshTokenExpirationDate: data.refreshTokenExpirationDate,
      };

      if (
        data.city &&
        data.country &&
        data.address &&
        data.state &&
        data.zipcode
      ) {
        const address: AddressSettingsForm = {
          city: data.city,
          country: data.country,
          address: data.address,
          state: data.state,
          zipcode: data.zipcode,
        };
        dispatch(addUserAddress(address));
        Cookies.set("Address", JSON.stringify(address));
      }

      if (data.cardname && data.cardnumber && data.cvv && data.expirydate) {
        const payment: PaymentSettingsForm = {
          cardname: data.cardname,
          cardnumber: data.cardnumber,
          cvv: data.cvv,
          expirydate: data.expirydate,
        };
        dispatch(addUserCard(payment));
        Cookies.set("Payment", JSON.stringify(payment));
      }

      Cookies.set("Token", JSON.stringify(token));
      Cookies.set("Session", JSON.stringify(userSession));

      setAuthSignal(true);

      dispatch(
        setUser({ name: data.name, userName: data.username, email: data.email })
      );
      setLogin();

      dispatch(createOrder());
      navigate("/");
    },
    onError: () =>
      toast.error("Something unexpected happened. User could not be logged in"),
  });

  return { loginUser, isPending };
}
