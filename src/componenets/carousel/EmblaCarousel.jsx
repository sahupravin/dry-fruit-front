import { DotButton, useDotButton } from "./componenets/EmbalaCarouselDotButton";
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from "./componenets/EmblaCarouselArrowButton";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import useMediaQuery from "../../hooks/useMediaQuery";

const EmblaCarousel = ({ children, options }) => {
  const isTouchDevice = useMediaQuery("(pointer: coarse) and (hover: none)");
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({
      playOnInit: true,
      stopOnInteraction: false,
      delay: 6000,
    }),
  ]);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <section className="embla m-auto w-full">
      <div className="embla__viewport relative overflow-hidden" ref={emblaRef}>
        <div className="embla__container ml-[calc(var(--slide-spacing)*-1)] flex touch-pan-y touch-pinch-zoom">
          {children}
        </div>

        <div className="embla__dots md absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center justify-center gap-2 md:left-24 md:translate-x-0">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              aria-current={index === selectedIndex ? "true" : "false"}
              className={`embla__dot ${index === selectedIndex ? "embla__dot--selected" : ""}`}
            />
          ))}
        </div>

        <div
          className={`absolute top-1/2 left-3 z-10 -translate-y-1/2 ${isTouchDevice && "hidden"}`}
        >
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
        </div>
        <div
          className={`absolute top-1/2 right-3 z-10 -translate-y-1/2 ${isTouchDevice && "hidden"}`}
        >
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>
    </section>
  );
};

export default EmblaCarousel;
