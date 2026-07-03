import { useState } from "react";
import SectionWrapper from "../../componenets/common/SectionWrapper";
import ContainerWrapper from "../../componenets/common/ContainerWrapper";
import Button from "../../componenets/common/Button";
import Select from "../../componenets/common/Select";
import { useCart } from "../../context/CartContext";
import { HiMinus, HiPlus, HiXMark } from "react-icons/hi2";
import { HiChevronDown } from "react-icons/hi";

function EmptyCart() {
  return (
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
      <Button to="/products" variant="secondary" borderColor="secondary">
        Continue Shopping
      </Button>
    </div>
  );
}

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, getTotal } = useCart();
  // const [country, setCountry] = useState("us");
  // const [state, setState] = useState("al");
  // const [zip, setZip] = useState("");

  const subtotal = getTotal();

  return (
    <div className="">
      <SectionWrapper className="pt-8">
        <ContainerWrapper>
          {cartItems.length === 0 ? (
            <EmptyCart />
          ) : (
            <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
              {/* Products list */}
              <div className="space-y-10">
                <h2 className="text-brand-500 font-heading text-2xl">
                  Products
                </h2>

                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="border-brand-200 group relative grid grid-cols-1 items-start gap-6 rounded-md border sm:grid-cols-[14rem_1fr]"
                  >
                    {/* remove */}
                    <Button
                      onClick={() => removeFromCart(item.id)}
                      variant="unstyled"
                      className="text-brand-600 hover:text-brand-600 border-brand-500 hover:bg-brand-50 hover:border-brand-50 absolute top-0 right-0 flex size-8 items-center justify-center rounded-full border bg-white transition-all duration-300 ease-in-out"
                      aria-label="Remove"
                    >
                      <HiXMark className="h-5 w-5" />
                    </Button>

                    {/* image */}
                    <div className="bg-brand-300 min-h-36 w-full overflow-hidden">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      ) : null}
                    </div>

                    {/* details */}
                    <div className="m-5 flex min-w-0 flex-col justify-center gap-2 self-stretch">
                      <h3 className="font-heading text-brand-600 hover:text-brand-500 text-xl">
                        {item.name}
                      </h3>
                      <p className="text-brand-600 text-sm">{item.weight}</p>
                      <p className="mt-2 text-gray-900">{item.price}</p>

                      {/* qty */}
                      <div className="flex items-center gap-3">
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
                </div>
              </div>

              {/* Summary */}
              <aside>
                <div className="rounded-md p-6">
                  <h3 className="text-brand-500 font-heading text-2xl">
                    Order Summary
                  </h3>
                  <div className="mt-4 flex items-center gap-2 font-bold">
                    <span className="text-brand-500">Subtotal :</span>
                    <span className="text-brand-500">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>

                  <div className="mt-4">
                    <Button
                      variant="secondary"
                      borderColor="secondary"
                      className="hover:bg-brand-50 rounded-full border px-4 py-2"
                    >
                      Add a note to your order
                    </Button>
                    <p className="text-brand-600 mt-4 italic">
                      Shipping, taxes, and discounts will be calculated at
                      checkout.
                    </p>
                  </div>

                  <div className="mt-8 space-y-3">
                    <Button
                      className="w-full"
                      variant="secondary"
                      borderColor="secondary"
                    >
                      Proceed to Checkout
                    </Button>
                    <Button
                      variant="secondary"
                      borderColor="secondary"
                      className="flex w-full items-center justify-center gap-2"
                    >
                      Get shipping estimates{" "}
                      <HiChevronDown className="h-6 w-6 text-inherit" />
                    </Button>
                  </div>

                  {/* <div className="mt-6 space-y-4">
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
                        className="text-brand-600 w-full"
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
                  </div> */}
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
