import { useState } from 'react';

const ProductPagination = ({
  activePage,
  resPerPage,
  totalItemsCount,
  handlePagination,
}) => {
  const [pagesCount, setPagesCount] = useState(
    Math.ceil(totalItemsCount / resPerPage)
  );
  const handlePrev = () => {
    if (activePage > 1) {
      handlePagination(activePage - 1);
    }
  };
  const handleNext = () => {
    if (activePage < pagesCount) {
      handlePagination(activePage + 1);
    }
  };

  const resFrom = activePage * resPerPage - resPerPage + 1;
  const resTo =
    activePage * resPerPage > totalItemsCount
      ? totalItemsCount
      : activePage * resPerPage;

  return (
    <div className="max-w-2xl ml-auto bg-white border px-3 flex items-center justify-between rounded-2xl py-3">
      <div className="flex-1 flex justify-between items-center">
        <button
          disabled={activePage === 1}
          onClick={handlePrev}
          className="relative disabled:cursor-not-allowed inline-flex items-center px-4 py-2.5 border border-gray-300 text-sm font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-100"
        >
          Previous
        </button>
        <div className="hidden sm:block">
          <p className="text-sm text-gray-700">
            Showing
            <span className="font-medium text-lg text-black">
              {' '}
              {resFrom < 10 ? `0${resFrom}` : resFrom}
              {resTo > 1 && '-'}
              {resTo > 1 && (resTo < 10 ? `0${resTo}` : resTo)}{' '}
            </span>
            of
            <span className="font-medium text-lg text-black">
              {' '}
              {`${totalItemsCount < 10 ? '0' : ''}${totalItemsCount}`}{' '}
            </span>
            results
          </p>
        </div>
        <button
          disabled={activePage === pagesCount}
          onClick={handleNext}
          className="relative disabled:cursor-not-allowed inline-flex items-center px-4 py-2.5 border border-gray-300 text-sm font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-100"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductPagination;
