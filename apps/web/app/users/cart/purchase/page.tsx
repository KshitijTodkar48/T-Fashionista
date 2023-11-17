"use client";
import {
  Button,
  Steps,
  Result
} from "antd";
import { FormOutlined, CreditCardOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { DeliveryForm } from "ui";
import { PaymentOptions } from "ui";
import { okButtonStyle, orangeButtonStyle } from "ui/customStyles";
import { useState } from "react";
import { useRouter } from "next/navigation";

const PurchasePage = () => {
  const [current, setCurrent] = useState<number>(0);
  const [component, setComponent] = useState(<DeliveryForm />);
  const router = useRouter();

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

  return (
    <section className="m-10 border px-20 py-16 rounded-lg shadow-md">
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
