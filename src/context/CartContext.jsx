import { createContext, useContext, useState, useEffect } from "react";
import {
  setLocalStorage,
  getLocalStorage,
  removeLocalStorage,
} from "../utils/localStorage"; // adjust path if needed

const CartContext = createContext();

const STORAGE_KEY = "cartItems";

const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  // Sample cart items for demonstration
  const sampleItems = [
    {
      id: 1,
      name: "Dill Seeds",
      price: "$289.00",
      weight: "250 gm",
      image:
        "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200&h=200&fit=crop&crop=center",
      qty: 2,
    },
    {
      id: 2,
      name: "Black Sesame",
      price: "$795.00",
      weight: "1 kg",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=200&fit=crop&crop=center",
      qty: 1,
    },
    {
      id: 3,
      name: "Black Mustard",
      price: "$19.99",
      weight: "250 gm",
      image:
        "https://waffy-demo.myshopify.com/cdn/shop/products/34.jpg?v=1542094976",
      qty: 3,
    },
    {
      id: 4,
      name: "Almonds",
      price: "$450.00",
      weight: "500 gm",
      image:
        "https://images.unsplash.com/photo-1551782450-17144efb9c50?w=200&h=200&fit=crop&crop=center",
      qty: 1,
    },
    {
      id: 5,
      name: "Cashews",
      price: "$380.00",
      weight: "500 gm",
      image:
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&h=200&fit=crop&crop=center",
      qty: 2,
    },
  ];

  // ✅ Load cart from localStorage on mount, or use sample items if empty
  useEffect(() => {
    const stored = getLocalStorage(STORAGE_KEY, []);
    if (stored.length === 0) {
      setCartItems(sampleItems);
    } else {
      setCartItems(stored);
    }
  }, []);

  // ✅ Save cart to localStorage whenever it changes
  useEffect(() => {
    setLocalStorage(STORAGE_KEY, cartItems);
  }, [cartItems]);

  // Add product (with quantity handling)
  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item,
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setIsCartOpen(true); // auto open when adding
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, newQty) => {
    if (newQty <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, qty: newQty } : item)),
    );
  };

  const clearCart = () => {
    setCartItems([]);
    removeLocalStorage(STORAGE_KEY);
  };

  // Calculate total
  const getTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.price.replace(/[^0-9.-]+/g, ""));
      return total + price * item.qty;
    }, 0);
  };

  // Get cart count (total quantity of all items)
  const getCartCount = () => {
    return cartItems.reduce((total, item) => total + item.qty, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotal,
        getCartCount,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

// Hook
//eslint-disable-next-line
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
