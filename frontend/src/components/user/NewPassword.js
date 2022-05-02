import React, { useEffect, useState } from 'react';

// react router
import { Link, useNavigate, useParams } from 'react-router-dom';

// redux
import { useDispatch, useSelector } from 'react-redux';

// toastify
import { toast } from 'react-toastify';

// components
import MetaData from '../layout/MetaData';
import { clearErrors, resetPassword } from '../../actions/userActions';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { CgGitter } from 'react-icons/cg';
import Layout from '../layout';

const ResetPassword = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState({
    new: false,
    confirm: false,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, success, loading } = useSelector(
    (state) => state.forgotPassword
  );

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      toast.success('Password updated successfully');
      navigate('/login');
    }
  }, [dispatch, error, navigate, success]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const passwordData = {
      password: newPassword,
      confirmPassword,
    };

    dispatch(resetPassword(token, passwordData));
  };

  return (
    <Layout>
      <MetaData title="Reset Password" />
      <div className="flex flex-col justify-center py-16 sm:px-6 lg:px-8">
        <div className="mx-auto flex justify-center items-center">
          <Link to="/">
            <CgGitter className="w-16 h-16 text-blue-500" />
          </Link>
          <h2 className="text-center text-gray-800 sm:text-4xl text-3xl font-bold tracking-wide">
            Set Password
          </h2>
        </div>
        <div
          className={`${
            loading && 'opacity-60 pointer-events-none animate-pulse'
          } mt-3 max-w-xl mx-auto sm:w-full`}
        >
          <div className="sm:rounded-lg">
            <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
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
                        current: !showPassword.current,
                      })
                    }
                    type="button"
                    className="appearance-none bg-transparent border border-gray-500 text-gray-500 text-sm py-1 px-3 rounded-full focus:outline-none focus:border-blue-500 focus:shadow-outline-blue sm:text-sm"
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
                    className="appearance-none bg-transparent block w-full px-5 sm:text-base py-2.5 sm:py-3 border border-gray-400 rounded-full shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mx-3 flex items-center justify-between text-sm"
                >
                  Retype Password
                  <button
                    onClick={() =>
                      setShowPassword({
                        ...showPassword,
                        confirm: !showPassword.confirm,
                      })
                    }
                    type="button"
                    className="appearance-none bg-transparent border border-gray-500 text-gray-500 text-sm py-1 px-3 rounded-full focus:outline-none focus:border-blue-500 focus:shadow-outline-blue sm:text-sm"
                  >
                    {showPassword.confirm ? (
                      <BsEye className="w-4 h-4" />
                    ) : (
                      <BsEyeSlash className="w-4 h-4" />
                    )}
                  </button>
                </label>
                <div className="mt-1">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPassword.confirm ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="********"
                    required
                    className="appearance-none bg-transparent block w-full px-5 sm:text-base py-2.5 sm:py-3 border border-gray-400 rounded-full shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
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
      </div>
    </Layout>
  );
};

export default ResetPassword;
