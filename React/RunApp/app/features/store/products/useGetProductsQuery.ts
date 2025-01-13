import getProducts from "@/app/services/apiProducts";
import { useQuery } from "@tanstack/react-query";
import { ProductsQuery } from "./contracts";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function useGetProductsQuery({sortBy ,search ,categories, priceRange, starFilters} : ProductsQuery){
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const {replace} = useRouter();
    const params = new URLSearchParams(searchParams)
    let queryParams = ""
    let starsString = starFilters.join(",")
    let categoriesString = categories.join(",");
    
    
    if(categories.length > 0){
        params.set(`filterByCategory`, categoriesString)
      }
      else{
        params.delete(`filterByCategory`)
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

      if(starFilters.length > 0){
        params.set("filterByStars", starsString)
      }
      else{
        params.delete("filterByStars")
      }

      queryParams = params.toString()
      console.log(`${queryParams}`)
      replace(`${pathname}?${params.toString()}`)

    const {isLoading, data: products, refetch, error, isError} = useQuery({
        queryFn: () => getProducts(queryParams),
        queryKey: ["products", sortBy, search, categories, priceRange],
        enabled: false,
    })

    return {isLoading, products, refetch, error, isError}
}