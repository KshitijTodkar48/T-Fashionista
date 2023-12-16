"use client";
import "ui/styles.css"
import {
  Button,
  Steps,
  Result
} from "antd";
import { FormOutlined, CreditCardOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { DeliveryForm } from "ui";
import { PaymentOptions } from "ui";
import { okButtonStyle, orangeButtonStyle } from "ui/customStyles";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { ProductType } from "types";

const PurchasePage = () => {
  const [current, setCurrent] = useState<number>(0);
  const [component, setComponent] = useState(<DeliveryForm />);
  const [cartItems, setCartItems] = useState<ProductType[]>([]);
  const router = useRouter();
  const { data: session } = useSession();
  //@ts-ignore
  const userId = session?.user?.id ;

  useEffect(() => {
    try {
        const getCartItems = async () => {
            const response = await fetch(`/api/users/${userId}/cart`) ;
            const data = await response?.json() ;
            setCartItems(data.cartItems) ;
        }
        if(userId)
        {
           getCartItems() ;
        }
    } catch (error) {
      console.log(error);
    }
} , [userId])

  const goNext = () => {
    setCurrent((prevCurrent) => {
        const nextCurrent = prevCurrent + 1;
        if (nextCurrent === 1) {
          setComponent(<PaymentOptions />);
        } else if (nextCurrent === 2) {
          setComponent(<Result
            status="success"
            title={`Successfully Purchased`}
            extra={[
              <Button style={orangeButtonStyle} type="primary" onClick={() => router.push('../../')}>
                Shop More
              </Button>,
            ]}
          />);
          placeOrder();
        }
        return nextCurrent;
      });
  };

  const goPrev = () => {
    setCurrent((prevCurrent) => {
        const prev = prevCurrent - 1;
        if (prev === 0) {
          setComponent(<DeliveryForm />);
        }
        return prev;
      });
  };

  const placeOrder = async() => {
    if(!userId) return ;
    try {
      const itemsIds = cartItems.map((item) => item.id) ;
      const response = await fetch(`/api/users/${userId}/purchase`, {
        method: "POST",
        headers: {
          "Content-Type": "Application/json"
        },
        body: JSON.stringify({cartItemsIds: itemsIds})
      });

      if(response.ok)
      {
        await emptyCart();
      }
    } catch (error) {
      console.log("An error occurred while placing the order: ", error);
    }
  }

  const emptyCart = async () => {
    if(!userId) return ;
    try {
      const response = await fetch(`/api/users/${userId}/emptyCart`, {
        method: "POST",
      });
  
      if (response.ok) {
        cartItems.forEach((item) => {
          localStorage.removeItem(`is${item.id.toString()}Addedfor-${userId}`);
        })
      } else {
        console.error("Failed to empty cart.");
      }

    } catch (error) {
      console.error("An error occurred while emptying the cart: ", error);
    }
  };

  return (
    <section className="m-2 sm:m-10 border p-8 md:px-20 md:py-16 rounded-lg shadow-md">
      <div className="max-md:hidden">
        <Steps
          current={current}
          items={[
            {
              title: "Details",
              description: "Provide your details.",
              icon:<FormOutlined style={{"fontSize":"50px"}}/>
            },
            {
              title: "Payment",
              description: "Select a payment option.",
              icon:<CreditCardOutlined style={{"fontSize":"50px"}}/>
            },
            {
              title: "Done",
              description: "Order Placed.",
              icon:<CheckCircleOutlined style={{"fontSize":"50px"}}/>
            },
          ]}
      />
      </div>
      <div>{component}</div>

      {current !== 2 ? (
        <div className="mt-8 flex gap-5">
          {current != 0 ? <Button style={okButtonStyle} type="primary" onClick={goPrev}>Previous</Button> : ""}
          <Button style={okButtonStyle} type="primary" onClick={goNext}>
            Next
          </Button>
        </div>
      ) : (
        ""
      )}
    </section>
  );
};

export default PurchasePage;
