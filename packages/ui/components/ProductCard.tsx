"use client"
import { ProductType } from "types"
import { OrangeButton } from "./OrangeButton"
import { StarIcon } from "../assets"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import toast, { Toaster } from "react-hot-toast"

export const ProductCard = ({ imageURL , title , rating , price , id , userId } : ProductType) => {

  const [isAddedToCart , setIsAddedToCart] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if(!userId)
    {
      setIsAddedToCart(false);
    }
    else{
        const productState = localStorage.getItem(`is${id}Addedfor-${userId}`) ;
        if (productState) setIsAddedToCart(true) ;
    }
  } , [userId])

  const addToCart = async (productId: Number, userId: string) => {
    toast.success("Item added to Cart.") ;
    setIsAddedToCart(true);
    const response = await fetch(`/api/products/addToCart`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        productId,
        userId
      })
    })
    try {
      if(response.ok)
      {
        localStorage.setItem(`is${productId}Addedfor-${userId}`, "added") ;
      }
      else{
       toast.error("Something went wrong.")
      }
    } catch (error) {
      toast.error("An error occured.")
    }
  }
  return (
    <section className="border p-5 m-2 rounded-2xl shadow-lg">
        <div>
            <img src={imageURL} alt="T-shirt image"
            className="h-[250px] w-[250px] rounded-2xl border"/>
        </div>
        <h1 className="font-semibold text-lg text-gray-600 text-center m-2">{title}</h1>
        <div className="flex justify-center items-center m-2">
           <StarIcon />
           <span className="text-gray-500 mx-[6px] pt-[2px] text-lg font-semibold"> { rating } </span>
        </div>
        <h2 className="font-bold text-center text-lg"><span className="text-gray-500 font-semibold"> Price : </span> {price}</h2>
        <div className="flex justify-center gap-2">
            <div className="flex justify-center mt-2" onClick={() => {
                router.push(`products/${id}`) ;
              }}>
              <OrangeButton name="View"/>
            </div>
            <div className="flex justify-center mt-2" onClick={() => {
              if(userId) 
              {
                if(!isAddedToCart)
                {
                  addToCart(id,userId) ;
                }
              }
              else{
                router.push("/users/login") ;
              }
              }}>
              <OrangeButton name={ isAddedToCart ? "Added" : "Add to cart" } isAddedToCart={isAddedToCart} />
            </div>
            <Toaster/>
        </div>
    </section>
  )
}