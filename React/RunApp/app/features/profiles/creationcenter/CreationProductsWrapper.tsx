import React from "react";
import CreationForm from "./CreationForm";
import ProductImageUpload from "./ProductImageUpload";
import ProductManagementTable from "./ProductManagementTable";


export default function CreationProductsWrapper({item, onHandleCurrentProduct, productId}: {item: string, onHandleCurrentProduct: (id: string, link: string) => void, productId: string}){
    
    switch(item){
        case "Dashboard":
            return <CreationForm  onHandleCurrentProduct={onHandleCurrentProduct}/>
        case "Images":
            return <ProductImageUpload  productId={productId}/>
        case "Products":
            return <ProductManagementTable  onHandleCurrentProduct={onHandleCurrentProduct}/>
        default:
            return <CreationForm  onHandleCurrentProduct={onHandleCurrentProduct}/>
    }
}