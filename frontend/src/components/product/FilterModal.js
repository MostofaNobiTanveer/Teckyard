import React from 'react';
import { BsX } from 'react-icons/bs';
import Rating from './Rating';

const FilterModal = ({ closeModal, isModalOpen }) => {
  return (
    <div
      className={`${
        !isModalOpen && 'pointer-events-none'
      } fixed z-50 inset-0 overflow-y-auto hide-scrollbar`}
    >
      <div className="flex items-end justify-center min-h-screen sm:pt-4 sm:px-4 text-center sm:block">
        <div
          onClick={closeModal}
          className={`${
            isModalOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          } transform transition duration-300 fixed inset-0 bg-gray-100 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-30`}
        ></div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
          &#8203;
        </span>
        <div
          className={`${
            isModalOpen
              ? 'opacity-100 translate-y-0 sm:scale-100'
              : 'opacity-0 translate-y-4 sm:translate-y-0 sm:scale-90 pointer-events-none'
          } ease-out duration-300 relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:align-middle sm:mb-8 sm:max-w-3xl sm:w-full`}
        >
          <div className="bg-white">
            <div className="py-3 w-full border-b mx-auto px-4 flex items-center justify-between space-x-2 sm:px-6 lg:px-8">
              <h1>Gears Filters</h1>
              <button onClick={closeModal}>
                <BsX className="h-9 w-9" />
              </button>
            </div>
            <div className="flex flex-col md:flex-row">
              {/* <!-- Image gallery --> */}
              <div className="md:w-1/2 mx-auto pt-10 px-4 sm:px-6 lg:px-8">
                <div className="relative w-full h-80 bg-white rounded-lg overflow-hidden group-hover:opacity-75">
                  <img
                    src="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
                    alt="Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug."
                    className="w-full h-full object-center object-contain"
                  />
                </div>
              </div>

              {/* <!-- Product info --> */}
              <div className="md:w-1/2 mx-auto pt-10 px-4 sm:px-6 lg:px-8">
                <div className="lg:col-span-2">
                  <h1 className="text-2xl font-semibold text-gray-900 sm:text-3xl">
                    {/* {product.name} */}
                  </h1>
                </div>

                {/* <!-- Options --> */}
                <div className="mt-4 lg:row-span-3">
                  <h2 className="sr-only">Product information</h2>
                  <p className="text-3xl text-gray-900">$120</p>

                  {/* <!-- Reviews --> */}
                  <div className="mt-6">
                    <h3 className="sr-only">Reviews</h3>
                    <div className="flex items-center text-lg">
                      <div className="flex items-center gap-[2px]">
                        <Rating value={5} />
                      </div>
                      <span className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                        10 reviews
                      </span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="mt-6 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Add to bag
                  </button>
                </div>

                <div className="py-10 lg:pt-6 lg:pb-16 lg:col-start-1 lg:col-span-2">
                  {/* <!-- Description and details --> */}
                  <div>
                    <h3 className="sr-only">Description</h3>

                    <div className="space-y-6">
                      <p className="text-base text-gray-900">
                        {/* {product.description} */} Lorem ipsum dolor sit amet
                        consectetur adipisicing elit. Dolorum eligendi facere,
                        odio quaerat ipsum quo ipsa similique dolor
                        exercitationem ex.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
