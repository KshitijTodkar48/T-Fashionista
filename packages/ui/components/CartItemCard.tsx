"use client"
import { ProductType } from "types"
import { StarIcon } from "../assets"
import { OrangeButton } from "./OrangeButton"
import { useState } from "react"

export const CartItemCart = ({ imageURL , title , rating , price , id , userId } : ProductType) => {
    const [quantity, setQuantity] = useState<number>(1);
    return(
        <section className="grid sm:grid-cols-2 md:grid-cols-3 m-2 p-5 border shadow-lg">
            <div className="grid justify-center">
                <img src={imageURL} alt="T-shirt image" className="h-[180px] w-[180px]" />
            </div>
            <div className="flex flex-col min-w-[220px] justify-center">
                <h1 className="font-semibold text-lg text-gray-600 text-center m-2">{title}</h1>
                <div className="flex justify-center m-2">
                    <StarIcon />
                    <span className="text-gray-500 mx-1 font-semibold"> { rating } </span>
                </div>
                <h2 className="font-bold text-center text-lg"><span className="text-gray-500 font-semibold"> Price : </span> {price}</h2>
            </div>
            <div className="flex flex-col justify-center gap-4 mt-4">
                <div className="flex gap-4 items-center">
                  <span> Qty :</span> 
                  <button className="bg-black text-white font-bold rounded-full px-[15px] py-[5px] text-xl"
                   onClick={() => { if(quantity > 1) setQuantity((qty) => qty - 1) }}> - </button>
                  <span className="text-md font-semibold border-2 text-center py-1 min-w-[48px]"> {`${quantity}`} </span>
                  <button className="bg-black text-white font-bold rounded-full px-3 py-1 text-xl"
                   onClick={() => { setQuantity((qty) => qty + 1) }}> + </button>
                </div>
                <OrangeButton name="Remove from Cart"/>
            </div>
        </section>
    )
}