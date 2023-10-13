"use client"
import { Button } from "ui";
import "ui/styles.css";
import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react";

interface Product {
  id: number;
  title: string;
  price: string;
  imageURL: string;
  published: Boolean;
}

export default function Page(): JSX.Element {
  const router = useRouter() ;
  const [products , setProducts] = useState<Product[]>([]) ;

  useEffect(() => { 
     const fetchProducts = async() => {
       const response = await fetch("/api/products") ;
       const data = await response.json() ;
       setProducts(data) ;
     }
     fetchProducts() ;
   } , [])

  return (
    <main className="flex flex-col h-screen justify-center items-center text-5xl font-bold">
      <div className="flex flex-col gap-8">
        <h1>
          Welcome to <span className="text-orange-500"> T-Fashionista </span>
        </h1>
        <div className="flex gap-4 justify-evenly font-semibold">
          <div onClick={() => {router.push('/users/login')}}><Button name="Login"/></div>
          <div onClick={() => {router.push('/users/signup')}}><Button name="Signup"/></div>
        </div>
      </div>
      <div className="mt-10">
        <ul>
          { products.map((product) => <li>
            {product.title} {product.price}
          </li>)}
        </ul>
      </div>
    </main>
  );
}
