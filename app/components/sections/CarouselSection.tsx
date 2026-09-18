import React, { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CAROUSELITEMS } from "../../data/CarouselItems";
import { COLORS } from "../../theme/colors";
import { LUXURY_EASE } from "../../data/Animations";
import Image from "next/image";

const sliderVariants = {
  incoming: (direction: number) => ({
    x: direction > 0 ? "15%" : "-15%",
    opacity: 0,
    scale: 0.98,
  }),
  active: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? "-15%" : "15%",
    opacity: 0,
    scale: 0.98,
  }),
};

const sliderTransition = {
  duration: 0.7,
  ease: LUXURY_EASE,
};

const descriptionVariants = {
  incoming: {
    opacity: 0,
    y: 12,
  },
  active: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.15,
      duration: 0.5,
      ease: LUXURY_EASE,
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: {
      duration: 0.25,
      ease: "easeIn",
    },
  },
};

export default function CarouselSection() {
  const [[imageCount, direction], setImageCount] = useState([0, 0]);
  const [isPaused, setIsPaused] = useState(false);

  const wrap = (min: number, max: number, value: number): number => {
    const range = max - min;
    return ((((value - min) % range) + range) % range) + min;
  };

  const activeImageIndex = wrap(0, CAROUSELITEMS.length, imageCount);
  const activeImage = CAROUSELITEMS[activeImageIndex];

  const swipeToImage = useCallback((swipeDirection: number) => {
    setImageCount(([curr]) => [curr + swipeDirection, swipeDirection]);
  }, []);

  // Auto-play timer
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      swipeToImage(1);
    }, 6000);

    return () => clearInterval(timer);
  }, [isPaused, swipeToImage]);

  const dragEndHandler = useCallback((dragInfo: { offset: { x: number } }) => {
    const draggedDistance = dragInfo.offset.x;
    const swipeThreshold = 40;

    if (draggedDistance > swipeThreshold) {
      swipeToImage(-1);
    } else if (draggedDistance < -swipeThreshold) {
      swipeToImage(1);
    }
  }, [swipeToImage]);

  return (
    <section
      style={{ backgroundColor: COLORS.secondary }}
      className="flex min-h-screen w-full flex-col items-center justify-center px-4 md:px-8 py-24 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Header */}
      <motion.div
        className="mb-14 max-w-2xl text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: LUXURY_EASE }}
      >
        <div className="mb-5 flex items-center justify-center gap-3">
          <div
            className="h-px w-10 opacity-30"
            style={{ backgroundColor: COLORS.primary }}
          />
          <span
            className="text-xs font-light tracking-[0.25em] uppercase"
            style={{ color: COLORS.primary }}
          >
            Experiences
          </span>
          <div
            className="h-px w-10 opacity-30"
            style={{ backgroundColor: COLORS.primary }}
          />
        </div>

        <h2
          className="mb-5 text-3xl font-light tracking-wide md:text-4xl lg:text-5xl"
          style={{ color: COLORS.primary }}
        >
          Take Your Time Out With Us
        </h2>

        <p
          className="text-base leading-relaxed font-light text-stone-700/85 md:text-lg"
        >
          Immerse yourself in the wonders of Varkala and its surrounding treasures
        </p>
      </motion.div>

      {/* Carousel Container */}
      <div className="relative h-[480px] sm:h-[540px] md:h-[620px] w-full max-w-6xl">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={imageCount}
            custom={direction}
            variants={sliderVariants}
            initial="incoming"
            animate="active"
            exit="exit"
            transition={sliderTransition}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={(_, dragInfo) => dragEndHandler(dragInfo)}
            className="absolute inset-0 flex cursor-grab items-center justify-center active:cursor-grabbing select-none"
          >
            <div className="relative h-full w-full rounded-sm overflow-hidden shadow-2xl">
              {/* Main Image */}
              <Image
                src={activeImage.imageSrc}
                alt={activeImage.title || "Carousel image"}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 85vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

              {/* Responsive Description Card */}
              <motion.div
                key={`desc-${imageCount}`}
                variants={descriptionVariants}
                initial="incoming"
                animate="active"
                exit="exit"
                className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 md:left-auto md:right-8 md:bottom-8 md:max-w-md z-20"
              >
                <div
                  className="rounded-sm border border-stone-200/50 p-6 md:p-8 shadow-xl backdrop-blur-md"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.92)",
                  }}
                >
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-[10px] tracking-[0.25em] uppercase text-stone-500 font-light">
                      0{activeImageIndex + 1} / 0{CAROUSELITEMS.length}
                    </span>
                  </div>

                  <h3
                    className="mb-3 text-xl md:text-2xl font-light tracking-wide"
                    style={{ color: COLORS.primary }}
                  >
                    {activeImage.title}
                  </h3>

                  <p
                    className="text-xs md:text-sm leading-relaxed font-light text-stone-600"
                  >
                    {activeImage.description}
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <div className="mt-10 flex flex-col items-center gap-6">
        <div className="flex items-center justify-center gap-6 md:gap-8">
          <button
            onClick={() => swipeToImage(-1)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-light tracking-widest uppercase transition-opacity duration-300 hover:opacity-70 focus-visible:outline-none"
            style={{ color: COLORS.primary }}
            aria-label="Previous slide"
          >
            <ChevronLeft size={16} />
            <span>Prev</span>
          </button>

          {/* Progress Indicators */}
          <div className="flex items-center gap-2">
            {CAROUSELITEMS.map((_, index) => {
              const isActive = index === activeImageIndex;
              return (
                <button
                  key={index}
                  onClick={() =>
                    setImageCount([index, index > activeImageIndex ? 1 : -1])
                  }
                  className={`h-1 rounded-full transition-all duration-500 ${
                    isActive ? "w-8 opacity-100" : "w-3 opacity-35 hover:opacity-70"
                  }`}
                  style={{ backgroundColor: COLORS.primary }}
                  aria-label={`Go to slide ${index + 1}`}
                />
              );
            })}
          </div>

          <button
            onClick={() => swipeToImage(1)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-light tracking-widest uppercase transition-opacity duration-300 hover:opacity-70 focus-visible:outline-none"
            style={{ color: COLORS.primary }}
            aria-label="Next slide"
          >
            <span>Next</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}