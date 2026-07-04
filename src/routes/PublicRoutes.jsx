import { lazy } from "react";
import { Route } from "react-router";
const Index = lazy(() => import("../pages/Index"));
const ProductListing = lazy(() => import("../pages/ProductListing"));
const ProductDetails = lazy(() => import("../pages/ProductDetails"));
const Categories = lazy(() => import("../pages/Categories"));
const Contact = lazy(() => import("../pages/Contact"));
const Cart = lazy(() => import("../features/cart/Cart"));
const ComingSoon = lazy(() => import("../pages/ComingSoon"));

export const PublicRoutes = () => {
  return (
    <>
      <Route path="/" element={<Index />} />
      <Route path="/products" element={<ProductListing />} />
      <Route path="/search" element={<ProductListing />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/collections/all" element={<Categories />} />
      <Route path="/collections/:category" element={<ProductListing />} />
      <Route path="/pages/contact-us" element={<Contact />} />
      <Route path="/Your-Shopping-Cart" element={<Cart />} />
      <Route path="/checkout" element={<ComingSoon />} />

      {/* Placeholder Routes */}
      <Route path="/about" element={<ComingSoon />} />
      <Route path="/blog" element={<ComingSoon />} />
      <Route path="/faq" element={<ComingSoon />} />
      <Route path="/pages/privacy-policy" element={<ComingSoon />} />
      <Route path="/pages/terms-conditions" element={<ComingSoon />} />
      <Route path="/pages/shipping-policy" element={<ComingSoon />} />
      <Route path="/pages/returns-exchanges" element={<ComingSoon />} />

      {/* <Route path="/privacy-policy" element={<PrivacyPolicy />} /> */}
      {/* <Route path="/terms-conditions" element={<TermsAndConditions />} /> */}
    </>
  );
};
