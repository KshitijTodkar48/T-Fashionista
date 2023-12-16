"use client"
import { ProductType } from "types"
import { StarIcon } from "../assets"

export const OrderedItemCard = ({ imageURL , title , rating , price , id } : ProductType) => {
    return(
        <section className="border rounded-xl p-4 shadow-lg md:flex md:gap-10 lg:gap-15">
            <div className="flex flex-col min-w-[215px] items-center lg:flex-row lg:gap-5 lg:min-w-[415px]">
                <img src={imageURL} alt="T-Shirt" className="h-[180px] w-[180px] rounded-xl" />
                <div className="">
                    <h1 className="font-semibold text-lg text-gray-600 text-center m-2">{title}</h1>
                    <div className="flex justify-center m-2">
                        <StarIcon />
                        <span className="text-gray-500 mx-1 font-semibold"> { rating } </span>
                    </div>
                    <h2 className="font-bold text-center text-lg"><span className="text-gray-500 font-semibold"> Price : </span> {price}</h2>
                </div>
            </div>
            <div className="flex flex-col items-center justify-center m-2">
                <div className="flex gap-2 items-center m-2">
                  <span> Qty :</span> 
                  <span className="text-md font-semibold border-2 text-center py-1 min-w-[48px]"> 1 </span>
                </div>
            </div>
        </section>
    )
}