import EmblaCarousel2 from "../carousel/EmblaCarousel2";
import ContainerWrapper from "../common/ContainerWrapper";
import SectionWrapper from "../common/SectionWrapper";
import FeaturedProductCardSkeleton from "./FeaturedProductCardSkeleton";

const SLIDER_OPTIONS = { align: "start" };
const SLIDE_COUNT = 10;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

function SectionBestProductsSkeleton() {
  return (
    <SectionWrapper
      style={{
        backgroundImage:
          "url(https://waffy-demo.myshopify.com/cdn/shop/files/product-section-bg-img_1_1512x.jpg?v=1621593828)",
      }}
      className="bg-cover bg-no-repeat"
    >
      <ContainerWrapper>
        {/* Heading skeleton */}
        <div className="relative mb-16 flex flex-col items-center">
          <div className="bg-grey-200 mb-4 h-12 w-64 animate-pulse rounded" />
          <div className="bg-grey-200 h-5 w-lg animate-pulse rounded" />
        </div>

        {/* Button skeletons */}
        <div className="my-10 flex items-center justify-center gap-4">
          <div className="bg-grey-200 h-12 w-40 animate-pulse rounded-full" />
          <div className="bg-grey-200 h-12 w-40 animate-pulse rounded-full" />
        </div>

        {/* Carousel skeleton */}
        <div className="mx-auto w-full max-w-[68.5rem]">
          <EmblaCarousel2 options={SLIDER_OPTIONS}>
            {SLIDES.map((index) => (
              <FeaturedProductCardSkeleton key={index} />
            ))}
          </EmblaCarousel2>
        </div>
      </ContainerWrapper>
    </SectionWrapper>
  );
}

export default SectionBestProductsSkeleton;
