const express = require("express");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const Product = require("../models/Product");
const { auth } = require("../middleware/auth");

const router = express.Router();

router.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user._id).populate("cart.product");
  res.json(user.cart);
});

router.post(
  "/",
  auth,
  [
    body("items").isArray({ min: 0 }),
    body("items.*.productId").notEmpty(),
    body("items.*.quantity").isInt({ min: 1 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { items } = req.body;
    const cart = [];

    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) continue;
      cart.push({ product: product._id, quantity: item.quantity });
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { cart },
      { new: true }
    ).populate("cart.product");

    res.json(user.cart);
  }
);

router.delete("/", auth, async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, { cart: [] });
  res.json({ message: "Cart cleared" });
});

module.exports = router;
