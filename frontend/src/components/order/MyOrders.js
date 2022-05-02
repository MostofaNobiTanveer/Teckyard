import React, { useEffect, useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { clearErrors, getMyOrders } from '../../actions/orderActions';
import MetaData from '../layout/MetaData';
import MyOrdersSkeleton from './MyOrdersSkeleton';
import ProfileWrapper from '../user/ProfileWrapper';
import SingleOrder from './SingleOrder';

const MyOrders = () => {
  const dispatch = useDispatch();
  const { loading, error, orders } = useSelector((state) => state.myOrders);

  useEffect(() => {
    dispatch(getMyOrders());

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error]);
  return (
    <ProfileWrapper>
      <MetaData title="My Orders" />
      <div className="sm:mx-auto sm:w-full space-y-6">
        <div className="max-w-2xl lg:px-8 px-4">
          <h2 className="text-3xl sm:text-4xl font-semibold">Orders history</h2>
          <span className="block mt-3 text-neutral-500">
            You can view your order history and status here.
          </span>
        </div>
        {loading ? (
          <MyOrdersSkeleton />
        ) : (
          <div className="max-w-2xl space-y-8 sm:px-4 lg:px-8 lg:max-w-4xl">
            {/* Newest order first */}
            {orders.reverse().map((order) => (
              <SingleOrder key={order._id} order={order} />
            ))}
          </div>
        )}
      </div>
    </ProfileWrapper>
  );
};

export default MyOrders;
