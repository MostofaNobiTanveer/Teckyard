import React, { useEffect, useState } from 'react';

// react router
import { useNavigate } from 'react-router-dom';

// redux
import { useDispatch, useSelector } from 'react-redux';

// toastify
import { toast } from 'react-toastify';

// components
import MetaData from '../layout/MetaData';
import {
  clearErrors,
  loadUser,
  updatePassword,
} from '../../actions/userActions';
import ProfileWrapper from './ProfileWrapper';
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants';
import { BsEye, BsEyeSlash } from 'react-icons/bs';

const UpdatePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { error, isUpdated, loading } = useSelector((state) => state.user);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      toast.success('Password updated successfully');
      dispatch(loadUser());
      navigate('/profile/settings');
      dispatch({ type: UPDATE_PASSWORD_RESET });
    }
  }, [dispatch, error, navigate, user, isUpdated]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const passwordData = {
      currentPassword,
      newPassword,
    };

    dispatch(updatePassword(passwordData));
  };

  return (
    <ProfileWrapper>
      <MetaData title="Reset Password" />
      <div
        className={`${
          loading && 'opacity-60 pointer-events-none animate-pulse'
        } sm:mx-auto sm:w-full space-y-6 sm:space-y-10 lg:px-8 px-4`}
      >
        <div className="max-w-2xl">
          <h2 className="text-3xl sm:text-4xl font-semibold">
            Update Password
          </h2>
          <span className="block mt-3 text-neutral-500">
            You can update your password by providing your current password and
            your preferred new password and it will be used for all future
            logins.
          </span>
        </div>
        <div className="w-full border-b-2"></div>
        <div>
          <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
            <div>
              <label
                htmlFor="currentPassword"
                className="mx-3 flex items-center justify-between text-sm"
              >
                Current Password
                <button
                  onClick={() =>
                    setShowPassword({
                      ...showPassword,
                      current: !showPassword.current,
                    })
                  }
                  type="button"
                  className="appearance-none bg-transparent border border-gray-300 text-gray-500 text-sm py-1 px-3 rounded-full focus:outline-none focus:border-blue-500 focus:shadow-outline-blue sm:text-sm"
                >
                  {showPassword.current ? (
                    <BsEye className="w-4 h-4" />
                  ) : (
                    <BsEyeSlash className="w-4 h-4" />
                  )}
                </button>
              </label>
              <div className="mt-1">
                <input
                  id="currentPassword"
                  name="currentPassword"
                  type={showPassword.current ? 'text' : 'password'}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="********"
                  required
                  className="appearance-none bg-transparent block w-full px-5 sm:text-base py-2.5 sm:py-3 border border-gray-200 rounded-full shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="newPassword"
                className="mx-3 flex items-center justify-between text-sm"
              >
                New Password
                <button
                  onClick={() =>
                    setShowPassword({
                      ...showPassword,
                      new: !showPassword.new,
                    })
                  }
                  type="button"
                  className="appearance-none bg-transparent border border-gray-300 text-gray-500 text-sm py-1 px-3 rounded-full focus:outline-none focus:border-blue-500 focus:shadow-outline-blue sm:text-sm"
                >
                  {showPassword.new ? (
                    <BsEye className="w-4 h-4" />
                  ) : (
                    <BsEyeSlash className="w-4 h-4" />
                  )}
                </button>
              </label>
              <div className="mt-1">
                <input
                  id="newPassword"
                  name="newPassword"
                  type={showPassword.new ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="********"
                  required
                  className="appearance-none bg-transparent block w-full px-5 sm:text-base py-2.5 sm:py-3 border border-gray-200 rounded-full shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>
            </div>

            <div>
              <button
                disabled={loading}
                type="submit"
                className="mt-6 w-full flex justify-center py-2.5 px-12 border border-transparent rounded-full shadow-sm uppercase font-medium tracking-wider transition-all duration-300 text-white bg-blue-500 hover:bg-blue-600 hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {loading ? 'Please wait...' : 'Update'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </ProfileWrapper>
  );
};

export default UpdatePassword;
