"use client"
import "ui/styles.css";
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { ProductType } from 'types';
import { CartItemCart } from "ui";
import { Blackbutton } from "ui/components/Blackbutton";

const Cart = () => {
    const [products, setProducts] = useState<ProductType[]>([]) ;
    const [total, setTotal] = useState<number>(0) ;
    const { data:session } = useSession();
    //@ts-ignore
    const userId = session?.user?.id ;

    useEffect(() => {
        try {
            console.log("UserID: " + userId);
            const displayProfile = async () => {
                const response = await fetch(`/api/users/${userId}/cart`) ;
                const data = await response?.json() ;
                console.log(data) ;
                setProducts(data.cartItems);
                calculateTotal();
            }
            if(userId)
            {
                displayProfile();
            }
        } catch (error) {
            console.log(error);
        }
    } , [userId])

    const calculateTotal = () => {
        let totalCost = products.reduce((accumulator, product) => { return accumulator + parseFloat(product.price) } , 0) ;
        totalCost = parseFloat(totalCost.toFixed(2)) ;
        console.log(totalCost);
        setTotal(totalCost) ;
    }

    return(
        <section className="flex flex-col items-center">
            <h1 className="text-red-500 font-bold text-5xl text-center">
                Cart
            </h1>
            <div className="flex flex-col gap-6 w-full items-center">
                { products.map((product) => 
                  <div key={product.id}>
                    <CartItemCart {...product} setTotal={setTotal} abc={() => total}/> 
                  </div>
                  )
                }
            </div>
            {
                products.length ? 
                <>
                   <div onClick={() => { calculateTotal() ; alert(total) }} className="m-4">
                      <Blackbutton name="Checkout" />
                   </div>
                </> : <></>
            }
        </section>
    )
}
export default Cart