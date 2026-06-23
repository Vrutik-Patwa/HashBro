require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("../models/Product");
const connectDB = require("../config/db");

const products = [
  {
    name: "Jenga Tube Pack",
    slug: "jenga-tube-pack",
    shortDescription: "Hardwood blocks for the ultimate stacking challenge.",
    description: "Take the classic Jenga experience anywhere with this portable tube pack. Crafted from genuine hardwood blocks, this game delivers the same heart-pounding excitement as the original.",
    features: ["54 genuine hardwood blocks", "Portable tube packaging", "Classic stacking gameplay", "Ages 6 and up"],
    ageRating: "6+",
    category: "Board Games",
    categorySlug: "board-games",
    price: 899,
    image: "https://images.unsplash.com/photo-1611892440502-42a784e683d9?w=800&h=800&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1611892440502-42a784e683d9?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=800&h=800&fit=crop",
    ],
    specifications: { Material: "Hardwood", Players: "1 or more", Age: "6+", Pieces: "54 blocks" },
    marketplaces: [
      { name: "Amazon", url: "https://amzn.in/d/03Pi6NUA", color: "#FF9900" },
      { name: "Hamleys", url: "https://hamleys.in/product/hasbor-jenga-tube-pack-hardwood-blocks-zn-kzqbpgbx6", color: "#E31837" },
    ],
    featured: true,
    bestseller: true,
    stock: 50,
  },
  {
    name: "Monopoly Super Electronic Banking",
    slug: "monopoly-super-electronic-banking",
    shortDescription: "Cashless gameplay with tap technology for ages 8+.",
    description: "Experience Monopoly like never before with the Super Electronic Banking edition. Featuring a sleek electronic banking unit and tap technology for instant transactions.",
    features: ["Electronic banking unit", "Cashless gameplay", "Choose your rewards cards", "Ages 8 and up"],
    ageRating: "8+",
    category: "Board Games",
    categorySlug: "board-games",
    price: 2499,
    image: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=800&h=800&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=800&h=800&fit=crop",
    ],
    specifications: { Players: "2–6", Age: "8+", Batteries: "3 AAA (included)" },
    marketplaces: [
      { name: "Amazon", url: "https://amzn.in/d/07vumjpU", color: "#FF9900" },
      { name: "Hamleys", url: "https://hamleys.in/product/monopoly-super-electronic-banking-board-game-electronic-banking-unit-choose-your-rewards-cashless-gameplay-tap-technology-for-ages-8-and-up-ljf9n6pe-wbz", color: "#E31837" },
    ],
    featured: true,
    bestseller: true,
    stock: 30,
  },
  {
    name: "Transformers Optimus Prime",
    slug: "transformers-optimus-prime",
    shortDescription: "Convert from robot to truck in epic Transformers action.",
    description: "Lead the Autobots with this highly detailed Optimus Prime action figure with robot-to-truck conversion.",
    features: ["Robot to truck conversion", "Multiple articulation points", "Includes blaster accessory"],
    ageRating: "6+",
    category: "Action Figures",
    categorySlug: "action-figures",
    price: 3499,
    image: "https://images.unsplash.com/photo-1531525645387-7f14c7250704?w=800&h=800&fit=crop",
    images: ["https://images.unsplash.com/photo-1531525645387-7f14c7250704?w=800&h=800&fit=crop"],
    specifications: { Height: "8 inches", Age: "6+" },
    marketplaces: [
      { name: "Amazon", url: "https://amazon.in", color: "#FF9900" },
      { name: "Flipkart", url: "https://flipkart.com", color: "#2874F0" },
    ],
    featured: true,
    stock: 25,
  },
  {
    name: "Play-Doh Starter Set",
    slug: "play-doh-starter-set",
    shortDescription: "Creative fun with 8 colourful cans of Play-Doh.",
    description: "Spark creativity with the Play-Doh Starter Set including 8 vibrant colours and classic tools.",
    features: ["8 cans of Play-Doh", "Classic shaping tools", "Non-toxic formula"],
    ageRating: "2+",
    category: "Arts & Crafts",
    categorySlug: "arts-crafts",
    price: 599,
    image: "https://images.unsplash.com/photo-1513545884958-b0a2d4a6f6f0?w=800&h=800&fit=crop",
    images: ["https://images.unsplash.com/photo-1513545884958-b0a2d4a6f6f0?w=800&h=800&fit=crop"],
    specifications: { Age: "2+", Cans: "8" },
    marketplaces: [
      { name: "Amazon", url: "https://amazon.in", color: "#FF9900" },
      { name: "Zepto", url: "https://zeptonow.com", color: "#7B2D8E" },
    ],
    bestseller: true,
    stock: 80,
  },
  {
    name: "Nerf Elite 2.0 Commander",
    slug: "nerf-elite-commander",
    shortDescription: "High-performance blaster with 12-dart drum.",
    description: "Dominate the battlefield with the Nerf Elite 2.0 Commander featuring a rotating 12-dart drum.",
    features: ["12-dart rotating drum", "Slam-fire action", "Includes 12 Elite darts"],
    ageRating: "8+",
    category: "Outdoor Play",
    categorySlug: "outdoor-play",
    price: 1899,
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=800&fit=crop",
    images: ["https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=800&fit=crop"],
    specifications: { Range: "Up to 27 metres", Age: "8+" },
    marketplaces: [
      { name: "Amazon", url: "https://amazon.in", color: "#FF9900" },
      { name: "Blinkit", url: "https://blinkit.com", color: "#F8CB46" },
    ],
    stock: 40,
  },
  {
    name: "FurReal Walkalots Big Wags",
    slug: "furreal-walkalots",
    shortDescription: "Interactive plush puppy that walks and wags.",
    description: "Meet your new best friend! This FurReal puppy walks, wags its tail, and responds with 50+ sounds.",
    features: ["Walks on leash", "50+ sounds and reactions", "Soft plush body"],
    ageRating: "4+",
    category: "Dolls & Plush",
    categorySlug: "dolls-plush",
    price: 2999,
    image: "https://images.unsplash.com/photo-1558060370-5391063a0d4c?w=800&h=800&fit=crop",
    images: ["https://images.unsplash.com/photo-1558060370-5391063a0d4c?w=800&h=800&fit=crop"],
    specifications: { Age: "4+", Height: "9 inches" },
    marketplaces: [
      { name: "Hamleys", url: "https://hamleys.in", color: "#E31837" },
      { name: "Amazon", url: "https://amazon.in", color: "#FF9900" },
    ],
    stock: 20,
  },
];

async function seed() {
  await connectDB();
  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log(`Seeded ${products.length} products`);
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
