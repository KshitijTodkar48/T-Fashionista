"use client"
import "ui/styles.css";
import { ProductType } from "types";
import { ProductCard } from "./ProductCard"
import { useState, useEffect } from "react";

export const Products = ({ userId }:{ userId: string | undefined}) => {
    const [products , setProducts] = useState<ProductType[]>([]) ;

    useEffect(() => { ;
        const fetchProducts = async() => {
          try {
           const response = await fetch("/api/products") ;
           const data = await response.json() ;
           setProducts(data) ;
          } catch (error) {
            console.log(error);
          }
        }
        fetchProducts() ;
      } , [])

    return(
        <section className="mt-10 gap-4 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
           { products.map((product) => <div key={product.id}> <ProductCard {...product} userId={userId}/> </div>)}
        </section>
    )
}
