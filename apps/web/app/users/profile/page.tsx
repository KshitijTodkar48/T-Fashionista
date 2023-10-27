"use client"
import "ui/styles.css";
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { ProductType } from 'types';
import { ProductCard } from "ui";

const UserProfile = () => {
    const [products, setProducts] = useState<ProductType[]>([]) ;
    const { data:session } = useSession();
    //@ts-ignore
    const userId = session?.user?.id ;

    useEffect(() => {
        console.log("UserID: " + userId);
        
        const displayProfile = async () => {
            const response = await fetch(`/api/users/${userId}/profile`) ;
            const data = await response.json() ;
            console.log(data) ;
            setProducts(data.cartItems);
        }
        if(userId)
        {
            displayProfile();
        }
    } , [userId])

    return(
        <section className="flex flex-col items-center">
            <h1 className="text-red-500 font-bold text-5xl text-center">
                Profile
            </h1>
            <div className="mt-10 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                { products.map((product) => <div key={product.id}> <ProductCard {...product}/> </div>)}
            </div>
        </section>
    )
}
export default UserProfile