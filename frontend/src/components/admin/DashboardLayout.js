import React, { useEffect, useState } from 'react';
import {
  BsX,
  BsGrid1X2,
  BsChevronDown,
  BsClipboardCheck,
  BsFolderPlus,
  BsFolder,
  BsFolder2Open,
  BsChevronUp,
  BsStars,
} from 'react-icons/bs';
import { CgGitter } from 'react-icons/cg';
import { FiUsers } from 'react-icons/fi';
import { AiOutlineMenuUnfold } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { Link, NavLink, useLocation } from 'react-router-dom';

const navLinks = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    icon: <BsGrid1X2 className="h-5 w-5" />,
  },
  {
    name: 'Products',
    path: '/admin/products',
    icon: <BsFolder className="h-5 w-5" />,
    dropdown: [
      {
        name: 'All Products',
        path: '/admin/products',
        icon: <BsFolder2Open className="h-5 w-5" />,
      },
      {
        name: 'Add Product',
        path: '/admin/product/add',
        icon: <BsFolderPlus className="h-5 w-5" />,
      },
    ],
  },
  {
    name: 'Orders',
    path: '/admin/orders',
    icon: <BsClipboardCheck className="h-5 w-5" />,
  },
  {
    name: 'Users',
    path: '/admin/users',
    icon: <FiUsers className="h-5 w-5" />,
  },
  {
    name: 'Reviews',
    path: '/admin/reviews',
    icon: <BsStars className="h-5 w-5" />,
  },
];

const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const closeSidebar = () => setIsSidebarOpen(false);
  const openSidebar = () => setIsSidebarOpen(true);
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="h-screen flex overflow-hidden">
      <div
        className={`${
          isSidebarOpen ? '' : 'pointer-events-none'
        } fixed inset-0 flex z-40 md:hidden transform transition duration-300`}
      >
        {/* overlay */}
        <div
          onClick={closeSidebar}
          className={`${
            isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          } transform transition duration-100 fixed inset-0 bg-gray-100 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30`}
        ></div>
        <div
          className={`${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } transition duration-300 transform relative flex-1 flex flex-col max-w-xs w-full bg-white`}
        >
          {/* close offcanvas */}
          <div className="flex-1 overflow-y-auto divide-y border-r">
            <div className="flex-shrink-0 h-14 divide-x flex items-center justify-between">
              <Link to="/" className="flex w-full items-center gap-2 px-4">
                <CgGitter className="h-9 text-blue-500 w-auto" />
                <h1 className="font-medium text-lg">Tech Yard</h1>
              </Link>
              <div className="h-full w-16">
                <button
                  onClick={closeSidebar}
                  className="h-full w-full flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                >
                  <BsX className="h-9 w-9" />
                </button>
              </div>
            </div>
            <NavLinkComponent closeSidebar={closeSidebar} />
          </div>
          <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
            {user && user.role === 'admin' && (
              <Link
                to="/profile/settings"
                className="flex-shrink-0 group block"
              >
                <div className="flex items-center">
                  <div>
                    <img
                      className="inline-block h-10 w-10 rounded-full object-cover"
                      src={user.avatar && user.avatar.url}
                      alt={user.name}
                    />
                  </div>
                  <div className="ml-3">
                    <p className="text-base font-medium text-gray-700 group-hover:text-gray-900">
                      {user.name}
                    </p>
                    <p className="text-sm font-medium text-gray-500 group-hover:text-gray-700">
                      View profile
                    </p>
                  </div>
                </div>
              </Link>
            )}
          </div>
        </div>

        <div className="flex-shrink-0 w-14">
          {/* <!-- Force sidebar to shrink to fit close icon --> */}
        </div>
      </div>

      {/* <!-- Static sidebar for desktop --> */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col lg:w-72 w-[17rem] m-2 mr-0 border rounded-3xl overflow-hidden">
          {/* <!-- Sidebar component, swap this element with another sidebar if you like --> */}
          <div className="flex flex-col flex-1 bg-white justify-between">
            <div className="flex-shrink-0 h-16 divide-x flex items-center justify-between">
              <Link to="/" className="flex w-full items-center gap-2 px-4">
                <CgGitter className="h-9 text-blue-500 w-auto" />
                <h1 className="font-medium text-lg">Tech Yard</h1>
              </Link>
            </div>
            <NavLinkComponent closeSidebar={closeSidebar} />
            <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
              {user && user.role === 'admin' && (
                <Link
                  to="/profile/settings"
                  className="flex-shrink-0 group block"
                >
                  <div className="flex items-center">
                    <div>
                      <img
                        className="inline-block h-10 w-10 rounded-full object-cover"
                        src={user.avatar && user.avatar.url}
                        alt={user.name}
                      />
                    </div>
                    <div className="ml-3">
                      <p className="text-base font-medium text-gray-700 group-hover:text-gray-900">
                        {user.name}
                      </p>
                      <p className="text-sm font-medium text-gray-500 group-hover:text-gray-700">
                        View profile
                      </p>
                    </div>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <div className="md:hidden pl-1 sm:pl-3 border-b py-2">
          <button
            onClick={openSidebar}
            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          >
            <AiOutlineMenuUnfold className="h-6 w-6" />
          </button>
        </div>
        <main className="flex-1 relative z-0 overflow-y-auto overflow-x-hidden focus:outline-none">
          <div className="mx-auto py-6 px-4 sm:px-6 md:px-8">{children}</div>
        </main>
      </div>
    </div>
  );
};

const NavLinkComponent = ({ closeSidebar }) => {
  const { pathname } = useLocation();
  const [isProductSubmenuOpen, setIsProductSubmenuOpen] = useState(true);
  const toggleProductSubmenu = () =>
    setIsProductSubmenuOpen(!isProductSubmenuOpen);
  useEffect(() => {
    if (pathname === '/admin/products' || pathname === '/admin/product/add') {
      setIsProductSubmenuOpen(true);
    }
  }, [pathname]);
  return (
    <nav className="py-2 flex-1 px-2 space-y-2">
      {navLinks.map((link) => {
        if (link.dropdown) {
          return (
            <div
              key={link.name}
              className={
                isProductSubmenuOpen ? 'rounded-xl border pb-2 pr-2' : ''
              }
            >
              <button
                onClick={toggleProductSubmenu}
                className={`${
                  isProductSubmenuOpen
                    ? 'bg-gray-5'
                    : 'hover:bg-gray-50 hover:text-gray-900'
                } text-gray-600 w-full group flex items-center pl-4 px-2 py-2.5 text-base font-medium rounded-xl`}
              >
                {link.icon}
                <span className="mx-3 flex-1 flex items-center justify-between">
                  {link.name}
                  <span>
                    {isProductSubmenuOpen ? <BsChevronUp /> : <BsChevronDown />}
                  </span>
                </span>
              </button>
              {isProductSubmenuOpen && (
                <div className="space-y-2">
                  {link.dropdown.map((dropdownLink) => (
                    <NavLink
                      key={dropdownLink.name}
                      to={dropdownLink.path}
                      onClick={closeSidebar}
                      className={({ isActive }) =>
                        isActive
                          ? 'bg-blue-500 ml-5 text-white group flex items-center pl-4 px-2 py-2.5 text-sm font-medium rounded-xl'
                          : 'text-gray-600 ml-5 hover:bg-gray-50 hover:text-gray-900 group flex items-center pl-4 px-2 py-2.5 text-sm font-medium rounded-xl'
                      }
                    >
                      {dropdownLink.icon}
                      <span className="mx-3 flex-1 flex items-center justify-between">
                        {dropdownLink.name}
                      </span>
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          );
        }
        return (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              isActive
                ? 'bg-blue-500 text-white group flex items-center pl-4 px-2 py-2.5 text-base font-medium rounded-xl'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center pl-4 px-2 py-2.5 text-base font-medium rounded-xl'
            }
          >
            {link.icon}
            <span className="ml-3">{link.name}</span>
          </NavLink>
        );
      })}
    </nav>
  );
};

export default DashboardLayout;
