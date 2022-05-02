import React, { useEffect, useState } from 'react';

// react icons
import { CgGitter } from 'react-icons/cg';
import { BsEye, BsEyeSlash } from 'react-icons/bs';

// react router
import { Link, useNavigate } from 'react-router-dom';

// redux
import { useDispatch, useSelector } from 'react-redux';

// toastify
import { toast } from 'react-toastify';

// components
import MetaData from '../layout/MetaData';
import { clearErrors, login } from '../../actions/userActions';
import Layout from '../layout';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isAuthenticated) {
      toast.success('You are logged in');
      navigate('/');
    }
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, isAuthenticated, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(login(email, password));
  };

  return (
    <Layout>
      <MetaData title="Login" />
      <div className="flex flex-col justify-center py-16 sm:px-6 lg:px-8">
        <div className="mx-auto flex justify-center items-center">
          <Link to="/">
            <CgGitter className="w-16 h-16 text-blue-500" />
          </Link>
          <h2 className="text-center text-gray-800 text-4xl font-bold tracking-wide">
            Login
          </h2>
        </div>

        <div
          className={`${
            loading && 'opacity-60 pointer-events-none animate-pulse'
          } mt-3 sm:mx-auto sm:w-full sm:max-w-2xl`}
        >
          <div className="py-8 px-4 sm:rounded-lg sm:px-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block ml-3">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    placeholder="example@mail.com"
                    required
                    className="appearance-none bg-transparent block w-full px-5 text-base py-3 border border-gray-400 rounded-full shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mx-3 flex items-center justify-between"
                >
                  Password
                  <button
                    onClick={() => setShowPass(!showPass)}
                    type="button"
                    className="appearance-none bg-transparent border border-gray-500 text-gray-500 text-sm py-1 px-3 rounded-full focus:outline-none focus:border-blue-500 focus:shadow-outline-blue sm:text-sm"
                  >
                    {showPass ? (
                      <BsEye className="w-4 h-4" />
                    ) : (
                      <BsEyeSlash className="w-4 h-4" />
                    )}
                  </button>
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type={showPass ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="********"
                    autoComplete="current-password"
                    required
                    className="appearance-none bg-transparent block w-full px-5 text-base py-3 border border-gray-400 rounded-full shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="flex items-center ml-3">
                <div className="text-sm">
                  <Link
                    to="/forgot-password"
                    className="font-medium hover:underline text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm uppercase font-medium tracking-wider transition-all duration-300 text-white bg-blue-500 hover:bg-blue-600 hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Sign in
                </button>
              </div>
            </form>

            <div className="mt-6 flex justify-end">
              <div className="text-sm">
                <Link
                  to="/register"
                  className="font-medium hover:underline text-indigo-600 hover:text-indigo-500"
                >
                  Don&apos;t have an account? Register
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
