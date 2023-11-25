import { DollarIcon } from "../assets"

export const RevenueInfoCard = () => {
    return(
        <section className="flex gap-5 items-center justify-center rounded-md border shadow-md p-5 max-w-[300px] cursor-pointer">
            <DollarIcon />
            <div>
                <h2 className="text-xl sm:text-2xl text-gray-500 font-normal">Revenue</h2>
                <h1 className="text-2xl sm:text-3xl font-bold">$230.40</h1>
            </div>
        </section>
    )
}