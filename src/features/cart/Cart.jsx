import { useState } from "react";
import { Link } from "react-router";
import SectionWrapper from "../../componenets/common/SectionWrapper";
import ContainerWrapper from "../../componenets/common/ContainerWrapper";
import Button from "../../componenets/common/Button";
import Select from "../../componenets/common/Select";
import { useCart } from "../../context/CartContext";
import {
  HiMinus,
  HiPlus,
  HiXMark,
  HiOutlineShoppingBag,
  HiArrowRight,
  HiPencilSquare,
  HiTruck,
} from "react-icons/hi2";
import AnimatedLines from "../../componenets/common/AnimatedLines";

function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl bg-white py-20 px-6 text-center shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
      <div className="relative mb-8">
        <div className="flex h-32 w-32 items-center justify-center rounded-full bg-brand-50/30">
          <HiOutlineShoppingBag className="text-brand-50 h-16 w-16" />
        </div>
        <div className="absolute -top-2 -right-2 flex h-10 w-10 animate-bounce items-center justify-center rounded-full bg-brand-500 text-white shadow-lg">
          <span className="text-xl font-bold">0</span>
        </div>
      </div>
      <h2 className="font-heading text-brand-500 mb-4 text-4xl">
        Your bag is empty
      </h2>
      <p className="text-brand-600 mx-auto mb-10 max-w-md text-lg leading-relaxed">
        It looks like you haven't added any delicious treats to your cart yet.
        Let's find something special for you!
      </p>
      <Button
        to="/products"
        variant="primary"
        size="large"
        className="flex items-center gap-3 px-12 font-bold uppercase tracking-widest"
      >
        Explore Products
        <HiArrowRight className="h-5 w-5" />
      </Button>
    </div>
  );
}

const CartHeader = ({ itemCount }) => {
  return (
    <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="font-heading text-brand-500 mb-3 text-5xl md:text-6xl">
          Shopping Cart
        </h1>
        <div className="flex items-center gap-3">
          <span className="bg-brand-500 flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-white">
            {itemCount}
          </span>
          <p className="text-brand-600 text-xl font-medium">
            {itemCount === 1 ? "Item" : "Items"} in your cart
          </p>
        </div>
      </div>
    </div>
  );
};

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, getTotal } = useCart();
  const [showNote, setShowNote] = useState(false);
  const [showShipping, setShowShipping] = useState(false);
  const [country, setCountry] = useState("us");
  const [state, setState] = useState("al");
  const [zip, setZip] = useState("");

  const subtotal = getTotal();
  const itemCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <main className="bg-grey-50 min-h-screen py-8">
      <SectionWrapper className="pt-8">
        <ContainerWrapper>
          {cartItems.length === 0 ? (
            <EmptyCart />
          ) : (
            <>
              <CartHeader itemCount={itemCount} />

              <div className="grid gap-12 lg:grid-cols-[1fr_400px]">
                {/* Products list */}
                <div className="space-y-6">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="group relative overflow-hidden bg-white shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.1)]"
                    >
                      <AnimatedLines />

                      <div className="grid grid-cols-1 items-center gap-6 p-6 sm:grid-cols-[12rem_1fr_auto]">
                        {/* image */}
                        <div className="bg-brand-200 relative aspect-square w-full overflow-hidden rounded-2xl">
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center bg-gray-100">
                              <HiOutlineShoppingBag className="h-12 w-12 text-gray-300" />
                            </div>
                          )}
                        </div>

                        {/* details */}
                        <div className="flex flex-col gap-2">
                          <h3 className="font-heading text-brand-500 text-2xl leading-tight">
                            {item.name}
                          </h3>
                          <p className="text-brand-600/70 text-sm font-medium">
                            {item.weight}
                          </p>
                          <div className="mt-2 flex items-center gap-4">
                            <span className="text-brand-500 text-xl font-bold">
                              {item.price}
                            </span>

                            {/* qty picker */}
                            <div className="flex items-center rounded-full border border-gray-100 bg-gray-50 p-1">
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.qty - 1)
                                }
                                className="hover:bg-brand-50 hover:text-brand-500 flex h-8 w-8 items-center justify-center rounded-full transition-colors"
                              >
                                <HiMinus className="h-3 w-3" />
                              </button>
                              <span className="w-8 text-center text-sm font-bold text-gray-700">
                                {item.qty}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.qty + 1)
                                }
                                className="hover:bg-brand-50 hover:text-brand-500 flex h-8 w-8 items-center justify-center rounded-full transition-colors"
                              >
                                <HiPlus className="h-3 w-3" />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* subtotal & remove */}
                        <div className="flex flex-row items-center justify-between sm:flex-col sm:items-end sm:justify-center sm:gap-4">
                          <div className="text-right">
                            <p className="text-brand-600/50 text-[10px] font-bold uppercase tracking-widest">
                              Subtotal
                            </p>
                            <p className="text-brand-500 text-xl font-black">
                              $
                              {(
                                parseFloat(
                                  item.price.replace(/[^0-9.-]+/g, ""),
                                ) * item.qty
                              ).toFixed(2)}
                            </p>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50 text-red-500 transition-all duration-300 hover:bg-red-500 hover:text-white hover:shadow-lg hover:shadow-red-200"
                            aria-label="Remove"
                          >
                            <HiXMark className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Bottom buttons */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-6">
                    <Link
                      to="/products"
                      className="text-brand-500 flex items-center gap-2 text-sm font-bold uppercase tracking-widest transition-opacity hover:opacity-70"
                    >
                      <HiArrowRight className="h-4 w-4 rotate-180" />
                      Continue Shopping
                    </Link>
                  </div>
                </div>

                {/* Summary */}
                <aside className="lg:sticky lg:top-8 lg:self-start">
                  <div className="rounded-3xl bg-white p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
                    <h3 className="font-heading text-brand-500 mb-8 text-3xl">
                      Order Summary
                    </h3>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b border-gray-50 pb-4">
                        <span className="text-brand-600 font-medium">
                          Subtotal
                        </span>
                        <span className="text-brand-500 text-2xl font-black">
                          ${subtotal.toFixed(2)}
                        </span>
                      </div>

                      <p className="text-brand-600/60 text-sm italic">
                        Shipping, taxes, and discounts will be calculated at
                        checkout.
                      </p>

                      <div className="space-y-3 pt-4">
                        <Button
                          to="/checkout"
                          className="w-full font-bold uppercase tracking-widest"
                          variant="primary"
                          size="large"
                        >
                          Proceed to Checkout
                        </Button>

                        <button
                          onClick={() => setShowNote(!showNote)}
                          className="text-brand-600 hover:text-brand-500 flex w-full items-center justify-center gap-2 py-2 text-sm font-bold transition-colors"
                        >
                          <HiPencilSquare className="h-4 w-4" />
                          {showNote ? "Close note" : "Add a note to your order"}
                        </button>

                        {showNote && (
                          <textarea
                            placeholder="How can we help you?"
                            className="w-full rounded-2xl border border-gray-100 bg-gray-50 p-4 text-sm focus:border-brand-500 focus:outline-none"
                            rows={3}
                          ></textarea>
                        )}

                        <button
                          onClick={() => setShowShipping(!showShipping)}
                          className="text-brand-600 hover:text-brand-500 flex w-full items-center justify-center gap-2 py-2 text-sm font-bold transition-colors"
                        >
                          <HiTruck className="h-4 w-4" />
                          {showShipping
                            ? "Hide estimates"
                            : "Calculate shipping"}
                        </button>

                        {showShipping && (
                          <div className="space-y-4 rounded-2xl bg-gray-50 p-4">
                            <div>
                              <label className="text-brand-600 mb-1 block text-[10px] font-bold uppercase tracking-widest">
                                Country
                              </label>
                              <Select
                                value={country}
                                onValueChange={setCountry}
                                options={[
                                  { value: "us", label: "United States" },
                                  { value: "ca", label: "Canada" },
                                ]}
                              />
                            </div>
                            <div>
                              <label className="text-brand-600 mb-1 block text-[10px] font-bold uppercase tracking-widest">
                                State
                              </label>
                              <Select
                                value={state}
                                onValueChange={setState}
                                options={[
                                  { value: "al", label: "Alabama" },
                                  { value: "ny", label: "New York" },
                                  { value: "ca", label: "California" },
                                ]}
                              />
                            </div>
                            <div>
                              <label className="text-brand-600 mb-1 block text-[10px] font-bold uppercase tracking-widest">
                                Zip/Postal Code
                              </label>
                              <input
                                value={zip}
                                onChange={(e) => setZip(e.target.value)}
                                className="w-full rounded-xl border border-gray-100 bg-white px-4 py-2 text-sm focus:border-brand-500 focus:outline-none"
                              />
                            </div>
                            <Button
                              variant="primary"
                              size="small"
                              className="w-full font-bold"
                            >
                              Get Estimates
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </aside>
              </div>
            </>
          )}
        </ContainerWrapper>
      </SectionWrapper>
    </main>
  );
}

export default Cart;
