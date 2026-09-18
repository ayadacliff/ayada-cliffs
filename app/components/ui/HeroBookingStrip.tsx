"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Calendar, Users, Home, ChevronDown, ArrowRight } from "lucide-react";
import { COLORS } from "@/app/theme/colors";
import { LUXURY_EASE } from "@/app/data/Animations";
import { VILLAS } from "@/app/data/Villas";

const HeroBookingStrip = () => {
  const router = useRouter();

  // Tomorrow as default arrival, 3 days after as departure
  const today = new Date();
  const defaultCheckIn = new Date(today);
  defaultCheckIn.setDate(today.getDate() + 1);
  const defaultCheckOut = new Date(today);
  defaultCheckOut.setDate(today.getDate() + 3);

  const formatDateInput = (date: Date) => {
    return date.toISOString().split("T")[0];
  };

  const [checkIn, setCheckIn] = useState<string>(formatDateInput(defaultCheckIn));
  const [checkOut, setCheckOut] = useState<string>(formatDateInput(defaultCheckOut));
  const [selectedVillaId, setSelectedVillaId] = useState<string>("1");
  const [guests, setGuests] = useState<number>(2);

  const handleCheckAvailability = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate with query params
    router.push(
      `/reserve?villa=${selectedVillaId}&arrival=${checkIn}&departure=${checkOut}&guests=${guests}`
    );
  };

  const minDate = formatDateInput(today);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.9, ease: LUXURY_EASE }}
      className="w-full max-w-5xl px-4"
    >
      <form
        onSubmit={handleCheckAvailability}
        className="mx-auto rounded-sm border border-white/20 bg-black/40 p-2 shadow-[0_16px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-2.5 md:bg-white/15 md:p-3"
      >
        <div className="grid grid-cols-2 gap-1.5 sm:gap-2 md:grid-cols-4 md:items-center">
          {/* Villa Choice */}
          <div className="relative col-span-2 rounded-sm bg-black/40 px-3 py-1.5 transition-colors hover:bg-black/50 sm:py-2 md:col-span-1 md:px-4 md:py-2.5">
            <div className="flex items-center gap-1.5 text-[9px] font-light tracking-widest text-white/70 uppercase md:text-[10px]">
              <Home size={11} />
              <span>Sanctuary</span>
            </div>
            <select
              value={selectedVillaId}
              onChange={(e) => setSelectedVillaId(e.target.value)}
              className="mt-0.5 w-full cursor-pointer appearance-none bg-transparent text-xs font-light tracking-wide text-white focus:outline-none"
            >
              {VILLAS.map((v) => (
                <option
                  key={v.id}
                  value={v.id}
                  className="bg-stone-900 text-white"
                >
                  {v.name}
                </option>
              ))}
            </select>
            <ChevronDown
              size={13}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/50"
            />
          </div>

          {/* Check-In Date */}
          <div className="relative col-span-1 rounded-sm bg-black/40 px-3 py-1.5 transition-colors hover:bg-black/50 sm:py-2 md:px-4 md:py-2.5">
            <div className="flex items-center gap-1.5 text-[9px] font-light tracking-widest text-white/70 uppercase md:text-[10px]">
              <Calendar size={11} />
              <span>Check-In</span>
            </div>
            <input
              type="date"
              min={minDate}
              value={checkIn}
              onChange={(e) => {
                setCheckIn(e.target.value);
                if (e.target.value >= checkOut) {
                  const nextDay = new Date(e.target.value);
                  nextDay.setDate(nextDay.getDate() + 1);
                  setCheckOut(formatDateInput(nextDay));
                }
              }}
              className="mt-0.5 w-full cursor-pointer bg-transparent text-xs font-light tracking-wider text-white [color-scheme:dark] focus:outline-none"
            />
          </div>

          {/* Check-Out Date */}
          <div className="relative col-span-1 rounded-sm bg-black/40 px-3 py-1.5 transition-colors hover:bg-black/50 sm:py-2 md:px-4 md:py-2.5">
            <div className="flex items-center gap-1.5 text-[9px] font-light tracking-widest text-white/70 uppercase md:text-[10px]">
              <Calendar size={11} />
              <span>Check-Out</span>
            </div>
            <input
              type="date"
              min={checkIn || minDate}
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="mt-0.5 w-full cursor-pointer bg-transparent text-xs font-light tracking-wider text-white [color-scheme:dark] focus:outline-none"
            />
          </div>

          {/* Guests & Submit Button */}
          <div className="col-span-2 flex items-center gap-1.5 sm:gap-2 md:col-span-1">
            <div className="relative flex-[1] rounded-sm bg-black/40 px-2.5 py-1.5 transition-colors hover:bg-black/50 sm:py-2 md:px-3 md:py-2.5">
              <div className="flex items-center gap-1.5 text-[9px] font-light tracking-widest text-white/70 uppercase md:text-[10px]">
                <Users size={11} />
                <span>Guests</span>
              </div>
              <select
                value={guests}
                onChange={(e) => setGuests(parseInt(e.target.value))}
                className="mt-0.5 w-full cursor-pointer appearance-none bg-transparent text-xs font-light tracking-wide text-white focus:outline-none"
              >
                {[1, 2, 3].map((num) => (
                  <option
                    key={num}
                    value={num}
                    className="bg-stone-900 text-white"
                  >
                    {num} Guest{num > 1 ? "s" : ""}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={13}
                className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-white/50"
              />
            </div>

            <button
              type="submit"
              className="group flex flex-[1.4] h-[40px] sm:h-[44px] md:h-[52px] items-center justify-center gap-1.5 rounded-sm px-3 text-xs font-medium tracking-[0.18em] uppercase text-white shadow-lg transition-all duration-300 hover:brightness-110 active:scale-95 md:gap-2 md:px-4"
              style={{ backgroundColor: COLORS.primary }}
            >
              <span className="truncate">Check</span>
              <ArrowRight
                size={13}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>
          </div>
        </div>
      </form>
    </motion.div>
  );
};

export default HeroBookingStrip;
