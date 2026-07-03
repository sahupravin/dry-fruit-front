import ModalDrawer from "../../componenets/common/model/ModelDrawer";
import { useCart } from "../../context/CartContext";
import { HiMinus, HiPlus, HiXMark } from "react-icons/hi2";
import Button from "../../componenets/common/Button";

const CartDrawer = () => {
  const {
    isCartOpen,
    closeCart,
    cartItems,
    removeFromCart,
    updateQuantity,
    getTotal,
  } = useCart();

  const total = getTotal();

  return (
    <ModalDrawer isOpen={isCartOpen} onClose={closeCart}>
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 pb-2">
          <h2 className="text-brand-500 font-heading text-xl">Your Cart</h2>
        </div>

        {/* Cart Items */}
        <div
          className="flex-1 overflow-y-auto py-4"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "#9f4103 #fbfbfb",
            "&::-webkit-scrollbar": {
              width: "4px",
              height: "4px",
            },
          }}
        >
          {cartItems.length === 0 ? (
            <div className="flex h-full items-center justify-center">
              <p className="text-gray-500">No items in cart</p>
            </div>
          ) : (
            <div className="divide-brand-100 divide-y-1 *:py-6">
              {cartItems.map((item) => (
                <div key={item.id} className="group flex gap-4">
                  {/* Product Image */}
                  <div className="h-20 w-20 flex-shrink-0 overflow-hidden bg-gray-100">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full self-start object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gray-200">
                        <span className="text-xs text-gray-500">No Image</span>
                      </div>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="flex-1">
                    <div className="mb-2 flex items-start justify-between">
                      <h3 className="font-heading text-gray-900">
                        {item.name}
                      </h3>
                      <Button
                        onClick={() => removeFromCart(item.id)}
                        variant="unstyled"
                        className="hover:border-brand-500 hover:text-brand-500 show-remove-on-nonhover pointer-events-none flex h-5 w-5 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-400 opacity-0 transition-all duration-200 group-hover:pointer-events-auto group-hover:opacity-100 hover:bg-red-50 focus:pointer-events-auto focus:opacity-100"
                        aria-label="Remove item"
                        title="Remove"
                      >
                        <HiXMark className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-brand-600 mb-2">
                      {item.weight || "250 gm"}
                    </p>
                    <p className="text-lg text-gray-900">{item.price}</p>

                    {/* Quantity Selector */}
                    <div className="mt-3 flex flex-nowrap">
                      <Button
                        onClick={() => updateQuantity(item.id, item.qty - 1)}
                        variant="unstyled"
                        className="border-brand-100 text-brand-500 hover:bg-brand-50 flex h-7 w-7 items-center justify-center border transition-all duration-300"
                      >
                        <HiMinus className="h-4 w-4" />
                      </Button>
                      <span className="border-brand-100 text-brand-500 flex min-w-[2.5rem] items-center justify-center border-t border-b text-center">
                        {item.qty}
                      </span>
                      <Button
                        onClick={() => updateQuantity(item.id, item.qty + 1)}
                        variant="unstyled"
                        className="border-brand-100 text-brand-500 hover:bg-brand-50 flex h-7 w-7 items-center justify-center border transition-all duration-300"
                      >
                        <HiPlus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="">
            {/* Total */}
            <div className="mb-4 flex items-center justify-between border-t border-b border-gray-200 py-4">
              <span className="font-semibold text-gray-900">Total</span>
              <span className="text-lg font-semibold text-gray-900">
                ${total.toFixed(2)}
              </span>
            </div>

            {/* Shipping Note */}
            <p className="mb-4 text-xs text-gray-500">
              Shipping, taxes, and discounts will be calculated at checkout.
            </p>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button className="border-brand-500 text-brand-600 hover:bg-brand-50 hover:border-brand-50 w-full rounded-full border bg-white py-3 transition-colors duration-300">
                Proceed to Checkout
              </button>
              <a
                href="/Your-Shopping-Cart"
                className="border-brand-500 text-brand-600 hover:bg-brand-50 hover:border-brand-50 block w-full rounded-full border bg-white py-3 text-center transition-colors duration-300"
              >
                View Cart
              </a>
            </div>
          </div>
        )}
      </div>
    </ModalDrawer>
  );
};

export default CartDrawer;
