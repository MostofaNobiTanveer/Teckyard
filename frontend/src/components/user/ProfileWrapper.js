import React from 'react';
import { RiUserSettingsLine } from 'react-icons/ri';
import {
  BsClipboardCheck,
  BsPatchCheckFill,
  BsShieldLock,
} from 'react-icons/bs';
import { FiLogOut } from 'react-icons/fi';
import { VscVerified } from 'react-icons/vsc';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { logout } from '../../actions/userActions';
import Layout from '../layout';

const navLinks = [
  {
    href: '/profile/settings',
    label: 'Account',
    icon: <RiUserSettingsLine className="h-5 w-5" />,
  },
  {
    href: '/profile/my-orders',
    label: 'Orders',
    icon: <BsClipboardCheck className="h-5 w-5" />,
  },
  {
    href: '/profile/password/update',
    label: 'Update Password',
    icon: <BsShieldLock className="h-5 w-5" />,
  },
];

const ProfileWrapper = ({ children }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { user, loading } = useSelector((state) => state.auth);

  return (
    <Layout>
      <div className="relative min-h-screen pt-10 pb-20">
        <main className="max-w-7xl mx-auto">
          {/* profile */}
          {user && !loading && (
            <>
              <div className="pb-10 lg:px-8 px-4">
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
                  <div className="pt-5 md:pt-1 md:ml-6 xl:ml-10 flex-grow flex flex-col justify-between">
                    <div className="max-w-screen-sm">
                      <h2 className="inline-flex items-center gap-2 text-2xl sm:text-3xl lg:text-4xl font-semibold">
                        <span>{user.name}</span>
                        {user.role === 'admin' && (
                          <BsPatchCheckFill className="text-blue-500" />
                        )}
                      </h2>
                      <div className="flex items-center text-sm mt-2">
                        <span className="text-gray-500 flex items-center gap-1">
                          From {String(user.createdAt).substring(0, 10)}{' '}
                          <VscVerified className="w-5 h-5 text-green-500" />
                        </span>
                      </div>
                    </div>
                    <nav className="mt-6 md:mt-0 relative flex w-full text-sm md:text-base">
                      <ul className="flex p-1 bg-white rounded-full shadow-lg border">
                        {navLinks.map((link) => (
                          <li key={link.href} className="relative">
                            <NavLink to={link.href}>
                              <div
                                className={`${
                                  location.pathname === link.href
                                    ? 'block font-medium whitespace-nowrap px-3 py-2 text-sm sm:px-7 sm:py-3 capitalize rounded-full bg-blue-500 text-white focus:outline-none'
                                    : 'block font-medium whitespace-nowrap px-3 py-2 text-sm sm:px-7 sm:py-3 capitalize rounded-full text-gray-400 hover:text-gray-900  focus:outline-none'
                                }`}
                              >
                                <div className="flex items-center justify-center sm:space-x-2.5 text-[13px] sm:text-sm">
                                  <span className="hidden sm:inline-block">
                                    {link.icon}
                                  </span>
                                  <span>{link.label}</span>
                                </div>
                              </div>
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    </nav>
                  </div>
                  <div className="absolute top-3 right-4 flex flex-row-reverse justify-end">
                    <button
                      onClick={() => {
                        dispatch(logout());
                      }}
                      title="Logout"
                      className="bg-gray-50 hover:bg-gray-100 p-4 rounded-full"
                    >
                      <FiLogOut className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <section>{children}</section>
              </div>
            </>
          )}
        </main>
      </div>
    </Layout>
  );
};

export default ProfileWrapper;
