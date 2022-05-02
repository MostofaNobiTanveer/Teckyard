import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { loadUser } from './actions/userActions';
import {
  Shipping,
  ForgotPassword,
  Home,
  Login,
  MyOrders,
  NewPassword,
  ProductDetails,
  Profile,
  ProtectedRoute,
  Register,
  UpdatePassword,
  ConfirmOrder,
  Payment,
  OrderDetails,
  Dashboard,
  ProductsList,
  AddProduct,
  UpdateProduct,
  OrdersList,
  UpdateOrder,
  UsersList,
  UpdateUser,
  ProductReviews,
} from './components';
import store from './store';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

function App() {
  const [stripeApiKey, setStripeApiKey] = useState('');

  useEffect(() => {
    store.dispatch(loadUser());

    async function fetchStripeApiKey() {
      const { data } = await axios.get('/api/v1/stripe/key');
      setStripeApiKey(data.stripeApiKey);
    }

    fetchStripeApiKey();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path=":keyword" element={<Home />} />
      <Route path="/product/:id" element={<ProductDetails />} />

      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<NewPassword />} />

      <Route
        path="/shipping"
        element={
          <ProtectedRoute>
            <Shipping />
          </ProtectedRoute>
        }
      />
      <Route
        path="/confirm-order"
        element={
          <ProtectedRoute>
            <ConfirmOrder />
          </ProtectedRoute>
        }
      />
      <Route
        path="/order/:id"
        element={
          <ProtectedRoute>
            <OrderDetails />
          </ProtectedRoute>
        }
      />
      {stripeApiKey && (
        <Route
          path="/checkout/payment"
          element={
            <Elements stripe={loadStripe(stripeApiKey)}>
              <ProtectedRoute>
                <Payment />
              </ProtectedRoute>
            </Elements>
          }
        />
      )}
      <Route
        path="/profile/settings"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile/my-orders"
        element={
          <ProtectedRoute>
            <MyOrders />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile/password/update"
        element={
          <ProtectedRoute>
            <UpdatePassword />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute isAdmin={true}>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/products"
        element={
          <ProtectedRoute isAdmin={true}>
            <ProductsList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/product/add"
        element={
          <ProtectedRoute isAdmin={true}>
            <AddProduct />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/product/update/:id"
        element={
          <ProtectedRoute isAdmin={true}>
            <UpdateProduct />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/orders"
        element={
          <ProtectedRoute isAdmin={true}>
            <OrdersList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/order/update/:id"
        element={
          <ProtectedRoute isAdmin={true}>
            <UpdateOrder />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/users"
        element={
          <ProtectedRoute isAdmin={true}>
            <UsersList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/user/update/:id"
        element={
          <ProtectedRoute isAdmin={true}>
            <UpdateUser />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/reviews"
        element={
          <ProtectedRoute isAdmin={true}>
            <ProductReviews />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
