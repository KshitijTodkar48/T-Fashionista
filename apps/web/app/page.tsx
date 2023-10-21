"use client"
import { Button , Hero, ProductCard } from "ui";
import "ui/styles.css";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { ProductType } from "types";

export default function Page(): JSX.Element {
  const [products , setProducts] = useState<ProductType[]>([]) ;
  const { data:session } = useSession() ;
  //console.log(session) ;
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
