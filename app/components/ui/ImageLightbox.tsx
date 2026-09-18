"use client";

import React, { useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { LUXURY_EASE } from "@/app/data/Animations";

export interface LightboxImageItem {
  src: string;
  alt: string;
  title?: string;
  subtitle?: string;
}

interface ImageLightboxProps {
  isOpen: boolean;
  images: LightboxImageItem[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

const ImageLightbox: React.FC<ImageLightboxProps> = ({
  isOpen,
  images,
  currentIndex,
  onClose,
  onNavigate,
}) => {
  const currentImage = images[currentIndex];

  const handlePrev = useCallback(() => {
    onNavigate((currentIndex - 1 + images.length) % images.length);
  }, [currentIndex, images.length, onNavigate]);

  const handleNext = useCallback(() => {
    onNavigate((currentIndex + 1) % images.length);
  }, [currentIndex, images.length, onNavigate]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose, handlePrev, handleNext]);

  return (
    <AnimatePresence>
      {isOpen && currentImage && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: LUXURY_EASE }}
          onClick={onClose}
        >
          {/* Top Bar: Counter & Close */}
          <div className="absolute top-6 inset-x-6 md:inset-x-10 flex items-center justify-between text-white/80 z-20 pointer-events-none">
            <div className="text-xs uppercase tracking-[0.25em] font-light bg-black/40 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-md pointer-events-auto">
              {String(currentIndex + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
            </div>

            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 hover:scale-105 active:scale-95 pointer-events-auto"
              aria-label="Close fullscreen view"
            >
              <X size={20} strokeWidth={1.5} />
            </button>
          </div>

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all duration-300 hover:scale-110 active:scale-95 z-20"
                aria-label="Previous image"
              >
                <ChevronLeft size={24} strokeWidth={1.5} />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all duration-300 hover:scale-110 active:scale-95 z-20"
                aria-label="Next image"
              >
                <ChevronRight size={24} strokeWidth={1.5} />
              </button>
            </>
          )}

          {/* Active Image Container */}
          <motion.div
            key={currentIndex}
            className="relative max-h-[82vh] max-w-[92vw] md:max-w-[85vw] flex flex-col items-center justify-center"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.4, ease: LUXURY_EASE }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-[90vw] md:w-[80vw] max-w-5xl h-[65vh] md:h-[75vh] overflow-hidden rounded-sm shadow-2xl">
              <Image
                src={currentImage.src}
                alt={currentImage.alt || "Villa image"}
                fill
                sizes="(max-width: 768px) 95vw, 85vw"
                className="object-contain"
                priority
              />
            </div>

            {/* Captions */}
            {(currentImage.title || currentImage.alt) && (
              <div className="mt-4 text-center text-white/90 max-w-xl">
                {currentImage.title && (
                  <h4 className="text-sm md:text-base font-light tracking-wider">
                    {currentImage.title}
                  </h4>
                )}
                {currentImage.alt && (
                  <p className="text-xs text-white/60 font-light mt-1 tracking-wide">
                    {currentImage.alt}
                  </p>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ImageLightbox;
