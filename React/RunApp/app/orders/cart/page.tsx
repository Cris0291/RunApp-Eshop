import ShoppingCartPage from "@/app/features/payment/shoppingcart/ShoppingCartPage";
import AuthorizationAttribute from "@/app/utils/AuthorizationAttribute";

function CartPage() {
  return <AuthorizationAttribute>
    <ShoppingCartPage />
    </AuthorizationAttribute>;
}

export default CartPage;
