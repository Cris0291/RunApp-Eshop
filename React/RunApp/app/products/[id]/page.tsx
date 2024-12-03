import ProductDisplay from "@/app/features/store/product/ProductDisplay";
import AuthorizationAttribute from "@/app/utils/AuthorizationAttribute";

function Product() {
  return <AuthorizationAttribute>
    <ProductDisplay />
    </AuthorizationAttribute>;
}

export default Product;
