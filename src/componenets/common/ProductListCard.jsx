import { Link } from "react-router";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../features/wishlist/hooks/useWishlist";
import { useMemo } from "react";
import { shareContent } from "../../utils/share";
import { HiShare } from "react-icons/hi";
import { HiHeart, HiShoppingCart } from "react-icons/hi2";
import AnimatedLines from "./AnimatedLines";
import Button from "./Button";

const Tag = ({ tag }) => {
  return (
    <span
      className={`absolute top-4 left-4 z-10 flex h-10 w-10 items-center justify-center rounded-full text-[10px] font-bold uppercase tracking-tighter ${
        tag.toLowerCase() === "sale"
          ? "bg-brand-50 text-brand-500"
          : tag.toLowerCase() === "hot"
            ? "bg-brand-500 text-white"
            : "bg-[#007AFF] text-white"
      }`}
    >
      {tag}
    </span>
  );
};

function ProductListCard({
  productDetails,
  tag,
  productImage1,
  productImage2,
  className = "",
}) {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const productForActions = useMemo(() => {
    const idFromTitle = productDetails?.title
      ? productDetails.title.toLowerCase().replace(/\s+/g, "-")
      : undefined;
    return {
      id:
        productDetails?.id ??
        idFromTitle ??
        `prod-${Math.random().toString(36).slice(2)}`,
      name: productDetails?.title ?? "Product",
      price: productDetails?.salePrice ?? "$0.00",
      regularPrice: productDetails?.regularPrice,
      image: productImage1,
      image2: productImage2,
      tag,
      weight: productDetails?.weight,
      category: productDetails?.category,
    };
  }, [productDetails, productImage1, productImage2, tag]);

  const handleAddToCart = () => {
    addToCart?.(productForActions);
  };

  const handleToggleWishlist = () => {
    if (isInWishlist?.(productForActions.id)) {
      removeFromWishlist?.(productForActions.id);
      return;
    }
    addToWishlist?.(productForActions);
  };

  const handleShare = async () => {
    const title = productForActions.name;
    const text = productForActions.price
      ? `${title} — ${productForActions.price}`
      : title;

    await shareContent({ title, text, path: `/product/${productForActions.id}` });
  };

  const wishlisted = isInWishlist?.(productForActions.id) ?? false;

    return (
    <article
      className={`group relative flex w-full flex-col overflow-hidden rounded-2xl bg-white shadow-premium transition-all duration-500 hover:-translate-y-2 hover:shadow-premium-hover sm:flex-row ${className}`}
    >
      <AnimatedLines />

      {/* Product Image Section */}
      <div className="relative aspect-square w-full shrink-0 overflow-hidden bg-brand-200 sm:w-72">
        {tag && <Tag tag={tag} />}
        <Link to={`/product/${productForActions.id}`} className="block h-full w-full">
          <div className="h-full w-full *:transition-transform *:duration-700 *:ease-out">
            <img
              src={productImage1}
              alt={productForActions.name}
              className="absolute inset-0 h-full w-full object-cover group-hover:scale-110"
              draggable={false}
            />
            <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/5" />
          </div>
        </Link>
      </div>

      {/* Product Details Section */}
      <div className="flex flex-1 flex-col p-8 sm:p-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex-1">
            <div className="mb-4 flex items-center gap-3">
              <span className="bg-brand-50/50 text-brand-500 rounded-md px-2 py-1 text-[10px] font-bold uppercase tracking-widest">
                {productForActions.category || "Organic"}
              </span>
              <span className="text-brand-600/20 text-xs">•</span>
              <span className="text-brand-600/60 text-xs font-semibold">
                {productForActions.weight || "Premium Pack"}
              </span>
            </div>
            <Link to={`/product/${productForActions.id}`}>
              <h2 className="font-heading text-brand-500 mb-4 text-4xl leading-tight transition-colors hover:text-brand-50 lg:text-5xl">
                {productForActions.name}
              </h2>
            </Link>
            <p className="text-brand-600/70 line-clamp-2 max-w-xl text-base leading-relaxed">
              Experience the luxury of handpicked {productForActions.name.toLowerCase()}. 
              A perfect blend of nutrition and taste from nature's lap.
            </p>
          </div>

          <div className="flex flex-col items-start gap-2 sm:items-end">
            <div className="flex items-center gap-3">
              <span className="text-brand-500 text-4xl font-black tracking-tight">
                {productForActions.price}
              </span>
              {productForActions.regularPrice && (
                <span className="text-brand-100/60 text-xl font-medium line-through">
                  {productForActions.regularPrice}
                </span>
              )}
            </div>
            <div className="mt-1">
              <span className="inline-flex items-center gap-2 rounded-full bg-green-50 px-4 py-1.5 text-[10px] font-bold text-green-600 uppercase tracking-widest shadow-sm">
                <span className="h-2 w-2 animate-pulse rounded-full bg-green-500"></span>
                Directly Sourced
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons Section */}
        <div className="mt-auto flex flex-wrap items-center gap-6 pt-10">
          <Button
            variant="primary"
            size="large"
            onClick={handleAddToCart}
            className="group/btn flex flex-1 items-center justify-center gap-3 font-bold uppercase tracking-widest transition-all hover:scale-[1.02] sm:flex-none"
          >
            <HiShoppingCart className="h-6 w-6 transition-transform group-hover/btn:-translate-y-1" />
            Add to Basket
          </Button>

          <div className="flex items-center gap-4">
            <button
              onClick={handleToggleWishlist}
              className={`flex h-14 w-14 items-center justify-center rounded-full transition-all duration-300 shadow-md ${
                wishlisted
                  ? "bg-brand-500 text-white"
                  : "bg-white text-brand-500 border border-brand-50/20 hover:bg-brand-500 hover:text-white"
              }`}
              title={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
            >
              <HiHeart className={`h-7 w-7 transition-transform active:scale-125 ${wishlisted ? "fill-current" : ""}`} />
            </button>

            <button
              onClick={handleShare}
              className="bg-brand-100/10 text-brand-600 hover:bg-brand-500 flex h-14 w-14 items-center justify-center rounded-full border border-gray-100 transition-all duration-300 hover:text-white shadow-sm"
              title="Share product"
            >
              <HiShare className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export default ProductListCard;

