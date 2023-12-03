export const AdminHero = () => {
  return (
    <div className="flex flex-col items-center m-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold px-2">
          Welcome to <span className="text-orange-500"> T-Fashonista </span>'s
          Seller Dashboard
        </h1>
      <div className="container mx-auto my-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-xl sm:text-2xl font-bold mb-4">Product Management</h2>
            <p>Add, update, and customize your T-Shirt listings with ease.</p>
          </div>

          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-xl sm:text-2xl font-bold mb-4">Order Insights</h2>
            <p>Gain valuable customer insights and understand your market.</p>
          </div>

          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-xl sm:text-2xl font-bold mb-4">Financial Overview</h2>
            <p>
              Track revenue and monitor order metrics in one intuitive
              dashboard.
            </p>
          </div>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold my-6">Why Choose T-Fashionista?</h2>

        <ul className="list-disc pl-6 text-gray-600 text-lg">
          <li><span className="font-bold text-gray-700">Global Reach:</span> Showcase your designs to a worldwide audience.</li>
          <li>
            <span className="font-bold text-gray-700">User-Friendly Dashboard:</span> Effortlessly manage products, orders, and
            revenue.
          </li>
          <li>
            <span className="font-bold text-gray-700">Customer Engagement:</span> Connect directly with customers for feedback
            and loyalty.
          </li>
          <li>
            <span className="font-bold text-gray-700">Marketing Support:</span> Benefit from our brand's marketing initiatives
            for increased visibility.
          </li>
        </ul>

        <p className="mt-6 text-xl sm:text-2xl font-extrabold text-gray-600">
          Join T-Fashionista's dynamic platform and elevate your T-Shirt
          business. Start selling today !
        </p>
      </div>
    </div>
  );
};
