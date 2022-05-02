import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearErrors,
  deleteProduct,
  getAdminProducts,
} from '../../actions/productActions';
import MetaData from '../layout/MetaData';
import DashboardLayout from './DashboardLayout';
import ProductsListSkeleton from './ProductsListSkeleton';
import { Link, useNavigate } from 'react-router-dom';
import { DELETE_PRODUCT_RESET } from '../../constants/productConstants';

const ProductsList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    dispatch(getAdminProducts());

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success('Product deleted successfully');
      navigate('/admin/products');
      dispatch({ type: DELETE_PRODUCT_RESET });
    }
  }, [dispatch, error, deleteError, isDeleted, navigate]);

  const handleDeleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      dispatch(deleteProduct(id));
    } else {
      return;
    }
  };

  return (
    <DashboardLayout>
      <MetaData title="All Products" />
      <div className="flex flex-col space-y-3">
        <h2 className="text-2xl font-medium tracking-wide text-gray-900">
          All Products
        </h2>
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="border overflow-hidden rounded-3xl">
              {loading ? (
                <ProductsListSkeleton />
              ) : (
                <table className="min-w-full divide-y">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left max-w-sm text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Price
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Stock
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
                    {products.map((product) => (
                      <tr key={product._id}>
                        <td
                          title={product.name}
                          className="px-6 py-4 max-w-sm overflow-x-"
                        >
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-12 w-12">
                              <img
                                className="h-full w-full rounded-md object-contain"
                                src={product.images && product.images[0].url}
                                alt={product.name}
                              />
                            </div>
                            <div className="ml-4 w-full truncate">
                              <Link
                                to={`/admin/product/update/${product._id}`}
                                className="text-sm hover:underline font-medium text-gray-900 truncate"
                              >
                                {product.name}
                              </Link>
                              <div className="text-xs text-gray-500">
                                #{product._id}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            ${product.price}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {product.stock}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button
                            onClick={() =>
                              navigate(`/admin/product/update/${product._id}`)
                            }
                            className="text-indigo-600 hover:underline"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product._id)}
                            className="text-red-500 hover:underline ml-3"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProductsList;
