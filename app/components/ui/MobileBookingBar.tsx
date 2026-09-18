"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { COLORS } from "@/app/theme/colors";
import { LUXURY_EASE } from "@/app/data/Animations";
import { CalendarDays } from "lucide-react";

interface MobileBookingBarProps {
  villaName?: string;
  reserveUrl?: string;
  priceNote?: string;
}

const MobileBookingBar: React.FC<MobileBookingBarProps> = ({
  villaName = "Ayada Cliff",
  reserveUrl = "/reserve",
  priceNote = "Private Pool Villa Sanctuary",
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Show after scrolling past 300px (typically hero height on mobile)
          const pastHero = window.scrollY > 320;
          // Hide near footer to avoid overlapping
          const isNearBottom =
            window.innerHeight + window.scrollY >=
            document.documentElement.scrollHeight - 150;

          setIsVisible(pastHero && !isNearBottom);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-white/95 backdrop-blur-lg border-t border-stone-200/70 px-4 py-3 shadow-[0_-4px_24px_rgba(0,0,0,0.08)]"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.35, ease: LUXURY_EASE }}
        >
          <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
            <div className="flex flex-col min-w-0 pr-2">
              <span
                className="text-xs font-medium tracking-wide truncate"
                style={{ color: COLORS.primary }}
              >
                {villaName}
              </span>
              <span className="text-[10px] text-stone-500 font-light truncate">
                {priceNote}
              </span>
            </div>

            <Link
              href={reserveUrl}
              className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-sm text-xs uppercase tracking-widest font-medium text-white shadow-sm transition-all duration-300 active:scale-95 flex-shrink-0"
              style={{ backgroundColor: COLORS.primary }}
            >
              <CalendarDays size={13} strokeWidth={1.75} />
              <span>Reserve</span>
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileBookingBar;
