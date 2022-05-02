import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { BsChevronLeft, BsPlus } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import MetaData from '../layout/MetaData';
import DashboardLayout from './DashboardLayout';
import {
  updateProduct,
  getProductDetails,
  clearErrors,
} from '../../actions/productActions';
import { useNavigate, useParams } from 'react-router-dom';
import { UPDATE_PRODUCT_RESET } from '../../constants/productConstants';

const categories = [
  'Electronics',
  'Cameras',
  'Laptops',
  'Accessories',
  'Headphones',
  'Food',
  'Books',
  'Clothes/Shoes',
  'Beauty/Health',
  'Sports',
  'Outdoor',
  'Home',
];

const UpdateProduct = () => {
  const { id } = useParams();
  const [imagesPreview, setImagesPreview] = useState([]);
  const [productData, setProductData] = useState({
    name: 'Test',
    description: 'test',
    price: '100',
    category: '',
    stock: '10',
    images: [],
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, product } = useSelector((state) => state.productDetails);
  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.product);

  useEffect(() => {
    if (product && product._id !== id) {
      dispatch(getProductDetails(id));
    } else {
      setProductData({
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        stock: product.stock,
        images: product.images,
      });
      setImagesPreview(product.images);
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      toast.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      navigate('/admin/products');
      toast.success('Product updated successfully');
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [dispatch, error, navigate, isUpdated, updateError, product, id]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    if (name === 'images') {
      // handle multiple image of any size
      const files = Array.from(e.target.files);
      const images = files.map((file) => {
        return URL.createObjectURL(file);
      });
      setImagesPreview(images);

      let imagesArray = [];

      files.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          imagesArray.push(e.target.result);
        };
        reader.readAsDataURL(file);
      });

      setProductData({ ...productData, images: imagesArray });
    } else {
      setProductData({ ...productData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProduct(product._id, productData));
  };

  return (
    <DashboardLayout>
      <MetaData title="Add new product" />
      <div className="flex flex-col">
        <button
          onClick={() => navigate(-1)}
          className="w-14 h-14 mb-6 rounded-full bg-gray-50 hover:bg-gray-100 focus:ring-inset focus:ring-2 flex items-center justify-center"
        >
          <BsChevronLeft className="h-6 w-6" />
        </button>
        <div className="mb-10">
          <h2 className="text-2xl font-medium tracking-wide text-gray-900">
            Update product data
          </h2>
          <p className="tracking-wide text-sm text-gray-700">#{id}</p>
        </div>
        <div
          className={`${
            loading && 'opacity-60 pointer-events-none animate-pulse'
          } w-full max-w-2xl`}
        >
          <div>
            <form
              onSubmit={handleSubmit}
              className="space-y-6 grid grid-cols-6 gap-x-3"
            >
              {/* name */}
              <div className="col-span-6">
                <label htmlFor="name" className="block ml-2">
                  Name
                </label>
                <div className="mt-1">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={productData.name}
                    onChange={handleOnChange}
                    placeholder="product name"
                    required
                    className="appearance-none bg-transparent block w-full px-5 text-base py-3 border border-gray-400 rounded-2xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
              {/* description */}
              <div className="col-span-6">
                <label htmlFor="description" className="block ml-2">
                  Description
                </label>
                <div className="mt-1">
                  <textarea
                    id="description"
                    name="description"
                    type="text"
                    value={productData.description}
                    onChange={handleOnChange}
                    placeholder="product description"
                    rows={5}
                    required
                    className="appearance-none bg-transparent block w-full px-5 text-base py-3 border border-gray-400 rounded-2xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
              {/* price */}
              <div className="sm:col-span-3 col-span-6">
                <label htmlFor="price" className="block ml-2">
                  Price
                </label>
                <div className="mt-1">
                  <input
                    id="price"
                    name="price"
                    type="number"
                    value={productData.price}
                    onChange={handleOnChange}
                    placeholder="$0.00"
                    required
                    className="appearance-none bg-transparent block w-full px-5 text-base py-3 border border-gray-400 rounded-2xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
              {/* stock */}
              <div className="sm:col-span-3 col-span-6">
                <label htmlFor="stock" className="block ml-2">
                  Stock
                </label>
                <div className="mt-1">
                  <input
                    id="stock"
                    name="stock"
                    type="number"
                    value={productData.stock}
                    onChange={handleOnChange}
                    placeholder="0"
                    required
                    className="appearance-none bg-transparent block w-full px-5 text-base py-3 border border-gray-400 rounded-2xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
              {/* category */}
              <div className="sm:col-span-3 col-span-6">
                <label htmlFor="category" className="block ml-2">
                  Category
                </label>
                <div className="mt-1">
                  <select
                    id="category"
                    name="category"
                    value={productData.category}
                    onChange={handleOnChange}
                    className="appearance-none cursor-pointer bg-transparent block w-full px-5 text-base py-3 border border-gray-400 rounded-2xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="">Select category</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              {/* images */}
              <div className="sm:col-span-3 col-span-6">
                <span className="mx-3 flex items-center justify-between">
                  Images
                </span>
                <label className="mt-1 cursor-pointer group py-2 w-full flex items-center justify-between rounded-2xl border border-gray-400 shadow-sm space-x-3 text-left hover:bg-gray-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                  <input
                    id="images"
                    name="images"
                    type="file"
                    multiple={true}
                    onChange={handleOnChange}
                    accept="image/*"
                    className="sr-only"
                  />
                  <span className="flex-shrink-0 h-full inline-flex items-center justify-center">
                    <div className="flex gap-1 items-center text-gray-500 group-hover:text-gray-700">
                      <BsPlus className="h-7 w-7" />
                      <span className="text-sm">Add images</span>
                    </div>
                  </span>
                </label>
              </div>

              {/* images preview */}
              <div className="col-span-6">
                <div className="border-2 flex border-gray-300 border-dashed rounded-2xl overflow-hidden">
                  <div className="flex-1 flex items-center gap-3 relative overflow-x-auto w-full h-24 px-2">
                    {/* images */}
                    {imagesPreview.map((image, index) => (
                      <div key={index} className="relative">
                        <div className="relative w-20 h-20 border rounded-2xl overflow-hidden">
                          <img
                            src={image.url || image}
                            alt={index}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="col-span-6">
                <button
                  disabled={
                    !productData.name ||
                    !productData.price ||
                    !productData.stock ||
                    !productData.category ||
                    !productData.description ||
                    !productData.images
                  }
                  type="submit"
                  className="w-full disabled:cursor-not-allowed flex justify-center py-3 px-4 border border-transparent rounded-2xl shadow-sm uppercase font-medium tracking-wider transition-all duration-300 text-white bg-blue-500 hover:bg-blue-600 hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {loading ? 'Please wait....' : 'Update'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UpdateProduct;
