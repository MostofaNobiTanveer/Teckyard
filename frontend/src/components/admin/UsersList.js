import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearErrors,
  deleteUser,
  getAllUsers,
} from '../../actions/userActions';
import MetaData from '../layout/MetaData';
import DashboardLayout from './DashboardLayout';
import ProductsListSkeleton from './ProductsListSkeleton';
import { Link, useNavigate } from 'react-router-dom';
import { DELETE_USER_RESET } from '../../constants/userConstants';

const UsersList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, users } = useSelector((state) => state.allUsers);
  const { isDeleted, loading: deleteLoading } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    dispatch(getAllUsers());

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success('User deleted successfully');
      navigate('/admin/users');
      dispatch({ type: DELETE_USER_RESET });
    }
  }, [dispatch, error, isDeleted, navigate]);

  const handleDeleteUser = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      dispatch(deleteUser(id));
    } else {
      return;
    }
  };

  return (
    <DashboardLayout>
      <MetaData title="All Users" />
      <div className="flex flex-col space-y-3">
        <h2 className="text-2xl font-medium tracking-wide text-gray-900">
          All Users
        </h2>
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="border overflow-hidden rounded-3xl">
              {loading ? (
                <ProductsListSkeleton />
              ) : (
                <table
                  className={`${
                    deleteLoading &&
                    'opacity-60 pointer-events-none animate-pulse'
                  } min-w-full divide-y`}
                >
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left max-w-sm text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        User
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        ID
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Role
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
                    {users.map((user) => (
                      <tr key={user._id}>
                        <td
                          title={user.name}
                          className="px-6 py-4 max-w-sm min-w-min"
                        >
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-12 w-12">
                              <img
                                className="h-full w-full rounded-full object-cover"
                                src={user.avatar && user.avatar.url}
                                alt={user.name}
                              />
                            </div>
                            <div className="ml-3 w-full truncate">
                              <Link
                                to={`/admin/user/update/${user._id}`}
                                className="text-sm hover:underline font-medium text-gray-900 truncate"
                              >
                                {user.name}
                              </Link>
                              <div className="text-xs text-gray-500">
                                {user.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-xs max-w-min text-gray-900">
                            #{user._id}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {user.role === 'admin' ? (
                            <div className="text-xs max-w-min px-2 py-0.5 font-medium capitalize text-green-600 rounded-full bg-green-100">
                              {user.role}
                            </div>
                          ) : (
                            <div className="text-xs max-w-min px-2 py-0.5 font-medium capitalize text-blue-600 rounded-full bg-blue-100">
                              {user.role}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() =>
                              navigate(`/admin/user/update/${user._id}`)
                            }
                            className="text-indigo-600 hover:underline"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user._id)}
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

export default UsersList;
