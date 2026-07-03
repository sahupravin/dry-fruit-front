import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from "./componenets/EmblaCarouselArrowButton";
import useEmblaCarousel from "embla-carousel-react";

const EmblaCarousel2 = ({ children, options }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <section className="embla m-auto w-full">
      <div className="embla__viewport relative overflow-hidden" ref={emblaRef}>
        <div className="embla__container flex w-full touch-pan-y touch-pinch-zoom gap-6 bg-white px-2 *:last-of-type:mr-2.5">
          {children}
        </div>

        <div className="embla__controls_buttons mt-8 flex items-center justify-center gap-2">
          <PrevButton
            onClick={onPrevButtonClick}
            disabled={prevBtnDisabled}
            className="!text-brand-700"
          />
          <NextButton
            onClick={onNextButtonClick}
            disabled={nextBtnDisabled}
            className="!text-brand-700"
          />
        </div>
      </div>
    </section>
  );
};

export default EmblaCarousel2;
