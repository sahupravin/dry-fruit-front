import { lazy } from "react";
import { Route } from "react-router";

const Wishlist = lazy(() => import("../features/wishlist/Wishlist"));

export const ProtectedRoutes = () => {
  return (
    <>
      <Route path="/pages/wishlist" element={<Wishlist />} />
    </>
  );
};
