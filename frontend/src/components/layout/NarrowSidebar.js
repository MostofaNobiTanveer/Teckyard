// react icons
import { BsMouse, BsKeyboard } from 'react-icons/bs';
import { FiLogOut } from 'react-icons/fi';
import { CgTouchpad, CgGitter } from 'react-icons/cg';
import { ImHeadphones } from 'react-icons/im';

// packages
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

// actions
import { logout } from '../../actions/userActions';

const NarrowSidebar = ({ openFilterOffcanvas }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(({ auth }) => auth);
  return (
    <nav className="hidden sm:block flex-shrink-0 bg-white border-r overflow-y-auto hide-scrollbar">
      <div className="relative w-[65px] sm:w-[70px] flex flex-col h-full items-center justify-between pb-2.5 px-1 sm:px-2">
        <Link
          to="/"
          title="Home"
          className="flex-shrink-0 inline-flex items-center justify-center mt-1 h-14 w-14 rounded-lg"
        >
          <CgGitter className="text-blue-500 h-12 w-12" />
        </Link>

        <div className="space-y-4 -translate-y-10">
          <button
            onClick={openFilterOffcanvas}
            title="Keyboards"
            className="hover:bg-gray-100 hover:text-gray-800 text-gray-500 flex-shrink-0 inline-flex items-center justify-center h-14 w-full rounded-lg"
          >
            <BsKeyboard className="h-7 w-7" />
          </button>
          <button
            onClick={openFilterOffcanvas}
            title="Mouses"
            className="hover:bg-gray-100 hover:text-gray-800 text-gray-500 flex-shrink-0 inline-flex items-center justify-center h-14 w-full rounded-lg"
          >
            <BsMouse className="h-7 w-7" />
          </button>
          <button
            onClick={openFilterOffcanvas}
            title="Headsets"
            className="hover:bg-gray-100 hover:text-gray-800 text-gray-500 flex-shrink-0 inline-flex items-center justify-center h-14 w-full rounded-lg"
          >
            <ImHeadphones className="h-6 w-6" />
          </button>
          <button
            onClick={openFilterOffcanvas}
            title="Mousepads"
            className="hover:bg-gray-100 hover:text-gray-800 text-gray-500 flex-shrink-0 inline-flex items-center justify-center h-14 w-full rounded-lg"
          >
            <CgTouchpad className="h-6 w-6" />
          </button>
        </div>
        {user ? (
          <button
            onClick={() => {
              dispatch(logout());
              toast('Logged out successfully');
            }}
            title="Logout"
            className="text-zinc-600 hover:bg-gray-100 hover:text-gray-800 flex-shrink-0 inline-flex items-center justify-center h-14 w-14 rounded-lg"
          >
            <FiLogOut className="h-6 w-6" />
          </button>
        ) : (
          <div></div>
        )}
      </div>
    </nav>
  );
};

export default NarrowSidebar;
