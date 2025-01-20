import {
  CategoryResponse,
  newCategoryDto,
  newPromotionDto,
  ProductCreated,
  ProductRequestDto,
  ProductResponseDto,
} from "../features/profiles/creationcenter/contracts";
import { Product } from "../features/store/product/contracts";
import { axiosInstance } from "./axiosInstance";

export async function GetProduct(query: string) {
  return axiosInstance
    .get<Product>(`api/products/${query}`)
    .then((response) => response.data);
}

export async function CreateProduct({
  product,
}: {
  product: ProductRequestDto;
}) {
  return axiosInstance
    .post<ProductResponseDto>("api/products", product)
    .then((response) => response.data);
}

export async function AddNewDiscount({
  newDiscount,
  productId,
}: {
  newDiscount: newPromotionDto;
  productId: string;
}) {
  return axiosInstance
    .post<number>(`api/products/${productId}/discounts`, newDiscount)
    .then((response) => response.status);
}

export async function DeleteNewDiscount({ productId }: { productId: string }) {
  return axiosInstance
    .delete<number>(`api/products/${productId}/discounts`)
    .then((response) => response.status);
}

export async function AddNewCategory({
  newCategory,
  productId,
}: {
  newCategory: newCategoryDto;
  productId: string;
}) {
  return axiosInstance
    .post<CategoryResponse>(`api/products/${productId}/categories`, newCategory)
    .then((response) => response.data);
}

export async function DeleteProduct({ productId }: { productId: string }) {
  return axiosInstance
    .delete<number>(`api/products/${productId}`)
    .then((response) => response.status);
}

export async function GetCreatedProducts() {
  return axiosInstance
    .get<ProductCreated[]>(`api/user/created-products`)
    .then((response) => response.data);
}

export async function ExistProduct(productId: string) {
  return axiosInstance
    .get<number>(`api/products/${productId}/exist`)
    .then((response) => response.status);
}
