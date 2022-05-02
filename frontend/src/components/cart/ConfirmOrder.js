import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MetaData from '../layout/MetaData';
import CheckoutOrderSummery from './CheckoutOrderSummery';
import CheckoutSteps from './CheckoutSteps';
import Layout from '../layout';

const ConfirmOrder = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);

  const itemsPrice = cartItems
    .reduce((a, c) => a + c.price * c.quantity, 0)
    .toFixed(2);
  const shippingPrice = itemsPrice > 200 ? 0 : 10;
  const totalPrice = (Number(itemsPrice) + Number(shippingPrice)).toFixed(2);

  const proceedToPayment = () => {
    const data = {
      itemsPrice,
      shippingPrice,
      totalPrice,
    };
    console.log(data);
    sessionStorage.setItem('orderData', JSON.stringify(data));
    navigate('/checkout/payment');
  };

  return (
    <Layout>
      <MetaData title="Shipping Info" />
      <div className="bg-white relative">
        {/* Steps */}
        <div className="relative lg:px-8 md:px-3 md:pt-6 max-w-4xl mx-auto">
          <CheckoutSteps confirmOrder />
        </div>
        <div className="relative grid grid-cols-1 gap-x-16 max-w-7xl mx-auto lg:px-8 lg:grid-cols-2 lg:pt-16">
          {/* Order Summery */}
          <CheckoutOrderSummery />

          {/* Payment and Shipping */}
          <section className="py-16 lg:max-w-lg lg:w-full lg:mx-auto lg:pt-0 lg:pb-24 lg:row-start-1 lg:col-start-1">
            <div className="max-w-2xl mx-auto px-4 lg:max-w-none lg:px-0 space-y-6">
              <dl className="text-sm font-medium space-y-6 border-t border-white border-opacity-10 pt-6">
                <h3 className="text-lg font-medium text-gray-900">
                  Contact information
                </h3>
                <div className="flex gap-2 items-start justify-between">
                  <dt>Name:</dt>
                  <dd className="text-right font-normal text-black">
                    {user && user.name}
                  </dd>
                </div>

                <div className="flex gap-2 items-start justify-between">
                  <dt>Phone:</dt>
                  <dd className="text-right font-normal text-black">
                    {shippingInfo.phoneNo}
                  </dd>
                </div>

                {/* <div className="flex gap-2 items-start justify-between border-t border-gray-900 border-opacity-10 pt-6"></div> */}

                <h3 className="pt-6 text-lg font-medium text-gray-900">
                  Shipping information
                </h3>

                <div className="flex gap-2 items-start justify-between">
                  <dt>Address:</dt>
                  <dd className="text-right font-normal text-black">
                    {shippingInfo.address}
                  </dd>
                </div>

                <div className="flex gap-2 items-start justify-between">
                  <dt>City:</dt>
                  <dd className="text-right font-normal text-black">
                    {shippingInfo.city}
                  </dd>
                </div>

                <div className="flex gap-2 items-start justify-between">
                  <dt>State/Province:</dt>
                  <dd className="text-right font-normal text-black">
                    {shippingInfo.state}
                  </dd>
                </div>

                <div className="flex gap-2 items-start justify-between">
                  <dt>Postal Code:</dt>
                  <dd className="text-right font-normal text-black">
                    {shippingInfo.postalCode}
                  </dd>
                </div>
              </dl>

              <div className="mt-10 flex gap-2 justify-end items-center pt-6 border-t border-gray-200">
                <Link
                  to="/shipping"
                  className="bg-gray-100 border border-transparent rounded-full shadow-sm py-2 px-4 text-sm font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-gray-400"
                >
                  Shipping info
                </Link>
                <button
                  onClick={proceedToPayment}
                  className="bg-blue-600 border border-transparent rounded-full shadow-sm py-2 px-4 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-blue-500"
                >
                  Proceed to payment
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default ConfirmOrder;
