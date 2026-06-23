const express = require("express");
const User = require("../models/User");
const Order = require("../models/Order");
const ProductRegistration = require("../models/ProductRegistration");
const { auth } = require("../middleware/auth");

const router = express.Router();

router.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("rewardPoints name email");
  const orders = await Order.find({ user: req.user._id }).select("orderId total pointsEarned createdAt").sort({ createdAt: -1 }).limit(10);
  const registrations = await ProductRegistration.find({ user: req.user._id }).select("productName pointsAwarded createdAt source");

  const history = [
    ...orders.map((o) => ({
      type: "order",
      description: `Order ${o.orderId}`,
      points: o.pointsEarned,
      date: o.createdAt,
    })),
    ...registrations.map((r) => ({
      type: "registration",
      description: `Registered ${r.productName}`,
      points: r.pointsAwarded,
      date: r.createdAt,
    })),
  ].sort((a, b) => new Date(b.date) - new Date(a.date));

  res.json({
    balance: user.rewardPoints,
    history,
    redemptionOptions: [
      { title: "₹500 Off Next Purchase", points: 500 },
      { title: "Exclusive Hasbro Merch", points: 1000 },
      { title: "Free Board Game", points: 2000 },
      { title: "VIP Event Access", points: 5000 },
    ],
  });
});

module.exports = router;
