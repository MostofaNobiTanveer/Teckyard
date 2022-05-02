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
  updateProfile,
} from '../../actions/userActions';
import ProfileWrapper from './ProfileWrapper';
import { UPDATE_PROFILE_RESET } from '../../constants/userConstants';

const Profile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');
  const [avatarPreview, setAvatarPreview] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { error, isUpdated, loading } = useSelector((state) => state.user);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar && user.avatar.url);
    }
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      toast.success('Profile updated successfully');
      dispatch(loadUser());
      navigate('/profile/settings');
      dispatch({ type: UPDATE_PROFILE_RESET });
    }
  }, [dispatch, error, navigate, user, isUpdated]);

  const handleOnChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
        setAvatarPreview(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      name,
      email,
      avatar,
    };

    dispatch(updateProfile(userData));
  };
  return (
    <ProfileWrapper>
      <MetaData title="My Profile" />
      <div
        className={`${
          loading && 'opacity-60 pointer-events-none animate-pulse'
        } sm:mx-auto sm:w-full space-y-8 sm:space-y-10 lg:px-8 px-4`}
      >
        <div className="max-w-2xl">
          <h2 className="text-3xl sm:text-4xl font-semibold">
            Account settings
          </h2>
          <span className="block mt-3 text-neutral-500">
            You can set preferred display name, change the profile image and
            manage other personal settings.
          </span>
        </div>
        <div className="w-full border-b-2"></div>
        <div>
          <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
            <div>
              <label htmlFor="name" className="block ml-2 text-sm">
                Full name
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="current-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  required
                  className="appearance-none bg-transparent block w-full px-5 sm:text-base py-2.5 sm:py-3 border border-gray-200 rounded-full shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block ml-2 text-sm">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@mail.com"
                  required
                  className="appearance-none bg-transparent block w-full px-5 sm:text-base sm:py-3 py-2.5 border border-gray-200 rounded-full shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>
            </div>

            <div>
              <span className="mx-3 flex items-center justify-between text-sm">
                Avatar
              </span>
              <div className="mt-3 flex items-center w-full">
                <div className="relative h-28 w-28 rounded-full border border-gray-300">
                  {avatarPreview ? (
                    <img
                      src={avatarPreview}
                      alt="profile"
                      className="h-full w-full rounded-full object-cover"
                    />
                  ) : (
                    <svg
                      className="rounded-full text-gray-300 bg-gray-50"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  )}
                  <label className="absolute -right-4 bottom-2 cursor-pointer ml-5 bg-white py-1.5 px-3 border border-gray-300 rounded-md shadow-sm text-xs leading-4 font-medium hover:bg-gray-100 focus:outline-none">
                    <input
                      id="avatar"
                      name="avatar"
                      type="file"
                      onChange={handleOnChange}
                      accept="image/*"
                      className="sr-only"
                    />
                    Select
                  </label>
                  {/* <button
                    className="absolute top-2 -right-1"
                    type="button"
                    disabled={!avatarPreview}
                    onClick={() => setAvatarPreview(null)}
                  >
                    <BsX className="h-5 w-5 box-content p-1 rounded-full bg-white border" />
                  </button> */}
                </div>
              </div>
            </div>

            <div>
              <button
                disabled={loading}
                type="submit"
                className="mt-10 w-full flex justify-center py-2.5 px-12 border border-transparent rounded-full shadow-sm uppercase font-medium tracking-wider transition-all duration-300 text-white bg-blue-500 hover:bg-blue-600 hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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

export default Profile;
