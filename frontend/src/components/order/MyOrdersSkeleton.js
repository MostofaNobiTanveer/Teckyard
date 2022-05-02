import React from 'react';

const MyOrdersSkeleton = () => {
  return (
    <div className="max-w-2xl space-y-8 sm:px-4 lg:px-8 lg:max-w-4xl">
      <div className="border border-white shadow-sm overflow-hidden sm:rounded-2xl divide-y-8 divide-white">
        <div className="flex items-center h-20 bg-gray-200 animate-pulse"></div>
        <div className="flex items-center h-60 bg-gray-200 animate-pulse"></div>
      </div>
      <div className="border border-white shadow-sm overflow-hidden sm:rounded-2xl divide-y-8 divide-white">
        <div className="flex items-center h-20 bg-gray-200 animate-pulse"></div>
        <div className="flex items-center h-60 bg-gray-200 animate-pulse"></div>
      </div>
    </div>
  );
};

export default MyOrdersSkeleton;
