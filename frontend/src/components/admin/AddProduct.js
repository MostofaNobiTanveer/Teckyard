import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { BsPlus, BsX } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import MetaData from '../layout/MetaData';
import DashboardLayout from './DashboardLayout';
import { addNewProduct, clearErrors } from '../../actions/productActions';
import { useNavigate } from 'react-router-dom';
import { NEW_PRODUCT_RESET } from '../../constants/productConstants';

const categories = ['Keyboard', 'Mouse', 'Mousepad', 'Headphones'];

const AddProduct = () => {
  const [imagesPreview, setImagesPreview] = useState([]);
  const [product, setProduct] = useState({
    name: 'Test',
    description: 'test',
    price: '100',
    category: '',
    stock: '10',
    images: [],
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.newProduct);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      toast.success('Product added successfully');
      dispatch(clearErrors());
      navigate('/admin/products');
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, error, success, navigate]);

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

      setProduct({ ...product, images: imagesArray });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(product);
    dispatch(addNewProduct(product));
  };

  return (
    <DashboardLayout>
      <MetaData title="Add new product" />
      <div className="flex flex-col space-y-6">
        <h2 className="text-2xl font-medium tracking-wide text-gray-900">
          Add product
        </h2>
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
                    value={product.name}
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
                    value={product.description}
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
                    value={product.price}
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
                    value={product.stock}
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
                    value={product.category}
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
                  <div className="flex-1 flex items-center gap-4 relative overflow-x-auto w-full h-24 px-2">
                    {/* images */}
                    {imagesPreview.map((image, index) => (
                      <div key={index} className="relative">
                        <div className="relative w-20 h-20 border rounded-2xl overflow-hidden">
                          <img
                            src={image}
                            alt={index}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* delete image */}
                        <button
                          type="button"
                          className="absolute -top-2 -right-2 cursor-pointer flex items-center justify-center"
                          onClick={() => {
                            const newImagesPreview = imagesPreview.filter(
                              (img, i) => i !== index
                            );
                            setImagesPreview(newImagesPreview);
                            setProduct({
                              ...product,
                              images: newImagesPreview,
                            });
                          }}
                        >
                          <BsX className="h-5 w-5 text-red-500 border bg-white rounded-full p-1 box-content" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="col-span-6">
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-2xl shadow-sm uppercase font-medium tracking-wider transition-all duration-300 text-white bg-blue-500 hover:bg-blue-600 hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {loading ? 'Please wait....' : 'Add product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AddProduct;
