export const OrderedByCard = ({ id, name, email }:{ id:string, name:string, email:string }) => {
    return(
        <section className="border rounded-md shadow-md py-5 px-2 sm:px-8">
            <div className="text-base sm:text-xl text-gray-700 m-2">
                <span className="font-semibold text-black"> Name: </span> {name}
            </div>
            <div className="text-base sm:text-xl text-gray-700 m-2">
                <span className="font-semibold text-black"> Email: </span> {email}
            </div>
            <div className="text-base sm:text-xl text-gray-700 m-2">
                <span className="font-semibold text-black"> Customer ID: </span> {id}
            </div>
            <div className="text-base sm:text-xl text-gray-700 m-2">
                <span className="font-semibold text-black"> Order Status: </span> Shipped
            </div>
        </section>
    )
}