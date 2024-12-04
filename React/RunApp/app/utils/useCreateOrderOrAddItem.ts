import { AddressSettingsForm, PaymentSettingsForm } from "../features/payment/checkout/contracts";
import { createOrder } from "../features/payment/checkout/orderSlice";
import { addItem, addPendingProduct } from "../features/payment/shoppingcart/cartSlice";
import { ProductForCart } from "../features/payment/shoppingcart/contracts";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";

export default function useCreateOrderOrAddItem(){
    const dispatch = useAppDispatch();

    const createOrderOrAddItem = (item: ProductForCart,  existOrder: boolean, userAddress: AddressSettingsForm | undefined, userPaymentMethod: PaymentSettingsForm | undefined) => {
        if(existOrder){
            dispatch(addItem(item));
            console.log("Inside add item route");
        }
        else{
            dispatch(addPendingProduct(item));
            dispatch(createOrder({address: userAddress, card: userPaymentMethod}));
            console.log("Inside create order route");
        }
    }

    return createOrderOrAddItem;
}