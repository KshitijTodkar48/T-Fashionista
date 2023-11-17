"use client";
import "ui/styles.css";
import { useState, useEffect } from "react";
import { ProductType } from "types";

const ProductDetails = ({ params }) => {
    const [product , setProduct] = useState<ProductType | null>(null);
    useEffect(() => { 
        const fetchProductDetails = async() => {
            const response = await fetch(`/api/products/${params?.id}`);
            const data = await response.json();
            setProduct(data);
        }
        fetchProductDetails();
    }, [])
    return(
        <section className="flex gap-5 w-full h-[100vh] justify-center items-center p-10 border shadow-md rounded-xl">
            <div className="w-1/2">
                <img src={product?.imageURL} className="rounded-xl h-4/5 w-4/5" alt="Product Image" />
            </div>
            <div className="w-1/2">
                <h1> {product?.title} </h1>
                <h2> {product?.rating} </h2>
                <h1> {product?.price} </h1>
            </div>
        </section>
    )
}

export default ProductDetails