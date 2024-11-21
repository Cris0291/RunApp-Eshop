import { useAppSelector } from "@/app/hooks/reduxHooks";
import { getUserToken } from "../../registration/userSlice";
import { useMutation } from "@tanstack/react-query";
import { CreateProduct } from "@/app/services/apiProduct";
import { ProductCreationDto, ProductRequestDto } from "./contracts";

export default function useCreateProductCommand(){
    const token = useAppSelector(getUserToken)

    const {mutate: ProductsCraetionFunction, isPending: isCreating } = useMutation({
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
                    type: creteProductDto.type
                }
            }

            return CreateProduct({product, token})
        }
    })

    return {ProductsCraetionFunction, isCreating}
}