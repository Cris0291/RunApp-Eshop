import HeaderProducts from "./HeaderProducts";
import MainPageProducts from "./MainPageProducts";

function Products() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <HeaderProducts />
      <MainPageProducts/>
    </div>
  );
}

export default Products;
