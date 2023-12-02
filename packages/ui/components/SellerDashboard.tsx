import { PaymentInfoCard } from "./PaymentsInfoCard"
import { RevenueInfoCard } from "./RevenueInfoCard"
import { OrdersInfoCard } from "./OrdersInfoCard"

export const Dashboard = () => {
    return(
        <section id="Home">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                <PaymentInfoCard />
                <RevenueInfoCard />
                <OrdersInfoCard />
            </div>
        </section>
    )
}