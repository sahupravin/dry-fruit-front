import EmblaCarousel2 from "../carousel/EmblaCarousel2";
import ContainerWrapper from "../common/ContainerWrapper";
import FeaturedProductCard from "../common/FeaturedProductCard";
import SectionWrapper from "../common/SectionWrapper";
import Button from "../common/Button";
import SectionBestProductsSkeleton from "../skeletonLoaders/SectionBestProductsSkeleton";

const SLIDER_OPTIONS = { align: "center" };
const SLIDE_COUNT = 20;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

function SectionBestProducts() {
  const isLoading = false;
  if (isLoading) return <SectionBestProductsSkeleton />;

  return (
    <SectionWrapper
      style={{
        backgroundImage:
          "url(https://waffy-demo.myshopify.com/cdn/shop/files/product-section-bg-img_1_1512x.jpg?v=1621593828)",
      }}
      className="bg-cover bg-no-repeat"
    >
      <ContainerWrapper>
        <div className="relative mb-16 after:absolute after:-bottom-10 after:left-1/2 after:h-8 after:w-16 after:-translate-x-1/2 after:bg-[url('https://waffy-demo.myshopify.com/cdn/shop/files/heading-img_1.png?v=1621580212')] after:bg-contain after:bg-no-repeat after:content-['']">
          <h2 className="font-heading text-brand-500 mb-2 text-center text-5xl">
            Best Products
          </h2>
          <p className="text-center">
            Pellentesque massa placerat duis ultricies lacus sit sed.
          </p>
        </div>

        <div className="my-10 flex items-center justify-center gap-4">
          <Button variant="primary" size="large" textColor="black">
            Dried Seeds
          </Button>
          <Button
            variant="secondary"
            size="large"
            borderColor="secondary"
            textColor="black"
          >
            Dried Seeds
          </Button>
        </div>

        <div className="mx-auto w-full max-w-[68.5rem]">
          <EmblaCarousel2 options={SLIDER_OPTIONS}>
            {SLIDES.map((index) => (
              <FeaturedProductCard key={index} />
            ))}
          </EmblaCarousel2>
        </div>
      </ContainerWrapper>
    </SectionWrapper>
  );
}

export default SectionBestProducts;
