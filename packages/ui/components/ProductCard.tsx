import { ProductType } from "types"

export const ProductCard = ({ imageURL , title , price } : ProductType) => {
  return (
    <section className="border">
        <div>
            <img src={imageURL} alt="T-shirt image" />
        </div>
        <h1>{title}</h1>
        <h2>{price}</h2>
    </section>
  )
}