import React from 'react';

const ProductSkeleton = () => {
  return (
    <div className="mx-auto max-w-7xl grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-3">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="p-3 px-5 w-full rounded-lg mx-auto">
          <div className="w-full animate-pulse space-y-3">
            <div className="relative flex h-64 w-full cursor-pointer rounded-lg items-center justify-center sm:h-72 p-3 bg-gray-200"></div>
            <div className="flex flex-col space-y-3 flex-1">
              <div className="w-2/3 bg-gray-200 h-4 rounded-md "></div>
              <div className="w-full bg-gray-200 h-4 rounded-md "></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductSkeleton;
