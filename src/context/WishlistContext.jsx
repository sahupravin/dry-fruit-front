import { useState, useEffect } from "react";
import {
  setLocalStorage,
  getLocalStorage,
  removeLocalStorage,
} from "../utils/localStorage";

import { createContext } from "react";

//eslint-disable-next-line
export const WishlistContext = createContext();

const STORAGE_KEY = "wishlistItems";

// Sample wishlist items for demonstration
const sampleItems = [
  {
    id: 1,
    name: "Black Mustard",
    price: "$19.99",
    regularPrice: "$50.99",
    weight: "250 gm",
    image:
      "https://waffy-demo.myshopify.com/cdn/shop/products/34.jpg?v=1542094976",
    image2:
      "https://waffy-demo.myshopify.com/cdn/shop/products/26.jpg?v=1542094187",
    tag: "sale",
  },
  {
    id: 2,
    name: "Dill Seeds",
    price: "$289.00",
    weight: "250 gm",
    image:
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200&h=200&fit=crop&crop=center",
    image2:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=200&fit=crop&crop=center",
    tag: "hot",
  },
  {
    id: 3,
    name: "Black Sesame",
    price: "$795.00",
    weight: "1 kg",
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=200&fit=crop&crop=center",
    image2:
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200&h=200&fit=crop&crop=center",
    tag: "new",
  },
];

const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);

  // Load wishlist from localStorage on mount, or use sample items if empty
  useEffect(() => {
    const stored = getLocalStorage(STORAGE_KEY, []);
    if (stored.length === 0) {
      setWishlistItems(sampleItems);
    } else {
      setWishlistItems(stored);
    }
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    setLocalStorage(STORAGE_KEY, wishlistItems);
  }, [wishlistItems]);

  // Add product to wishlist
  const addToWishlist = (product) => {
    setWishlistItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev; // Already in wishlist
      }
      return [...prev, product];
    });
  };

  // Remove product from wishlist
  const removeFromWishlist = (id) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Check if product is in wishlist
  const isInWishlist = (id) => {
    return wishlistItems.some((item) => item.id === id);
  };

  // Clear entire wishlist
  const clearWishlist = () => {
    setWishlistItems([]);
    removeLocalStorage(STORAGE_KEY);
  };

  // Get wishlist count
  const getWishlistCount = () => {
    return wishlistItems.length;
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        clearWishlist,
        getWishlistCount,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistProvider;
