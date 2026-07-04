import { Link } from "react-router";
import { useState } from "react";

const Tag = ({ tag }) => {
  if (!tag) return null;
  return (
    <span
      className={`absolute top-3 left-3 z-10 flex h-9 w-9 items-center justify-center rounded-full text-[10px] font-bold tracking-tighter uppercase ${
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

function FeaturedProductCard({
  productDetails,
  productImage1,
  productImage2,
  tag,
  className = "",
}) {
  const [hover, setHover] = useState(false);
  const imageSrc = hover && productImage2 ? productImage2 : productImage1;
  const { id, title, salePrice, regularPrice } = productDetails ?? {};

  return (
    <article
      className={`group shadow-premium hover:shadow-premium-hover relative flex w-full min-w-0 flex-col overflow-hidden rounded-2xl bg-white transition-all duration-300 hover:-translate-y-1 ${className}`}
    >
      <div
        className="bg-brand-200 relative aspect-square w-full overflow-hidden"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {tag ? <Tag tag={tag} /> : null}
        <Link to={`/product/${id}`} className="block h-full w-full">
          {imageSrc ? (
            <img
              src={imageSrc}
              alt={title ?? "Product"}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              draggable={false}
            />
          ) : (
            <div className="text-brand-600/40 flex h-full w-full items-center justify-center text-sm">
              No image
            </div>
          )}
        </Link>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <Link to={`/product/${id}`}>
          <h3 className="font-heading text-brand-500 hover:text-brand-50 line-clamp-2 text-lg leading-tight transition-colors">
            {title ?? "Product"}
          </h3>
        </Link>
        <div className="mt-2 flex items-center gap-2">
          {salePrice != null && (
            <span className="text-brand-500 text-xl font-bold">
              {salePrice}
            </span>
          )}
          {regularPrice != null && (
            <span className="text-brand-100/60 text-sm font-medium line-through">
              {regularPrice}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

export default FeaturedProductCard;
