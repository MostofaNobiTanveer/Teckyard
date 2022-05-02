import React from 'react';

const OrderDetailsSkeleton = () => {
  return (
    <div className="flex flex-col w-full animate-pulse">
      <div className="py-10 lg:pt-6 lg:pb-16 lg:col-start-1 lg:col-span-2 space-y-3">
        {/* <!-- Description and details --> */}

        <div className="w-44 bg-gray-200 h-7 rounded-md "></div>
        <div className="w-2/3 bg-gray-200 h-3 rounded-md "></div>
        <div className="w-full bg-gray-200 h-3 rounded-md "></div>
        <div className="py-6"></div>
        <div className="w-full bg-gray-200 h-2.5 rounded-md "></div>
        <div className="w-1/3 bg-gray-200 h-2.5 rounded-md "></div>
        <div className="w-2/3 bg-gray-200 h-2.5 rounded-md "></div>
        <div className="w-full bg-gray-200 h-2.5 rounded-md "></div>
        <div className="py-2"></div>
        <div className="w-1/3 bg-gray-200 h-2.5 rounded-md "></div>
        <div className="w-full bg-gray-200 h-2.5 rounded-md "></div>
        <div className="w-2/3 bg-gray-200 h-2.5 rounded-md "></div>
        <div className="w-full bg-gray-200 h-2.5 rounded-md "></div>
        <div className="py-2"></div>
        <div className="w-full bg-gray-200 h-2.5 rounded-md "></div>
        <div className="w-2/3 bg-gray-200 h-2.5 rounded-md "></div>
        <div className="w-1/3 bg-gray-200 h-2.5 rounded-md "></div>
        <div className="w-full bg-gray-200 h-2.5 rounded-md "></div>
        <div className="py-2"></div>
        <div className="w-1/3 bg-gray-200 h-2.5 rounded-md "></div>
        <div className="w-full bg-gray-200 h-2.5 rounded-md "></div>
        <div className="w-2/3 bg-gray-200 h-2.5 rounded-md "></div>
        <div className="w-full bg-gray-200 h-2.5 rounded-md "></div>
      </div>
    </div>
  );
};

export default OrderDetailsSkeleton;
