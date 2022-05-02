import React, { useEffect, useState } from 'react';
import { CgGitter } from 'react-icons/cg';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { clearErrors, forgotPassword } from '../../actions/userActions';
import Layout from '../layout';
import MetaData from '../layout/MetaData';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const { loading, error, message } = useSelector(
    (state) => state.forgotPassword
  );
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(clearErrors());
    }
  }, [dispatch, error, message]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword({ email }));
  };
  return (
    <Layout>
      <MetaData title="Forgot Password" />
      <div className="flex flex-col justify-center py-16 sm:px-6 lg:px-8">
        <div className="mx-auto flex justify-center items-center">
          <Link to="/">
            <CgGitter className="w-16 h-16 text-blue-500" />
          </Link>
          <h2 className="text-center text-gray-800 sm:text-4xl text-3xl font-bold tracking-wide">
            Forgot Password
          </h2>
        </div>

        <div
          className={`${
            loading && 'opacity-60 pointer-events-none animate-pulse'
          } sm:mt-3 sm:mx-auto sm:w-full sm:max-w-2xl`}
        >
          <div className="py-8 px-4 sm:rounded-lg sm:px-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block ml-3 text-sm">
                  Enter Email address
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
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-full shadow-sm uppercase font-medium tracking-wider transition-all duration-300 text-white bg-blue-500 hover:bg-blue-600 hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {loading ? 'Please wait...' : 'Send Email'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
