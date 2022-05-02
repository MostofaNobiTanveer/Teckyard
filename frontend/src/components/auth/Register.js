import React, { useEffect, useState } from 'react';

// react icons
import { BsEye, BsEyeSlash, BsPlus, BsX } from 'react-icons/bs';
import { CgGitter } from 'react-icons/cg';

// react router
import { Link, useNavigate } from 'react-router-dom';

// redux
import { useDispatch, useSelector } from 'react-redux';

// toastify
import { toast } from 'react-toastify';

// components
import MetaData from '../layout/MetaData';
import { clearErrors, registerUser } from '../../actions/userActions';
import Layout from '../layout';

const Register = () => {
  const [showPass, setShowPass] = useState(false);
  const [avatar, setAvatar] = useState('');
  const [avatarPreview, setAvatarPreview] = useState('');

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });
  const { name, email, password } = user;

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

  const handleOnChange = (e) => {
    if(e.target.name === 'avatar') {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatar(reader.result);
          setAvatarPreview(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const userData = {
      name,
      email,
      password,
      avatar,
    };

    dispatch(registerUser(userData));
  };
  return (
    <Layout>
      <MetaData title="Register" />
      <div className="flex flex-col justify-center py-16 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center">
          <Link to="/">
            <CgGitter className="w-16 h-16 text-blue-500" />
          </Link>
          <h2 className="text-center text-gray-800 text-4xl font-bold tracking-wide">
            Register
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
                <label htmlFor="name" className="block ml-2">
                  Full name
                </label>
                <div className="mt-1">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="current-name"
                    value={name}
                    onChange={handleOnChange}
                    placeholder="John Doe"
                    required
                    className="appearance-none bg-transparent block w-full px-5 text-base py-3 border border-gray-400 rounded-full shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block ml-2">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={handleOnChange}
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
                    onChange={handleOnChange}
                    placeholder="********"
                    autoComplete="current-password"
                    required
                    className="appearance-none bg-transparent block w-full px-5 text-base py-3 border border-gray-400 rounded-full shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              {/* Avatar */}
              <div>
                <span className="mx-3 flex items-center justify-between">
                  Avatar
                </span>
                <label className="mt-5 cursor-pointer group relative p-1 w-full flex items-center justify-between rounded-full border border-gray-400 shadow-sm space-x-3 text-left hover:bg-gray-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                  <input
                    id="avatar"
                    name="avatar"
                    type="file"
                    onChange={handleOnChange}
                    accept="image/*"
                    className="sr-only"
                  />
                  <span className="min-w-0 flex-1 flex items-center space-x-3">
                    <span className="absolute -left-0.5 block flex-shrink-0">
                      {avatarPreview ? (
                        <img
                          src={avatarPreview}
                          alt="profile"
                          className="h-20 w-20 rounded-full object-cover"
                        />
                      ) : (
                        <svg
                          className="h-20 w-20 rounded-full text-gray-300 bg-white border border-gray-400"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      )}
                    </span>
                    <span className="block pl-16 text-sm font-medium text-gray-900 truncate">
                      {name ? name : 'Profile Image'}
                    </span>
                  </span>
                  <span className="flex-shrink-0 h-10 w-10 inline-flex items-center justify-center">
                    <BsPlus className="h-7 w-7 text-gray-500 group-hover:text-gray-500" />
                  </span>
                  <button
                    className="absolute -top-4 -left-5"
                    type="button"
                    disabled={!avatarPreview}
                    onClick={() => setAvatarPreview(null)}
                  >
                    <BsX className="h-5 w-5 box-content p-1 rounded-full text-gray-500 bg-white border border-gray-400" />
                  </button>
                </label>
              </div>

              <div>
                <button
                  type="submit"
                  className="mt-10 w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm uppercase font-medium tracking-wider transition-all duration-300 text-white bg-blue-500 hover:bg-blue-600 hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Register
                </button>
              </div>
            </form>

            <div className="mt-6 flex justify-end">
              <div className="text-sm">
                <Link
                  to="/login"
                  className="font-medium hover:underline text-blue-600 hover:text-blue-500"
                >
                  Already registered? Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
