import React, { useEffect, useState } from 'react';

import { toast } from 'react-toastify';
import { BsChevronLeft, BsPatchCheckFill } from 'react-icons/bs';
import { VscCalendar, VscMail } from 'react-icons/vsc';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import MetaData from '../layout/MetaData';
import DashboardLayout from './DashboardLayout';
import {
  getUserDetails,
  clearErrors,
  updateUser,
} from '../../actions/userActions';
import { UPDATE_USER_RESET } from '../../constants/userConstants';

const UpdateUser = () => {
  const [role, setRole] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state) => state.userDetails);
  const { isUpdated, loading: updateLoading } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    dispatch(getUserDetails(id));

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      navigate('/admin/users');
      toast.success('User updated successfully');
      dispatch({ type: UPDATE_USER_RESET });
    }
  }, [dispatch, error, navigate, id, isUpdated]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser(user._id, { role }));
  };

  return (
    <DashboardLayout>
      <MetaData title="Add new product" />
      <div className="flex flex-col">
        <button
          onClick={() => navigate(-1)}
          className="w-14 h-14 mb-6 rounded-full bg-gray-50 hover:bg-gray-100 focus:ring-inset focus:ring-2 flex items-center justify-center"
        >
          <BsChevronLeft className="h-6 w-6" />
        </button>
        <div className="mb-10">
          <h2 className="text-2xl font-medium tracking-wide text-gray-900">
            Update user role
          </h2>
          <p className="tracking-wide text-sm text-gray-700">#{id}</p>
        </div>
        <main
          className={`${
            updateLoading && 'opacity-60 pointer-events-none animate-pulse'
          } w-full max-w-4xl`}
        >
          {/* profile */}
          {user && !loading && (
            <div>
              <div className="relative bg-white p-4 rounded-3xl md:rounded-[40px] border flex flex-col md:flex-row">
                <div className="w-[135px] lg:w-44 flex-shrink-0">
                  <div className="aspect-square rounded-3xl overflow-hidden">
                    <img
                      src={user.avatar && user.avatar.url}
                      className="object-cover w-full h-full"
                      alt={user.name}
                    />
                  </div>
                </div>
                <div className="pt-5 md:pt-1 md:ml-6 xl:ml-10 space-y-6 flex-grow flex flex-col justify-between">
                  <div className="max-w-screen-sm">
                    <h2 className="inline-flex items-center gap-2 text-2xl sm:text-3xl lg:text-4xl font-semibold">
                      <span>{user.name}</span>
                      {user.role === 'admin' && (
                        <BsPatchCheckFill className="text-blue-500" />
                      )}
                    </h2>
                    <div className="flex items-center text-sm mt-2">
                      <span className="text-gray-500 flex items-center gap-1">
                        <VscCalendar className="w-5 h-5 text-blue-500" />
                        From {String(user.createdAt).substring(0, 10)}{' '}
                      </span>
                    </div>
                    <div className="flex items-center text-sm mt-2">
                      <span className="text-gray-500 flex items-center gap-1">
                        <VscMail className="w-5 h-5 text-blue-500" />
                        {user.email}
                      </span>
                    </div>
                  </div>
                  {/* form */}
                  <form onSubmit={handleSubmit}>
                    <div className="flex flex-col mt-6 lg:mt-0">
                      <div className="mt-1 mb-2">
                        <select
                          id="role"
                          name="role"
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
                          className="appearance-none cursor-pointer bg-transparent block w-full px-5 text-base py-2.5 border border-gray-400 rounded-2xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        >
                          <option value="">Select role</option>
                          <option value="admin">Admin</option>
                          <option value="user">User</option>
                        </select>
                      </div>
                      <button
                        disabled={!role || role === user.role ? true : false}
                        type="submit"
                        className="w-full text-sm disabled:cursor-not-allowed flex justify-center py-2.5 px-4 border border-transparent rounded-xl shadow-sm uppercase font-medium tracking-wider transition-all duration-300 text-white bg-blue-500 hover:bg-blue-600 hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        {loading ? 'Please wait....' : 'Update role'}
                      </button>
                    </div>
                  </form>
                </div>
                <div className="absolute top-3 right-6 flex flex-row-reverse justify-end">
                  {user.role === 'admin' ? (
                    <div className="text-sm max-w-min px-3 py-0.5 font-medium capitalize text-green-600 rounded-full bg-green-100">
                      {user.role}
                    </div>
                  ) : (
                    <div className="text-sm max-w-min px-3 py-0.5 font-medium capitalize text-blue-600 rounded-full bg-blue-100">
                      {user.role}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </DashboardLayout>
  );
};

export default UpdateUser;
