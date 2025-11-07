import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
const Orders = () => {
  const [orderlist, setOrderList] = useState([]);
  const [productList, setProductList] = useState([]);
  const fetchOrders = async () => {
    const authToken = Cookies.get("authToken");
    console.log("user authToken is: ", authToken);
    try {
      const res = await axios.post("/hi/orders/orderuser", {
        authToken: authToken,
      });
      console.log("data is ", res.data);
      setOrderList(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <>
      <div className="min-h-screen bg-black text-white p-6 ">
        <div className=" xl:mt-8 xl:block w-7/12">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Orders{" "}
          </h3>
          {orderlist.map((item, key) => (
            <div
              key={item.id}
              className="w-full bg-gray-800 text-white rounded-md shadow-md p-6 mb-4"
            >
              <div className="flex justify-between mb-4">
                <p className="text-lg font-semibold">
                  Order ID: <span className="text-indigo-400">{item.id}</span>
                </p>
                <p className="text-sm">
                  {new Date(item.orderPlacedTime).toLocaleString()}
                </p>
              </div>
              <div className="flex justify-between mb-4">
                <p>
                  <strong>Delivery Time:</strong>{" "}
                  {new Date(item.deliveryTime).toLocaleString()}
                </p>
                <p
                  className={
                    item.deliveryStatus === "Pending"
                      ? "text-yellow-400"
                      : "text-green-400"
                  }
                >
                  <strong>Delivery Status:</strong> {item.deliveryStatus}
                </p>
              </div>
              <div className="flex justify-between mb-4">
                <p>
                  <strong>Payment Status:</strong> {item.paymentStatus}
                </p>
                <p>
                  <strong>Total Items:</strong> {item.totalItems}
                </p>
              </div>
              <div className="flex justify-between">
                <p>
                  <strong>Total Amount:</strong> ${item.totalAmount.toFixed(2)}
                </p>
              </div>
            </div>
          ))}

          {/* <div className="mt-6 grid grid-cols-3 gap-4 sm:mt-8">
            <div className="space-y-6 overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <a href="#" className="overflow-hidden rounded">
                <img
                  className="mx-auto h-44 w-44 dark:hidden"
                  src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg"
                  alt="imac image"
                />
                <img
                  className="mx-auto hidden h-44 w-44 dark:block"
                  src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg"
                  alt="imac image"
                />
              </a>
              <div>
                <a
                  href="#"
                  className="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white"
                >
                  iMac 27”
                </a>
                <p className="mt-2 text-base font-normal text-gray-500 dark:text-gray-400">
                  This generation has some improvements, including a longer
                  continuous battery life.
                </p>
              </div>
              <div>
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  <span className="line-through"> $399,99 </span>
                </p>
                <p className="text-lg font-bold leading-tight text-red-600 dark:text-red-500">
                  $299
                </p>
              </div>
              <div className="mt-6 flex items-center gap-2.5">
                <button
                  data-tooltip-target="favourites-tooltip-1"
                  type="button"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white p-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
                >
                  <svg
                    className="h-5 w-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z"
                    ></path>
                  </svg>
                </button>
                <div
                  id="favourites-tooltip-1"
                  role="tooltip"
                  className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700"
                >
                  Add to favourites
                  <div className="tooltip-arrow" data-popper-arrow></div>
                </div>
                <button
                  type="button"
                  className="inline-flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium  text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  <svg
                    className="-ms-2 me-2 h-5 w-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7h-1M8 7h-.688M13 5v4m-2-2h4"
                    />
                  </svg>
                  Add to cart
                </button>
              </div>
            </div>

            <div className="space-y-6 overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <a href="#" className="overflow-hidden rounded">
                <img
                  className="mx-auto h-44 w-44 dark:hidden"
                  src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/ps5-light.svg"
                  alt="imac image"
                />
                <img
                  className="mx-auto hidden h-44 w-44 dark:block"
                  src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/ps5-dark.svg"
                  alt="imac image"
                />
              </a>
              <div>
                <a
                  href="#"
                  className="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white"
                >
                  Playstation 5
                </a>
                <p className="mt-2 text-base font-normal text-gray-500 dark:text-gray-400">
                  This generation has some improvements, including a longer
                  continuous battery life.
                </p>
              </div>
              <div>
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  <span className="line-through"> $799,99 </span>
                </p>
                <p className="text-lg font-bold leading-tight text-red-600 dark:text-red-500">
                  $499
                </p>
              </div>
              <div className="mt-6 flex items-center gap-2.5">
                <button
                  data-tooltip-target="favourites-tooltip-2"
                  type="button"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white p-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
                >
                  <svg
                    className="h-5 w-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z"
                    ></path>
                  </svg>
                </button>
                <div
                  id="favourites-tooltip-2"
                  role="tooltip"
                  className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700"
                >
                  Add to favourites
                  <div className="tooltip-arrow" data-popper-arrow></div>
                </div>
                <button
                  type="button"
                  className="inline-flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium  text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  <svg
                    className="-ms-2 me-2 h-5 w-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7h-1M8 7h-.688M13 5v4m-2-2h4"
                    />
                  </svg>
                  Add to cart
                </button>
              </div>
            </div>

            <div className="space-y-6 overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <a href="#" className="overflow-hidden rounded">
                <img
                  className="mx-auto h-44 w-44 dark:hidden"
                  src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/apple-watch-light.svg"
                  alt="imac image"
                />
                <img
                  className="mx-auto hidden h-44 w-44 dark:block"
                  src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/apple-watch-dark.svg"
                  alt="imac image"
                />
              </a>
              <div>
                <a
                  href="#"
                  className="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white"
                >
                  Apple Watch Series 8
                </a>
                <p className="mt-2 text-base font-normal text-gray-500 dark:text-gray-400">
                  This generation has some improvements, including a longer
                  continuous battery life.
                </p>
              </div>
              <div>
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  <span className="line-through"> $1799,99 </span>
                </p>
                <p className="text-lg font-bold leading-tight text-red-600 dark:text-red-500">
                  ₹1199
                </p>
              </div>
              <div className="mt-6 flex items-center gap-2.5">
                <button
                  data-tooltip-target="favourites-tooltip-3"
                  type="button"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white p-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
                >
                  <svg
                    className="h-5 w-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z"
                    ></path>
                  </svg>
                </button>
                <div
                  id="favourites-tooltip-3"
                  role="tooltip"
                  className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700"
                >
                  Add to favourites
                  <div className="tooltip-arrow" data-popper-arrow></div>
                </div>

                <button
                  type="button"
                  className="inline-flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium  text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  <svg
                    className="-ms-2 me-2 h-5 w-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7h-1M8 7h-.688M13 5v4m-2-2h4"
                    />
                  </svg>
                  Add to cart
                </button>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Orders;
