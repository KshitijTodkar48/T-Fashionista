"use client"
import "ui/styles.css";
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { ProductType } from 'types';
import { CartItemCard } from "ui";
import { Button, Modal } from 'antd';
import { buttonStyle, okButtonStyle, cancelButtonStyle } from "ui/customStyles";
import { Loader } from "ui/assets";

const Cart = () => {
    const [products, setProducts] = useState<ProductType[]>([]) ;
    const [total, setTotal] = useState<number>(0) ;
    const [isLoading, setIsLoading] = useState<boolean>(true) ;
    const { data:session } = useSession();
    //@ts-ignore
    const userId = session?.user?.id ;

    // Modal functions.
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        calculateTotal();
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        try {
            console.log("UserID: " + userId);
            const displayCartItems = async () => {
                const response = await fetch(`/api/users/${userId}/cart`) ;
                const data = await response?.json() ;
                console.log(data) ;
                setProducts(data.cartItems);
                setIsLoading(false);
                calculateTotal();
            }
            if(userId)
            {
                displayCartItems();
            }
        } catch (error) {
            console.log(error);
        }
    } , [userId])

    const calculateTotal = () => {
        let totalCost = products.reduce((accumulator, product) => { return accumulator + parseFloat(product.price) } , 0) ;
        totalCost = parseFloat(totalCost.toFixed(2)) ;
        console.log(totalCost) ;
        setTotal(totalCost) ;
    }

    const removeItem = (productId:number) => {
        if(!userId)
           return ;

        const newProductsArray = products.filter((product) => product.id !== productId) ;
        setProducts(newProductsArray);
        localStorage.removeItem(`is${productId.toString()}Added`);
        fetch("/api/products/removeFromCart",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ userId , productId })
        });
    }

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
            <h1 className="text-red-500 font-bold text-5xl text-center m-4">
                Cart
            </h1>
            <div className="flex flex-col gap-6 w-full items-center">
                { products.map((product) => 
                  <div key={product.id}>
                    <CartItemCard {...product} removeItem={removeItem}/> 
                  </div>
                  )
                }
            </div>
            {
                products.length ? 
                <>
                   <Button style={buttonStyle} type="primary" onClick={showModal}>
                        Checkout
                    </Button>
                    <Modal okText="Place Order" okButtonProps={{style:okButtonStyle}} cancelButtonProps={{style:cancelButtonStyle}} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                        <div className="flex flex-col gap-6 mb-8">
                            <p className="text-[23px] text-orange-600 font-semibold">Are you sure ?</p>
                            <p className="text-[27px] text-gray-600">Your total : <span className="font-semibold text-black"> {total} $ </span></p>
                        </div>
                    </Modal>
                </> : 
                <>
                   <div className="text-gray-400 text-2xl mt-4">
                       Your cart is Empty !
                   </div>
                </>
            }
        </section>
    )
}
export default Cart