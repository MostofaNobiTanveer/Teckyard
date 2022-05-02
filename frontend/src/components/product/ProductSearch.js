import React, { useState } from 'react';
import { VscArrowRight } from 'react-icons/vsc';
import { RiSearch2Line } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

const ProductSearch = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (keyword.trim() === '') {
      return;
    } else {
      navigate(`/${keyword}`);
    }
  };

  return (
    <>
      <div className="h-24 2xl:h-28 top-0 left-0 right-0 w-full bg-gray-100"></div>
      <div className="">
        <header className="max-w-2xl mx-auto -mt-8 flex flex-col lg:-mt-7 px-2">
          <form className="relative w-full" onSubmit={handleSubmit}>
            <label
              htmlFor="search-input"
              className="text-neutral-500"
            >
              <span className="sr-only">Search all icons</span>
              <input
                type="search"
                className="block w-full border-neutral-200 focus:ring-2 focus:ring-opacity-30 focus:ring-blue-500 bg-white disabled:bg-neutral-200 text-black rounded-full text-sm font-normal pl-14 py-3.5 sm:py-5 pr-5 md:pl-16 shadow-md border-0"
                id="search-input"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Type your keywords"
              />
              <button
                className="flex items-center justify-center rounded-full !leading-none disabled:bg-opacity-70 bg-blue-600 hover:bg-primary-700 text-neutral-50 absolute right-2 sm:right-2.5 top-1/2 transform -translate-y-1/2  sm:w-11 sm:h-11 w-9 h-9 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 dark:focus:ring-offset-0"
                type="submit"
              >
                <VscArrowRight className="text-xl" />
              </button>
              <span className="absolute left-3 sm:left-5 top-1/2 transform -translate-y-1/2 text-2xl md:left-6">
                <RiSearch2Line className="h-6 w-6 text-gray-400" />
              </span>
            </label>
          </form>
        </header>
      </div>
    </>
  );
};

export default ProductSearch;
