"use client"
import { ProductType } from "types"
import { OrangeButton } from "./OrangeButton"
import { StarIcon } from "../assets" 
import { useState, useEffect } from "react"
import toast, { Toaster } from 'react-hot-toast';

export const ProductCard = ({ imageURL , title , rating , price , id , userId } : ProductType) => {

  const [isAddedToCart , setIsAddedToCart] = useState<boolean>(false);
  const notify = () => toast.success("Item added to Cart.");

  useEffect(() => {
    if(!userId)
    {
      setIsAddedToCart(false);
    }
    else{
        const productState = localStorage.getItem(`is${id}Added`) ;
        if (productState) setIsAddedToCart(true) ;
    }
  } , [userId])

  const addToCart = async (productId: Number, userId: string) => {
    localStorage.setItem(`is${productId}Added`, "added") ;
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
        // alert("Item added to cart.")
      }
      else{
        alert("Item already added to cart.")
      }
    } catch (error) {
      console.log(error);
      alert("An error occured.")
    }
  }
  return (
    <section className="border p-5 m-2 rounded-2xl shadow-lg">
        <div>
            <img src={imageURL} alt="T-shirt image"
            className="h-[250px] w-[250px] rounded-2xl border"/>
        </div>
        <h1 className="font-semibold text-lg text-gray-600 text-center m-2">{title}</h1>
        <div className="flex justify-center m-2">
           <StarIcon />
           <span className="text-gray-500 mx-1 font-semibold"> { rating } </span>
        </div>
        <h2 className="font-bold text-center text-lg"><span className="text-gray-500 font-semibold"> Price : </span> {price}</h2>
        <div className="flex justify-center gap-2">
            <div className="flex justify-center mt-2" onClick={() => {
              if(userId) 
              {
                if(!isAddedToCart)
                {
                  addToCart(id,userId) ;
                  notify() ;
                }
              }
              else{
                alert("You need to login to add.");
              }
            }}>
              <OrangeButton name={ isAddedToCart ? "Added" : "Add to cart" } isAddedToCart={isAddedToCart} />
            </div>
            <Toaster/>
        </div>
    </section>
  )
}