import { Input, InputNumber, Space } from "antd";

export const DeliveryForm = () => {
  return (
    <section className="flex flex-col gap-[15px] mt-[30px]">
      <Input
        placeholder='Your name'
        name='name'
        prefix='Name: '
        required={true}
        style={{ fontWeight: 'bold' }}
        size='large'
        allowClear
      />
      <Input
        placeholder='Your address'
        name='address'
        prefix='Address: '
        required={true}
        style={{ fontWeight: 'bold' }}
        size='large'
        allowClear
      />
      <Space>
        <div className="flex flex-col gap-4 md:flex-row">
            <Input
              placeholder='Your city'
              name='city'
              prefix='City: '
              required={true}
              style={{ fontWeight: 'bold' }}
              size='large'
              allowClear
            />
            <InputNumber
              placeholder='000000'
              prefix='Zipcode: '
              required={true}
              style={{ fontWeight: 'bold' }}
              size='large'
              addonAfter="*"
            />
        </div>
      </Space>
    </section>
  )
}