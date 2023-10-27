"use client"
import { Button , Hero , Navbar , ProductCard } from "ui";
import "ui/styles.css";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { ProductType } from "types";

export default function Page(): JSX.Element {

  const [products , setProducts] = useState<ProductType[]>([]) ;
  const { data:session } = useSession() ;
  //@ts-ignore
  const userId = session?.user?.id ;

  useEffect(() => { 
     console.log("Hello " + JSON.stringify(session)) ;
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
   } , [session])

  return (
    <main className="flex flex-col items-center">
      <Navbar userId={userId}/>
      <div className="mt-[75px]">
        <Hero />
      </div>
      <div className="mt-10 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          { products.map((product) => <div key={product.id}> <ProductCard {...product} userId={userId}/> </div>)}
      </div>
    </main>
  );
}
