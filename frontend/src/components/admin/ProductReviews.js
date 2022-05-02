import React, { useEffect, useState } from 'react';
import { VscArrowRight, VscSearchStop } from 'react-icons/vsc';
import { RiSearch2Line } from 'react-icons/ri';
import { toast } from 'react-toastify';
import MetaData from '../layout/MetaData';
import DashboardLayout from './DashboardLayout';
import {
  getProductReviews,
  clearErrors,
  deleteReview,
} from '../../actions/productActions';
import { useDispatch, useSelector } from 'react-redux';
import ProductsListSkeleton from './ProductsListSkeleton';
import { BsStarFill } from 'react-icons/bs';
import { DELETE_REVIEW_RESET } from '../../constants/productConstants';

const ProductReviews = () => {
  const [productId, setProductId] = useState('');
  const dispatch = useDispatch();

  const { loading, error, reviews } = useSelector(
    (state) => state.productReviews
  );
  const { isDeleted } = useSelector((state) => state.review);

  useEffect(() => {
    if (error) {
      toast.error('Please enter a valid product ID');
      setProductId('');
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success('Review deleted successfully');
      dispatch({ type: DELETE_REVIEW_RESET });
    }
  }, [error, dispatch, productId, isDeleted]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getProductReviews(productId));
  };

  const handleDeleteReview = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      dispatch(deleteReview(id, productId));
      dispatch(getProductReviews(productId));
    } else {
      return;
    }
  };

  return (
    <DashboardLayout>
      <MetaData title="Product Reviews" />
      <div className="flex flex-col space-y-8">
        <div className="max-w-2xl mx-auto flex flex-col w-full space-y-4">
          <h2 className="text-2xl text-center font-semibold text-gray-900">
            Get All Product Reviews
          </h2>
          <form className="relative w-full" onSubmit={handleSubmit}>
            <label htmlFor="search-input" className="text-neutral-500">
              <span className="sr-only">Search all icons</span>
              <input
                type="search"
                className="block w-full border-neutral-200 focus:ring-2 focus:ring-opacity-30 focus:ring-blue-500 bg-white disabled:bg-neutral-200 text-black rounded-full border text-sm font-normal pl-14 py-3.5 sm:py-5 pr-5 md:pl-16 shadow-md focus:border-transparent"
                id="search-input"
                placeholder="Search by product ID"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              />
              <button
                disabled={productId === ''}
                className="flex items-center justify-center disabled:cursor-not-allowed rounded-full !leading-none disabled:bg-opacity-70 bg-blue-600 hover:bg-primary-700 text-neutral-50 absolute right-2 sm:right-2.5 top-1/2 transform -translate-y-1/2  sm:w-11 sm:h-11 w-9 h-9 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 dark:focus:ring-offset-0"
                type="submit"
              >
                <VscArrowRight className="text-xl" />
              </button>
              <span className="absolute left-3 sm:left-5 top-1/2 transform -translate-y-1/2 text-2xl md:left-6">
                <RiSearch2Line className="h-6 w-6 text-gray-400" />
              </span>
            </label>
          </form>
        </div>
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            {loading ? (
              <ProductsListSkeleton />
            ) : reviews && reviews.length > 0 ? (
              <div className="border overflow-hidden rounded-3xl">
                <table className="min-w-full divide-y">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left max-w-sm text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Review ID
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Rating
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Comment
                      </th>

                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        <span className="sr-only">Edit</span>
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {reviews.map((review) => (
                      <tr key={review._id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {review._id}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 flex items-center gap-1">
                            {review.rating}
                            <BsStarFill className="text-yellow-500 -mt-1" />
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap max-w-sm truncate">
                          <div className="text-sm text-gray-900">
                            {review.comment}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button
                            onClick={() => handleDeleteReview(review._id)}
                            className="text-red-500 hover:underline"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="relative block w-full border-2 border-gray-300 border-dashed rounded-lg p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <VscSearchStop className="mx-auto h-12 w-12 md:h-20 md:w-20 text-red-500" />
                <span className="mt-2 block font-medium text-gray-900">
                  No reviews found
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProductReviews;
