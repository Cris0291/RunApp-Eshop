import getProducts from "@/app/services/apiProducts";
import { useQuery } from "@tanstack/react-query";
import { ProductsQuery } from "./contracts";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function useGetProductsQuery({sortBy ,search ,categories, priceRange} : ProductsQuery){
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const {replace} = useRouter();
    const params = new URLSearchParams(searchParams)
    console.log(`in custom query hook ${sortBy} ${search} ${categories} ${priceRange}`)
    let queryParams = "";
    
    for(let i  = 0; i < 10; i++){
      params.delete(`filterByCategory[${i}]`)
    }

    if(categories.length > 0){
        for(let i  = 0; i < categories.length; i++){
          params.set(`filterByCategory[${i}]`, categories[i])
        }
      }

      if(priceRange.length > 0){
        for(let i = 0; i < priceRange.length; i++){
          params.set(`filterByPrice[${i}]`, priceRange[i].toString())
        }
      }

      if(sortBy.length > 0){
        params.set("sortBy", sortBy)
      }

      if(search.length > 0){
        params.set("search", search)
      }
      else{
        params.set("search", "all")
      }

      queryParams = params.toString()
      console.log(`${queryParams}`)
      replace(`${pathname}?${params.toString()}`)

    const {isLoading, data: products, refetch, error} = useQuery({
        queryFn: () => getProducts(queryParams),
        queryKey: ["products", sortBy, search, categories, priceRange],
        enabled: false
    })

    return {isLoading, products, refetch, error}
}