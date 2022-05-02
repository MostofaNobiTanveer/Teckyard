import React, { useState } from 'react';
import { FiLoader } from 'react-icons/fi';
import { BsThreeDotsVertical, BsCheckCircleFill } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { additemToCart } from '../../actions/cartActions';

const SingleOrder = ({ order }) => {
  const dispatch = useDispatch();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  console.log(order);
  return (
    <div className="bg-white border-t border-b border-gray-200 shadow-sm sm:rounded-3xl sm:border">
      <div className="flex items-start p-4 border-b border-gray-200 sm:p-6 justify-between">
        <dl className="flex-1 flex-col sm:flex-row items-start flex gap-6">
          <div>
            <dt className="font-medium text-gray-900">Order id</dt>
            <dd className="mt-1 text-gray-500 truncate">{order._id}</dd>
          </div>
          <div className="hidden md:block">
            <dt className="font-medium text-gray-900">Date placed</dt>
            <dd className="mt-1 text-gray-500">
              {String(order.createdAt).substring(0, 10)}
            </dd>
          </div>
          <div>
            <dt className="font-medium text-gray-900">Total amount</dt>
            <dd className="mt-1 font-medium text-gray-900">
              ${order.totalPrice}
            </dd>
          </div>
        </dl>

        <div className="relative flex justify-end lg:hidden">
          <div className="flex items-center">
            <button
              type="button"
              className="-m-2 p-2 flex items-center text-gray-400 hover:text-gray-500"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <BsThreeDotsVertical className="w-6 h-6" />
            </button>
          </div>
          <div
            className={`${
              isDropdownOpen
                ? 'transform opacity-100 scale-100'
                : 'transform opacity-0 scale-95 pointer-events-none'
            } transition ease-in duration-100 origin-bottom-right absolute right-0 mt-6 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none`}
          >
            <div className="py-1" role="none">
              <Link
                to={`/order/${order._id}`}
                onClick={() => setIsDropdownOpen(false)}
                className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
              >
                <span>View Order</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="hidden lg:col-span-2 lg:flex lg:items-center lg:justify-end lg:space-x-4">
          <Link
            to={`/order/${order._id}`}
            className="flex items-center justify-center bg-white py-2 px-3 border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <span>View Order</span>
          </Link>
        </div>
      </div>

      {/* <!-- Products --> */}
      <ul className="divide-y divide-gray-200">
        {order.orderItems.map((item) => (
          <li key={item.product} className="p-4 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 w-20 h-20 bg-gray-200 rounded-lg overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-center object-contain"
                />
              </div>
              <div className="flex-1 ml-6 text-sm">
                <div className="font-medium text-gray-900">
                  <h5>{item.name}</h5>
                  <p className="mt-2 sm:mt-0">
                    (Qty {item.quantity} * ${item.price})
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 sm:flex sm:justify-between">
              <div className="flex items-center">
                {order.orderStatus === 'processing' ? (
                  <FiLoader className="w-5 h-5 text-blue-500" />
                ) : (
                  <BsCheckCircleFill className="w-5 h-5 text-green-500" />
                )}

                <p className="ml-2 text-sm font-medium text-gray-500">
                  {order.orderStatus}
                </p>
              </div>

              <div className="mt-6 border-t border-gray-200 pt-4 flex items-center space-x-4 divide-x divide-gray-200 text-sm font-medium sm:mt-0 sm:ml-4 sm:border-none sm:pt-0">
                <div className="flex-1 flex justify-center">
                  <Link to={`/product/${item.product}`}>
                    <span className="text-blue-600 whitespace-nowrap hover:text-blue-500">
                      View product
                    </span>
                  </Link>
                </div>
                <div className="flex-1 pl-4 flex justify-center">
                  <button
                    type="button"
                    onClick={() =>
                      dispatch(additemToCart(item.product, item.quantity))
                    }
                    className="text-blue-600 whitespace-nowrap hover:text-blue-500"
                  >
                    Buy again
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SingleOrder;
