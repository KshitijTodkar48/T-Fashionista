import { ProductType } from "types"
import { AddButton } from "./AddButton"

export const ProductCard = ({ imageURL , title , price } : ProductType) => {
  return (
    <section className="border p-5 m-2 shadow-lg">
        <div>
            <img src={imageURL} alt="T-shirt image"
            className="h-[250px] w-[250px]" />
        </div>
        <h1 className="font-semibold text-lg text-gray-500 text-center m-2">{title}</h1>
        <h2 className="font-bold text-center">{price}</h2>
        <div className="flex justify-center mt-2">
          <AddButton/>
        </div>
    </section>
  )
}