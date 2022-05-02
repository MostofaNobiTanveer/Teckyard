import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const Product = ({ product }) => {
  return (
    <Link
      to={`/product/${product._id}`}
      className="relative cursor-pointer bg-white rounded-3xl flex flex-col group p-2.5 border"
    >
      <div className="relative flex-shrink-0 overflow-hidden">
        <div title={product.name}>
          <div className="bg-gray-100 h-[25rem] flex aspect-w-11 aspect-h-12 w-full rounded-3xl overflow-hidden will-change-transform">
            <img
              src={product.images[0].url}
              className="object-contain w-full h-full group-hover:scale-[1.03] transition-transform duration-300 ease-in-out rounded-3xl will-change-transform"
              alt={product.name}
            />
          </div>
        </div>
        <div className="absolute top-[-1px] right-[-20px] flex items-center">
          <svg
            className="text-white w-44 md:w-[195px]"
            viewBox="0 0 195 55"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M195 55V0H0.163376C8.64729 0 16.5008 4.47914 20.8201 11.7812L39.4159 43.2188C43.7352 50.5209 51.5887 55 60.0726 55H195Z"
              fill="currentColor"
            ></path>
          </svg>
          <div className="absolute right-8 top-1/2 -translate-y-1/2 pb-1 w-1/2 text-right">
            <span className="block text-xs text-green-500 font-medium tracking-wide">
              {product.stock > 0 ? (
                `${product.stock} in stock`
              ) : (
                <span className="text-red-500">Out of stock</span>
              )}
            </span>
            <span className="block text-2xl font-medium md:font-semibold text-right">
              ${product.price}
            </span>
          </div>
        </div>
        <div className="absolute left-[-0.2px] bottom-[-2px] ">
          <svg
            className="text-white w-64 md:w-[281px]"
            width="281"
            viewBox="0 0 281 99"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 0V99H258.059C248.54 99 239.92 93.3743 236.089 84.6606L205.167 14.3394C201.335 5.62568 192.716 0 183.197 0H0Z"
              fill="currentColor"
            ></path>
          </svg>
          <div
            title={product.name}
            className="absolute left-1 top-0 py-4 w-48 flex flex-col justify-between"
          >
            <h2 className="text-lg font-medium truncate">{product.name}</h2>
            <div className="w-full mt-1.5 flex justify-between items-end">
              {/* <div className="flex items-baseline border-2 border-green-500 rounded-lg relative py-1.5 md:py-2 px-2.5 md:px-3.5 text-sm sm:text-base font-semibold ">
                <span className="absolute font-normal bottom-full translate-y-2.5 p-1 -mx-1 text-xs text-neutral-500 bg-white">
                  Price
                </span>
                <span className=" text-green-500 !leading-none">
                  {product.price} USD
                </span>
              </div> */}
              <span className="text-lg font-semibold text-right flex gap-0.5">
                {<Rating value={product.ratings} />}
              </span>
              <span className="block text-neutral-500 text-xs">
                {product.numOfReviews} reviews
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* <a className="absolute inset-0" href="/ciscryp/nft-detailt"></a> */}
    </Link>
    // <article
    //   onClick={() => openProductDetailsModal(product._id)}
    //   className="bg-white relative h-full rounded"
    // >
    //   <div
    //     title={product.name}
    //     className="relative flex h-72 w-auto cursor-pointer items-center justify-center p-3"
    //   >
    //     <img
    //       alt={product.name}
    //       className="w-full h-full object-contain"
    //       src={product.images[0].url}
    //     />
    //   </div>
    //   <header className="p-3 md:p-6">
    //     <div className="mb-2 flex items-center">
    //       <span className="text-base font-semibold text-heading md:text-xl">
    //         ${product.price}
    //       </span>
    //     </div>
    //     <h3
    //       title={product.name}
    //       className="mb-4 cursor-pointer truncate text-sm text-body md:text-base"
    //     >
    //       {product.name}
    //     </h3>
    //     <button className="group flex w-full items-center justify-between rounded hover:text-white bg-white bg-opacity-70 text-xs text-body-dark transition-colors hover:border-teal hover:bg-indigo-500 hover:text-light focus:border-teal focus:bg-teal-400 focus:text-light focus:outline-none h-9 md:text-sm overflow-hidden">
    //       <span className="flex-1 font-bold">Add</span>
    //       <span className="grid place-items-center bg-white duration-200 group-hover:bg-indigo-600 group-focus:bg-indigo-500 ltr:rounded-tr ltr:rounded-br rtl:rounded-tl rtl:rounded-bl h-9 w-9">
    //         <BsPlus className="h-5 w-5"></BsPlus>
    //       </span>
    //     </button>
    //   </header>
    // </article>
  );
};

export default Product;
