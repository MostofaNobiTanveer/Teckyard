import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearErrors,
  deleteOrder,
  getAllOrders,
} from '../../actions/orderActions';
import MetaData from '../layout/MetaData';
import DashboardLayout from './DashboardLayout';
import ProductsListSkeleton from './ProductsListSkeleton';
import { Link, useNavigate } from 'react-router-dom';
import { DELETE_ORDER_RESET } from '../../constants/orderConstants';

const OrdersList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, orders } = useSelector((state) => state.allOrders);
  const { isDeleted } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getAllOrders());

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success('Order deleted successfully');
      navigate('/admin/orders');
      dispatch({ type: DELETE_ORDER_RESET });
    }
  }, [dispatch, error, isDeleted, navigate]);

  const handleDeleteOrder = (id) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      dispatch(deleteOrder(id));
    } else {
      return;
    }
  };

  return (
    <DashboardLayout>
      <MetaData title="All Products" />
      <div className="flex flex-col space-y-3">
        <h2 className="text-2xl font-medium tracking-wide text-gray-900">
          All Orders
        </h2>
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="border overflow-hidden rounded-3xl">
              {loading ? (
                <ProductsListSkeleton />
              ) : (
                <table className="min-w-full divide-y">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left max-w-sm text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Order ID
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        No of Items
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Amount
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Status
                      </th>

                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        <span className="sr-only">Edit</span>
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {orders.map((order) => (
                      <tr key={order._id}>
                        <td title={order._id} className="px-6 py-4 max-w-sm">
                          <div className="flex items-center">
                            <div className="w-full truncate">
                              <Link
                                to={`/admin/order/update/${order._id}`}
                                className="text-sm hover:underline font-medium text-gray-900 truncate"
                              >
                                #{order._id}
                              </Link>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {order.orderItems.length} items
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            ${order.totalPrice}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap w-min">
                          {order.orderStatus === 'processing' ? (
                            <div className="text-xs max-w-min px-2 py-0.5 font-medium capitalize text-yellow-600 rounded-full bg-yellow-100">
                              {order.orderStatus}
                            </div>
                          ) : order.orderStatus === 'delivered' ? (
                            <div className="text-xs max-w-min px-2 py-0.5 font-medium capitalize text-green-600 rounded-full bg-green-100">
                              {order.orderStatus}
                            </div>
                          ) : (
                            <div className="text-xs max-w-min px-2 py-0.5 font-medium capitalize text-blue-600 rounded-full bg-blue-100">
                              {order.orderStatus}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button
                            onClick={() =>
                              navigate(`/admin/order/update/${order._id}`)
                            }
                            className="text-indigo-600 hover:underline"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteOrder(order._id)}
                            className="text-red-500 hover:underline ml-3"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default OrdersList;
