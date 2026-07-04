import { Link } from "react-router";

const AnimatedLines = () => {
  return (
    <>
      <div className="bg-brand-50 absolute top-0 left-0 z-10 h-1 w-0 transition-all duration-600 ease-out group-hover:w-full"></div>

      <div className="bg-brand-500 absolute right-0 bottom-0 z-10 h-1 w-0 transition-all duration-600 ease-out group-hover:w-full"></div>

      <div className="bg-brand-50 absolute top-0 right-0 z-10 h-0 w-1 transition-all duration-600 ease-out group-hover:h-full"></div>

      <div className="bg-brand-500 absolute bottom-0 left-0 z-10 h-0 w-1 transition-all duration-600 ease-out group-hover:h-full"></div>
    </>
  );
};

const ProductImage = ({
  productImage1 = "https://waffy-demo.myshopify.com/cdn/shop/products/34.jpg?v=1542094976",
  productImage2 = "https://waffy-demo.myshopify.com/cdn/shop/products/26.jpg?v=1542094187",
}) => {
  return (
    <div className="h-56 w-full overflow-hidden">
      <Link to="#" className="flex h-full w-full items-center">
        <div className="relative h-full w-full *:transition-opacity *:duration-600 *:ease-out">
          <img
            src={productImage1}
            alt="Product image 1"
            className="absolute top-1/2 left-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 object-cover opacity-100 group-hover:opacity-0"
          />
          <img
            src={productImage2}
            alt="Product image 2"
            className="absolute top-1/2 left-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 object-cover opacity-0 group-hover:opacity-100"
          />
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

function FeaturedProductCard() {
  return (
    <article className="group relative m-0.5 w-full max-w-[12rem] cursor-grab bg-white drop-shadow-sm">
      <AnimatedLines />
      <ProductImage />
      <ProductDetails />
    </article>
  );
}

export default FeaturedProductCard;
