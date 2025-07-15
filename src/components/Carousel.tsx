import React, { ReactNode, useState } from "react";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { autoplayPlugin } from "../utils/keenAutoplayPlugin";

type CarouselProps = {
  slides: ReactNode[];
};

export default function Carousel({ slides }: CarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
      slides: { perView: 1 },
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel);
      },
    },
    [autoplayPlugin]
  );

  return (
    <div>
      <div ref={sliderRef} className="keen-slider rounded-2xl overflow-hidden shadow">
        {slides.map((slide, idx) => (
          <div key={idx} className="keen-slider__slide">
            {slide}
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-4 space-x-2">
        {[...Array(instanceRef.current?.track.details.slides.length || 0).keys()].map((idx) => (
          <button
            key={idx}
            onClick={() => instanceRef.current?.moveToIdx(idx)}
            className={`w-3 h-3 rounded-full transition-colors cursor-pointer ${
              currentSlide === idx ? "bg-green-600" : "bg-green-300"
            }`}
            aria-label={`Ir a slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
