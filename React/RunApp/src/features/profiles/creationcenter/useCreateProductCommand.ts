import { useMutation } from "@tanstack/react-query";
import { CreateProduct } from "@/services/apiProduct";
import { ProductCreationDto } from "./contracts";

export default function useCreateProductCommand() {
  const {
    mutate: ProductsCraetionFunction,
    isPending: isCreating,
    isError,
    isSuccess,
    isIdle,
  } = useMutation({
    mutationFn: (creteProductDto: ProductCreationDto) => {
      const product = {
        name: creteProductDto.name,
        description: creteProductDto.description,
        price: creteProductDto.price,
        bulletPoints: creteProductDto.bulletPoints,
        priceWithDiscount: creteProductDto.priceWithDiscount,
        promotionalText: creteProductDto.promotionalText,
        categories: creteProductDto.categories,
        characteristics: {
          brand: creteProductDto.brand,
          color: creteProductDto.color,
          weight: creteProductDto.weight,
          type: creteProductDto.type,
        },
      };

      return CreateProduct({ product });
    },
  });

  return { ProductsCraetionFunction, isCreating, isError, isSuccess, isIdle };
}
