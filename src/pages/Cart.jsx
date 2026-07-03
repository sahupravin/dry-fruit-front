import { useState } from "react";
import SectionWrapper from "../componenets/common/SectionWrapper";
import ContainerWrapper from "../componenets/common/ContainerWrapper";
import Button from "../componenets/common/Button";
import Select from "../componenets/common/Select";
import { useCart } from "../context/CartContext";
import { HiMinus, HiPlus, HiXMark } from "react-icons/hi2";

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, getTotal } = useCart();
  const [country, setCountry] = useState("us");
  const [state, setState] = useState("al");
  const [zip, setZip] = useState("");

  const subtotal = getTotal();

  return (
    <div className="min-h-screen bg-white">
      <SectionWrapper className="pt-8">
        <ContainerWrapper>
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
                alt="Empty Cart"
                className="mb-6 h-24 w-24 opacity-80"
              />
              <h2 className="font-heading mb-2 text-2xl text-gray-800">
                Your cart is empty
              </h2>
              <p className="mb-6 text-gray-500">
                Looks like you haven’t added anything yet.
              </p>
              <Button
                to="/products"
                variant="unstyled"
                className="rounded-full border border-[#b35c1e] px-6 py-2 text-sm text-[#b35c1e] hover:bg-[#fdf4ef]"
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
              {/* Products list */}
              <div className="space-y-8">
                <h2 className="font-heading text-2xl text-[#7B3F00]">
                  Products
                </h2>

                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="relative grid grid-cols-[auto,1fr] gap-6 rounded-md border border-[#ddd] p-6"
                  >
                    {/* remove */}
                    <Button
                      onClick={() => removeFromCart(item.id)}
                      variant="unstyled"
                      className="text-brand-300 hover:text-brand-500 border-brand-200 absolute -top-3 -left-3 flex h-7 w-7 items-center justify-center rounded-full border bg-white"
                      aria-label="Remove"
                    >
                      <HiXMark className="h-4 w-4" />
                    </Button>

                    {/* image */}
                    <div className="h-28 w-28 overflow-hidden rounded-full">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      ) : null}
                    </div>

                    {/* details */}
                    <div>
                      <h3 className="font-heading text-xl font-bold text-gray-900">
                        {item.name}
                      </h3>
                      <p className="mt-1 text-sm text-gray-600">
                        {item.weight}
                      </p>
                      <p className="mt-2 text-lg font-semibold text-gray-900">
                        {item.price}
                      </p>

                      {/* qty */}
                      <div className="mt-3 flex items-center gap-3">
                        <div className="flex items-center">
                          <Button
                            onClick={() =>
                              updateQuantity(item.id, item.qty - 1)
                            }
                            variant="unstyled"
                            className="border-brand-200 text-brand-500 hover:bg-brand-50 flex h-8 w-8 items-center justify-center border"
                          >
                            <HiMinus className="h-4 w-4" />
                          </Button>
                          <span className="border-brand-200 text-brand-500 flex h-8 min-w-[2.5rem] items-center justify-center border-t border-b text-center">
                            {item.qty}
                          </span>
                          <Button
                            onClick={() =>
                              updateQuantity(item.id, item.qty + 1)
                            }
                            variant="unstyled"
                            className="border-brand-200 text-brand-500 hover:bg-brand-50 flex h-8 w-8 items-center justify-center border"
                          >
                            <HiPlus className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="text-sm font-medium text-gray-900">
                          Total : $
                          {(
                            parseFloat(item.price.replace(/[^0-9.-]+/g, "")) *
                            item.qty
                          ).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Bottom buttons */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <Button
                    to="/products"
                    variant="secondary"
                    borderColor="secondary"
                  >
                    Continue shopping
                  </Button>
                  <Button variant="secondary" borderColor="secondary">
                    Update Cart
                  </Button>
                </div>
              </div>

              {/* Summary */}
              <aside>
                <div className="rounded-md p-6">
                  <h3 className="text-brand-500 font-heading text-2xl">
                    Order Summary
                  </h3>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-gray-900">Subtotal :</span>
                    <span className="text-gray-900">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>

                  <div className="mt-4">
                    <Button
                      variant="secondary"
                      borderColor="secondary"
                      className="border-brand-200 hover:border-brand-300 hover:bg-brand-50 w-full rounded-full border bg-white px-4 py-2 text-sm"
                    >
                      Add a note to your order
                    </Button>
                    <p className="text-brand-300 mt-4 text-sm">
                      Shipping, taxes, and discounts will be calculated at
                      checkout.
                    </p>
                  </div>

                  <div className="mt-4 space-y-3">
                    <Button
                      className="w-full"
                      variant="secondary"
                      borderColor="secondary"
                    >
                      Proceed to Checkout
                    </Button>
                    <Button
                      className="w-full"
                      variant="secondary"
                      borderColor="secondary"
                    >
                      Get shipping estimates
                    </Button>
                  </div>

                  <div className="mt-6 space-y-4">
                    <div>
                      <label className="text-brand-400 mb-1 block text-sm">
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
                      <label className="text-brand-400 mb-1 block text-sm">
                        State
                      </label>
                      <Select
                        value={state}
                        onValueChange={setState}
                        className="w-full"
                        options={[
                          { value: "al", label: "Alabama" },
                          { value: "ny", label: "New York" },
                          { value: "ca", label: "California" },
                        ]}
                      />
                    </div>
                    <div>
                      <label className="text-brand-400 mb-1 block text-sm">
                        Zip/Postal Code
                      </label>
                      <input
                        value={zip}
                        onChange={(e) => setZip(e.target.value)}
                        placeholder=""
                        className="border-brand-200 focus:border-brand-500 focus:ring-brand-500 w-full rounded-md border bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-offset-2 focus:outline-none"
                      />
                    </div>
                    <Button
                      variant="secondary"
                      borderColor="secondary"
                      className="w-full"
                    >
                      Calculate shipping
                    </Button>
                  </div>
                </div>
              </aside>
            </div>
          )}
        </ContainerWrapper>
      </SectionWrapper>
    </div>
  );
}

export default Cart;
