"use server"

import { ProductForCard } from "@/app/features/store/products/contracts";
import GetProducts from "@/app/services/apiProducts";
import { AxiosError } from "axios";
import { redirect } from 'next/navigation'

export async function GetProductsAction(formData: FormData){
    const search = formData.get("search") as string;
    const searchQuery = search.trim().length === 0 ? "search=all" : `search=${search}`;

    redirect(`/products?${searchQuery}`);

}