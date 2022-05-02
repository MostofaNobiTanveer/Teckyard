import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Rating from './Rating';
import ReviewModal from './ReviewModal';

const ProductReview = ({ product }) => {
  const { user } = useSelector((state) => state.auth);
  
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const openReviewModal = () => setIsReviewModalOpen(true);
  const closeReviewModal = () => setIsReviewModalOpen(false);

  return (
    <>
      <ReviewModal
        isModalOpen={isReviewModalOpen}
        closeModal={closeReviewModal}
      />
      <div className="max-w-7xl mx-auto space-y-6 sm:px-6 pb-20">
        <div className="bg-white border-t border-b border-gray-200 shadow-sm sm:rounded-3xl sm:border">
          <div
            className={`flex flex-col gap-6 sm:flex-row items-start sm:items-center lg:px-8 px-4 py-6 justify-between ${
              product.reviews && product.reviews.length > 0
                ? 'border-b border-gray-200'
                : ''
            }`}
          >
            <div className="max-w-2xl">
              <h2 className="text-2xl font-semibold">Product reviews</h2>
              <span className="block text-neutral-500">
                User reviews for this product
              </span>
            </div>

            <div className="">
              {user ? (
                <button
                  onClick={openReviewModal}
                  className="flex items-center justify-center bg-white py-2.5 px-3 border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <span>Submit your review</span>
                </button>
              ) : (
                <div className="flex items-center justify-center bg-gray-100/50 py-3 px-3 rounded-xl font-medium text-gray-500">
                  <span>
                    <Link to="/login">
                      <span className="text-blue-500 hover:underline">
                        Login
                      </span>
                    </Link>{' '}
                    to submit your review
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* <!-- Products --> */}
          {product && product.reviews && product.reviews.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {product.reviews.map((review) => {
                const d = new Date(review.createdAt);
                const date =
                  d.getHours() + ':' + d.getMinutes() + ', ' + d.toDateString();
                return(

                <li key={review._id} className="py-10 lg:px-8 px-4">
                  <div className="">
                    <div className="flex items-center">
                      <div className="flex items-center">
                        <Rating value={review.rating} />
                      </div>
                      <p className="ml-3 text-sm text-gray-700">
                        {review.rating}
                      </p>
                    </div>
                    {/* Review */}
                    <div className="mt-4 lg:mt-6 max-w-xl">
                      <p>{review.comment}</p>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center text-sm">
                    <p className="font-medium text-gray-900">{review.name}</p>
                    <span className="ml-4 border-l border-gray-200 pl-4 text-gray-500">
                      {/* Readaable date and time */}
                      {date}
                    </span>
                  </div>
                </li>
                )
              })}
            </ul>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default ProductReview;
