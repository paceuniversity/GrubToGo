// Temporary seed data for limited-time deals spanning all stores.
// Caterer can later replace this with dynamic data (e.g. from Firestore).
// Each deal links to a store via storeId and includes original pricing and discount.
// expiry is an ISO timestamp; frontend will show remaining time.

import { stores } from './stores';

// Helper to pick store image/name quickly
const storeLookup = Object.fromEntries(stores.map(s => [s.id, s]));

export const deals = [
  {
    id: 'deal-pasta-lasagna',
    storeId: 1,
    title: 'Classic Lasagna Slice',
    originalPrice: 10.99,
    discountPercent: 25,
    // 2 hours from now
    expiry: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'deal-wok-noodles',
    storeId: 2,
    title: 'Spicy Garlic Noodles',
    originalPrice: 12.5,
    discountPercent: 30,
    expiry: new Date(Date.now() + 90 * 60 * 1000).toISOString(), // 1.5 hours
  },
  {
    id: 'deal-burger-smash',
    storeId: 3,
    title: 'Double Smash Burger',
    originalPrice: 9.75,
    discountPercent: 20,
    expiry: new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString(), // 3 hours
  },
  {
    id: 'deal-curry-paneer',
    storeId: 4,
    title: 'Paneer Tikka Masala Bowl',
    originalPrice: 13.99,
    discountPercent: 35,
    expiry: new Date(Date.now() + 45 * 60 * 1000).toISOString(), // 45 mins
  },
  {
    id: 'deal-green-bowl',
    storeId: 5,
    title: 'Protein Power Bowl',
    originalPrice: 11.25,
    discountPercent: 15,
    expiry: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(), // 4 hours
  },
];

export function enrichDeals(list = deals) {
  return list.map(d => {
    const store = storeLookup[d.storeId];
    const discountedPrice = +(d.originalPrice * (1 - d.discountPercent / 100)).toFixed(2);
    return { ...d, storeName: store?.name, storeImage: store?.image, discountedPrice };
  });
}

export default deals;
