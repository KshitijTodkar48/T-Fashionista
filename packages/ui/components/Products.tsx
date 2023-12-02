"use client"
import { ProductType } from "types";
import { ProductCard } from "./ProductCard"
import { useState, useEffect } from "react";
import { LoadingSkeleton } from "./LoadingSkeleton";

export const Products = ({ userId }:{ userId: string | undefined}) => {
    const [products , setProducts] = useState<ProductType[]>([]) ;
    const [isLoading, setIsLoading] = useState<boolean>(true) ;

    useEffect(() => { ;
        const fetchProducts = async() => {
          try {
           const response = await fetch("/api/products") ;
           const data = await response.json() ;
           setProducts(data) ;
           setIsLoading(false) ;
          } catch (error) {
            console.log(error);
          }
        }
        fetchProducts() ;
      } , [])

    if(isLoading)
    {
       return(
        <div > 
          <LoadingSkeleton />
        </div>
       )
    }  

    return(
        <section className="my-10 gap-4 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4" id="Products">
           { products.map((product) => <div key={product.id}> <ProductCard {...product} userId={userId}/> </div>)}
        </section>
    )
}
