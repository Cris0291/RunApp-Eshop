import { createOrder } from "@/features/payment/checkout/orderSlice";
import {
  AddressSettingsForm,
  PaymentSettingsForm,
} from "../features/payment/checkout/contracts";
import { addItem } from "../features/payment/shoppingcart/cartSlice";
import { ProductForLineItem } from "../features/payment/shoppingcart/contracts";
import { useAppDispatch } from "../hooks/reduxHooks";

export default function useCreateOrderOrAddItem() {
  const dispatch = useAppDispatch();

  const createOrderOrAddItem = (
    item: ProductForLineItem,
    existOrder: boolean,
    userAddress: AddressSettingsForm | null,
    userPaymentMethod: PaymentSettingsForm | null
  ) => {
    if (existOrder) {
      dispatch(addItem(item));
    } else {
      dispatch(createOrder());
    }
  };

  return createOrderOrAddItem;
}
