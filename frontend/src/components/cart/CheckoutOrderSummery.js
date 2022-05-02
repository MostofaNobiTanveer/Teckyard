import React from 'react';
import { useSelector } from 'react-redux';

const CheckoutOrderSummery = () => {
  const { cartItems } = useSelector((state) => state.cart);

   const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.quantity, 0).toFixed(2);
   const shippingPrice = itemsPrice > 200 ? 0 : 10;
   const totalPrice = (Number(itemsPrice) + Number(shippingPrice)).toFixed(2);

  return (
    <section className="bg-white text-gray-900 py-12 md:px-10 lg:max-w-lg lg:w-full lg:mx-auto lg:px-0 lg:pt-0 lg:pb-24 lg:bg-transparent lg:row-start-1 lg:col-start-2">
      <div className="max-w-2xl mx-auto px-4 lg:max-w-none lg:px-0">
        <dl>
          <dt className="text-sm font-medium">Amount due</dt>
          <dd className="mt-1 text-3xl font-bold">${totalPrice}</dd>
        </dl>

        <ul className="text-sm font-medium divide-y">
          {cartItems.map((item) => (
            <li key={item.product} className="flex items-start py-6 space-x-4">
              <img
                src={item.image}
                alt="Front of zip tote bag with white canvas, white handles, and black drawstring top."
                className="flex-none w-20 h-20 rounded-md bg-gray-100 object-center object-contain"
              />
              <div className="flex-auto space-y-2">
                <h3 className="text-black">{item.name}</h3>
                <p className="text-gray-500">
                  (Qty {item.quantity} * {item.price})
                </p>
              </div>
              <p className="flex-none text-base font-medium text-blue-500">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </li>
          ))}
        </ul>

        <dl className="text-sm font-medium space-y-6 border-t border-white border-opacity-10 pt-6">
          <div className="flex items-center justify-between">
            <dt>Subtotal</dt>
            <dd>${itemsPrice}</dd>
          </div>

          <div className="flex items-center justify-between">
            <dt>Shipping</dt>
            <dd>${shippingPrice.toFixed(2)}</dd>
          </div>

          {/* <div className="flex items-center justify-between">
                  <dt>Taxes</dt>
                  <dd>$47.60</dd>
                </div> */}

          <div className="flex items-center justify-between border-t border-gray-900 border-opacity-10 pt-6">
            <dt className="text-base">Total</dt>
            <dd className="text-base">${totalPrice}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
};

export default CheckoutOrderSummery;
