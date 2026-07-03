import PageNotFound from "./pages/PageNotFound";
import { PublicRoutes } from "./routes/PublicRoutes";
import { Routes, Route } from "react-router";
import LayoutWrapper from "./routes/componenets/LayoutWrapper";
import CartProvider from "./context/CartContext";
import CartDrawer from "./features/cart/CartDrawer";
import { SearchProvider } from "./context/SearchContext";
import WishlistProvider from "./context/WishlistContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AuthRoutes } from "./routes/AuthRoutes";
import { ProtectedRoutes } from "./routes/ProtectedRoutes";
import { Suspense } from "react";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <SearchProvider>
        <CartProvider>
          <WishlistProvider>
            <Suspense fallback={<div>Loading...</div>}>
              <LayoutWrapper>
                <Routes>
                  {AuthRoutes()}
                  {PublicRoutes()}
                  {ProtectedRoutes()}
                  <Route path="*" element={<PageNotFound />} />
                </Routes>
              </LayoutWrapper>
            </Suspense>
            <CartDrawer />
          </WishlistProvider>
        </CartProvider>
      </SearchProvider>
    </QueryClientProvider>
  );
}

export default App;
