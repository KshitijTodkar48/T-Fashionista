"use client"
import "ui/styles.css";
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { ProductType } from 'types';
import { CartItemCart } from "ui";

const UserProfile = () => {
    const [products, setProducts] = useState<ProductType[]>([]) ;
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
            }
            if(userId)
            {
                displayProfile();
            }
        } catch (error) {
            console.log(error);
        }
    } , [userId])

    return(
        <section className="flex flex-col items-center">
            <h1 className="text-red-500 font-bold text-5xl text-center">
                Cart
            </h1>
            <div className="flex flex-col gap-4 w-full items-center">
                { products.map((product) => <div className="w-[4/5] sm:w-[95%] lg:w-[75%]" key={product.id}> <CartItemCart {...product}/> </div>)}
            </div>
        </section>
    )
}
export default UserProfile