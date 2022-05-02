import React from 'react';
import { useEffect } from 'react';
import {
  BsFolder2Open,
  BsInfoLg,
  BsInfoCircle,
  BsCoin,
  BsClipboardCheck,
  BsChevronRight,
} from 'react-icons/bs';
import { FiUsers } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAdminProducts } from '../../actions/productActions';
import { getAllOrders } from '../../actions/orderActions';
import { getAllUsers } from '../../actions/userActions';

const DashboardStats = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const { orders, totalAmount, loading } = useSelector(
    (state) => state.allOrders
  );
  const { users } = useSelector((state) => state.allUsers);

  let outOfStock = 0;
  products.forEach((product) => {
    if (product.stock === 0) {
      outOfStock += 1;
    }
  });

  useEffect(() => {
    dispatch(getAdminProducts());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <div className="mt-5 grid sm:grid-cols-[repeat(auto-fill,minmax(320px,1fr))] 2xl:sm:grid-cols-[repeat(auto-fill,minmax(380px,1fr))] gap-5 mb-6 grid-cols-1">
      {/* Amount */}
      <div className="relative flex items-center bg-blue-500 h-40 rounded-[30px] overflow-hidden">
        <div className="flex gap-4 pl-6">
          <div className="bg-white rounded-lg h-14 w-14 flex items-center justify-center">
            <BsCoin className="h-8 w-8 text-blue-500" />
          </div>
          <div className="flex flex-col">
            <p className="text-sm font-medium text-gray-50 truncate">
              Total Amount
            </p>
            {loading ? (
              <p className="bg-white/50 rounded-full animate-pulse h-8 w-28"></p>
            ) : (
              <p className="text-2xl font-semibold text-white">
                ${totalAmount && totalAmount.toFixed(2)}
              </p>
            )}
          </div>
        </div>
        <div className="absolute h-[130%] -right-16 rotate-[20deg]">
          <BsCoin className="h-full w-full text-blue-400/50" />
        </div>
      </div>

      {/* Products */}
      <div className="relative border bg-white h-40 rounded-[30px] overflow-hidden">
        <div className="flex gap-4 pt-8 pl-6">
          <div className="bg-blue-500 rounded-lg h-14 w-14 flex items-center justify-center">
            <BsFolder2Open className="h-6 w-6 text-white" />
          </div>
          <div className="flex flex-col">
            <p className="text-sm font-medium text-gray-500 truncate">
              All Products
            </p>
            {loading ? (
              <p className="bg-gray-300/50 rounded-full animate-pulse h-8 w-28"></p>
            ) : (
              <p className="text-2xl font-semibold text-gray-900">
                {products && products.length}
              </p>
            )}
          </div>
        </div>
        <div className="absolute z-10 right-2 bottom-2 flex items-end justify-end">
          <Link
            to="/admin/products"
            className="w-16 h-16 border rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-50 bg-white focus:ring-2 focus:ring-inset focus:ring-blue-500"
          >
            <BsChevronRight className="w-6 h-6" />
          </Link>
        </div>
        <div className="absolute -z-0 h-full top-0 right-0">
          <BsFolder2Open className="h-full w-full text-gray-100/40" />
        </div>
      </div>
      {/* orders */}
      <div className="relative border bg-white h-40 rounded-[30px] overflow-hidden">
        <div className="flex gap-4 pt-8 pl-6">
          <div className="bg-blue-500 rounded-lg h-14 w-14 flex items-center justify-center">
            <BsClipboardCheck className="h-6 w-6 text-white" />
          </div>
          <div className="flex flex-col">
            <p className="text-sm font-medium text-gray-500 truncate">
              All Orders
            </p>
            {loading ? (
              <p className="bg-gray-300/50 rounded-full animate-pulse h-8 w-28"></p>
            ) : (
              <p className="text-2xl font-semibold text-gray-900">
                {orders && orders.length}
              </p>
            )}
          </div>
        </div>
        <div className="absolute z-10 right-2 bottom-2 flex items-end justify-end">
          <Link
            to="/admin/orders"
            className="w-16 h-16 border rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-50 bg-white focus:ring-2 focus:ring-inset focus:ring-blue-500"
          >
            <BsChevronRight className="w-6 h-6" />
          </Link>
        </div>
        <div className="absolute -z-0 h-full top-0 right-0">
          <BsClipboardCheck className="h-full w-full text-gray-100/40" />
        </div>
      </div>
      {/* users */}
      <div className="relative border bg-white h-40 rounded-[30px] overflow-hidden">
        <div className="flex gap-4 pt-8 pl-6">
          <div className="bg-blue-500 rounded-lg h-14 w-14 flex items-center justify-center">
            <FiUsers className="h-6 w-6 text-white" />
          </div>
          <div className="flex flex-col">
            <p className="text-sm font-medium text-gray-500 truncate">
              All Users
            </p>
            {loading ? (
              <p className="bg-gray-300/50 rounded-full animate-pulse h-8 w-28"></p>
            ) : (
              <p className="text-2xl font-semibold text-gray-900">
                {users && users.length}
              </p>
            )}
          </div>
        </div>
        <div className="absolute z-10 right-2 bottom-2 flex items-end justify-end">
          <Link
            to="/admin/users"
            className="w-16 h-16 border rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-50 bg-white focus:ring-2 focus:ring-inset focus:ring-blue-500"
          >
            <BsChevronRight className="w-6 h-6" />
          </Link>
        </div>
        <div className="absolute -z-0 h-full top-0 right-0">
          <FiUsers className="h-full w-full text-gray-100/40" />
        </div>
      </div>
      {/* Stock */}
      <div className="relative flex items-center bg-yellow-300 h-40 rounded-[30px] overflow-hidden">
        <div className="flex gap-4 pl-6">
          <div className="bg-white rounded-lg h-14 w-14 flex items-center justify-center">
            <BsInfoLg className="h-8 w-8 text-yellow-300" />
          </div>
          <div className="flex flex-col">
            <p className="text-sm font-medium text-gray-50 truncate">
              Out of Stock
            </p>
            {loading ? (
              <p className="bg-white/50 rounded-full animate-pulse h-8 w-28"></p>
            ) : (
              <p className="text-2xl font-semibold text-white">{outOfStock}</p>
            )}
          </div>
        </div>
        <div className="absolute h-[100%] -right-6">
          <BsInfoCircle className="h-full w-full text-yellow-200/50" />
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
