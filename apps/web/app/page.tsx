"use client"
import { Button , Hero, ProductCard } from "ui";
import "ui/styles.css";
import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react";
import { ProductType } from "types";

export default function Page(): JSX.Element {
  const router = useRouter() ;
  const [products , setProducts] = useState<ProductType[]>([]) ;

  useEffect(() => { 
     const fetchProducts = async() => {
       const response = await fetch("/api/products") ;
       const data = await response.json() ;
       setProducts(data) ;
     }
     fetchProducts() ;
   } , [])

  return (
    <main className="flex flex-col items-center">
      <Hero />
      <div className="mt-10 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          { products.map((product) => <div key={product.id}> <ProductCard {...product}/> </div>)}
      </div>
    </main>
  );
}
