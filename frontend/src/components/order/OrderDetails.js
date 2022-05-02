import React, { useEffect } from 'react';
import { BsChevronLeft } from 'react-icons/bs';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import OrderDetailsSkeleton from './OrderDetailsSkeleton';
import { toast } from 'react-toastify';
import { clearErrors, getOrderDetails } from '../../actions/orderActions';
import MetaData from '../layout/MetaData';
import Layout from '../layout';

const OrderDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, error, order } = useSelector((state) => state.orderDetails);

  useEffect(() => {
    dispatch(getOrderDetails(id));

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, id, error]);

  console.log(order);
  return (
    <Layout>
      <MetaData title="Order Details" />
      <div className="bg-white relative">
        {loading ? (
          <div className="max-w-3xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
            <OrderDetailsSkeleton />
          </div>
        ) : (
          <div className="max-w-3xl mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
            <div className="max-w-xl relative">
              <button
                onClick={() => navigate(-1)}
                className="w-14 h-14 mb-6 rounded-full bg-gray-50 hover:bg-gray-100 focus:ring-inset focus:ring-2 flex items-center justify-center"
              >
                <BsChevronLeft className="h-6 w-6" />
              </button>
              <h1 className="text-sm font-semibold uppercase tracking-wide text-blue-600">
                Thank you!
              </h1>
              <p className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">
                {order.orderStatus === 'processing'
                  ? "It's on the way!"
                  : order.orderStatus === 'dispatched'
                  ? 'Order Dispatched!'
                  : 'Order Completed!'}
              </p>
              <p className="mt-2 text-base text-gray-500">
                {order.orderStatus === 'processing' ? (
                  <span>
                    Your order{' '}
                    <span className="text-black font-medium">
                      #{order._id}{' '}
                    </span>
                    has been received and is being processed.
                  </span>
                ) : order.orderStatus === 'delivered' ? (
                  <span>
                    Your order{' '}
                    <span className="text-black font-medium">
                      #{order._id}{' '}
                    </span>
                    has been delivered.
                  </span>
                ) : (
                  <span>
                    Your order{' '}
                    <span className="text-black font-medium">
                      #{order._id}{' '}
                    </span>
                    has been dispatched.
                  </span>
                )}
              </p>

              <dl className="mt-12 relative text-sm font-medium space-y-4">
                <div>
                  <dt className="text-gray-900">Order ID</dt>
                  <dd className="text-blue-600 mt-2">{order._id}</dd>
                </div>

                {order.paymentInfo && order.paymentInfo.status === 'succeeded' && (
                  <div className="absolute -top-16 sm:-top-10 right-0 w-40">
                    <img
                      src="/images/paid.png"
                      alt="paid"
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}
              </dl>
            </div>

            <div className="mt-10 border-t border-gray-200">
              {order.orderItems &&
                order.orderItems.map((item) => (
                  <div
                    key={item.product}
                    className="py-10 border-b border-gray-200 flex space-x-6"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="flex-none w-20 h-20 object-center object-contain bg-gray-100 rounded-lg sm:w-24 sm:h-24"
                    />
                    <div className="flex-auto flex flex-col">
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {item.name}
                        </h4>
                      </div>
                      <div className="mt-6 flex-1 flex items-end">
                        <dl className="flex sm:flex-row flex-col text-sm sm:divide-x sm:divide-gray-200 sm:space-x-6">
                          <div className="flex">
                            <dt className="font-medium text-gray-900">
                              Quantity
                            </dt>
                            <dd className="ml-2 text-blue-500">
                              {item.quantity}
                            </dd>
                          </div>
                          <div className="flex sm:pl-6">
                            <dt className="font-medium text-gray-900">Price</dt>
                            <dd className="ml-2 text-blue-500">
                              ${item.price.toFixed(2)}
                            </dd>
                          </div>
                          <div className="flex sm:pl-6">
                            <dt className="font-medium text-gray-900">Total</dt>
                            <dd className="ml-2 text-blue-500">
                              ${(item.price * item.quantity).toFixed(2)}
                            </dd>
                          </div>
                        </dl>
                      </div>
                    </div>
                  </div>
                ))}

              <div className="sm:ml-40 sm:pl-6">
                {order.shippingInfo && (
                  <dl className="text-sm font-medium space-y-6 border-t border-white border-opacity-10 pt-6">
                    <h3 className="text-lg font-medium text-gray-900">
                      Contact information
                    </h3>
                    <div className="flex gap-2 items-start justify-between">
                      <dt>Name:</dt>
                      <dd className="text-right font-normal text-black">
                        {order.user.name}
                      </dd>
                    </div>

                    <div className="flex gap-2 items-start justify-between">
                      <dt>Phone:</dt>
                      <dd className="text-right font-normal text-black">
                        {order.shippingInfo.phoneNo}
                      </dd>
                    </div>

                    {/* <div className="flex gap-2 items-start justify-between border-t border-gray-900 border-opacity-10 pt-6"></div> */}

                    <h3 className="pt-6 text-lg font-medium text-gray-900">
                      Shipping information
                    </h3>

                    <div className="flex gap-2 items-start justify-between">
                      <dt>Address:</dt>
                      <dd className="text-right font-normal text-black">
                        {order.shippingInfo.address}
                      </dd>
                    </div>

                    <div className="flex gap-2 items-start justify-between">
                      <dt>City:</dt>
                      <dd className="text-right font-normal text-black">
                        {order.shippingInfo.city}
                      </dd>
                    </div>

                    <div className="flex gap-2 items-start justify-between">
                      <dt>State/Province:</dt>
                      <dd className="text-right font-normal text-black">
                        {order.shippingInfo.state}
                      </dd>
                    </div>

                    <div className="flex gap-2 items-start justify-between">
                      <dt>Postal Code:</dt>
                      <dd className="text-right font-normal text-black">
                        {order.shippingInfo.postalCode}
                      </dd>
                    </div>
                  </dl>
                )}
                <dl className="text-sm font-medium space-y-6 border-t border-white border-opacity-10 pt-6">
                  <h3 className="pt-6 text-lg font-medium text-gray-900">
                    Payment information
                  </h3>

                  <div className="flex items-center justify-between">
                    <dt>Subtotal</dt>
                    <dd>${order.itemsPrice}</dd>
                  </div>

                  <div className="flex items-center justify-between">
                    <dt>Shipping</dt>
                    <dd>${order.shippingPrice}</dd>
                  </div>

                  {/* <div className="flex items-center justify-between">
                  <dt>Taxes</dt>
                  <dd>$47.60</dd>
                </div> */}

                  <div className="flex items-center justify-between border-t border-gray-900 border-opacity-10 pt-6">
                    <dt className="text-base">Total</dt>
                    <dd className="text-base">${order.totalPrice}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default OrderDetails;
