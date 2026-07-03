import { useState } from "react";
import { useHorizontalDragScroll } from "../hooks/useHorizontalDragScroll";
import { Link } from "react-router";
import { HiMinus, HiPlus, HiStar, HiShare } from "react-icons/hi2";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../features/wishlist/hooks/useWishlist";
import Button from "../componenets/common/Button";
import ContainerWrapper from "../componenets/common/ContainerWrapper";
import SectionWrapper from "../componenets/common/SectionWrapper";
import FeaturedProductCard from "../componenets/common/FeaturedProductCard";

// Product Image Gallery Component
const ProductImageGallery = ({ product }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const images = [
    product.image,
    product.image2 || product.image,
    "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop&crop=center",
    "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&crop=center",
    "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop&crop=center",
    "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&crop=center",
    "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop&crop=center",
    "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&crop=center",
    "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop&crop=center",
    "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&crop=center",
    "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop&crop=center",
    "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&crop=center",
  ];

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  const handleMouseEnter = () => {
    setIsZoomed(true);
  };

  const handleMouseLeave = () => {
    setIsZoomed(false);
  };

  // Drag scrolling functions for thumbnails
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - e.currentTarget.offsetLeft);
    setScrollLeft(e.currentTarget.scrollLeft);
  };

  const handleThumbnailMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - e.currentTarget.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed multiplier
    e.currentTarget.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeaveThumbnails = () => {
    setIsDragging(false);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <div
        className="aspect-square w-full cursor-zoom-in overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img
          src={images[selectedImage]}
          alt={product.name}
          className={`h-full w-full cursor-pointer object-cover transition-transform duration-300 ${
            isZoomed ? "scale-150" : "scale-100"
          }`}
          style={{
            transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
          }}
        />
      </div>

      {/* Thumbnail Images */}
      <div
        className={`scrollbar-hide flex gap-2 overflow-x-auto py-2 ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleThumbnailMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeaveThumbnails}
      >
        {images.map((image, index) => (
          <button
            key={index}
            onClick={(e) => {
              // Prevent click when dragging
              if (isDragging) {
                e.preventDefault();
                return;
              }
              setSelectedImage(index);
            }}
            className={`ring-brand-500 aspect-square w-24 flex-shrink-0 overflow-hidden transition-all duration-300 hover:ring-2 ${
              selectedImage === index ? "ring-brand-500 ring-2" : ""
            }`}
          >
            <img
              src={image}
              alt={`${product.name} ${index + 1}`}
              className="pointer-events-none h-full w-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

// Product Information Component
const ProductInfo = ({ product, onAddToCart, onAddToWishlist }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedWeight] = useState("250 gm");

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    const cartProduct = {
      id: product.id,
      name: product.name,
      price: product.price,
      weight: selectedWeight,
      image: product.image,
    };
    onAddToCart(cartProduct, quantity);
  };

  return (
    <div className="space-y-6">
      {/* Product Title */}
      <h1 className="font-heading text-brand-500 text-4xl">{product.name}</h1>

      {/* Rating */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <HiStar key={i} className="h-5 w-5 text-gray-300" />
            ))}
          </div>
          <span className="text-brand-600">No reviews</span>
        </div>
        <button className="text-brand-600 hover:text-brand-500 flex items-center gap-2 transition-colors">
          <HiShare className="h-4 w-4" />
          <span className="text-sm font-bold">Share</span>
        </button>
      </div>

      {/* Description */}
      <p className="text-brand-600 line-clamp-4 leading-relaxed">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris.
      </p>

      {/* Price */}
      <div className="grid grid-cols-[8rem_auto_1fr] items-center gap-4">
        <span className="font-heading text-brand-500">Price:</span>
        <div className="flex gap-4">
          <span className="text-brand-500 font-bold">{product.price}</span>
          {product.regularPrice && (
            <span className="text-brand-500 line-through opacity-50">
              {product.regularPrice}
            </span>
          )}
        </div>
      </div>

      {/* Weight Selection */}
      <div className="grid grid-cols-[8rem_auto_1fr] items-center gap-4">
        <span className="font-heading text-brand-500">Weight:</span>
        <span className="border-brand-500 text-brand-500 cursor-pointer border px-2 py-1">
          {selectedWeight}
        </span>
      </div>

      {/* Quantity */}
      <div className="grid grid-cols-[8rem_auto_1fr] items-center gap-4">
        <span className="font-heading text-brand-500">Quantity:</span>
        <div className="mt-3 flex flex-nowrap">
          <button
            onClick={() => handleQuantityChange(-1)}
            className="border-brand-100 text-brand-500 hover:bg-brand-50 flex h-7 w-7 items-center justify-center border transition-all duration-300"
          >
            <HiMinus className="h-4 w-4" />
          </button>
          <span className="border-brand-100 text-brand-500 flex min-w-[2.5rem] items-center justify-center border-t border-b text-center">
            {quantity}
          </span>
          <button
            onClick={() => handleQuantityChange(1)}
            className="border-brand-100 text-brand-500 hover:bg-brand-50 flex h-7 w-7 items-center justify-center border transition-all duration-300"
          >
            <HiPlus className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button
          variant="secondary"
          borderColor="secondary"
          size="medium"
          onClick={handleAddToCart}
          className="flex-1"
        >
          Add to Cart
        </Button>
        <Button
          variant="secondary"
          borderColor="secondary"
          size="medium"
          className="flex-1"
        >
          Buy it now
        </Button>
      </div>

      {/* Additional Actions */}
      <div className="flex flex-col">
        <Button
          variant="secondary"
          borderColor="secondary"
          size="medium"
          onClick={onAddToWishlist}
        >
          View My wishlist
        </Button>
      </div>
    </div>
  );
};

// Product Tabs Component
const ProductTabs = () => {
  const [activeTab, setActiveTab] = useState("description");

  const tabs = [
    { id: "description", label: "Product Description" },
    { id: "additional", label: "Additional information" },
    { id: "reviews", label: "Reviews" },
  ];

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "border-brand-50 text-brand-50 border-b-2"
                  : "text-brand-600 hover:text-brand-50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="prose max-w-none">
        {activeTab === "description" && (
          <div className="text-brand-600 space-y-4">
            <h3 className="font-heading text-brand-500 text-xl font-semibold">
              Lorem ipsum dolor sit amet
            </h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <h3 className="font-heading text-brand-500 text-xl font-semibold">
              Busey ipsum dolor sit amet
            </h3>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt mollit
              anim id est laborum.
            </p>
            <h3 className="font-heading text-brand-500 text-xl font-semibold">
              Sample Paragraph Text
            </h3>
            <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo.
            </p>
          </div>
        )}

        {activeTab === "additional" && (
          <div className="space-y-4">
            <p className="text-brand-600">
              Additional product information will be displayed here.
            </p>
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="space-y-4">
            <p className="text-brand-600">
              Customer reviews will be displayed here.
            </p>
          </div>
        )}
      </div>

      {/* Enquiry Link */}
      <div className="pt-4">
        <Link
          to="#"
          className="text-brand-50 hover:text-brand-500 inline-flex items-center gap-2 transition-colors"
        >
          <span className="text-lg">?</span>
          <span>Enquiry about product?</span>
        </Link>
      </div>
    </div>
  );
};

// Related/Recommended Products Section (horizontal scroll with drag + viewport hint)
const ProductsSection = ({ title, products }) => {
  const {
    scrollerRef,
    innerRef,
    isDragging,
    showHint,
    onMouseDown,
    onMouseMove,
    onMouseUp,
    onMouseLeave,
    onScroll,
    onDragStart,
  } = useHorizontalDragScroll({
    idleHintDelayMs: 1500,
    viewportThreshold: 0.8,
  });

  return (
    <div className="space-y-6">
      <h2 className="font-heading text-brand-500 mb-8 text-center text-3xl">
        {title}
      </h2>
      <div
        className={`scrollbar-hide overflow-x-auto py-4 ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        ref={scrollerRef}
        onScroll={onScroll}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
        onDragStart={onDragStart}
        onTouchStart={onScroll}
      >
        <div
          ref={innerRef}
          className={`flex gap-6 ${showHint ? "scroll-hint-animate" : ""}`}
        >
          {products.map((product) => (
            <div key={product.id} className="flex-shrink-0">
              <FeaturedProductCard
                productDetails={{
                  title: product.name,
                  salePrice: product.price,
                  regularPrice: product.regularPrice,
                }}
                tag={product.tag}
                productImage1={product.image}
                productImage2={product.image2}
                className={"h-full min-w-[13.8rem] select-none"}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

function ProductDetails() {
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  // Sample product data
  const product = {
    id: 1,
    name: "Pippali Pepper",
    price: "$629.00",
    regularPrice: "$700.00",
    weight: "250 gm",
    image:
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop&crop=center",
    image2:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&crop=center",
    tag: "sale",
  };

  // Related products data
  const relatedProducts = [
    {
      id: 1,
      name: "Dried Ginger",
      price: "$199.00",
      image:
        "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200&h=200&fit=crop&crop=center",
      image2:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=200&fit=crop&crop=center",
    },
    {
      id: 2,
      name: "Dried Ginger",
      price: "$199.00",
      image:
        "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200&h=200&fit=crop&crop=center",
      image2:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=200&fit=crop&crop=center",
    },
    {
      id: 3,
      name: "Pimento",
      price: "$629.00",
      regularPrice: "$700.00",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=200&fit=crop&crop=center",
      image2:
        "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200&h=200&fit=crop&crop=center",
      tag: "sale",
    },
    {
      id: 4,
      name: "Nutmeg",
      price: "$199.00",
      regularPrice: "$405.00",
      image:
        "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200&h=200&fit=crop&crop=center",
      image2:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=200&fit=crop&crop=center",
      tag: "sale",
    },
    {
      id: 5,
      name: "Black Cardamom",
      price: "$569.00",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=200&fit=crop&crop=center",
      image2:
        "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200&h=200&fit=crop&crop=center",
    },
    {
      id: 7,
      name: "Dried Ginger",
      price: "$199.00",
      image:
        "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200&h=200&fit=crop&crop=center",
      image2:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=200&fit=crop&crop=center",
    },
    {
      id: 8,
      name: "Dried Ginger",
      price: "$199.00",
      image:
        "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200&h=200&fit=crop&crop=center",
      image2:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=200&fit=crop&crop=center",
    },
    {
      id: 9,
      name: "Pimento",
      price: "$629.00",
      regularPrice: "$700.00",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=200&fit=crop&crop=center",
      image2:
        "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200&h=200&fit=crop&crop=center",
      tag: "sale",
    },
    {
      id: 10,
      name: "Nutmeg",
      price: "$199.00",
      regularPrice: "$405.00",
      image:
        "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200&h=200&fit=crop&crop=center",
      image2:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=200&fit=crop&crop=center",
      tag: "sale",
    },
    {
      id: 11,
      name: "Black Cardamom",
      price: "$569.00",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=200&fit=crop&crop=center",
      image2:
        "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200&h=200&fit=crop&crop=center",
    },
  ];

  // Recommended products data
  const recommendedProducts = [
    {
      id: 6,
      name: "Black Cardamom",
      price: "$569.00",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=200&fit=crop&crop=center",
      image2:
        "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200&h=200&fit=crop&crop=center",
    },
    {
      id: 7,
      name: "Black Mustard",
      price: "$286.00",
      image:
        "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200&h=200&fit=crop&crop=center",
      image2:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=200&fit=crop&crop=center",
    },
    {
      id: 8,
      name: "Rosehip Berries",
      price: "$579.00",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=200&fit=crop&crop=center",
      image2:
        "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200&h=200&fit=crop&crop=center",
    },
    {
      id: 9,
      name: "Red Chilly",
      price: "$649.00",
      image:
        "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200&h=200&fit=crop&crop=center",
      image2:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=200&fit=crop&crop=center",
    },
    {
      id: 10,
      name: "Red Chilly",
      price: "$649.00",
      image:
        "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200&h=200&fit=crop&crop=center",
      image2:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=200&fit=crop&crop=center",
    },
    {
      id: 11,
      name: "Black Cardamom",
      price: "$569.00",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=200&fit=crop&crop=center",
      image2:
        "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200&h=200&fit=crop&crop=center",
    },
    {
      id: 12,
      name: "Black Mustard",
      price: "$286.00",
      image:
        "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200&h=200&fit=crop&crop=center",
      image2:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=200&fit=crop&crop=center",
    },
    {
      id: 13,
      name: "Rosehip Berries",
      price: "$579.00",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=200&fit=crop&crop=center",
      image2:
        "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200&h=200&fit=crop&crop=center",
    },
    {
      id: 14,
      name: "Red Chilly",
      price: "$649.00",
      image:
        "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200&h=200&fit=crop&crop=center",
      image2:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=200&fit=crop&crop=center",
    },
    {
      id: 15,
      name: "Red Chilly",
      price: "$649.00",
      image:
        "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200&h=200&fit=crop&crop=center",
      image2:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=200&fit=crop&crop=center",
    },
  ];

  const handleAddToCart = (product, quantity) => {
    addToCart({ ...product, qty: quantity });
  };

  const handleAddToWishlist = () => {
    addToWishlist(product);
  };

  return (
    <main className="min-h-screen bg-white py-8">
      <ContainerWrapper>
        <SectionWrapper>
          {/* Product Information Section */}
          <div className="mb-16 grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Product Image Gallery */}
            <ProductImageGallery product={product} />

            {/* Product Information */}
            <ProductInfo
              product={product}
              onAddToCart={handleAddToCart}
              onAddToWishlist={handleAddToWishlist}
            />
          </div>

          {/* Product Description Tabs */}
          <div className="mb-16">
            <ProductTabs />
          </div>

          {/* Related Products */}
          <div className="mb-16">
            <ProductsSection
              title="Related products"
              products={relatedProducts}
            />
          </div>

          {/* Recommended Products */}
          <div className="mb-16">
            <ProductsSection
              title="Recommended products"
              products={recommendedProducts}
            />
          </div>
        </SectionWrapper>
      </ContainerWrapper>
    </main>
  );
}

export default ProductDetails;
