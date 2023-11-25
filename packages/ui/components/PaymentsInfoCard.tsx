import { CreditCardIcon } from "../assets"

export const PaymentInfoCard = () => {
    return(
        <section className="flex gap-5 items-center justify-center rounded-md border shadow-md p-5 max-w-[300px] cursor-pointer">
            <CreditCardIcon />
            <div>
                <h2 className="text-xl sm:text-2xl text-gray-500 font-normal">Payments</h2>
                <h1 className="text-2xl sm:text-3xl font-bold">$4450.60</h1>
            </div>
        </section>
    )
}