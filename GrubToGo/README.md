# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler.

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration.

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
## Register Page

- Users can choose between **Student** and **Caterer** using a toggle.
- Student email must be a valid `@pace.edu` address.
- Caterer email must end with `.staff@pace.edu`.
- After successful registration:
  - Students are redirected to the student page.
  - Caterers are redirected to the caterer page.

## Deals Page (Limited-Time Discounts)

The `Deals` page aggregates promotional items from all stores at discounted prices for a limited duration.

Location: `src/pages/Deals/Deals.jsx` with styles in `Deals.css`.

Data seed: `src/assets/deals.js` exports an array of deal objects and an `enrichDeals()` helper that attaches store metadata.

Each deal object shape:

```
{
  id: string,            // unique id for the deal
  storeId: number,       // links to a store in stores.js
  title: string,         // item name/label
  originalPrice: number, // pre-discount price
  discountPercent: number, // percent off (e.g. 25 for 25%)
  expiry: ISO timestamp string // when the deal expires
}
```

Frontend derives `discountedPrice` and displays a live countdown. When time reaches 0 the card is visually dimmed and button disabled.

### Updating Deals (Caterer Workflow)
Until backend integration (e.g. Firestore), caterer can edit `deals.js`:

1. Duplicate an object and change `id`, `title`, pricing, and `discountPercent`.
2. Set a new expiry: `new Date(Date.now() + X * 60 * 1000).toISOString()` where `X` is minutes (or convert hours → minutes).
3. Ensure `storeId` matches one from `stores.js` for image/name resolution.
4. Save; Vite hot-reload will refresh the Deals grid.

Future enhancement: replace static seed with Firestore collection (fields mirroring above schema) and real-time updates.

