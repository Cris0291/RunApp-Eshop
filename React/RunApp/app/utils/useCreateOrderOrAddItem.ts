import { createOrder, getIsCurrentOrder } from "../features/payment/checkout/orderSlice";
import { addItem, addPendingProduct } from "../features/payment/shoppingcart/cartSlice";
import { ProductForCart } from "../features/payment/shoppingcart/contracts";
import { getUserAddress, getUserPaymentMethod } from "../features/registration/userSlice";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";

export default function useCreateOrderOrAddItem(){
    const dispatch = useAppDispatch();

    const createOrderOrAddItem = (item: ProductForCart) => {
        const existOrder = useAppSelector(getIsCurrentOrder);
        const userAddress = useAppSelector(getUserAddress);
        const userPaymentMethod = useAppSelector(getUserPaymentMethod);

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