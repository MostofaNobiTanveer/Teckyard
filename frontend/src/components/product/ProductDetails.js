import React, { useEffect, useState } from 'react';

// packages
import { FiChevronDown } from 'react-icons/fi';
import { BiPlus, BiMinus } from 'react-icons/bi';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

// components
import { getProductDetails, clearErrors } from '../../actions/productActions';
import ProductDetailsSkeleton from './ProductDetailsSkeleton';
import Rating from './Rating';
import { additemToCart } from '../../actions/cartActions';
import ProductReview from './ProductReview';
import { PRODUCT_REVIEW_RESET } from '../../constants/productConstants';
import Layout from '../layout';

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isDescOpen, setIsDescOpen] = useState(true);
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  const { error: reviewError, success } = useSelector(
    (state) => state.newReview
  );
  const toggleDesc = () => setIsDescOpen(!isDescOpen);

  useEffect(() => {
    setQuantity(1);

    dispatch(getProductDetails(id));

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (reviewError) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      toast.success('Review submitted successfully');
      dispatch({ type: PRODUCT_REVIEW_RESET });
    }
  }, [dispatch, error, id, reviewError, success]);

  const increaseQty = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };
  const decreaseQty = () => {
    if (quantity === 1) return;
    setQuantity(quantity - 1);
  };
  const addToCart = () => {
    dispatch(additemToCart(product._id, quantity));
    toast.success('Item added to cart');
  };

  return (
    <Layout>
      <div className="overflow-hidden relative">
        {loading ? (
          <div className="bg-white">
            <ProductDetailsSkeleton />
          </div>
        ) : (
          product && (
            <main className="max-w-7xl flex mx-auto p-4 lg:p-6 mb-10">
              <div className="relative w-full grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-14">
                {/* left */}
                <div className="space-y-8 lg:space-y-10">
                  <div className="relative space-y-2">
                    <div className="aspect-video h-96 w-full bg-gray-100 rounded-3xl overflow-hidden">
                      <img
                        src={
                          product.images && product.images[activeImageIndex].url
                        }
                        className="object-contain w-full h-full"
                        alt={product.name}
                      />
                    </div>
                    {product.images && product.images.length > 1 && (
                      <div className="px-2 h-20 flex bg-gray-100 rounded-xl max-w-4xl w-full mx-auto overflow-x-auto hide-scrollbar">
                        <div className="flex-1 flex gap-3 justify-center items-center hide-scrollbar">
                          {product.images.map((image, i) => (
                            <div
                              key={i}
                              onClick={() => setActiveImageIndex(i)}
                              className={`${
                                activeImageIndex === i
                                  ? 'border-[4px] border-inset border-blue-500'
                                  : 'hover:opacity-70'
                              } relative w-20 h-16 rounded-lg overflow-hidden cursor-pointer transition duration-100`}
                            >
                              <img
                                src={image.url}
                                alt={`${i}`}
                                className="h-full w-full object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                {/* right */}
                <div className="sticky top-0 pt-10 lg:pt-0 xl:pl-10 border-t border-neutral-200 lg:border-t-0">
                  <div className="divide-y divide-neutral-100">
                    <div className="pb-6 space-y-5">
                      <div className="flex justify-between items-center">
                        <span className="inline-flex px-2.5 py-1 rounded-full font-medium text-xs relative text-green-800 bg-green-100">
                          {product.category}
                        </span>
                      </div>
                      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
                        {product.name}
                      </h2>
                      <span className="inline-flex items-center gap-1">
                        <Rating value={Number(product.ratings)} />
                        <span className="text-neutral-500 text-sm">
                          ( {product.numOfReviews} Reviews )
                        </span>
                      </span>
                    </div>
                    <div className="pb-9 pt-6">
                      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between">
                        <span className="text-3xl xl:text-4xl font-semibold text-green-500">
                          {product.price} USD
                        </span>
                        <span className="text-lg text-neutral-500 mt-2 sm:mt-0">
                          {product.stock === 0 ? (
                            <span className="text-red-500">
                              {' '}
                              [Out of stock]
                            </span>
                          ) : (
                            <span className="text-gray-500">
                              [{product.stock} in stock]
                            </span>
                          )}
                        </span>
                      </div>
                      <div className="mt-8 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                        <div className="relative min-w-[10rem] h-auto inline-flex items-center justify-between rounded-full transition-colors text-sm sm:text-base font-medium p-0.5 border bg-white border-neutral-200 text-neutral-700">
                          <button
                            onClick={decreaseQty}
                            disabled={quantity === 1}
                            className="hover:bg-gray-100 disabled:cursor-not-allowed p-3 rounded-full flex items-center justify-center text-xl"
                          >
                            <BiMinus />
                          </button>
                          <span>{quantity}</span>
                          <button
                            onClick={increaseQty}
                            disabled={quantity === product.stock}
                            className="hover:bg-gray-100 disabled:cursor-not-allowed p-3 rounded-full flex items-center justify-center text-xl"
                          >
                            <BiPlus />
                          </button>
                        </div>
                        <button
                          disabled={product.stock === 0}
                          onClick={addToCart}
                          className="relative disabled:cursor-not-allowed h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-3 sm:px-6  ttnc-ButtonPrimary disabled:bg-opacity-70 bg-blue-500 hover:bg-blue-700 text-neutral-50 flex-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          <span className="ml-2.5">Add to cart</span>
                        </button>
                      </div>
                    </div>
                    {/* description */}
                    <div className="w-full rounded-2xl">
                      <div className="relative">
                        <button
                          onClick={toggleDesc}
                          className="flex items-center justify-between w-full px-4 py-2 font-medium text-left bg-neutral-100 rounded-lg hover:bg-neutral-200 focus:outline-none focus-visible:ring focus-visible:ring-neutral-500 focus-visible:ring-opacity-75"
                          type="button"
                        >
                          <span>Descriptions</span>
                          <FiChevronDown
                            className={`${
                              isDescOpen ? '' : 'rotate-180'
                            } transform transition-all w-5 h-5 text-neutral-500`}
                          />
                        </button>
                        <p
                          className={`${
                            isDescOpen
                              ? 'transform opacity-100 scale-100'
                              : 'transform opacity-0 scale-95 pointer-events-none hidden'
                          } transition-all px-4 pt-4 pb-2 text-neutral-600 text-sm`}
                        >
                          {product.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          )
        )}
        <ProductReview product={product} />
      </div>
    </Layout>
  );
};

export default ProductDetails;
