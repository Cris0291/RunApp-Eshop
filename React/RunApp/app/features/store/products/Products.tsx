"use client"

import HeaderProducts from "./HeaderProducts";
import MainPageProductsServerSide from "./MainPageProductsServerSide";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useState } from "react";

function Products() {
  const [priceRange, setPriceRange] = useState<number[]>([0, 300]);
  const [sortBy, setSortBy] = useState("featured");
  const [search, setSearch] = useState("");

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const {replace} = useRouter();
  const params = new URLSearchParams(searchParams)

  const handleSelectedCategories = (categories: string[]) => {

    if(categories.length > 0){
      for(let i  = 0; i < categories.length; i++){
        params.set(`filterByCategory[${i}]`, categories[i])
      }
    }
    else{
      for(let i  = 0; i < categories.length; i++){
        params.delete(`filterByCategory[${i}]`)
      }
    }
    params.set("filterType", "filterByCategory")
    replace(`${pathname}?${params.toString()}`)
  }

  const handlePriceRange = (priceRange: number[]) => {
    setPriceRange(priceRange)

    if(priceRange.length > 0){
      for(let i = 0; i < priceRange.length; i++){
        params.set(`filterByPrice[${i}]`, priceRange[i].toString())
      }
    }
    else{
      for(let i = 0; i < priceRange.length; i++){
        params.delete(`filterByPrice[${i}]`)
      }
    }
    params.set("filterType", "filterByPrice")
    replace(`${pathname}?${params.toString()}`)
  }

  const handleSortBy = (sort: string) => {
    setSortBy(sort)

    if(sort.length > 0){
      params.set("sortBy", sort)
    }
    else{
      params.delete("sortBy")
    }

    replace(`${pathname}?${params.toString()}`)
  }

  const handleSearch = (search: string) => {
    setSearch(search)

    if(search.length > 0){
      params.set("search", search)
    }
    else{
      params.delete("search")
    }

    replace(`${pathname}?${params.toString()}`)
  }

  const handleSubmit = () => {
    
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <HeaderProducts handleSearch={handleSearch} search={search}/>
      <MainPageProductsServerSide handleSelectedCategories={handleSelectedCategories} handlePriceRange={handlePriceRange} handleSortBy={handleSortBy} priceRange={priceRange} sortBy={sortBy}/>
    </div>
  );
}

export default Products;
