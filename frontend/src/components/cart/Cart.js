import React from 'react';
import { BsX } from 'react-icons/bs';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CartItem from './CartItem';

const Cart = ({ isCartOpen, closeCart }) => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  return (
    <div
      className={`${
        isCartOpen ? '' : 'pointer-events-none'
      } fixed inset-0 z-50 overflow-hidden`}
    >
      <div
        onClick={closeCart}
        className={`${
          isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        } transform transition duration-300 fixed inset-0 bg-gray-100 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30`}
      ></div>

      <div
        className={`${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        } transform  border-l transition duration-300 fixed inset-y-0 right-0 max-w-full flex`}
      >
        <div className="w-screen max-w-md">
          <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll hide-scrollbar">
            {/* Header */}
            <div className="flex border-y h-14 items-start justify-between">
              <h2 className="text-lg font-medium text-gray-900 p-4">
                Shopping cart
              </h2>
              <div className="ml-3 h-full border-l flex items-center px-2">
                <button
                  onClick={closeCart}
                  className="-m-2 p-2 text-gray-800 focus:outline-none focus:ring-inset focus:ring-2 focus:ring-blue-500"
                >
                  <BsX className="w-10 h-10" />
                </button>
              </div>
            </div>
            {/* Product */}
            {cartItems.length > 0 ? (
              <>
                <div className="flex-1 overflow-y-auto">
                  <div className="p-4">
                    <div className="flow-root">
                      <ul className="-my-6 divide-y divide-gray-200">
                        {cartItems.map((item) => (
                          <CartItem
                            key={item.product}
                            closeCart={closeCart}
                            item={item}
                          />
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>
                      Subtotal (
                      {cartItems.reduce(
                        (acc, item) => acc + Number(item.quantity),
                        0
                      )}{' '}
                      units )
                    </p>
                    <p>
                      $
                      {cartItems
                        .reduce(
                          (acc, item) => acc + item.quantity * item.price,
                          0
                        )
                        .toFixed(2)}
                    </p>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500">
                    Shipping and taxes calculated at checkout.
                  </p>
                  <div className="mt-6">
                    <Link
                      to="/shipping"
                      onClick={closeCart}
                      className="flex w-full justify-center items-center px-6 py-3 border border-transparent rounded-full shadow-sm text-base font-medium text-white bg-blue-500 hover:bg-blue-600"
                    >
                      Checkout
                    </Link>
                  </div>
                  <div className="mt-6 flex justify-center text-sm text-center text-gray-500">
                    <p>
                      or{' '}
                      <button
                        onClick={closeCart}
                        type="button"
                        className="text-blue-500 font-medium hover:underline"
                      >
                        Continue Shopping<span aria-hidden="true"> &rarr;</span>
                      </button>
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <div className="h-full flex items-center">
                <img
                  src="/images/empty-cart.png"
                  alt="Empty cart"
                  className="h-96 aspect-square object-cover mx-auto"
                />
              </div>
            )}
          </div>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default Cart;
