import { useRef } from "react";
import HeaderNav from "../HeaderNav";
import { LogoBig } from "../common/Logo";
import Breadcrumb from "../Breadcrumb";
import EmblaCarousel from "../carousel/EmblaCarousel";
import { useLocation } from "react-router";

const SLIDER_OPTIONS = { dragFree: false, loop: true, align: "start" };

export default function HeaderSkeleton() {
  const { pathname } = useLocation();
  const stickyNavRef = useRef(null);
  const isHome = pathname === "/";

  return (
    <header className="relative flex w-full items-center justify-center">
      <div className="absolute top-6 left-1/2 z-50 -translate-x-1/2">
        <LogoBig />
      </div>

      <HeaderNav isSticky={false} ref={stickyNavRef} />

      {isHome ? (
        <EmblaCarousel options={SLIDER_OPTIONS}>
          {Array.from({ length: 3 }).map((slide, index) => (
            <div
              className={`embla__slide relative min-w-0 pl-[var(--slide-spacing)]`}
              key={index}
            >
              <div className="from-grey-200 to-grey-300 absolute inset-0 animate-pulse bg-gradient-to-b" />
              <div className="embla__slide__number text-brand-400 flex min-h-[var(--slide-height)] items-center justify-center bg-transparent select-none">
                <div className="relative z-10 mt-28 flex flex-col items-center justify-center gap-4 p-5 text-center">
                  <div className="bg-grey-200/70 h-12 w-64 animate-pulse rounded sm:w-80 md:w-96" />
                  <div className="bg-grey-200/70 mx-auto h-12 w-64 animate-pulse rounded sm:w-80 md:w-[28rem]" />
                  <div className="flex items-center gap-3">
                    <div className="bg-grey-200/70 h-5 w-40 animate-pulse rounded" />
                    <div className="bg-grey-200/70 h-5 w-20 animate-pulse rounded" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </EmblaCarousel>
      ) : (
        <div
          className="relative mx-auto flex w-full items-end justify-center overflow-hidden pb-20"
          style={{ minHeight: `calc((var(--slide-height) + 3rem) / 2)` }}
        >
          <div className="from-grey-200 to-grey-300 absolute inset-0 animate-pulse bg-gradient-to-b" />
          <div className="text-brand-400 relative z-10 flex flex-col items-center">
            <Breadcrumb />
          </div>
        </div>
      )}
    </header>
  );
}
