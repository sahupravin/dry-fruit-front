# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

---

## API Specification (Backend Contract)

All APIs used by this project and the data shapes they expect are listed below. The app uses `VITE_API_BASE_URL` from `.env` for the main backend; cart hooks call `/api/cart` (relative), so either proxy `/api` to your backend or set axios baseURL accordingly.

### 1. Home / Public APIs (no auth)

**Base:** `publicClient` (same origin or `VITE_API_BASE_URL`). Response envelope: `{ data: T }`. Errors: `error.response?.data?.message` or `error?.message`.

| Method | Endpoint                    | Purpose                                     | Request | Response `data`                                                                                                |
| ------ | --------------------------- | ------------------------------------------- | ------- | -------------------------------------------------------------------------------------------------------------- |
| GET    | `/sliders`                  | Header carousel slides                      | -       | Array of slider objects (see below)                                                                            |
| GET    | `/best-products`            | Best/featured products section              | -       | Array of category objects, or object of category name to products array, or flat array of products (see below) |
| GET    | `/v1/home/blog-posts`       | Blog posts carousel                         | -       | Array of blog post objects (see below)                                                                         |
| GET    | `/v1/home/team-members`     | Our Team section                            | -       | Array of team member objects (see below)                                                                       |
| GET    | `/v1/home/service-features` | Service features (e.g. shipping, guarantee) | -       | Array of feature objects (see below)                                                                           |
| GET    | `/v1/home/gallery`          | Gallery grid images                         | -       | Array of gallery item objects (see below)                                                                      |
| GET    | `/v1/home/parallax`         | Special offers / parallax section           | -       | Array of parallax item objects (see below)                                                                     |

**Slider item (raw from API):**

- `background_image`: string (JSON string of array of objects with `download_link`)
- `title`: string
- `description`: string
- `coupon_code`: string

The client builds `imageUrl` from `background_image` (e.g. `https://jswprofilesheet.com/storage/${download_link}`). Each slide needs: `title`, `description`, `coupon_code`, and derived `imageUrl`.

**Best products:**

- **Format A:** Array of `{ name: string, products: Product[] }`.
- **Format B:** Object `{ [categoryName: string]: Product[] }`.
- **Format C:** Flat array of `Product[]` (shown under one "Featured" tab).

**Product (used in best-products, listing, cart, wishlist):**

- `id`: number or string
- `name` or `title`: string
- `sale_price` or `price`: number or string (display price)
- `regular_price` or `old_price`: number or string (optional, for strikethrough)
- `image` or `productImage1`: string (URL)
- `image_hover` or `productImage2`: string (URL, optional)
- `tag`: string | null (e.g. "Sale", "Hot", "New")

**Blog post:**

- `title`: string
- `author`: string
- `date`: string (e.g. "November 13, 2018")
- `comments`: number
- `excerpt`: string
- `image`: string (URL)

**Team member:**

- `id`: number or string
- `name`: string
- `title`: string (e.g. "CEO")
- `img`: string (URL) or provide `image` and map in UI

**Service feature:**

- `id`: number or string
- `title`: string
- `description`: string
- `icon`: optional (e.g. SVG markup or icon key; UI can map to built-in icons)

**Gallery item:**

- `image`: string (URL)
- Optional: `title`, `subtitle`, `link` for overlay content and CTA

**Parallax item:**

- `bgImage` or `background_image`: string (URL) for parallax section background
- Optional: `title`, `subtitle`, `description`, `ctaText`, `ctaLink` for Special Offers block

---

### 2. Auth APIs

**Public (no Bearer token):**

| Method | Endpoint           | Purpose              | Request body                                                               | Response                                                           |
| ------ | ------------------ | -------------------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| POST   | `/register`        | User sign up         | `{ name: string, email: string, password: string }`                        | Success: 2xx; client redirects to login                            |
| POST   | `/login`           | Sign in              | `{ email: string, password: string }`                                      | `{ data: { access_token: string } }`; client stores `access_token` |
| POST   | `/forgot-password` | Request reset        | `{ email: string }`                                                        | Success: 2xx; client redirects to reset-password                   |
| POST   | `/reset-password`  | Set new password     | `{ password: string }` and optionally `token` or `email` (e.g. from query) | Success: 2xx; client redirects to login                            |
| POST   | `/refresh-token`   | Refresh access token | `{ refresh_token: string }` or as your backend expects                     | New token payload                                                  |
| POST   | `/verify-token`    | Validate token       | Token or body as per backend                                               | Valid/invalid                                                      |

**Protected (Bearer token required via `authClient`):**

| Method | Endpoint           | Purpose         | Request body                                     | Response                          |
| ------ | ------------------ | --------------- | ------------------------------------------------ | --------------------------------- |
| GET    | `/profile`         | Current user    | -                                                | `{ data: { user: ProfileUser } }` |
| POST   | `/update-profile`  | Update profile  | Profile fields (e.g. name, email, phone)         | Updated user or success           |
| POST   | `/change-password` | Change password | `{ current_password?, new_password }` or similar | Success/error                     |
| POST   | `/logout`          | Log out         | -                                                | Success/error                     |

**Profile user (used in Profile page):**

- `name`: string
- `email`: string
- `phone`: string (optional)
- `memberSince`: string (optional)
- `tier`: string (optional, e.g. "Platinum Member")
- `points`: number (optional)

---

### 3. Cart APIs (relative `/api/cart`)

Cart hooks use axios with relative URLs (`/api/cart`). Ensure requests go to your backend (e.g. Vite proxy or same host). Auth: if cart is per-user, send Bearer token (e.g. same as `authClient`).

| Method | Endpoint        | Purpose     | Request                     | Response                                                      |
| ------ | --------------- | ----------- | --------------------------- | ------------------------------------------------------------- |
| GET    | `/api/cart`     | Get cart    | -                           | Cart payload (array of cart items or `{ items: CartItem[] }`) |
| POST   | `/api/cart`     | Add item    | Cart item (see below)       | Created cart or updated cart/items                            |
| PATCH  | `/api/cart/:id` | Update item | Partial fields (e.g. `qty`) | Updated cart/item                                             |
| DELETE | `/api/cart/:id` | Remove line | -                           | Success; client invalidates cart query                        |

**Cart item (add/update/display):**

- `id`: number or string (product or line id)
- `name`: string
- `price`: string (e.g. "$19.99") or number; displayed and used for total
- `weight`: string (optional, e.g. "250 gm")
- `image`: string (URL, optional)
- `qty`: number (optional on add; default 1)

`getTotal()` parses price with `parseFloat(item.price.replace(/[^0-9.-]+/g, ""))`, so either return numeric price or a string that parses to number.

---

### 4. Not implemented via API (current behavior)

- **Product listing page:** Uses local `sampleProducts` and client-side filter/sort. No `GET /products` or `GET /categories` yet. To back with API: support query params e.g. `category`, `q` (search), `sort`, `page`, `per_page` and return `{ data: Product[], total?, page? }`.
- **Product detail page:** Product loaded from route param and local data. To back with API: e.g. `GET /products/:id` returning a single product (same Product shape plus full description, images array, etc.).
- **Wishlist:** Stored in `WishlistContext` (in-memory/localStorage only). No wishlist API; if you add one, mirror cart-like CRUD and the same product/cart item shape for consistency.
- **Blog / Team / Service / Gallery / Parallax sections:** Hooks and services exist and expect the shapes above; some sections still use hardcoded data in the component. Wiring them to the API will make the app fully dynamic.
