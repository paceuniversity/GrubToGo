// Simple seed data for five stores shown on the Menu page
// Each store can later be extended with real images and metadata
import header_img from "./header_img.png";
import react_icon from "./react.svg";

export const stores = [
  {
    id: 1,
    name: "Pasta Palace",
    cuisine: "Italian",
    rating: 4.6,
    etaMins: 25,
    image: header_img,
    description: "Fresh pasta, classic sauces, and oven-baked lasagna.",
    priceRange: "$$",
  },
  {
    id: 2,
    name: "Sizzling Wok",
    cuisine: "Asian Fusion",
    rating: 4.5,
    etaMins: 20,
    image: react_icon,
    description: "Stir-fries, noodles, and bold flavors made to order.",
    priceRange: "$-$$",
  },
  {
    id: 3,
    name: "Burger Barn",
    cuisine: "American",
    rating: 4.4,
    etaMins: 18,
    image: header_img,
    description: "Smash burgers, loaded fries, and hand-spun shakes.",
    priceRange: "$",
  },
  {
    id: 4,
    name: "Curry Corner",
    cuisine: "Indian",
    rating: 4.7,
    etaMins: 30,
    image: react_icon,
    description: "Rich curries, biryanis, and fresh tandoor roti.",
    priceRange: "$$",
  },
  {
    id: 5,
    name: "Green Bowl",
    cuisine: "Healthy / Bowls",
    rating: 4.3,
    etaMins: 15,
    image: header_img,
    description: "Build-your-own salads, grain bowls, and smoothies.",
    priceRange: "$-$$",
  },
];

export default stores;
