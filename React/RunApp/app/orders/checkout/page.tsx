import CheckoutPage from "@/app/features/payment/checkout/CheckoutPage";
import AuthorizationAttribute from "@/app/utils/AuthorizationAttribute";

export default function Checkout(){
return <AuthorizationAttribute>
    <CheckoutPage/>
    </AuthorizationAttribute>
}
