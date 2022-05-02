import React from 'react';

const ProductsListSkeleton = () => {
  return (
    <div className="space-y-8 w-full">
      <div className="border border-white shadow-sm overflow-hidden sm:rounded-2xl divide-y-8 divide-white">
        <div className="flex items-center h-20 bg-gray-200 animate-pulse"></div>
        <div className="flex items-center h-16 bg-gray-200 animate-pulse"></div>
        <div className="flex items-center h-16 bg-gray-200 animate-pulse"></div>
        <div className="flex items-center h-16 bg-gray-200 animate-pulse"></div>
        <div className="flex items-center h-16 bg-gray-200 animate-pulse"></div>
        <div className="flex items-center h-16 bg-gray-200 animate-pulse"></div>
        <div className="flex items-center h-16 bg-gray-200 animate-pulse"></div>
        <div className="flex items-center h-16 bg-gray-200 animate-pulse"></div>
      </div>
    </div>
  );
};

export default ProductsListSkeleton;
