const express = require("express");
const { body, validationResult } = require("express-validator");
const Order = require("../models/Order");
const Product = require("../models/Product");
const User = require("../models/User");
const { auth, optionalAuth } = require("../middleware/auth");

const router = express.Router();

const generateOrderId = () =>
  `HBR-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;

router.post(
  "/",
  optionalAuth,
  [
    body("items").isArray({ min: 1 }),
    body("items.*.productId").notEmpty(),
    body("items.*.quantity").isInt({ min: 1 }),
    body("shipping.name").notEmpty(),
    body("shipping.email").isEmail(),
    body("shipping.phone").notEmpty(),
    body("shipping.address").notEmpty(),
    body("shipping.city").notEmpty(),
    body("shipping.state").notEmpty(),
    body("shipping.pincode").notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { items, shipping, paymentMethod = "razorpay" } = req.body;
    const orderItems = [];
    let subtotal = 0;

    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({ message: `Product ${item.productId} not found` });
      }
      if (product.stock < item.quantity) {
        return res.status(400).json({ message: `${product.name} has insufficient stock` });
      }
      orderItems.push({
        product: product._id,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
        image: product.image,
      });
      subtotal += product.price * item.quantity;
      product.stock -= item.quantity;
      await product.save();
    }

    const pointsEarned = Math.floor(subtotal / 100) * 10;
    const estimatedDelivery = new Date();
    estimatedDelivery.setDate(estimatedDelivery.getDate() + 5);

    const order = await Order.create({
      user: req.user?._id,
      orderId: generateOrderId(),
      items: orderItems,
      shipping,
      subtotal,
      total: subtotal,
      paymentMethod,
      paymentStatus: "paid",
      status: "confirmed",
      estimatedDelivery,
      pointsEarned,
    });

    if (req.user) {
      await User.findByIdAndUpdate(req.user._id, {
        $inc: { rewardPoints: pointsEarned },
        cart: [],
      });
    }

    res.status(201).json({
      message: "Order placed successfully",
      order: {
        id: order._id,
        orderId: order.orderId,
        total: order.total,
        status: order.status,
        estimatedDelivery: order.estimatedDelivery,
        pointsEarned: order.pointsEarned,
        items: order.items,
      },
    });
  }
);

router.get("/", auth, async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
    .sort({ createdAt: -1 })
    .populate("items.product")
    .lean();
  res.json(orders);
});

router.get("/:orderId", optionalAuth, async (req, res) => {
  const order = await Order.findOne({ orderId: req.params.orderId })
    .populate("items.product")
    .lean();
  if (!order) return res.status(404).json({ message: "Order not found" });
  res.json(order);
});

module.exports = router;
