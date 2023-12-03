"use client"
import "ui/styles.css";
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { ProductType } from 'types';
import { OrderedItemCard } from "ui";
import { Loader } from "ui/assets";

const MyOrders = () => {
    const [products, setProducts] = useState<ProductType[]>([]) ;
    const [isLoading, setIsLoading] = useState<boolean>(true) ;
    const { data:session } = useSession();
    //@ts-ignore
    const userId = session?.user?.id ;

    useEffect(() => {
        try {
            console.log("UserID: " + userId);
            const displayOrderedItems = async () => {
                const response = await fetch(`/api/users/${userId}/myOrders`);
                const data = await response?.json();
                console.log(data);
                setProducts(data.orderedItems);
                setIsLoading(false);
            }
            if(userId)
            {
                displayOrderedItems();
            }
        } catch (error) {
            console.log(error);
        }
    } , [userId])

    if(isLoading)
    {
       return(
        <div className="h-[500px] flex items-center"> 
          <Loader /> 
        </div>
       )
    }  
    return(
        <section className="flex flex-col items-center">
            <h1 className="text-red-500 font-bold text-4xl sm:text-5xl text-center m-4">
                My Orders
            </h1>
            <div className="flex flex-col gap-6 w-full items-center mb-10">
                { products.map((product) => 
                  <div key={product.id}>
                    <OrderedItemCard {...product}/> 
                  </div>
                  )
                }
            </div>
            {
                products.length ? 
                <> </> : 
                <>
                   <div className="text-gray-400 text-2xl mt-4">
                       Your haven't ordered anything !
                   </div>
                </>
            }
        </section>
    )
}

export default MyOrders