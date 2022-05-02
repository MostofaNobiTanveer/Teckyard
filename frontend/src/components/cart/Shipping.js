import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveShippingInfo } from '../../actions/cartActions';
import Layout from '../layout';
import MetaData from '../layout/MetaData';
import CheckoutSteps from './CheckoutSteps';

const Shipping = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);

  const [shippingInfoState, setShippingInfoState] = useState({
    phoneNo: shippingInfo.phoneNo,
    address: shippingInfo.address,
    city: shippingInfo.city,
    state: shippingInfo.state,
    postalCode: shippingInfo.postalCode,
  });
  const { address, city, state, postalCode, phoneNo } = shippingInfoState;

  const handleOnChange = (e) => {
    setShippingInfoState({
      ...shippingInfoState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(saveShippingInfo({ address, city, state, postalCode, phoneNo }));
    navigate('/confirm-order');
  };

  return (
    <Layout>
      <MetaData title="Shipping Info" />
      <div className="bg-white relative">
        <div className="relative lg:px-8 md:px-3 md:pt-6 max-w-4xl mx-auto">
          {/* Steps */}
          <CheckoutSteps shipping />
          {/* Shipping */}
          <section className="pt-12 pb-20 lg:max-w-lg lg:w-full mx-auto lg:pb-24">
            <form onSubmit={handleSubmit}>
              <div className="max-w-2xl mx-auto px-4 lg:max-w-none lg:px-0">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    Contact information
                  </h3>

                  <div className="mt-6">
                    <label
                      htmlFor="phoneNo"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Phone number{' '}
                      <span className="inline-block text-red-500">*</span>
                    </label>
                    <div className="mt-1">
                      <input
                        type="tel"
                        id="phoneNo"
                        name="phoneNo"
                        value={phoneNo}
                        onChange={handleOnChange}
                        required
                        autoComplete="tel"
                        placeholder="(+880) 123-456-7890"
                        className="block w-full border-gray-300 rounded-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Shipping Info */}
                <div className="mt-10">
                  <h3 className="text-lg font-medium text-gray-900">
                    Shipping address
                  </h3>

                  <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-3">
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="address"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Address{' '}
                        <span className="inline-block text-red-500">*</span>
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          id="address"
                          name="address"
                          value={address}
                          onChange={handleOnChange}
                          required
                          placeholder="Your detailed address"
                          autoComplete="street-address"
                          className="block w-full border-gray-300 rounded-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium text-gray-700"
                      >
                        City{' '}
                        <span className="inline-block text-red-500">*</span>
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={city}
                          onChange={handleOnChange}
                          required
                          placeholder="Your city"
                          autoComplete="address-level2"
                          className="block w-full border-gray-300 rounded-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="state"
                        className="block text-sm font-medium text-gray-700"
                      >
                        State / Province{' '}
                        <span className="inline-block text-red-500">*</span>
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          id="state"
                          name="state"
                          value={state}
                          onChange={handleOnChange}
                          required
                          placeholder="state / province"
                          autoComplete="address-level1"
                          className="block w-full border-gray-300 rounded-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="postalCode"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Postal code{' '}
                        <span className="inline-block text-red-500">*</span>
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          id="postalCode"
                          name="postalCode"
                          value={postalCode}
                          onChange={handleOnChange}
                          required
                          placeholder="12345"
                          autoComplete="postal-code"
                          className="block w-full border-gray-300 rounded-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* <div className="mt-10">
                  <h3 className="text-lg font-medium text-gray-900">
                    Payment details
                  </h3>

                  <div className="mt-6 grid grid-cols-3 sm:grid-cols-4 gap-y-6 gap-x-4">
                    <div className="col-span-3 sm:col-span-4">
                      <label
                        htmlFor="card-number"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Card number{' '}
                        <span className="inline-block text-red-500">*</span>
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          id="card-number"
                          name="card-number"
                          placeholder="xxxx xxxx xxxx xxxx"
                          autoComplete="cc-number"
                          className="block w-full border-gray-300 rounded-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      </div>
                    </div>

                    <div className="col-span-2 sm:col-span-3">
                      <label
                        htmlFor="expiration-date"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Expiration date (MM/YY){' '}
                        <span className="inline-block text-red-500">*</span>
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="expiration-date"
                          id="expiration-date"
                          placeholder="MM/YY"
                          autoComplete="cc-exp"
                          className="block w-full border-gray-300 rounded-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="cvc"
                        className="block text-sm font-medium text-gray-700"
                      >
                        CVC <span className="inline-block text-red-500">*</span>
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="cvc"
                          id="cvc"
                          placeholder="xxx"
                          autoComplete="csc"
                          className="block w-full border-gray-300 rounded-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div> */}

                {/* <div className="mt-10">
                  <h3 className="text-lg font-medium text-gray-900">
                    Billing information
                  </h3>

                  <div className="mt-6 flex items-center">
                    <input
                      id="same-as-shipping"
                      name="same-as-shipping"
                      type="checkbox"
                      checked
                      className="h-4 w-4 border-gray-300 rounded text-blue-600 focus:ring-blue-500"
                    />
                    <div className="ml-2">
                      <label
                        htmlFor="same-as-shipping"
                        className="text-sm font-medium text-gray-900"
                      >
                        Same as shipping information
                      </label>
                    </div>
                  </div>
                </div> */}

                <div className="mt-10 flex justify-end pt-6 border-t border-gray-200">
                  <button
                    type="submit"
                    className="bg-blue-600 border border-transparent rounded-full shadow-sm py-2 px-4 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-blue-500"
                  >
                    Preview order
                  </button>
                </div>
              </div>
            </form>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Shipping;
