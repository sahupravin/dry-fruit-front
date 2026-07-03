import { Link } from "react-router";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../features/wishlist/hooks/useWishlist";
import { useMemo } from "react";
import { shareContent } from "../../utils/share";
import { HiShare } from "react-icons/hi";
import { HiHeart, HiShoppingCart } from "react-icons/hi2";

const AnimatedLines = () => {
  return (
    <>
      <div className="bg-brand-50 absolute top-0 left-0 z-10 h-1 w-0 transition-all duration-600 ease-out group-hover:w-[calc(100%-0.25rem)]"></div>

      <div className="bg-brand-500 absolute right-0 bottom-0 z-10 h-1 w-0 transition-all duration-600 ease-out group-hover:w-[calc(100%-0.25rem)]"></div>

      <div className="bg-brand-50 absolute top-0 right-0 z-10 h-0 w-1 transition-all duration-600 ease-out group-hover:h-[calc(100%-0.25rem)]"></div>

      <div className="bg-brand-500 absolute bottom-0 left-0 z-10 h-0 w-1 transition-all duration-600 ease-out group-hover:h-[calc(100%-0.25rem)]"></div>
    </>
  );
};

const Tag = ({ tag }) => {
  return (
    <span
      className={`absolute top-4 left-3 z-10 flex size-8 items-center justify-center rounded-full p-2 text-[11px] capitalize ${tag.toLowerCase() === "sale" && "bg-brand-500 text-brand-400"} ${tag.toLowerCase() === "hot" && "bg-brand-50 text-brand-700 font-medium"} ${tag.toLowerCase() === "new" && "text-brand-400 bg-[#007AFF]"}`}
    >
      {tag}
    </span>
  );
};

const ProductImage = ({
  productImage1 = "https://waffy-demo.myshopify.com/cdn/shop/products/34.jpg?v=1542094976",
  productImage2 = "https://waffy-demo.myshopify.com/cdn/shop/products/26.jpg?v=1542094187",
}) => {
  return (
    <div className="h-full w-full *:transition-opacity *:duration-600 *:ease-out">
      <img
        src={productImage1}
        alt="Product image 1"
        className="absolute top-1/2 left-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 object-cover opacity-100 group-hover/image-container:opacity-0"
        draggable={false}
      />
      <img
        src={productImage2}
        alt="Product image 2"
        className="absolute top-1/2 left-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 object-cover opacity-0 group-hover/image-container:opacity-100"
        draggable={false}
      />
    </div>
  );
};

const Product = ({
  tag = "sale",
  onAddToCart,
  onToggleWishlist,
  onShare,
  isWishlisted,
}) => {
  return (
    <div className="group/image-container h-56 w-full overflow-hidden">
      <Link to="#" className="flex h-full w-full items-center">
        <div className="relative h-full w-full">
          {tag && <Tag tag={tag} />}
          <ProductImage />
          {/* Hover Action Buttons */}
          <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center opacity-0 transition-all duration-300 ease-out group-hover:opacity-100">
            <div className="pointer-events-auto flex items-center gap-2">
              {/* Add to Cart */}
              <button
                type="button"
                aria-label="Add to cart"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onAddToCart?.();
                }}
                className="text-brand-500 hover:bg-brand-500 grid size-8 place-items-center rounded-full bg-white ring-1 ring-black/5 transition-colors hover:text-white"
                title="Add to cart"
              >
                <HiShoppingCart className="size-4 text-inherit" />
              </button>

              {/* Wishlist */}
              <button
                type="button"
                aria-label="Add to wishlist"
                aria-pressed={isWishlisted ? "true" : "false"}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onToggleWishlist?.();
                }}
                className={`grid size-8 place-items-center rounded-full ring-1 ring-black/5 transition-colors ${isWishlisted ? "bg-brand-500 text-white" : "text-brand-500 hover:bg-brand-500 bg-white hover:text-white"}`}
                title={isWishlisted ? "In wishlist" : "Add to wishlist"}
              >
                <HiHeart className="size-4 text-inherit" />
              </button>

              {/* Share */}
              <button
                type="button"
                aria-label="Share product"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onShare?.();
                }}
                className="text-brand-500 hover:bg-brand-500 grid size-8 place-items-center rounded-full bg-white ring-1 ring-black/5 transition-colors hover:text-white"
                title="Share"
              >
                <HiShare className="size-4 text-inherit" />
              </button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

const ProductDetails = ({
  productDetails = {
    title: "Black Mustard",
    salePrice: "$19.99",
    regularPrice: "$50.99",
  },
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <Link to="#" className="block">
        <h2 className="font-heading text-brand-500 mb-2.5 text-center text-2xl">
          {productDetails.title}
        </h2>
      </Link>

      <p className="mt-auto mb-2.5 flex w-full items-center justify-center text-lg">
        <data className="font-bold" value="19.99">
          {productDetails.salePrice}
        </data>
        {productDetails.regularPrice && (
          <data
            className="text-brand-100 ml-auto text-sm line-through"
            value="50.99"
          >
            {productDetails.regularPrice}
          </data>
        )}
      </p>
    </div>
  );
};

function FeaturedProductCard({
  productDetails,
  tag,
  productImage1,
  productImage2,
  maxWidth = true,
  className,
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

  const handleShare = async (path) => {
    const title = productForActions.name;
    const text = productForActions.price
      ? `${title} — ${productForActions.price}`
      : title;

    await shareContent({ title, text, path });
  };

  const wishlisted = isInWishlist?.(productForActions.id) ?? false;

  return (
    <article
      className={`group relative m-0.5 w-full ${maxWidth && "max-w-[12rem]"} shrink-0 ${maxWidth && "basis-[12rem]"} ${className} cursor-grab bg-white shadow-[0_0_1rem_2px_rgba(0,0,0,0.06)]`}
    >
      <AnimatedLines />
      <Product
        tag={tag}
        productImage1={productImage1}
        productImage2={productImage2}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
        onShare={handleShare}
        isWishlisted={wishlisted}
      />
      <ProductDetails productDetails={productDetails} />
    </article>
  );
}

export default FeaturedProductCard;
