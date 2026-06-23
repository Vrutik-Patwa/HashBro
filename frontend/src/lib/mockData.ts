import type { Product } from "@/types";

/** Local product & category images — always render, no external dependency */
export const images = {
  boardGames: "/products/jenga.svg",
  boardGamesWide: "/products/monopoly.svg",
  familyPlay: "/products/jenga.svg",
  toys: "/products/transformers.svg",
  outdoor: "/products/nerf.svg",
  crafts: "/products/playdoh.svg",
  plush: "/products/furreal.svg",
  cards: "/products/connect4.svg",
  preschool: "/products/playdoh.svg",
  jenga: "/products/jenga.svg",
  monopoly: "/products/monopoly.svg",
  transformers: "/products/transformers.svg",
  playdoh: "/products/playdoh.svg",
  nerf: "/products/nerf.svg",
  furreal: "/products/furreal.svg",
  connect4: "/products/connect4.svg",
  pony: "/products/pony.svg",
};
export const brand = {
  primary: "#005EB8",
  primaryDark: "#003C69",
  aqua: "#0098DB",
  orange: "#ED8B00",
  lime: "#97D700",
  plum: "#AF1685",
  charcoal: "#1A1A1A",
  white: "#FFFFFF",
};

export const company = {
  name: "Hasbro India",
  legalName: "Hasbro India Toys Private Limited",
  tagline: "Inspiring a Lifetime of Play",
  mission:
    "Create joy and community through play — bringing iconic Hasbro brands to families across India with authentic products, warranty support, and rewarding experiences.",
  founded: 1923,
  indiaEstablished: 2019,
  headquarters: "Pawtucket, Rhode Island, USA",
  indiaOffice: {
    address: "#1302, Tower-3, One International Center, Senapati Bapat Marg, Elphinstone Road (West)",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400013",
    country: "India",
  },
  contact: {
    email: "support@hasbro.in",
    phone: "1800-123-4567",
    hours: "Mon–Sat: 9:00 AM – 6:00 PM IST",
  },
  stats: [
    { value: "100+", label: "Years of Innovation" },
    { value: "6,500+", label: "Employees Worldwide" },
    { value: "35+", label: "Countries Served" },
    { value: "1M+", label: "Happy Families in India" },
  ],
  brands: [
    "Monopoly", "Transformers", "Nerf", "Play-Doh", "Magic: The Gathering",
    "My Little Pony", "Peppa Pig", "FurReal", "Beyblade", "Star Wars",
    "Marvel", "Jenga", "Connect 4", "Battleship",
  ],
  timeline: [
    { year: "1923", title: "Hassenfeld Brothers Founded", description: "Three Hassenfeld brothers begin selling textile remnants and school supplies in Providence, Rhode Island." },
    { year: "1952", title: "Mr. Potato Head Debuts", description: "The first toy advertised on television — revolutionizing the industry and launching Hasbro's toy legacy." },
    { year: "1984", title: "Transformers & GI Joe", description: "Hasbro acquires iconic action figure franchises that become global phenomena." },
    { year: "1991", title: "Monopoly & Parker Brothers", description: "Acquisition expands the world's largest board game portfolio." },
    { year: "2019", title: "Hasbro India Toys Pvt. Ltd.", description: "Official subsidiary established in Mumbai to serve the Indian market with authentic Hasbro products." },
    { year: "2024", title: "Hasbro India Platform", description: "Launch of the official India e-commerce showcase with direct purchasing, warranty, and rewards." },
  ],
  values: [
    { title: "Safety First", description: "Every product meets international safety standards including ASTM, EN71, and BIS certifications." },
    { title: "Family Focused", description: "We design experiences that bring families together through play, laughter, and shared memories." },
    { title: "Innovation", description: "From electronic banking Monopoly to interactive FurReal pets — pushing the boundaries of play." },
    { title: "Community", description: "Building a community of Hasbro fans in India through events, rewards, and dedicated support." },
  ],
};

export const categories = [
  {
    id: "1",
    name: "Board Games",
    slug: "board-games",
    description: "Monopoly, Jenga, Connect 4, Battleship — timeless family favourites.",
    image: images.boardGamesWide,
    icon: "🎲",
    productCount: 28,
    brands: ["Monopoly", "Jenga", "Connect 4", "Battleship"],
  },
  {
    id: "2",
    name: "Action Figures",
    slug: "action-figures",
    description: "Transformers, Marvel, Star Wars, Power Rangers collectibles.",
    image: images.toys,
    icon: "🦸",
    productCount: 22,
    brands: ["Transformers", "Marvel", "Star Wars"],
  },
  {
    id: "3",
    name: "Preschool",
    slug: "preschool",
    description: "Playskool, Peppa Pig, and safe toys for ages 2–5.",
    image: images.preschool,
    icon: "🧸",
    productCount: 35,
    brands: ["Playskool", "Peppa Pig", "Play-Doh"],
  },
  {
    id: "4",
    name: "Outdoor Play",
    slug: "outdoor-play",
    description: "Nerf blasters, sports sets, and active outdoor fun.",
    image: images.outdoor,
    icon: "⚽",
    productCount: 18,
    brands: ["Nerf", "Beyblade"],
  },
  {
    id: "5",
    name: "Arts & Crafts",
    slug: "arts-crafts",
    description: "Play-Doh, creative kits, and imaginative craft sets.",
    image: images.crafts,
    icon: "🎨",
    productCount: 24,
    brands: ["Play-Doh"],
  },
  {
    id: "6",
    name: "Dolls & Plush",
    slug: "dolls-plush",
    description: "FurReal, Baby Alive, My Little Pony companions.",
    image: images.plush,
    icon: "🪆",
    productCount: 26,
    brands: ["FurReal", "Baby Alive", "My Little Pony"],
  },
  {
    id: "7",
    name: "Trading Cards",
    slug: "trading-cards",
    description: "Magic: The Gathering and collectible card games.",
    image: images.cards,
    icon: "🃏",
    productCount: 15,
    brands: ["Magic: The Gathering", "Dungeons & Dragons"],
  },
];

export const mockProducts: Product[] = [
  {
    _id: "mock-1",
    name: "Jenga Tube Pack",
    slug: "jenga-tube-pack",
    shortDescription: "Classic hardwood stacking game in a portable tube.",
    description:
      "Pull out a block without crashing the stack! This genuine hardwood Jenga Tube Pack delivers the same heart-pounding excitement as the original. Perfect for parties, family game nights, and travel.",
    features: ["54 genuine hardwood blocks", "Portable tube packaging", "Classic stacking gameplay", "Ages 6 and up", "1 or more players"],
    ageRating: "6+",
    category: "Board Games",
    categorySlug: "board-games",
    price: 899,
    image: images.jenga,
    images: [images.jenga, images.monopoly],
    specifications: { Material: "Hardwood", Players: "1 or more", Age: "6+", Pieces: "54 blocks" },
    marketplaces: [
      { name: "Amazon", url: "https://amzn.in/d/03Pi6NUA", color: "#FF9900" },
      { name: "Hamleys", url: "https://hamleys.in/product/hasbor-jenga-tube-pack-hardwood-blocks-zn-kzqbpgbx6", color: "#E31837" },
    ],
    stock: 50,
    featured: true,
    bestseller: true,
  },
  {
    _id: "mock-2",
    name: "Monopoly Super Electronic Banking",
    slug: "monopoly-super-electronic-banking",
    shortDescription: "Cashless Monopoly with tap technology — Ages 8+.",
    description:
      "Experience Monopoly like never before with the Super Electronic Banking edition. Features a sleek electronic banking unit, tap technology for instant transactions, and reward cards for modern cashless gameplay.",
    features: ["Electronic banking unit with tap technology", "Cashless gameplay", "Choose your rewards cards", "Updated property values", "2–6 players"],
    ageRating: "8+",
    category: "Board Games",
    categorySlug: "board-games",
    price: 2499,
    image: images.monopoly,
    images: [images.monopoly],
    specifications: { Players: "2–6", Age: "8+", Batteries: "3 AAA (included)", "Play Time": "60–90 min" },
    marketplaces: [
      { name: "Amazon", url: "https://amzn.in/d/07vumjpU", color: "#FF9900" },
      { name: "Hamleys", url: "https://hamleys.in/product/monopoly-super-electronic-banking-board-game-electronic-banking-unit-choose-your-rewards-cashless-gameplay-tap-technology-for-ages-8-and-up-ljf9n6pe-wbz", color: "#E31837" },
    ],
    stock: 30,
    featured: true,
    bestseller: true,
  },
  {
    _id: "mock-3",
    name: "Transformers Optimus Prime",
    slug: "transformers-optimus-prime",
    shortDescription: "Leader of the Autobots — robot to truck conversion.",
    description:
      "Lead the Autobots with this highly detailed Optimus Prime action figure. Features multiple articulation points and seamless robot-to-truck conversion — bringing the Transformers universe to life.",
    features: ["Robot to truck conversion", "18 conversion steps", "Multiple articulation points", "Includes blaster accessory", "Premium paint detailing"],
    ageRating: "6+",
    category: "Action Figures",
    categorySlug: "action-figures",
    price: 3499,
    image: images.transformers,
    images: [images.transformers],
    specifications: { Height: "8 inches", Age: "6+", Brand: "Transformers" },
    marketplaces: [
      { name: "Amazon", url: "https://amazon.in", color: "#FF9900" },
      { name: "Flipkart", url: "https://flipkart.com", color: "#2874F0" },
    ],
    stock: 25,
    featured: true,
  },
  {
    _id: "mock-4",
    name: "Play-Doh Starter Set",
    slug: "play-doh-starter-set",
    shortDescription: "8 colourful cans of non-toxic Play-Doh compound.",
    description:
      "Spark creativity with the Play-Doh Starter Set. Includes 8 vibrant colours and classic shaping tools for endless sculpting, squishing, and imaginative play.",
    features: ["8 cans of Play-Doh compound", "Classic shaping tools", "Non-toxic formula", "Reusable storage", "Ages 2 and up"],
    ageRating: "2+",
    category: "Arts & Crafts",
    categorySlug: "arts-crafts",
    price: 599,
    image: images.playdoh,
    images: [images.playdoh],
    specifications: { Age: "2+", Cans: "8", Weight: "56g each" },
    marketplaces: [
      { name: "Amazon", url: "https://amazon.in", color: "#FF9900" },
      { name: "Zepto", url: "https://zeptonow.com", color: "#7B2D8E" },
    ],
    stock: 80,
    bestseller: true,
  },
  {
    _id: "mock-5",
    name: "Nerf Elite 2.0 Commander",
    slug: "nerf-elite-commander",
    shortDescription: "12-dart drum blaster with slam-fire action.",
    description:
      "Dominate the battlefield with the Nerf Elite 2.0 Commander. Features a rotating 12-dart drum, slam-fire action, and tactical rails for customisation.",
    features: ["12-dart rotating drum", "Slam-fire action", "Tactical rails", "Includes 12 Elite darts", "Range up to 27 metres"],
    ageRating: "8+",
    category: "Outdoor Play",
    categorySlug: "outdoor-play",
    price: 1899,
    image: images.nerf,
    images: [images.nerf],
    specifications: { Range: "Up to 27m", Age: "8+", "Dart Capacity": "12" },
    marketplaces: [
      { name: "Amazon", url: "https://amazon.in", color: "#FF9900" },
      { name: "Blinkit", url: "https://blinkit.com", color: "#F8CB46" },
    ],
    stock: 40,
  },
  {
    _id: "mock-6",
    name: "FurReal Walkalots Big Wags",
    slug: "furreal-walkalots",
    shortDescription: "Interactive plush puppy with 50+ sounds.",
    description:
      "Meet your new best friend! This FurReal puppy walks on a leash, wags its tail, and responds to touch with over 50 sounds and reactions.",
    features: ["Walks on leash", "50+ sounds and reactions", "Soft plush body", "Includes leash accessory", "Ages 4 and up"],
    ageRating: "4+",
    category: "Dolls & Plush",
    categorySlug: "dolls-plush",
    price: 2999,
    image: images.furreal,
    images: [images.furreal],
    specifications: { Age: "4+", Batteries: "3 AA (included)", Height: "9 inches" },
    marketplaces: [
      { name: "Hamleys", url: "https://hamleys.in", color: "#E31837" },
      { name: "Amazon", url: "https://amazon.in", color: "#FF9900" },
    ],
    stock: 20,
  },
  {
    _id: "mock-7",
    name: "Connect 4 Classic Grid",
    slug: "connect-4-classic",
    shortDescription: "Drop in and win — the classic 4-in-a-row strategy game.",
    description:
      "Challenge a friend to Connect 4 — the classic game of strategy. Drop your discs into the grid and be the first to get four in a row to win!",
    features: ["Classic 4-in-a-row gameplay", "Two-player strategy", "Includes grid and 42 discs", "Easy to learn", "Ages 6 and up"],
    ageRating: "6+",
    category: "Board Games",
    categorySlug: "board-games",
    price: 799,
    image: images.connect4,
    images: [images.connect4],
    specifications: { Players: "2", Age: "6+", Discs: "42" },
    marketplaces: [
      { name: "Amazon", url: "https://amazon.in", color: "#FF9900" },
      { name: "Flipkart", url: "https://flipkart.com", color: "#2874F0" },
    ],
    stock: 45,
    featured: true,
  },
  {
    _id: "mock-8",
    name: "My Little Pony Sunny Starscout",
    slug: "my-little-pony-sunny",
    shortDescription: "Interactive pony from Maretime Bay with lights and sounds.",
    description:
      "Sunny Starscout brings magic to Maretime Bay! This interactive My Little Pony figure features lights, sounds, and a brushable mane for imaginative play.",
    features: ["Lights and sounds", "Brushable mane and tail", "Articulated legs", "Inspired by My Little Pony: A New Generation", "Ages 3 and up"],
    ageRating: "3+",
    category: "Dolls & Plush",
    categorySlug: "dolls-plush",
    price: 1499,
    image: images.pony,
    images: [images.pony],
    specifications: { Age: "3+", Height: "6 inches", Batteries: "2 AAA (included)" },
    marketplaces: [
      { name: "Amazon", url: "https://amazon.in", color: "#FF9900" },
      { name: "Hamleys", url: "https://hamleys.in", color: "#E31837" },
    ],
    stock: 35,
  },
];

export const marketplaces = [
  { name: "Amazon", logo: "Amazon", color: "#FF9900" },
  { name: "Flipkart", logo: "Flipkart", color: "#2874F0" },
  { name: "Hamleys", logo: "Hamleys", color: "#E31837" },
  { name: "Zepto", logo: "Zepto", color: "#7B2D8E" },
  { name: "Blinkit", logo: "Blinkit", color: "#F8CB46" },
  { name: "Instamart", logo: "Instamart", color: "#FC8019" },
];

export const faqs = [
  { question: "Is Hasbro India an official Hasbro website?", answer: "Yes. Hasbro India Toys Private Limited is the official subsidiary of Hasbro, Inc. in India, established in 2019 and headquartered in Mumbai." },
  { question: "How do I register my Hasbro product for warranty?", answer: "Visit My Products, sign in, and complete the registration form with your product details, purchase date, marketplace, and invoice number. Warranty coverage activates immediately." },
  { question: "Can I buy directly on this website?", answer: "Yes! Use Add to Cart or Buy Now for direct checkout. You can also purchase from authorized marketplaces — Amazon, Flipkart, Hamleys, Zepto, Blinkit, and Instamart — listed on each product page." },
  { question: "How does the Hasbro rewards program work?", answer: "Earn 10 points for every ₹100 spent on-site, plus 100 bonus points when you register a product. Redeem points for discounts, exclusive merchandise, and VIP event access." },
  { question: "What payment methods are accepted?", answer: "We support Razorpay for UPI, credit/debit cards, and net banking — covering all major Indian payment methods." },
  { question: "Are Hasbro products safe for children?", answer: "Absolutely. All Hasbro products meet international safety standards including ASTM, EN71, and BIS certifications before reaching Indian families." },
];

export const testimonials = [
  { id: "1", name: "Priya Sharma", location: "Mumbai", rating: 5, text: "Bought Monopoly Super Electronic Banking directly from Hasbro India. Authentic product, fast delivery, and I earned reward points instantly!", avatar: "PS", product: "Monopoly Super Electronic Banking" },
  { id: "2", name: "Rahul Mehta", location: "Delhi", rating: 5, text: "The Jenga Tube Pack is genuine Hasbro quality. Buy Now checkout was seamless — delivered in 4 days.", avatar: "RM", product: "Jenga Tube Pack" },
  { id: "3", name: "Ananya Patel", location: "Bangalore", rating: 5, text: "Registered our Transformers figure for warranty in minutes. Love having both on-site purchase and Amazon links.", avatar: "AP", product: "Transformers Optimus Prime" },
  { id: "4", name: "Vikram Singh", location: "Pune", rating: 4, text: "My kids love the Nerf blaster. Great to know we're buying authentic Hasbro from the official India platform.", avatar: "VS", product: "Nerf Elite 2.0 Commander" },
  { id: "5", name: "Sneha Reddy", location: "Hyderabad", rating: 5, text: "Play-Doh Starter Set arrived perfectly packed. Product registration was easy and we got 100 bonus reward points.", avatar: "SR", product: "Play-Doh Starter Set" },
];

export function filterMockProducts(params?: Record<string, string>): Product[] {
  let result = [...mockProducts];

  if (params?.category && params.category !== "all") {
    result = result.filter((p) => p.categorySlug === params.category);
  }
  if (params?.featured === "true") {
    result = result.filter((p) => p.featured);
  }
  if (params?.search) {
    const q = params.search.toLowerCase();
    result = result.filter(
      (p) => p.name.toLowerCase().includes(q) || p.shortDescription.toLowerCase().includes(q)
    );
  }
  if (params?.ageGroup && params.ageGroup !== "all") {
    const minAge = parseInt(params.ageGroup);
    result = result.filter((p) => {
      const age = parseInt(p.ageRating);
      return age >= minAge && age < minAge + 3;
    });
  }

  switch (params?.sort) {
    case "price-low":
      result.sort((a, b) => a.price - b.price);
      break;
    case "price-high":
      result.sort((a, b) => b.price - a.price);
      break;
    case "name":
      result.sort((a, b) => a.name.localeCompare(b.name));
      break;
    default:
      result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  }

  return normalizeProducts(result);
}

export function getMockProduct(slug: string): Product | undefined {
  return mockProducts.find((p) => p.slug === slug || p._id === slug);
}

const slugToImage: Record<string, string> = {
  "jenga-tube-pack": images.jenga,
  "monopoly-super-electronic-banking": images.monopoly,
  "transformers-optimus-prime": images.transformers,
  "play-doh-starter-set": images.playdoh,
  "nerf-elite-commander": images.nerf,
  "furreal-walkalots": images.furreal,
  "connect-4-classic": images.connect4,
  "my-little-pony-sunny": images.pony,
};

export function getLocalProductImage(slug: string): string | undefined {
  return slugToImage[slug];
}

/** Always use local images — overrides broken external URLs from API */
export function normalizeProduct(product: Product): Product {
  const local = slugToImage[product.slug];
  if (!local) return product;
  return { ...product, image: local, images: [local, ...(product.images?.length ? product.images.slice(1) : [])] };
}

export function normalizeProducts(products: Product[]): Product[] {
  return products.map(normalizeProduct);
}
