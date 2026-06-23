const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

router.get("/", async (req, res) => {
  const { category, ageGroup, minPrice, maxPrice, search, sort, featured } = req.query;
  const filter = {};

  if (category && category !== "all") filter.categorySlug = category;
  if (featured === "true") filter.featured = true;
  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }
  if (ageGroup && ageGroup !== "all") {
    const minAge = Number(ageGroup);
    filter.ageRating = { $regex: `^(${minAge}|${minAge}\\+|${minAge}-)` };
  }
  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: "i" } },
      { shortDescription: { $regex: search, $options: "i" } },
    ];
  }

  let query = Product.find(filter);
  switch (sort) {
    case "price-low":
      query = query.sort({ price: 1 });
      break;
    case "price-high":
      query = query.sort({ price: -1 });
      break;
    case "name":
      query = query.sort({ name: 1 });
      break;
    default:
      query = query.sort({ featured: -1, bestseller: -1, createdAt: -1 });
  }

  const products = await query.lean();
  res.json(products);
});

router.get("/:id", async (req, res) => {
  const bySlug = await Product.findOne({ slug: req.params.id }).lean();
  if (bySlug) return res.json(bySlug);

  const byId = await Product.findById(req.params.id).lean();
  if (!byId) return res.status(404).json({ message: "Product not found" });
  res.json(byId);
});

module.exports = router;
