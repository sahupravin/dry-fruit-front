import { useState, useMemo } from "react";
import EmblaCarousel2 from "../carousel/EmblaCarousel2";
import ContainerWrapper from "../common/ContainerWrapper";
import FeaturedProductCard from "../common/FeaturedProductCard";
import SectionWrapper from "../common/SectionWrapper";
import Button from "../common/Button";
import SectionBestProductsSkeleton from "../skeletonLoaders/SectionBestProductsSkeleton";
import { useBestProducts } from "../../hooks/home/useBestProducts";

const SLIDER_OPTIONS = { align: "center" };

const IMAGE_BASE = "https://jswprofilesheet.com/storage/";

function getProductDisplay(product) {
  const isVariable =
    product.type === "Variable" &&
    Array.isArray(product.variations) &&
    product.variations.length > 0;
  const firstVariation = isVariable ? product.variations[0] : null;
  const image = product.image
    ? `${IMAGE_BASE}${product.image.replace(/^\/+/, "")}`
    : firstVariation?.image
      ? `${IMAGE_BASE}${firstVariation.image.replace(/^\/+/, "")}`
      : null;
  const gallery = firstVariation?.gallery;
  const imageHover =
    Array.isArray(gallery) && gallery.length > 0
      ? `${IMAGE_BASE}${gallery[0].replace(/^\/+/, "")}`
      : image;
  const price =
    firstVariation?.discount_price ??
    firstVariation?.price ??
    product.discount_price ??
    product.price;
  const regularPrice =
    firstVariation?.price && firstVariation.discount_price
      ? firstVariation.price
      : product.price && product.discount_price
        ? product.price
        : null;
  return {
    id: product.id,
    title: product.name,
    salePrice: price != null ? String(price) : null,
    regularPrice: regularPrice != null ? String(regularPrice) : null,
    image,
    imageHover,
  };
}

function SectionBestProducts() {
  const { section, categories, isLoading, productsFailedOrEmpty } =
    useBestProducts();
  const [activeTab, setActiveTab] = useState(0);

  const tabs = useMemo(() => {
    if (!Array.isArray(categories) || categories.length === 0) return [];
    return categories.filter(
      (cat) => Array.isArray(cat.products) && cat.products.length > 0,
    );
  }, [categories]);

  const backgroundImage = useMemo(() => {
    if (!section) return undefined;
    const url = section.background_image;
    if (url) return { backgroundImage: `url(${url})` };
    return { backgroundColor: "#ffffff" };
  }, [section]);

  if (isLoading) return <SectionBestProductsSkeleton />;
  if (productsFailedOrEmpty || !tabs.length) return null;
  if (!section) return null;

  const activeProducts = tabs[activeTab]?.products ?? [];

  return (
    <SectionWrapper
      style={backgroundImage}
      className={section.background_image ? "bg-cover bg-no-repeat" : ""}
    >
      <ContainerWrapper>
        <div className="relative mb-16">
          <h2 className="font-heading text-brand-500 mb-2 text-center text-5xl">
            {section.title}
          </h2>
          {section.text ? (
            <p className="mx-auto max-w-2xl text-center">{section.text}</p>
          ) : null}
        </div>

        <div className="my-10 flex items-center justify-center gap-4">
          {tabs.map((tab, index) => (
            <Button
              key={tab.name || index}
              onClick={() => setActiveTab(index)}
              variant={activeTab === index ? "primary" : "secondary"}
              size="large"
              borderColor={activeTab === index ? "primary" : "secondary"}
              textColor="black"
              className="min-w-[150px] transition-all duration-300"
            >
              {tab.name || "Products"}
            </Button>
          ))}
        </div>

        <div className="mx-auto w-full max-w-[68.5rem]">
          <EmblaCarousel2 options={SLIDER_OPTIONS} key={activeTab}>
            {activeProducts.map((product, index) => {
              const display = getProductDisplay(product);
              return (
                <FeaturedProductCard
                  key={product.id || index}
                  productDetails={{
                    title: display.title,
                    salePrice: display.salePrice,
                    regularPrice: display.regularPrice,
                    id: display.id,
                  }}
                  productImage1={display.image}
                  productImage2={display.imageHover}
                  tag={product.tag}
                />
              );
            })}
          </EmblaCarousel2>
        </div>
      </ContainerWrapper>
    </SectionWrapper>
  );
}

export default SectionBestProducts;
