const Order = require('../models/order');
const Product = require('../models/product');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

// Create order   =>   POST /api/v1/order/new
exports.createOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    orderItems,
    shippingInfo,
    itemsPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
  } = req.body;

  const newOrder = await Order.create({
    paymentInfo,
    shippingInfo,
    orderItems,
    itemsPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    order: newOrder,
  });
});

// Get single order   =>   GET /api/v1/order/:id
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );

  if (!order) {
    return next(new ErrorHandler('Order not found', 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

// Get logged in user orders   =>   GET /api/v1/orders/me
exports.getMyOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ user: req.user.id });

  res.status(200).json({
    success: true,
    orders,
  });
});

// Get all orders - ADMIN   =>   GET /api/v1/admin/orders
exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount = 0;
  orders.forEach((order) => {
    (totalAmount += order.totalPrice).toFixed(2);
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});

// Update order - ADMIN   =>   PUT /api/v1/admin/order/:id
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (order.status === 'delivered') {
    return next(new ErrorHandler('Order already delivered', 400));
  }

  order.orderItems.forEach(async (orderItem) => {
    await updateStock(orderItem.product, orderItem.quantity);
  });

  order.orderStatus = req.body.status;
  order.deliveredAt = Date.now();

  await order.save();

  res.status(200).json({
    success: true,
  });
});

async function updateStock(productId, quantity) {
  const product = await Product.findById(productId);
  product.stock = product.stock - quantity;
  await product.save({ validateBeforeSave: false });
}

// Delete order - ADMIN   =>   DELETE /api/v1/admin/order/:id
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler('Order not found', 404));
  }

  await order.remove();

  res.status(200).json({
    success: true,
  });
});
