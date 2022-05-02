import React from 'react';
import { BsCheck2 } from 'react-icons/bs';

const CheckoutSteps = ({ shipping, confirmOrder, payment }) => {
  return (
    <nav>
      <ol className="md:border border-b border-gray-300 md:rounded-full divide-y divide-gray-300 md:flex md:divide-y-0">
        <li className="relative md:flex-1 md:flex">
          <span className="px-3 py-3 flex items-center text-sm font-medium">
            {shipping ? (
              <span className="flex-shrink-0 w-10 h-10 flex items-center justify-center border-2 border-blue-600 rounded-full">
                <span className="text-blue-600">01</span>
              </span>
            ) : (
              <span className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-blue-600 rounded-full group-hover:bg-blue-800">
                <BsCheck2 className="w-6 h-6 text-white" />
              </span>
            )}

            <span
              className={`ml-4 text-sm font-medium ${
                shipping ? 'text-blue-500' : 'text-gray-900'
              } `}
            >
              Shipping
            </span>
          </span>

          <ArrowSvg />
        </li>

        <li className="relative md:flex-1 md:flex">
          <div className="px-3 py-3 flex items-center text-sm font-medium">
            {confirmOrder ? (
              <span className="flex-shrink-0 w-10 h-10 flex items-center justify-center border-2 border-blue-600 rounded-full">
                <span className="text-blue-600">02</span>
              </span>
            ) : payment ? (
              <span className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-blue-600 rounded-full group-hover:bg-blue-800">
                <BsCheck2 className="w-6 h-6 text-white" />
              </span>
            ) : (
              <span className="flex-shrink-0 w-10 h-10 flex items-center justify-center border-2 border-gray-300 rounded-full">
                <span className="text-gray-500">02</span>
              </span>
            )}
            <span
              className={`ml-4 text-sm font-medium ${
                confirmOrder ? 'text-blue-500' : 'text-gray-900'
              } `}
            >
              Confirm order
            </span>
          </div>

          <ArrowSvg />
        </li>

        <li className="relative md:flex-1 md:flex">
          <span className="px-3 py-3 flex items-center text-sm font-medium">
            <span className="flex-shrink-0 w-10 h-10 flex items-center justify-center border-2 border-gray-300 rounded-full group-hover:border-gray-400">
              {payment ? (
                <span className="flex-shrink-0 w-10 h-10 flex items-center justify-center border-2 border-blue-600 rounded-full">
                  <span className="text-blue-600">02</span>
                </span>
              ) : (
                <span className="flex-shrink-0 w-10 h-10 flex items-center justify-center border-2 border-gray-300 rounded-full">
                  <span className="text-gray-500">03</span>
                </span>
              )}
            </span>
            <span
              className={`ml-4 text-sm font-medium ${
                payment ? 'text-blue-500' : 'text-gray-900'
              } `}
            >
              Payment
            </span>
          </span>
        </li>
      </ol>
    </nav>
  );
};

const ArrowSvg = () => (
  <div className="hidden md:block absolute top-0 right-0 h-full w-5">
    <svg
      className="h-full w-full text-gray-300"
      viewBox="0 0 22 80"
      fill="none"
      preserveAspectRatio="none"
    >
      <path
        d="M0 -2L20 40L0 82"
        vectorEffect="non-scaling-stroke"
        stroke="currentcolor"
        strokeLinejoin="round"
      />
    </svg>
  </div>
);

export default CheckoutSteps;
