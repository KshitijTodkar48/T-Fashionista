"use client"
import { ProductType } from "types";
import { ProductCard } from "./ProductCard"
import { useState, useEffect } from "react";
import { LoadingSkeleton } from "./LoadingSkeleton";

export const PublishedProducts = ({ Id }:{ Id: string | undefined }) => {
    const [products , setProducts] = useState<ProductType[]>([]) ;
    const [isLoading, setIsLoading] = useState<boolean>(true) ;

    useEffect(() => { ;
        const fetchProducts = async() => {
          try {
           const response = await fetch(`/api/admin/${Id}/products`) ;
           const data = await response.json() ;
           setProducts(data.publishedItems) ;
           setIsLoading(false) ;
          } catch (error) {
            console.log(error);
          }
        }
        if(Id) fetchProducts() ;
      } , [Id])

    if(isLoading)
    {
       return(
        <div > 
          <LoadingSkeleton />
        </div>
       )
    }  

    return(
        <section className="my-4">
          <div className="text-3xl font-semibold ml-5 mt-2">My Products</div>
          <section className="gap-4 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
           { products.map((product) => <div key={product.id}> <ProductCard {...product} Id={Id}/> </div>)}
          </section>
        </section>
    )
}
