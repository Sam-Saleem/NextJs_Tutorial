import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import mongoose from "mongoose";
import Order from "@/models/Order";

const MyOrder = ({ order, clearCart }) => {
  const [orderDate, setOrderDate] = useState();
  const products = order.products;
  const router = useRouter();
  useEffect(() => {
    if (router.query.clearCart == 1) {
      clearCart();
    }
    const d = new Date(order.createdAt);
    setOrderDate(
      d.toLocaleDateString("en-PK", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    );
  }, []);

  return (
    <div>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-14 md:py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                CODESWEAR.COM
              </h2>
              <h1 className="text-gray-900 text-xl md:text-3xl title-font font-medium mb-4">
                Order Id: #{order.orderId}
              </h1>
              <p className="leading-relaxed">
                Yayy! Your Order has been successfully placed!
              </p>
              <p className="leading-relaxed">
                Order placed on:{" "}
                <span className="font-semibold text-slate-700">
                  {orderDate}
                </span>
              </p>
              <p className="mb-4">
                Your Payment Status is:{" "}
                <span className="font-semibold text-slate-700">
                  {order.status}
                </span>
              </p>
              <h3 className="text-gray-900 text-center text-xl font-semibold">
                Order Items
              </h3>
              <div className="flex mb-4">
                <span className="w-2/4 flex-grow text-start text-pink-500 border-b-2 border-gray-300 py-2 text-lg">
                  Item Description
                </span>
                <span className="w-1/4 flex-grow text-start text-pink-500 border-b-2 border-gray-300 py-2 text-lg">
                  Quantity
                </span>
                <span className="w-1/4 flex-grow text-start text-pink-500 border-b-2 border-gray-300 py-2 text-lg">
                  Item Total
                  {/* Item Price */}
                </span>
              </div>
              {Object.keys(products).map((key) => {
                return (
                  <div key={key} className="flex border-b border-gray-200 py-2">
                    <span className="w-2/4 text-gray-500 text-start">
                      {products[key].name} ({products[key].size}/
                      {products[key].variant})
                    </span>
                    <span className="w-1/4 text-gray-900 text-start md:ms-10 ">
                      {products[key].qty}
                    </span>
                    <span className="w-1/4 text-gray-900 text-start">
                      Rs.{products[key].price} x {products[key].qty} = Rs.
                      {products[key].price * products[key].qty}
                    </span>
                  </div>
                );
              })}

              {/* <div className="flex border-b border-gray-200 py-2">
                <span className="text-gray-500">Tshirt - Wear the code</span>
                <span className="ml-auto text-gray-900">1</span>
                <span className="ml-auto text-gray-900">Rs.2500</span>
              </div>
              <div className="flex border-b  border-gray-200 py-2">
                <span className="text-gray-500">Tshirt - Wear the code</span>
                <span className="ml-auto text-gray-900">1</span>
                <span className="ml-auto text-gray-900">Rs.2500</span>
              </div> */}
              <div className="flex flex-col my-4 md:my-6">
                <span className="title-font font-medium text-xl md:text-2xl text-gray-900">
                  SubTotal: Rs.{order.amount}
                </span>
                <button className="mt-6 md:mt-10 flex mx-auto text-white bg-pink-500 border-0 py-2 px-2 md:px-6 focus:outline-none hover:bg-pink-600 rounded">
                  Track Order
                </button>
                {/* <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4"> 
                  <svg
                    fill="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                  </svg>
                </button>*/}
              </div>
            </div>
            <img
              alt="ecommerce"
              className="lg:w-1/2 lg:h-auto md:w-[50vh] mx-auto rounded shadow-lg"
              src="https://cactuskids.pk/cdn/shop/files/28.png?v=1694504708"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default MyOrder;

export async function getServerSideProps(context) {
  // Connecting to databse
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }

  let order = await Order.findById(context.query.id);

  // Pass data to the page via props
  // Creaing a deep copy of this object as it contains an id which is object
  return {
    props: {
      order: JSON.parse(JSON.stringify(order)),
    },
  };
}
