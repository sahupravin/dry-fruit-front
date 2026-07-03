import { Link } from "react-router";
import { HiShoppingCart, HiTrash } from "react-icons/hi2";
import { useWishlist } from "./hooks/useWishlist";
import { useCart } from "../../context/CartContext";
import Button from "../../componenets/common/Button";
import ContainerWrapper from "../../componenets/common/ContainerWrapper";
import SectionWrapper from "../../componenets/common/SectionWrapper";

// Table Row Component for Large Screens
const WishlistTableRow = ({ product, onRemove, onAddToCart }) => {
  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50">
      {/* Product Image & Name */}
      <td className="p-4">
        <div className="flex items-center justify-center gap-4">
          <div className="relative h-20 w-20 overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover"
            />
            {product.tag && (
              <span
                className={`absolute top-1 left-1 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-medium ${
                  product.tag.toLowerCase() === "sale" &&
                  "bg-brand-500 text-brand-400"
                } ${
                  product.tag.toLowerCase() === "hot" &&
                  "bg-brand-50 text-brand-700"
                } ${
                  product.tag.toLowerCase() === "new" &&
                  "text-brand-400 bg-[#007AFF]"
                }`}
              >
                {product.tag}
              </span>
            )}
          </div>
        </div>
      </td>

      <td className="p-4">
        <div className="flex flex-col gap-1">
          <h3 className="font-heading text-brand-500 text-lg">
            {product.name}
          </h3>
          <p className="text-brand-600 text-sm">{product.weight}</p>
        </div>
      </td>

      {/* Price */}
      <td className="p-4">
        <div className="text-center">
          <span className="text-brand-500 text-lg font-bold">
            {product.price}
          </span>
          {product.regularPrice && (
            <div className="text-brand-100 text-sm line-through">
              {product.regularPrice}
            </div>
          )}
        </div>
      </td>

      {/* Stock Status */}
      <td className="p-4 text-center">
        <span className="bg-brand-50 text-brand-600 inline-flex items-center justify-center rounded-full px-6 py-2 font-medium">
          In Stock
        </span>
      </td>

      {/* Actions */}
      <td className="py-4">
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="secondary"
            borderColor="primary"
            size="small"
            onClick={() => onAddToCart(product)}
            className="flex items-center gap-2"
          >
            <HiShoppingCart className="h-4 w-4" />
            Add to Cart
          </Button>
          <button
            onClick={() => onRemove(product.id)}
            className="flex items-center justify-center p-2 text-red-500 transition-colors duration-200 hover:text-red-700"
            title="Remove from wishlist"
          >
            <HiTrash className="h-5 w-5" />
          </button>
        </div>
      </td>
    </tr>
  );
};

// Product Card Component for Small Screens
const WishlistProductCard = ({ product, onRemove, onAddToCart }) => {
  return (
    <div className="group relative w-full cursor-grab bg-white shadow-[0_0_1rem_2px_rgba(0,0,0,0.06)]">
      {/* Product Image */}
      <div className="group/image-container h-56 w-full overflow-hidden">
        <div className="relative h-full w-full">
          {product.tag && (
            <span
              className={`absolute top-4 left-3 z-10 flex size-8 items-center justify-center rounded-full p-2 text-[11px] capitalize ${
                product.tag.toLowerCase() === "sale" &&
                "bg-brand-500 text-brand-400"
              } ${
                product.tag.toLowerCase() === "hot" &&
                "bg-brand-50 text-brand-700 font-medium"
              } ${
                product.tag.toLowerCase() === "new" &&
                "text-brand-400 bg-[#007AFF]"
              }`}
            >
              {product.tag}
            </span>
          )}
          <img
            src={product.image}
            alt={product.name}
            className="absolute top-1/2 left-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 object-cover"
          />
          <button
            onClick={() => onRemove(product.id)}
            className="absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-red-500 transition-colors duration-200 hover:bg-red-500 hover:text-white"
            title="Remove from wishlist"
          >
            <HiTrash className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Product Details - Centered like FeaturedProductCard */}
      <div className="flex flex-col items-center justify-center p-8">
        <h2 className="font-heading text-brand-500 mb-2.5 text-center text-2xl">
          {product.name}
        </h2>

        <p className="text-brand-600 mb-2 text-center text-sm">
          {product.weight}
        </p>

        {/* Price - Centered */}
        <p className="mt-auto mb-2.5 flex w-full max-w-[40%] items-center justify-center gap-2 text-lg">
          <data
            className="font-bold"
            value={product.price.replace(/[^0-9.-]+/g, "")}
          >
            {product.price}
          </data>
          {product.regularPrice && (
            <data
              className="text-brand-100 ml-auto text-sm line-through"
              value={product.regularPrice.replace(/[^0-9.-]+/g, "")}
            >
              {product.regularPrice}
            </data>
          )}
        </p>

        {/* Stock Status - Centered */}
        <div className="mb-4">
          <span className="bg-brand-50 text-brand-600 inline-flex items-center justify-center rounded-full px-3 py-1 text-xs font-medium">
            In Stock
          </span>
        </div>

        {/* Add to Cart Button - Centered */}
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="secondary"
            borderColor="primary"
            size="small"
            onClick={() => onAddToCart(product)}
            className="flex items-center gap-2"
          >
            <HiShoppingCart className="h-4 w-4" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

const EmptyWishlist = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-6">
        <div className="text-brand-100 mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
          <HiShoppingCart className="h-12 w-12" />
        </div>
      </div>
      <h2 className="font-heading text-brand-500 mb-4 text-3xl">
        Your Wishlist is Empty
      </h2>
      <p className="text-brand-600 mb-8 max-w-md text-lg">
        Looks like you haven't added any items to your wishlist yet. Start
        exploring our products and add your favorites!
      </p>
      <Link to="/">
        <Button
          variant="secondary"
          borderColor="primary"
          size="medium"
          textColor="black"
        >
          Continue Shopping
        </Button>
      </Link>
    </div>
  );
};

const WishlistHeader = ({ itemCount, onClearAll }) => {
  return (
    <div className="mb-8 flex items-center justify-between gap-4">
      <div>
        <h1 className="font-heading text-brand-500 mb-2 text-4xl">
          My Wishlist
        </h1>
        <p className="text-brand-600 text-lg">
          {itemCount} {itemCount === 1 ? "item" : "items"} in your wishlist
        </p>
      </div>
      {itemCount > 0 && (
        <Button
          variant="secondary"
          borderColor="red-500"
          size="medium"
          textColor="red-500"
          onClick={onClearAll}
          className="self-start sm:self-auto"
        >
          Clear All
        </Button>
      )}
    </div>
  );
};

function Wishlist() {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    // Convert wishlist product to cart format
    const cartProduct = {
      id: product.id,
      name: product.name,
      price: product.price,
      weight: product.weight,
      image: product.image,
    };
    addToCart(cartProduct);
  };

  const handleRemoveFromWishlist = (id) => {
    removeFromWishlist(id);
  };

  const handleClearAll = () => {
    if (
      window.confirm("Are you sure you want to clear your entire wishlist?")
    ) {
      clearWishlist();
    }
  };

  return (
    <main className="bg-grey-50 min-h-screen py-8">
      <ContainerWrapper>
        <SectionWrapper>
          <WishlistHeader
            itemCount={wishlistItems.length}
            onClearAll={handleClearAll}
          />

          {wishlistItems.length === 0 ? (
            <EmptyWishlist />
          ) : (
            <>
              {/* Table View for Large Screens (lg and above) */}
              <div className="hidden overflow-hidden border border-gray-100 bg-white lg:block">
                <table className="w-full">
                  <thead className="bg-brand-200">
                    <tr>
                      <th className="text-brand-600 p-4 text-center font-bold tracking-wider uppercase">
                        Image
                      </th>
                      <th className="text-brand-600 p-4 text-start font-bold tracking-wider uppercase">
                        Product
                      </th>
                      <th className="text-brand-600 p-4 text-center font-bold tracking-wider uppercase">
                        Price
                      </th>
                      <th className="text-brand-600 p-4 text-center font-bold tracking-wider uppercase">
                        Stock Status
                      </th>
                      <th className="text-brand-600 p-4 text-center font-bold tracking-wider uppercase">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {wishlistItems.map((product) => (
                      <WishlistTableRow
                        key={product.id}
                        product={product}
                        onRemove={handleRemoveFromWishlist}
                        onAddToCart={handleAddToCart}
                      />
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Card Grid View for Small Screens (below lg) */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:hidden">
                {wishlistItems.map((product) => (
                  <WishlistProductCard
                    key={product.id}
                    product={product}
                    onRemove={handleRemoveFromWishlist}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            </>
          )}
        </SectionWrapper>
      </ContainerWrapper>
    </main>
  );
}

export default Wishlist;
