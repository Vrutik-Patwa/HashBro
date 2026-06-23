const express = require("express");
const { body, validationResult } = require("express-validator");
const ProductRegistration = require("../models/ProductRegistration");
const User = require("../models/User");
const { auth } = require("../middleware/auth");

const router = express.Router();

router.post(
  "/",
  auth,
  [
    body("productName").notEmpty(),
    body("purchaseDate").isISO8601(),
    body("source").notEmpty(),
    body("orderNumber").notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { productId, productName, purchaseDate, source, orderNumber } = req.body;
    const purchase = new Date(purchaseDate);
    const warrantyExpiry = new Date(purchase);
    warrantyExpiry.setFullYear(warrantyExpiry.getFullYear() + 1);

    const registration = await ProductRegistration.create({
      user: req.user._id,
      product: productId || undefined,
      productName,
      purchaseDate: purchase,
      source,
      orderNumber,
      warrantyExpiry,
      pointsAwarded: 100,
    });

    await User.findByIdAndUpdate(req.user._id, { $inc: { rewardPoints: 100 } });

    res.status(201).json({
      message: "Product registered successfully",
      registration,
      pointsAwarded: 100,
    });
  }
);

router.get("/", auth, async (req, res) => {
  const registrations = await ProductRegistration.find({ user: req.user._id })
    .sort({ createdAt: -1 })
    .populate("product")
    .lean();
  res.json(registrations);
});

module.exports = router;
