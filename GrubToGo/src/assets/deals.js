// Limited-time deals featuring items from store menus.
// Each deal links to a store via storeId and includes original pricing and discount.
// expiry is an ISO timestamp; frontend will show remaining time.

import { stores } from './stores';
import { assets } from './assets';

// Helper to pick store image/name quickly
const storeLookup = Object.fromEntries(stores.map(s => [s.id, s]));

export const deals = [
  {
    id: 'deal-pasta-lasagna',
    storeId: 1,
    title: 'Lasagna',
    originalPrice: 13.99,
    discountPercent: 25,
    itemImage: assets.lasagna,
    expiry: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), // 2 hours from now
  },
  {
    id: 'deal-wok-kungpao',
    storeId: 2,
    title: 'Kung Pao Chicken',
    originalPrice: 10.99,
    discountPercent: 30,
    itemImage: assets.kung_pao_chicken,
    expiry: new Date(Date.now() + 90 * 60 * 1000).toISOString(), // 1.5 hours
  },
  {
    id: 'deal-burger-classic',
    storeId: 3,
    title: 'Classic Cheeseburger',
    originalPrice: 9.99,
    discountPercent: 20,
    itemImage: assets.classic_cheeseburger,
    expiry: new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString(), // 3 hours
  },
  {
    id: 'deal-curry-tikka',
    storeId: 4,
    title: 'Chicken Tikka Masala',
    originalPrice: 13.99,
    discountPercent: 35,
    itemImage: assets.chicken_tikka_masala,
    expiry: new Date(Date.now() + 45 * 60 * 1000).toISOString(), // 45 mins
  },
];

export function enrichDeals(list = deals) {
  return list.map(d => {
    const store = storeLookup[d.storeId];
    const discountedPrice = +(d.originalPrice * (1 - d.discountPercent / 100)).toFixed(2);
    return { ...d, storeName: store?.name, storeImage: d.itemImage || store?.image, discountedPrice };
  });
}

export default deals;
