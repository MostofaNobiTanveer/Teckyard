const express = require('express');
const router = express.Router();

const {
  getProducts,
  createProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  getAdminProducts,
  createReview,
  getReviews,
  deleteReview,
} = require('../controllers/productController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/products').get(getProducts);
router.route('/product/:id').get(getSingleProduct);

router
  .route('/admin/products')
  .get(isAuthenticatedUser, authorizeRoles('admin'), getAdminProducts);
router
  .route('/admin/product/new')
  .post(isAuthenticatedUser, authorizeRoles('admin'), createProduct);
router
  .route('/admin/product/:id')
  .put(isAuthenticatedUser, authorizeRoles('admin'), updateProduct)
  .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteProduct);

router.route('/review').put(isAuthenticatedUser, createReview);
router
  .route('/admin/reviews')
  .get(isAuthenticatedUser, authorizeRoles('admin'), getReviews);
router
  .route('/admin/reviews')
  .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteReview);

module.exports = router;
