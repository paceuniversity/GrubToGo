// Simple seed data for stores shown on the Menu page
// Each store can later be extended with real images and metadata
import pastaPalaceImg from "./Pasta Palace/homepage.jpg";
import sizzlingWokImg from "./Sizzling Wok/homepage.jpg";
import burgerBarnImg from "./Burger Barn/homepage.jpg";
import curryCornerImg from "./Curry Corner/homepage.jpg";

export const stores = [
  {
    id: 1,
    name: "Pasta Palace",
    cuisine: "Italian",
    etaMins: 25,
    image: pastaPalaceImg,
    description: "Fresh pasta, classic sauces, and oven-baked lasagna.",
    priceRange: "$$",
  },
  {
    id: 2,
    name: "Sizzling Wok",
    cuisine: "Asian Fusion",
    etaMins: 20,
    image: sizzlingWokImg,
    description: "Stir-fries, noodles, and bold flavors made to order.",
    priceRange: "$-$$",
  },
  {
    id: 3,
    name: "Burger Barn",
    cuisine: "American",
    etaMins: 18,
    image: burgerBarnImg,
    description: "Smash burgers, loaded fries, and hand-spun shakes.",
    priceRange: "$",
  },
  {
    id: 4,
    name: "Curry Corner",
    cuisine: "Indian",
    etaMins: 30,
    image: curryCornerImg,
    description: "Rich curries, biryanis, and fresh tandoor roti.",
    priceRange: "$$",
  },
];

export default stores;
