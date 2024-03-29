import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import mongoose from "mongoose";
import Product from "@/models/Product";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Error from "next/error";

const ProductDetails = ({ addToCart, buyNow, product, variants, error }) => {
  const router = useRouter();
  const { slug } = router.query;
  const [color, setColor] = useState(product?.color);
  const [size, setSize] = useState(product?.size);

  const [pin, setPin] = useState();
  const [service, setService] = useState(null);

  useEffect(() => {
    setColor(product?.color);
    setSize(product?.size);
  }, [router.query]);

  const refreshVariant = (newColor, newSize) => {
    let url = `${process.env.NEXT_PUBLIC_HOST}/product/${variants[newColor][newSize]["slug"]}`;
    // window.location = url;
    router.push(url);
  };

  const checkServiceability = async () => {
    let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`);
    let pinJson = await pins.json();
    if (Object.keys(pinJson).includes(pin)) {
      setService(true);
      toast.success("Your Pincode is serviceable!", {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      setService(false);
      toast.error("Sorry, Pincode not serviceable!", {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  const onChangePin = (e) => {
    setService(null);
    setPin(e.target.value);
  };
  if (error) {
    return <Error statusCode={error} />;
  }
  return (
    <div>
      <section className="text-gray-600 body-font overflow-hidden">
        <ToastContainer
        // position="bottom-center"
        // autoClose={3000}
        // hideProgressBar={false}
        // newestOnTop={false}
        // closeOnClick
        // rtl={false}
        // pauseOnFocusLoss
        // draggable
        // pauseOnHover
        />
        <div className="container px-5 py-10 md:py-24 mx-auto">
          <div className="lg:4/5 mx-auto flex flex-wrap">
            <div className="lg:w-1/2 px-10">
              <img
                alt="ecommerce"
                className="w-full lg:h-auto rounded-3xl"
                src={product.img}
              />
            </div>
            <div className="lg:w-1/2 w-full lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                CODESWEAR
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {product.title} ({product.size}/{product.color})
              </h1>
              {/* <div className="flex mb-4">
                <span className="flex items-center">
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-pink-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-pink-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-pink-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-pink-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-pink-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <span className="text-gray-600 ml-3">4 Reviews</span>
                </span>
                <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                  <a className="text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                    </svg>
                  </a>
                  <a className="text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                    </svg>
                  </a>
                  <a className="text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                    </svg>
                  </a>
                </span>
              </div> */}
              <p className="leading-relaxed">{product.desc}</p>
              <div className="flex mt-8 items-center pb-5 border-b-2 border-gray-100 mb-5">
                <div className="flex">
                  <span className="mr-3">Color</span>
                  {Object.keys(variants).includes("white") &&
                    Object.keys(variants["white"]).includes(size) && (
                      <button
                        onClick={(e) => {
                          refreshVariant("white", size);
                        }}
                        className={`border-2 ${
                          color === "white"
                            ? "border-pink-600"
                            : "border-gray-300"
                        } bg-white rounded-full w-6 h-6 focus:outline-none`}
                      ></button>
                    )}
                  {Object.keys(variants).includes("blue") &&
                    Object.keys(variants["blue"]).includes(size) && (
                      <button
                        onClick={(e) => {
                          refreshVariant("blue", size);
                        }}
                        className={`border-2 ${
                          color === "blue"
                            ? "border-pink-600"
                            : "border-gray-300"
                        } bg-blue-900 rounded-full w-6 h-6 focus:outline-none`}
                      ></button>
                    )}
                  {Object.keys(variants).includes("rinsed") &&
                    Object.keys(variants["rinsed"]).includes(size) && (
                      <button
                        onClick={(e) => {
                          refreshVariant("rinsed", size);
                        }}
                        className={`border-2 ${
                          color === "rinsed"
                            ? "border-pink-600"
                            : "border-gray-300"
                        } ml-1 bg-slate-700 rounded-full w-6 h-6 focus:outline-none`}
                      ></button>
                    )}
                  {Object.keys(variants).includes("black") &&
                    Object.keys(variants["black"]).includes(size) && (
                      <button
                        onClick={(e) => {
                          refreshVariant("black", size);
                        }}
                        className={`border-2 ${
                          color === "black"
                            ? "border-pink-600"
                            : "border-gray-300"
                        } ml-1 bg-gray-900 rounded-full w-6 h-6 focus:outline-none`}
                      ></button>
                    )}
                  {Object.keys(variants).includes("light blue") &&
                    Object.keys(variants["light blue"]).includes(size) && (
                      <button
                        onClick={(e) => {
                          refreshVariant("light blue", size);
                        }}
                        className={`border-2 ${
                          color === "light blue"
                            ? "border-pink-600 "
                            : "border-gray-300"
                        } ml-1 bg-blue-600 rounded-full w-6 h-6 focus:outline-none`}
                      ></button>
                    )}
                  {Object.keys(variants).includes("navy") &&
                    Object.keys(variants["navy"]).includes(size) && (
                      <button
                        onClick={(e) => {
                          refreshVariant("", size);
                        }}
                        className={`border-2 ${
                          color === "navy"
                            ? "border-pink-600"
                            : "border-gray-300"
                        } ml-1 bg-sky-950 rounded-full w-6 h-6 focus:outline-none`}
                      ></button>
                    )}
                </div>
                <div className="flex ml-6 items-center">
                  <span className="mr-3">Size</span>
                  <div className="relative">
                    <select
                      value={size}
                      onChange={(e) => {
                        refreshVariant(color, e.target.value);
                      }}
                      className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-500 text-base pl-3 pr-10"
                    >
                      {Object.keys(variants[color]).includes("S") && (
                        <option value={"S"}>S</option>
                      )}
                      {Object.keys(variants[color]).includes("M") && (
                        <option value={"M"}>M</option>
                      )}
                      {Object.keys(variants[color]).includes("L") && (
                        <option value={"L"}>L</option>
                      )}
                      {Object.keys(variants[color]).includes("XL") && (
                        <option value={"XL"}>XL</option>
                      )}
                      {Object.keys(variants[color]).includes("XXL") && (
                        <option value={"XXL"}>XX</option>
                      )}
                      {/* {Object.keys(variants).includes("white") && L */}
                    </select>
                    <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex md:mt-10">
                {product.availableQty ? (
                  <span className="title-font font-medium text-xl md:text-2xl text-gray-900">
                    Rs.{product.price}
                  </span>
                ) : (
                  <span className="title-font font-medium text-xl md:text-2xl text-gray-900">
                    Out of Stock!!!
                  </span>
                )}
                <button
                  disabled={!product.availableQty}
                  onClick={() => {
                    addToCart(
                      slug,
                      1,
                      product.price,
                      product.title,
                      size,
                      color
                    );
                  }}
                  className="disabled:bg-pink-400 flex ml-auto lg:ml-10 text-white bg-pink-500 border-0 py-2 px-2 md:px-4 focus:outline-none hover:bg-pink-600 rounded"
                >
                  Add to Cart
                </button>
                <button
                  disabled={!product.availableQty}
                  onClick={() => {
                    buyNow(slug, 1, product.price, product.title, size, color);
                  }}
                  className="disabled:bg-pink-400 flex ml-2 md:ml-4 text-white bg-pink-500 border-0 py-2 px-2 md:px-4 focus:outline-none hover:bg-pink-600 rounded"
                >
                  Buy Now
                </button>
                {/* <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-2 md:ml-4">
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                  </svg>
                </button> */}
              </div>
              <div className="pin mt-6 flex space-x-2 text-sm">
                <input
                  placeholder="Enter your Pincode"
                  type="text"
                  className="px-2 border-2 border-black rounded-md focus:outline-pink-600 "
                  onChange={onChangePin}
                />

                <button
                  onClick={checkServiceability}
                  className="text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded"
                >
                  Check
                </button>
              </div>
              <div
                hidden={service || service === null}
                className="text-red-700 mt-2 text-sm"
              >
                Sorry! We do not deliver to this pincode yet
              </div>
              <div
                hidden={!service || service === null}
                className="text-green-700 mt-2 text-sm"
              >
                Yay! This pincode is serviceable
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetails;

export async function getServerSideProps(context) {
  // Connecting to databse
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  // Getting all the products:
  let product = await Product.findOne({ slug: context.query.slug });
  if (!product) {
    return {
      props: {
        error: 404,
      },
    };
  }
  let variants = await Product.find({
    title: product.title,
    category: product.category,
  });

  let colorSizeSlug = {}; // {red:{xl:{slug:"wear-the-code-xl"}}}
  for (let item of variants) {
    if (Object.keys(colorSizeSlug).includes(item.color)) {
      colorSizeSlug[item.color][item.size] = { slug: item.slug };
    } else {
      colorSizeSlug[item.color] = {};
      colorSizeSlug[item.color][item.size] = { slug: item.slug };
    }
  }

  // Pass data to the page via props
  // Creaing a deep copy of this object as it contains an id which is object
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
      variants: JSON.parse(JSON.stringify(colorSizeSlug)),
    },
  };
}
