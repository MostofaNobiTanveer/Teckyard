import { useState } from 'react';
import { Link } from 'react-router-dom';

// icons
import { FiLogOut, FiUser } from 'react-icons/fi';
import {
  BsClipboardCheck,
  BsChevronRight,
  BsGrid1X2,
  BsShieldLock,
} from 'react-icons/bs';
import { RiShoppingCartLine } from 'react-icons/ri';
import { CgGitter } from 'react-icons/cg';

// packages
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

// actions
import { logout } from '../../actions/userActions';

const TopNav = ({ openCart }) => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector(({ auth }) => auth);
  const { cartItems } = useSelector(({ cart }) => cart);

  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const toggleProfileMenu = () => setIsProfileMenuOpen(!isProfileMenuOpen);
  const closeProfileMenu = () => setIsProfileMenuOpen(false);

  const handleLogout = () => {
    closeProfileMenu();
    dispatch(logout());
    toast('Logged out successfully');
  };

  return (
    <header className="w-full border-b">
      <div className="relative flex gap-4 justify-between items-center w-full h-[60px]">
        {/* <!-- Desktop nav area --> */}
        <div className="min-w-0 flex gap-3 items-center justify-between sm:justify-end h-full w-full px-3">
          <Link
            to="/"
            title="Home"
            className="flex-shrink-0 sm:hidden inline-flex items-center justify-center mt-1 h-14 w-14 rounded-lg"
          >
            <CgGitter className="text-blue-500 h-12 w-12" />
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={openCart}
              className="h-[52px] w-[52px] relative flex border hover:border-blue-500 text-gray-700 rounded-full items-center justify-center font-bold text-lg focus:ring-inset focus:ring-1 focus:ring-blue-500"
            >
              <RiShoppingCartLine className="h-6 w-6" />
              {cartItems.length > 0 && (
                <span className="absolute flex items-center justify-center top-0.5 -right-1 font-normal text-sm text-white bg-blue-500 rounded-full px-2">
                  {cartItems.length}
                </span>
              )}
            </button>
            <div className="relative">
              <button
                disabled={loading}
                onClick={toggleProfileMenu}
                className={`${
                  user ? '' : 'border'
                } h-[52px] w-[52px] flex hover:border-blue-500 text-gray-700 rounded-full items-center justify-center focus:ring-inset focus:ring-1 focus:ring-blue-500 overflow-hidden`}
              >
                {user ? (
                  <img
                    src={user.avatar && user.avatar.url}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FiUser className="h-6 w-6" />
                )}
              </button>
              <div
                className={`${
                  isProfileMenuOpen
                    ? 'transform opacity-100 scale-100'
                    : 'transform opacity-0 scale-95 pointer-events-none'
                } transition ease-out duration-100 origin-top-right absolute z-30 right-0 mt-2 rounded-2xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none`}
              >
                {user ? (
                  <div className="p-3 w-64 divide-y">
                    <Link
                      to="/profile/settings"
                      onClick={closeProfileMenu}
                      className="group hover:bg-gray-100 relative p-2 mb-2 rounded-lg flex items-center space-x-2"
                    >
                      <div className="flex-shrink-0">
                        {user.avatar ? (
                          <img
                            className="h-12 w-12 rounded-full object-cover"
                            src={user.avatar.url}
                            alt=""
                          />
                        ) : (
                          <div className="h-12 w-12 rounded-2xl flex items-center justify-center bg-gray-200 text-lg">
                            {user.name}
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="truncate">{user.name}</p>
                        <p className="truncate text-sm text-gray-600 group-hover:underline">
                          view profile
                        </p>
                      </div>
                    </Link>
                    <div className="py-1">
                      {user.role === 'admin' && (
                        <Link
                          to="/dashboard"
                          onClick={closeProfileMenu}
                          className="flex items-center justify-between p-3 hover:bg-gray-100 rounded-lg"
                        >
                          <p className="flex items-center gap-2">
                            <BsGrid1X2 />
                            <span className="text-sm">Dashboard</span>
                          </p>
                          <BsChevronRight />
                        </Link>
                      )}
                      <Link
                        to="/profile/my-orders"
                        onClick={closeProfileMenu}
                        className="flex items-center justify-between p-3 hover:bg-gray-100 rounded-lg"
                      >
                        <p className="flex items-center gap-2">
                          <BsClipboardCheck className="w-5 h-5" />
                          <span className="text-sm">My Orders</span>
                        </p>
                        <BsChevronRight />
                      </Link>
                      <Link
                        to="/profile/password/update"
                        onClick={closeProfileMenu}
                        className="flex items-center justify-between p-3 hover:bg-gray-100 rounded-lg"
                      >
                        <p className="flex items-center gap-2">
                          <BsShieldLock className="w-5 h-5" />
                          <span className="text-sm">Update Password</span>
                        </p>
                        <BsChevronRight />
                      </Link>
                    </div>
                    <div>
                      <button
                        onClick={handleLogout}
                        className="mt-1 flex w-full items-center justify-between p-3 hover:bg-gray-100 rounded-lg"
                      >
                        <p className="flex items-center gap-2">
                          <FiLogOut />
                          <span className="text-sm">Log out</span>
                        </p>
                        <BsChevronRight />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="py-3 w-52">
                    <Link
                      onClick={closeProfileMenu}
                      to="/login"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Login
                    </Link>
                    <Link
                      onClick={closeProfileMenu}
                      to="/register"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Register
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNav;
