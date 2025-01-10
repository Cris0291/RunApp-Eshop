import { AddressSettingsForm, PaymentSettingsForm } from "../features/payment/checkout/contracts";
import { createOrder } from "../features/payment/checkout/orderSlice";
import { addItem, addPendingProduct } from "../features/payment/shoppingcart/cartSlice";
import { ProductForLineItem} from "../features/payment/shoppingcart/contracts";
import { useAppDispatch} from "../hooks/reduxHooks";

export default function useCreateOrderOrAddItem(){
    const dispatch = useAppDispatch();

    const createOrderOrAddItem = (item: ProductForLineItem,  existOrder: boolean, userAddress: AddressSettingsForm | undefined, userPaymentMethod: PaymentSettingsForm | undefined) => {
        if(existOrder){
            dispatch(addItem(item));
        }
        else{
            dispatch(addPendingProduct(item));
            dispatch(createOrder({address: userAddress, card: userPaymentMethod}));
        }
    }

    return createOrderOrAddItem;
}