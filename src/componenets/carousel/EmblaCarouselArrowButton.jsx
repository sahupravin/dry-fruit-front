import React, { useCallback, useEffect, useState } from "react";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import useMediaQuery from "../../hooks/useMediaQuery";

// eslint-disable-next-line
export const usePrevNextButtons = (emblaApi) => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  }, [emblaApi]);

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback((emblaApi) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect).on("select", onSelect);
  }, [emblaApi, onSelect]);

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  };
};

export const PrevButton = (props) => {
  const isTouchDevice = useMediaQuery("(pointer: coarse) and (hover: none)");
  const { children, ...restProps } = props;

  return (
    <button
      className={`embla__button embla__button--prev hover:bg-brand-50 hover:text-brand-500 hover:border-brand-50 border-brand-500 ease-in-out" type="button absolute top-1/2 left-3 z-10 flex -translate-y-1/2 cursor-pointer touch-manipulation items-center justify-center rounded-full border-2 p-2 text-white shadow-lg transition-all duration-300 ease-in-out ${
        isTouchDevice && "hidden"
      }`}
      {...restProps}
    >
      <HiOutlineChevronLeft className="size-6 text-current" />
      {children}
    </button>
  );
};

export const NextButton = (props) => {
  const isTouchDevice = useMediaQuery("(pointer: coarse) and (hover: none)");
  const { children, ...restProps } = props;

  return (
    <button
      className={`embla__button embla__button--next border-brand-500 hover:bg-brand-50 hover:text-brand-500 hover:border-brand-50 absolute top-1/2 right-3 z-10 flex -translate-y-1/2 cursor-pointer touch-manipulation items-center justify-center rounded-full border-2 p-2 text-white shadow-lg transition-all duration-300 ease-in-out ${
        isTouchDevice && "hidden"
      }`}
      type="button"
      {...restProps}
    >
      <HiOutlineChevronRight className="size-6 text-current" />
      {children}
    </button>
  );
};
