"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 150);

    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-white"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="flex flex-col items-center justify-center px-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          className="relative mb-5 h-16 w-44 md:h-20 md:w-56"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 12 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src="/images/logo/ayadaclifflogo.png"
            alt="AYADA CLIFF"
            fill
            priority
            className="object-contain"
          />
        </motion.div>

        <motion.div
          className="h-px bg-[#84321F]"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: isVisible ? 56 : 0, opacity: isVisible ? 0.7 : 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeInOut" }}
        />

        <motion.span
          className="mt-4 text-[10px] uppercase tracking-[0.3em] text-[#84321F]/70 font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 0.8 : 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
        >
          Varkala • Kerala
        </motion.span>
      </motion.div>
    </motion.div>
  );
}

