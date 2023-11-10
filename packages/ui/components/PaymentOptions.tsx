"use client"
import {
  Radio,
  Input,
  Space,
  RadioChangeEvent,
} from "antd";
import { useState } from "react";

export const PaymentOptions = () => {
  const [value, setValue] = useState(1);
  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };
  return (
    <section className="flex flex-col gap-[15px] mt-[30px]">
      <Radio.Group onChange={onChange} value={value}>
        <Space direction="vertical">
          <Radio value={1}>EMI</Radio>
          <Radio value={2}>Cash on Delivery</Radio>
          <Radio value={3}>
            Pay Now
            {value === 3 ? (
              <Input
                placeholder="Card number"
                style={{
                  width: 150,
                  marginLeft: 10,
                }}
              />
            ) : null}
          </Radio>
        </Space>
      </Radio.Group>
    </section>
  );
};
