import { lazy } from "react";
import { Route } from "react-router";
const Index = lazy(() => import("../pages/Index"));
const ProductListing = lazy(() => import("../pages/ProductListing"));
const ProductDetails = lazy(() => import("../pages/ProductDetails"));
const Categories = lazy(() => import("../pages/Categories"));
const Contact = lazy(() => import("../pages/Contact"));
const Cart = lazy(() => import("../features/cart/Cart"));

export const PublicRoutes = () => {
  return (
    <>
      <Route path="/" element={<Index />} />
      <Route path="/products" element={<ProductListing />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/collections/all" element={<Categories />} />
      <Route path="/pages/contact-us" element={<Contact />} />
      <Route path="/Your-Shopping-Cart" element={<Cart />} />

      {/* <Route path="/privacy-policy" element={<PrivacyPolicy />} /> */}
      {/* <Route path="/terms-conditions" element={<TermsAndConditions />} /> */}
    </>
  );
};
