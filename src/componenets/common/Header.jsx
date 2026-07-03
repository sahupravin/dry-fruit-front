import { useEffect, useRef, useState } from "react";
import HeaderNav from "./../HeaderNav";
import EmblaCarousel from "../carousel/EmblaCarousel";
import { LogoBig } from "./Logo";
import { useLocation } from "react-router";
import Breadcrumb from "../Breadcrumb";
import HeaderSkeleton from "../skeletonLoaders/HeaderSkeleton";
import { useHeaderData } from "../../hooks/home/useHeaderData";

const dryFruitsSlides = [
  {
    id: 1,
    name: "Herbs & Spices",
    discount: "FLAT 10% OFF",
    couponCode: "ALM20",
    bgImage:
      "https://waffy-demo.myshopify.com/cdn/shop/files/slider1_1.jpg?v=1621575990",
  },
  {
    id: 2,
    name: "The choice of chefs",
    discount: "15% OFF ON SPICES",
    couponCode: "CAS15",
    bgImage:
      "https://waffy-demo.myshopify.com/cdn/shop/files/slider3_1.jpg?v=1621576043",
  },
  {
    id: 3,
    name: "All Organic Spices...",
    discount: "20% OFF ALL PRODUCTS",
    couponCode: "PIS25",
    bgImage:
      "https://waffy-demo.myshopify.com/cdn/shop/files/slider2_1.jpg?v=1621576096",
  },
];

const SLIDER_OPTIONS = { dragFree: false, loop: true, align: "start" };

function Header() {
  const headerRef = useRef(null);
  const stickyNavRef = useRef(null);
  const [isHeaderNavSticky, setIsHeaderNavSticky] = useState(false);
  const { pathname } = useLocation();
  const { isLoading, error } = useHeaderData();

  useEffect(() => {
    if (!headerRef.current || !stickyNavRef.current) return;

    const navHeight = stickyNavRef.current.getBoundingClientRect().height;

    const obsOptions = {
      root: null,
      threshold: 0,
      rootMargin: `-${navHeight}px`,
    };

    const obsCallback = (entries) => {
      const [entry] = entries;
      setIsHeaderNavSticky(!entry.isIntersecting);
    };

    const observer = new IntersectionObserver(obsCallback, obsOptions);
    observer.observe(headerRef.current);

    return () => observer.disconnect();
  }, []);

  if (isLoading) return <HeaderSkeleton />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <header
      ref={headerRef}
      className="relative flex w-full items-center justify-center"
    >
      <div className="absolute top-6 left-1/2 z-50 -translate-x-1/2">
        <LogoBig />
      </div>
      <HeaderNav isSticky={isHeaderNavSticky} ref={stickyNavRef} />

      {pathname === "/" ? (
        <EmblaCarousel options={SLIDER_OPTIONS}>
          {dryFruitsSlides.map((slide, index) => (
            <div
              className={`embla__slide min-w-0 bg-cover bg-center bg-no-repeat pl-[var(--slide-spacing)]`}
              style={{
                // backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.6)), url(${slide.bgImage})`,

                backgroundImage: `url(${slide.bgImage})`,
              }}
              key={index}
            >
              <div className="embla__slide__number text-brand-400 flex min-h-[var(--slide-height)] items-center justify-center bg-transparent select-none">
                <div className="relative z-10 mt-28 flex flex-col items-center justify-center gap-4 p-5 text-center">
                  <h1 className="font-heading mb-2 text-6xl tracking-wider">
                    {slide.name}
                  </h1>
                  <span className="text-brand-50 border-brand-500 mb-1 border-t border-b px-8 py-1 text-[2.8rem] leading-none tracking-wider uppercase">
                    {slide.discount}
                  </span>
                  <span className="text-[1.7rem] tracking-wider uppercase">
                    <span className="text-brand-50 mr-2">Use Coupon :</span>
                    <span className="font-medium">{slide.couponCode}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </EmblaCarousel>
      ) : (
        <div
          className="mx-auto flex w-full items-end justify-center bg-cover bg-fixed bg-center bg-no-repeat pb-20"
          style={{
            backgroundImage: `url(${dryFruitsSlides[2]?.bgImage})`,
            minHeight: `calc((var(--slide-height) + 3rem) / 2)`,
          }}
        >
          <div className="text-brand-400 flex flex-col items-center">
            <Breadcrumb />
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
