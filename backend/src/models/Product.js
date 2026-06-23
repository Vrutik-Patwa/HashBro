const mongoose = require("mongoose");

const marketplaceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    url: { type: String, required: true },
    color: { type: String, default: "#FF9900" },
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    shortDescription: { type: String, required: true },
    description: { type: String, required: true },
    features: [{ type: String }],
    ageRating: { type: String, required: true },
    category: { type: String, required: true },
    categorySlug: { type: String, required: true, index: true },
    price: { type: Number, required: true, min: 0 },
    image: { type: String, required: true },
    images: [{ type: String }],
    specifications: { type: Map, of: String },
    marketplaces: [marketplaceSchema],
    stock: { type: Number, default: 100, min: 0 },
    featured: { type: Boolean, default: false },
    bestseller: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
