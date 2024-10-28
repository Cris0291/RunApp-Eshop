"use client"

import { ProductsQuery } from "./contracts";
import HeaderProducts from "./HeaderProducts";
import MainPageProductsServerSide from "./MainPageProductsServerSide";
import { useState } from "react";
import useGetProductsQuery from "./useGetProductsQuery";
import { getSearchQueryProduct } from "./productsQuerySlice";
import { useAppSelector } from '@/app/hooks/reduxHooks'

function Products() {
  const searchTerm = useAppSelector(getSearchQueryProduct)
  const [firstRefetch, setFirstRefetch] = useState<boolean>();
  const [priceRange, setPriceRange] = useState<number[]>([0,300]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("default");
  const [search, setSearch] = useState(() => {
    console.log("just a test")
    setFirstRefetch(true)
    return searchTerm.length == 0 ? "all" : searchTerm 
  });
  

  let queryValues : ProductsQuery = {sortBy, search, priceRange, categories: selectedCategories}

  const {isLoading, products, refetch, error} = useGetProductsQuery(queryValues);
  if(firstRefetch){
    console.log("executed once")
    setFirstRefetch(false)
    refetch()
  }

  const handleSelectedCategories = (categories: string[]) => {
    setSelectedCategories(categories)
  }

  const handlePriceRange = (priceRange: number[]) => {
    setPriceRange(priceRange);
  }

  const handleSortBy = (sort: string) => {
    setSortBy(sort);
  }

  const handleSearch = (search: string) => {
    setSearch(search);
  }

  const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

     queryValues = {sortBy, search, priceRange, categories: selectedCategories}
     refetch()
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <HeaderProducts handleSearch={handleSearch} search={search}  handleSubmit={handleSubmit}/>
      <MainPageProductsServerSide handleSelectedCategories={handleSelectedCategories} handlePriceRange={handlePriceRange} handleSortBy={handleSortBy} priceRange={priceRange} sortBy={sortBy} selectedCategories={selectedCategories} handleSubmit={handleSubmit}/>
    </div>
  );
}

export default Products;
