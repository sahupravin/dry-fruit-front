import { Link } from "react-router";
import { HiShoppingCart, HiTrash, HiArrowRight } from "react-icons/hi2";
import { useWishlist } from "./hooks/useWishlist";
import { useCart } from "../../context/CartContext";
import Button from "../../componenets/common/Button";
import ContainerWrapper from "../../componenets/common/ContainerWrapper";
import SectionWrapper from "../../componenets/common/SectionWrapper";
import AnimatedLines from "../../componenets/common/AnimatedLines";

// Table Row Component for Large Screens
const WishlistTableRow = ({ product, onRemove, onAddToCart }) => {
  return (
    <tr className="group border-b border-gray-100 transition-colors duration-200 hover:bg-brand-300/50">
      {/* Product Image & Name */}
      <td className="p-6">
        <div className="flex items-center gap-6">
          <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-brand-200">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {product.tag && (
              <span
                className={`absolute top-2 left-2 flex h-6 w-6 items-center justify-center rounded-full text-[9px] font-bold uppercase tracking-tighter ${
                  product.tag.toLowerCase() === "sale"
                    ? "bg-brand-50 text-brand-500"
                    : product.tag.toLowerCase() === "hot"
                      ? "bg-brand-500 text-white"
                      : "bg-[#007AFF] text-white"
                }`}
              >
                {product.tag}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="font-heading text-brand-500 text-xl leading-tight">
              {product.name}
            </h3>
            <p className="text-brand-600/70 text-sm font-medium">
              {product.weight}
            </p>
          </div>
        </div>
      </td>

      {/* Price */}
      <td className="p-6">
        <div className="flex flex-col items-center">
          <span className="text-brand-500 text-xl font-bold">
            {product.price}
          </span>
          {product.regularPrice && (
            <span className="text-brand-100 text-sm font-medium line-through">
              {product.regularPrice}
            </span>
          )}
        </div>
      </td>

      {/* Stock Status */}
      <td className="p-6 text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-600 uppercase tracking-wider">
          <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
          In Stock
        </span>
      </td>

      {/* Actions */}
      <td className="p-6">
        <div className="flex items-center justify-center gap-3">
          <Button
            variant="primary"
            size="small"
            onClick={() => onAddToCart(product)}
            className="group/btn flex items-center gap-2 px-5 font-bold"
          >
            <HiShoppingCart className="h-4 w-4 transition-transform group-hover/btn:-translate-y-0.5" />
            Add to Cart
          </Button>
          <button
            onClick={() => onRemove(product.id)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50 text-red-500 transition-all duration-300 hover:bg-red-500 hover:text-white hover:shadow-lg hover:shadow-red-200"
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
    <div className="group relative overflow-hidden bg-white shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.1)]">
      <AnimatedLines />

      {/* Product Image */}
      <div className="relative h-64 w-full overflow-hidden bg-brand-200">
        {product.tag && (
          <span
            className={`absolute top-4 left-4 z-20 flex h-10 w-10 items-center justify-center rounded-full text-[10px] font-bold uppercase tracking-tighter ${
              product.tag.toLowerCase() === "sale"
                ? "bg-brand-50 text-brand-500"
                : product.tag.toLowerCase() === "hot"
                  ? "bg-brand-500 text-white"
                  : "bg-[#007AFF] text-white"
            }`}
          >
            {product.tag}
          </span>
        )}

        <button
          onClick={() => onRemove(product.id)}
          className="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-red-500 shadow-sm transition-all duration-300 hover:bg-red-500 hover:text-white lg:opacity-0 lg:group-hover:opacity-100"
          title="Remove from wishlist"
        >
          <HiTrash className="h-5 w-5" />
        </button>

        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Quick Add Overlay for mobile/tablet */}
        <div className="absolute inset-x-0 bottom-0 z-20 flex translate-y-full items-center justify-center bg-brand-500/90 p-3 transition-transform duration-300 group-hover:translate-y-0">
          <button
            onClick={() => onAddToCart(product)}
            className="flex w-full items-center justify-center gap-2 text-sm font-bold text-white uppercase tracking-widest"
          >
            <HiShoppingCart className="h-4 w-4" />
            Add to Cart
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="flex flex-col items-center p-6 text-center">
        <h3 className="font-heading text-brand-500 mb-1 text-2xl leading-tight">
          {product.name}
        </h3>
        <p className="text-brand-600/60 mb-4 text-sm font-medium">
          {product.weight}
        </p>

        <div className="flex items-center gap-3">
          <span className="text-brand-500 text-2xl font-bold">
            {product.price}
          </span>
          {product.regularPrice && (
            <span className="text-brand-100 text-base font-medium line-through">
              {product.regularPrice}
            </span>
          )}
        </div>

        <div className="mt-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-[10px] font-bold text-green-600 uppercase tracking-widest">
            <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
            In Stock
          </span>
        </div>
      </div>
    </div>
  );
};

const EmptyWishlist = () => {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl bg-white py-20 px-6 text-center shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
      <div className="relative mb-8">
        <div className="flex h-32 w-32 items-center justify-center rounded-full bg-brand-50/30">
          <HiShoppingCart className="text-brand-50 h-16 w-16" />
        </div>
        <div className="absolute -top-2 -right-2 flex h-10 w-10 animate-bounce items-center justify-center rounded-full bg-brand-500 text-white shadow-lg">
          <span className="text-xl font-bold">?</span>
        </div>
      </div>
      <h2 className="font-heading text-brand-500 mb-4 text-4xl">
        Wishlist is feeling lonely
      </h2>
      <p className="text-brand-600 mx-auto mb-10 max-w-md text-lg leading-relaxed">
        Your wishlist is currently empty. Give it some love by adding your
        favorite items!
      </p>
      <Link to="/">
        <Button
          variant="primary"
          size="large"
          className="flex items-center gap-3 px-12 font-bold uppercase tracking-widest"
        >
          Go Shopping
          <HiArrowRight className="h-5 w-5" />
        </Button>
      </Link>
    </div>
  );
};

const WishlistHeader = ({ itemCount, onClearAll }) => {
  return (
    <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="font-heading text-brand-500 mb-3 text-5xl md:text-6xl">
          My Wishlist
        </h1>
        <div className="flex items-center gap-3">
          <span className="bg-brand-500 flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-white">
            {itemCount}
          </span>
          <p className="text-brand-600 text-xl font-medium">
            {itemCount === 1 ? "Product" : "Products"} Saved
          </p>
        </div>
      </div>
      {itemCount > 0 && (
        <button
          onClick={onClearAll}
          className="flex items-center gap-2 border-b-2 border-red-200 pb-1 text-sm font-bold text-red-500 transition-all hover:border-red-500"
        >
          <HiTrash className="h-4 w-4" />
          CLEAR ALL WISHLIST
        </button>
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
              <div className="hidden overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.05)] lg:block">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-brand-50/5">
                      <th className="text-brand-500 p-6 text-start text-xs font-bold uppercase tracking-[0.2em]">
                        Product Details
                      </th>
                      <th className="text-brand-500 p-6 text-center text-xs font-bold uppercase tracking-[0.2em]">
                        Price
                      </th>
                      <th className="text-brand-500 p-6 text-center text-xs font-bold uppercase tracking-[0.2em]">
                        Availability
                      </th>
                      <th className="text-brand-500 p-6 text-center text-xs font-bold uppercase tracking-[0.2em]">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
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
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:hidden">
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
