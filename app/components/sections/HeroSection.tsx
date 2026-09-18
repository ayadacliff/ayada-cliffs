"use client";
import React, { useState, useEffect } from "react";
import { ArrowDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { LUXURY_EASE } from "@/app/data/Animations";

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Ensure animation starts gracefully if image is cached
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative h-screen overflow-hidden bg-black select-none">
      {/* Background with Ken Burns Slow Zoom */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.08, opacity: 0 }}
          animate={{
            scale: isLoaded ? 1 : 1.08,
            opacity: isLoaded ? 1 : 0,
          }}
          transition={{ duration: 2.2, ease: [0.25, 1, 0.5, 1] }}
        >
          <Image
            src="/images/hero-bg (1).webp"
            alt="Hero Background"
            fill
            priority
            sizes="100vw"
            className="object-cover"
            onLoad={() => setIsLoaded(true)}
          />
          <div className="absolute inset-0 bg-black/45" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/60" />
        </motion.div>
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
        <div className="container mx-auto flex max-w-4xl flex-col items-center text-center">
          {/* Divider hairline */}
          <motion.div
            className="mb-6 h-px bg-white/70"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: isLoaded ? 64 : 0, opacity: isLoaded ? 0.75 : 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: LUXURY_EASE }}
          />

          {/* Tagline */}
          <motion.span
            className="mb-6 text-xs uppercase tracking-[0.3em] font-light text-white/90"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: isLoaded ? 0.9 : 0, y: isLoaded ? 0 : 12 }}
            transition={{ duration: 0.9, delay: 0.35, ease: LUXURY_EASE }}
          >
            A Sanctuary of Tranquility
          </motion.span>

          {/* Typography Logo */}
          <motion.div
            className="mb-8 w-72 md:w-[44vw] max-w-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 1.1, delay: 0.5, ease: LUXURY_EASE }}
          >
            <Image
              src="/images/logo/ayadaclifflogotypo-white.png"
              alt="AYADA CLIFF"
              width={500}
              height={300}
              className="w-full h-auto drop-shadow-sm"
              priority
            />
          </motion.div>

          {/* Subtitle / Location */}
          <motion.p
            className="mb-10 text-sm md:text-base font-light tracking-widest text-white/85 max-w-xl leading-relaxed"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: isLoaded ? 0.85 : 0, y: isLoaded ? 0 : 16 }}
            transition={{ duration: 1.0, delay: 0.65, ease: LUXURY_EASE }}
          >
            Luxury Private Pool Beach Villas — Varkala, Kerala
          </motion.p>

          {/* Action Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 0.9, delay: 0.8, ease: LUXURY_EASE }}
          >
            <Link
              href="/reserve"
              className="group relative inline-flex items-center justify-center overflow-hidden border border-white/40 px-10 py-3 text-xs tracking-[0.25em] uppercase text-white transition-all duration-500 hover:border-white hover:bg-white/10 hover:shadow-[0_0_24px_rgba(255,255,255,0.2)]"
            >
              <span className="relative z-10 transition-transform duration-300 group-hover:scale-105">
                Reserve Now
              </span>
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 0.8 : 0 }}
        transition={{ duration: 1.0, delay: 1.1 }}
      >
        <button
          onClick={() => {
            window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
          }}
          className="group flex cursor-pointer flex-col items-center focus-visible:outline-none"
          aria-label="Scroll to discover"
        >
          <span className="mb-2 text-[10px] tracking-[0.25em] uppercase text-white/70 transition-colors group-hover:text-white">
            Discover
          </span>
          <div className="relative h-9 w-px overflow-hidden bg-white/20">
            <motion.div
              className="h-4 w-full bg-white/80"
              animate={{ y: [-16, 36] }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
          <ArrowDown
            size={14}
            className="mt-1 text-white/70 transition-all duration-300 group-hover:translate-y-0.5 group-hover:text-white"
            strokeWidth={1.5}
          />
        </button>
      </motion.div>
    </section>
  );
};

export default HeroSection;
