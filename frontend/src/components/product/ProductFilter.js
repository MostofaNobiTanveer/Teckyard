import React, { useState } from 'react';

// rc-slider
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

// react icons
import { FiChevronDown, FiChevronRight } from 'react-icons/fi';
import { CgArrowsExchangeV } from 'react-icons/cg';
import {
  BsStar,
  BsStarFill,
  BsSliders,
  BsDiagram3,
  BsLayers,
} from 'react-icons/bs';

// components
import FilterModal from './FilterModal';
import Rating from './Rating';

const categories = ['Keyboard', 'Mouse', 'Mousepad', 'Headphones'];

const ProductFilter = ({ handlePrice, handleCategory, handleRating }) => {
  const [price, setPrice] = useState([1, 1000]);
  const [category, setCategory] = useState('');
  const [rating, setRating] = useState(0);
  const [dropdown, setDropdown] = useState({
    price: false,
    rating: false,
    category: false,
  });

  const openDropdown = (name) => {
    // toggle dropdown and close others
    setDropdown((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }));

    // close all dropdowns
    Object.keys(dropdown).forEach((key) => {
      if (key !== name) {
        setDropdown((prevState) => ({
          ...prevState,
          [key]: false,
        }));
      }
    });
  };

  // handle filter modal
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const openFilterModal = () => setIsFilterModalOpen(true);
  const closeFilterModal = () => setIsFilterModalOpen(false);

  return (
    <div>
      <FilterModal
        isModalOpen={isFilterModalOpen}
        closeModal={closeFilterModal}
      />
      <div className="w-full border-b sm:my-8 my-6"></div>
      <div className="flex lg:space-x-4 mx-auto w-full">
        <div className="hidden lg:flex space-x-4 mx-auto">
          {/* Price filters */}
          <div className="relative">
            <button
              onClick={() => openDropdown('price')}
              className="flex items-center justify-center px-4 py-2 text-sm rounded-full border border-gray-300 hover:border-blue-500 focus:outline-none "
              type="button"
            >
              <BsSliders className="w-4 h-4" />
              <span className="ml-2">
                {price[0]} USD - {price[1]} USD
              </span>
              <FiChevronDown className="h-5 w-5 ml-3" />
            </button>
            <div className="absolute z-40 w-screen max-w-sm px-4 mt-3 left-0 sm:px-0">
              <div
                className={`${
                  dropdown.price
                    ? 'transform opacity-100 scale-100'
                    : 'transform opacity-0 scale-0 pointer-events-none'
                } transition ease-out duration-200 origin-top flex flex-col overflow-hidden space-y-8 absolute z-30 left-0 mt-1 rounded-3xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none`}
              >
                <div className="px-5 pt-5">
                  <div className="space-y-5 mb-5">
                    <span className="font-medium">Price range</span>
                    <Slider
                      range
                      min={1}
                      max={1000}
                      defaultValue={[1, 1000]}
                      step={1}
                      value={price}
                      onChange={(price) => setPrice(price)}
                    />
                  </div>
                  <div className="flex justify-between space-x-5">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700">
                        Min price
                      </label>
                      <div className="mt-1 relative rounded-md">
                        <span className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-neutral-500 sm:text-sm">
                          USD
                        </span>
                        <input
                          disabled
                          type="text"
                          className="block w-32 pr-10 pl-4 sm:text-sm border-neutral-200 dark:border-neutral-700 rounded-full bg-transparent"
                          value={price[0]}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700">
                        Max price
                      </label>
                      <div className="mt-1 relative rounded-md">
                        <span className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-neutral-500 sm:text-sm">
                          USD
                        </span>
                        <input
                          disabled
                          type="text"
                          className="block w-32 pr-10 pl-4 sm:text-sm border-neutral-200 dark:border-neutral-700 rounded-full bg-transparent"
                          value={price[1]}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="py-3 px-4 bg-gray-100 w-full flex items-center justify-end">
                  <button
                    onClick={() => {
                      handlePrice([...price]);
                      setDropdown({ ...dropdown, price: false });
                    }}
                    className="relative h-auto inline-flex items-center justify-center rounded-full text-sm font-medium py-2 px-8 disabled:bg-opacity-70 bg-blue-500 hover:bg-blue-700 text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Category filters */}
          <div className="relative">
            <button
              onClick={() => openDropdown('category')}
              className="flex items-center justify-center px-4 py-2 text-sm rounded-full border border-gray-300 hover:border-blue-500 focus:outline-none "
              type="button"
            >
              <BsLayers className="w-4 h-4" />
              <span className="ml-2">
                {category
                  ? category
                  : category === 'All categories'
                  ? 'All categories'
                  : 'Select category'}
              </span>
              <FiChevronDown className="h-5 w-5 ml-3" />
            </button>
            <div className="absolute z-40 w-screen max-w-sm px-4 mt-3 left-0 sm:px-0">
              <div
                className={`${
                  dropdown.category
                    ? 'transform opacity-100 scale-100'
                    : 'transform opacity-0 scale-0 pointer-events-none'
                } transition ease-out duration-200 origin-top w-52 max-h-60 flex flex-col overflow-y-auto hide-scrollbar space-y-8 absolute z-30 left-0 mt-1 rounded-3xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none`}
              >
                <div className="px-3 py-3">
                  <ul className="space-y-1">
                    {categories.map((item, i) => (
                      <li
                        onClick={() => {
                          if (item === 'All categories') {
                            handleCategory('');
                            setCategory('');
                          } else {
                            handleCategory(item);
                            setCategory(item);
                          }
                          setDropdown({ ...dropdown, category: false });
                        }}
                        key={i}
                        className={
                          category === item
                            ? 'cursor-pointer py-2 px-4 rounded-full bg-gray-100'
                            : 'cursor-pointer py-2 px-4 rounded-full hover:bg-gray-100'
                        }
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* Rating filters */}
          <div className="relative">
            <button
              onClick={() => openDropdown('rating')}
              className="flex items-center justify-center px-4 py-2 text-sm rounded-full border border-gray-300 hover:border-blue-500 focus:outline-none "
              type="button"
            >
              <BsStar className="w-4 h-4" />
              <span className="ml-2">
                {rating > 0 ? (
                  <span className="flex items-center">
                    {' '}
                    <FiChevronRight className="w-4 h-4" />{rating} <BsStarFill className="text-yellow-500 ml-1 mb-1" />
                  </span>
                ) : (
                  'By ratings'
                )}{' '}
              </span>
              <FiChevronDown className="h-5 w-5 ml-3" />
            </button>
            <div className="absolute z-40 w-screen max-w-sm px-4 mt-3 left-0 sm:px-0">
              <div
                className={`${
                  dropdown.rating
                    ? 'transform opacity-100 scale-100'
                    : 'transform opacity-0 scale-0 pointer-events-none'
                } transition ease-out duration-200 origin-top w-52 max-h-60 flex flex-col overflow-y-auto hide-scrollbar space-y-8 absolute z-30 left-0 mt-1 rounded-3xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none`}
              >
                <div className="px-3 py-5">
                  <ul>
                    {[5, 4, 3, 2, 1].map((rating, i) => (
                      <li
                        key={i}
                        className="cursor-pointer py-2 px-4 rounded-full hover:bg-gray-50 flex items-center justify-between"
                        onClick={() => {
                          handleRating(rating);
                          setRating(rating);
                          setDropdown({ ...dropdown, rating: false });
                        }}
                      >
                        <span className="flex items-center justify-between gap-1">
                          <Rating value={rating} />
                        </span>
                        <span className="ml-2">({rating})</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* sort */}
          <div className="relative">
            <button
              className="flex items-center justify-center px-4 py-2 text-sm rounded-full border border-gray-300 hover:border-blue-500 focus:outline-none "
              type="button"
            >
              <CgArrowsExchangeV className="w-4 h-4 border rounded-full border-black" />
              <span className="ml-2">Sort order</span>
              <FiChevronDown className="h-5 w-5 ml-3" />
            </button>
          </div>
        </div>
        <div className="lg:hidden flex mx-auto">
          <div className="relative">
            <button
              onClick={openFilterModal}
              className="flex items-center justify-center px-4 py-2.5 text-sm rounded-full border border-gray-300 hover:border-blue-500 focus:outline-none "
              type="button"
            >
              <BsDiagram3 className="w-4 h-4" />
              <span className="mx-5">Add filters</span>
              <FiChevronDown className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
      <div className="w-full border-b sm:my-8 my-6"></div>
    </div>
  );
};

export default ProductFilter;
