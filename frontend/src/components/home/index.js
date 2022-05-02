import React, { useEffect, useState } from 'react';
import { VscSearchStop } from 'react-icons/vsc';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getProducts } from '../../actions/productActions';
import Layout from '../layout';
import MetaData from '../layout/MetaData';
import Product from '../product/Product';
import ProductFilter from '../product/ProductFilter';
import ProductPagination from '../product/ProductPagination';
import ProductSearch from '../product/ProductSearch';
import ProductSkeleton from '../product/ProductSkeleton';

const Home = () => {
  const { keyword } = useParams();
  const [price, setPrice] = useState([0, 1000]);
  const [category, setCategory] = useState('');
  const [rating, setRating] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();
  const { products, loading, error, resPerPage, filteredProductsCount } =
    useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      return toast.error(error);
    }
    dispatch(getProducts(keyword, currentPage, price, category, rating));
  }, [dispatch, error, currentPage, keyword, price, category, rating]);

  const handlePagination = (pageNumber) => setCurrentPage(pageNumber);
  const handlePrice = (price) => setPrice(price);
  const handleCategory = (category) => setCategory(category);
  const handleRating = (rating) => setRating(rating);

  return (
    <Layout>
      <MetaData title="Best Gears Online" />
      <div>
        <section className="bg-white">
          <ProductSearch />
          <ProductFilter
            handlePrice={handlePrice}
            handleCategory={handleCategory}
            handleRating={handleRating}
          />
        </section>

        {loading ? (
          <ProductSkeleton />
        ) : (
          <div className="max-w-7xl mx-auto w-full p-4 hide-scrollber mb-10">
            {filteredProductsCount < 1 ? (
              <div className="relative block w-full border-2 border-gray-300 border-dashed rounded-lg p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <VscSearchStop className="mx-auto h-12 w-12 md:h-20 md:w-20 text-red-500" />
                <span className="mt-2 block font-medium text-gray-900">
                  No results found
                </span>
              </div>
            ) : (
              <div className="grid sm:grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4 mb-6 sm:grid-cols-0 grid-cols-1">
                {products.map((product, i) => (
                  <Product key={product._id} product={product} />
                ))}
              </div>
            )}
            <div>
              {resPerPage < filteredProductsCount && (
                <ProductPagination
                  activePage={currentPage}
                  resPerPage={resPerPage}
                  totalItemsCount={filteredProductsCount}
                  handlePagination={handlePagination}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Home;
