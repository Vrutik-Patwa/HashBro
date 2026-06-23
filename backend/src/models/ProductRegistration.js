const mongoose = require("mongoose");

const productRegistrationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    productName: { type: String, required: true },
    purchaseDate: { type: Date, required: true },
    source: {
      type: String,
      required: true,
      enum: ["amazon", "flipkart", "hamleys", "zepto", "blinkit", "instamart", "hasbro-site", "other"],
    },
    orderNumber: { type: String, required: true },
    warrantyStatus: { type: String, enum: ["active", "expired", "claimed"], default: "active" },
    warrantyExpiry: Date,
    pointsAwarded: { type: Number, default: 100 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ProductRegistration", productRegistrationSchema);
