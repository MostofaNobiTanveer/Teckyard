import React, { useEffect, useState } from 'react';

// packages
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from '@stripe/react-stripe-js';

// Components
import MetaData from '../layout/MetaData';
import CheckoutSteps from './CheckoutSteps';
import { toast } from 'react-toastify';
import { clearErrors, createNewOrder } from '../../actions/orderActions';
import Layout from '../layout';

const options = {
  style: {
    base: {
      fontSize: '16px',
    },
    invalid: {
      color: '#fa755a',
    },
  },
};

const Payment = () => {
  const [isPayBtnDisabled, setIsPayBtnDisabled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  const { user } = useSelector((state) => state.auth);
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { error } = useSelector((state) => state.newOrder);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  const order = {
    orderItems: cartItems,
    shippingInfo,
  };

  const orderData = JSON.parse(sessionStorage.getItem('orderData'));
  if (orderData) {
    order.itemsPrice = orderData.itemsPrice;
    order.shippingPrice = orderData.shippingPrice;
    order.totalPrice = orderData.totalPrice;
  }

  const paymentData = {
    amount: Math.round(orderData.totalPrice * 100),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPayBtnDisabled(true);

    let res;

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      res = await axios.post('/api/v1/payment/process', paymentData, config);

      console.log(res);
      const clientSecret = res.data.client_secret;

      if (!stripe || !elements) {
        return;
      }

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
          },
        },
      });

      if (result.error) {
        toast.error(result.error.message);
        setIsPayBtnDisabled(false);
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          toast.success('Payment Successful');

          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };

          dispatch(createNewOrder(order));

          navigate('/profile/my-orders');
        } else {
          toast.error('Payment Failed! Please try again');
          setIsPayBtnDisabled(false);
        }
      }
    } catch (error) {
      setIsPayBtnDisabled(false);
      toast.error(error.message);
    }
  };

  return (
    <Layout>
      <MetaData title="Payment" />
      <div className="bg-white relative">
        <div className="relative lg:px-8 md:px-3 md:pt-6 max-w-4xl mx-auto">
          {/* Steps */}
          <CheckoutSteps payment />
          {/* Shipping */}
          <section className="pt-12 pb-20 lg:max-w-lg lg:w-full mx-auto lg:pb-24">
            <form onSubmit={handleSubmit}>
              <div className="max-w-2xl mx-auto px-4 lg:max-w-none lg:px-0">
                <div className="mt-10">
                  <h3 className="text-lg font-medium text-gray-900">
                    Payment details
                  </h3>
                  <p>
                    Test Card: 4242 4242 4242 4242
                  </p>

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
                        <CardNumberElement
                          type="text"
                          required
                          id="card-number"
                          autoComplete="cc-number"
                          options={options}
                          className="block w-full border p-2 border-gray-300 rounded-full shadow-sm sm:text-sm"
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
                        <CardExpiryElement
                          type="text"
                          required
                          id="expiration-date"
                          placeholder="MM/YY"
                          autoComplete="cc-exp"
                          options={options}
                          className="block w-full border p-2 border-gray-300 rounded-full shadow-sm sm:text-sm"
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
                        <CardCvcElement
                          type="text"
                          required
                          id="cvc"
                          placeholder="xxx"
                          autoComplete="csc"
                          options={options}
                          className="block w-full border p-2 border-gray-300 rounded-full shadow-sm sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-10 flex justify-end pt-6 border-t border-gray-200">
                  <button
                    disabled={isPayBtnDisabled}
                    type="submit"
                    className="bg-blue-600 border border-transparent rounded-full shadow-sm py-2 px-4 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-blue-500"
                  >
                    Pay {` - $${orderData && orderData.totalPrice}`}
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

export default Payment;
