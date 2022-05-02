import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { BsX, BsStarFill } from 'react-icons/bs';
import { addProductReview } from '../../actions/productActions';
import { useParams } from 'react-router-dom';

const ReviewModal = ({ closeModal, isModalOpen }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  function setUserRatings() {
    const stars = document.querySelectorAll('.star');

    stars.forEach((star, index) => {
      star.starValue = index + 1;

      ['click', 'mouseover', 'mouseout'].forEach(function (e) {
        star.addEventListener(e, showRatings);
      });
    });

    function showRatings(e) {
      stars.forEach((star, index) => {
        if (e.type === 'click') {
          if (index < this.starValue) {
            star.classList.add('text-yellow-400');

            setRating(this.starValue);
          } else {
            star.classList.remove('text-yellow-400');
          }
        }

        if (e.type === 'mouseover') {
          if (index < this.starValue) {
            star.classList.add('text-yellow-300');
          } else {
            star.classList.remove('text-yellow-300');
          }
        }

        if (e.type === 'mouseout') {
          star.classList.remove('text-yellow-300');
        }
      });
    }
  }

  useEffect(() => {
    setUserRatings();
  }, []);

  const handleReview = (e) => {
    const reviewData = {
      rating,
      comment,
      productId: id,
    };

    if (rating === 0) {
      toast.error('Please select a rating');
    } else if (comment === '') {
      toast.error('Please enter a comment');
    } else {
      dispatch(addProductReview(reviewData));
      closeModal();
    }
  };

  return (
    <div
      className={`${
        !isModalOpen && 'pointer-events-none'
      } fixed z-50 inset-0 overflow-y-auto hide-scrollbar`}
    >
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 text-center sm:block">
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
          } ease-out duration-300 relative inline-block bg-white rounded-3xl text-left overflow-hidden shadow-xl transform transition-all align-middle mb-8 max-w-xl w-full`}
        >
          <div className="bg-white">
            <div className="py-5 w-full border-b mx-auto px-4 flex items-center justify-between space-x-2 sm:px-6 lg:px-8">
              <h1 className="text-lg">Submit your review</h1>
              <button onClick={closeModal}>
                <BsX className="h-9 w-9" />
              </button>
            </div>
            <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
              <div className="py-8 px-4 sm:rounded-lg sm:px-10">
                <div className="space-y-6">
                  {/* Star rating get star from user */}
                  <div>
                    <span className="block">Your rating</span>
                    <div className="mt-1 flex items-center gap-2 text-gray-300">
                      <BsStarFill className="star cursor-pointer h-12 w-12" />
                      <BsStarFill className="star cursor-pointer h-12 w-12" />
                      <BsStarFill className="star cursor-pointer h-12 w-12" />
                      <BsStarFill className="star cursor-pointer h-12 w-12" />
                      <BsStarFill className="star cursor-pointer h-12 w-12" />
                    </div>
                  </div>

                  {/* comment textarea */}
                  <div>
                    <label htmlFor="comment" className="block">
                      Comment
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="comment"
                        name="comment"
                        rows={4}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Write your comment here"
                        className="appearance-none bg-transparent block w-full px-5 text-base py-3 border border-gray-400 rounded-3xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <button
                      onClick={handleReview}
                      className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm uppercase font-medium tracking-wider transition-all duration-300 text-white bg-blue-500 hover:bg-blue-600 hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Submit
                    </button>
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

export default ReviewModal;
