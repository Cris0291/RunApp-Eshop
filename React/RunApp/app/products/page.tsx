import Products from "../features/store/products/Products";
import AuthorizationAttribute from "../utils/AuthorizationAttribute";

export default function Store() {
  return <AuthorizationAttribute>
    <Products />
    </AuthorizationAttribute>;
}
