import React from 'react';

const ProductDetailsSkeleton = () => {
  return (
    <div className="flex flex-col md:flex-row w-full animate-pulse">
      <div className="md:w-1/2 w-[100vw] mx-auto py-10 px-4 sm:px-6 lg:px-8 h-96">
        <div className="relative w-full h-full bg-gray-200 rounded-lg overflow-hidden"></div>
      </div>

      {/* <!-- Product info --> */}
      <div className="md:w-1/2 w-[100vw] mx-auto pt-10 px-4 sm:px-6 lg:px-8">
        <div className="lg:col-span-2 space-y-2">
          <div className="w-full bg-gray-200 h-4 rounded-md "></div>
          <div className="w-2/3 bg-gray-200 h-4 rounded-md "></div>
        </div>

        {/* <!-- Options --> */}
        <div className="mt-10 lg:row-span-3 space-y-4">
          <div className="w-20 bg-gray-200 h-4 rounded-md "></div>

          {/* <!-- Reviews --> */}
          <div className="w-40 bg-gray-200 h-4 rounded-md "></div>

          <div className="mt-10 w-full bg-gray-200 border border-transparent rounded-md py-5 px-8"></div>
        </div>

        <div className="py-10 lg:pt-6 lg:pb-16 lg:col-start-1 lg:col-span-2 space-y-3">
          {/* <!-- Description and details --> */}
          <div className="w-2/3 bg-gray-200 h-2 rounded-md "></div>
          <div className="w-full bg-gray-200 h-2 rounded-md "></div>
          <div className="w-2/3 bg-gray-200 h-2 rounded-md "></div>
          <div className="w-full bg-gray-200 h-2 rounded-md "></div>
          <div className="w-2/3 bg-gray-200 h-2 rounded-md "></div>
          <div className="w-full bg-gray-200 h-2 rounded-md "></div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsSkeleton;
