import CreationForm from "./CreationForm";
import ProductImageUpload from "./ProductImageUpload";
import ProductManagementTable from "./ProductManagementTable";
import { ProductCreated, ProductResponseDto } from "./contracts";

export default function CreationProductsWrapper({
  item,
  onHandleCurrentProduct,
  product,
  onHandleAddAnImage,
  onHandleAddLink,
}: {
  item: string;
  onHandleCurrentProduct: (link: string, product: ProductCreated) => void;
  product: ProductResponseDto | ProductCreated;
  onHandleAddAnImage: (product: ProductResponseDto) => void;
  onHandleAddLink: (link: string) => void;
}) {
  switch (item) {
    case "Dashboard":
      return (
        <CreationForm
          onHandleAddAnImage={onHandleAddAnImage}
          onHandleAddLink={onHandleAddLink}
        />
      );
    case "Images":
      return <ProductImageUpload product={product} />;
    case "Products":
      return (
        <ProductManagementTable
          onHandleCurrentProduct={onHandleCurrentProduct}
        />
      );
    default:
      return (
        <CreationForm
          onHandleAddAnImage={onHandleAddAnImage}
          onHandleAddLink={onHandleAddLink}
        />
      );
  }
}
