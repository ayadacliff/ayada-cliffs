"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar as CalendarIcon,
  Users,
  Home,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Check,
} from "lucide-react";
import { LUXURY_EASE } from "@/app/data/Animations";
import { VILLAS } from "@/app/data/Villas";

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const DAYS_OF_WEEK = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const HeroBookingStrip = () => {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  // Default dates: tomorrow as check-in, 2 nights later as check-out
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const defaultCheckIn = new Date(today);
  defaultCheckIn.setDate(today.getDate() + 1);

  const defaultCheckOut = new Date(today);
  defaultCheckOut.setDate(today.getDate() + 3);

  const [checkInDate, setCheckInDate] = useState<Date>(defaultCheckIn);
  const [checkOutDate, setCheckOutDate] = useState<Date>(defaultCheckOut);
  const [selectedVillaId, setSelectedVillaId] = useState<string>("1");
  const [guests, setGuests] = useState<number>(2);

  // Active popover state: null | "sanctuary" | "dates" | "guests"
  const [activeDropdown, setActiveDropdown] = useState<
    null | "sanctuary" | "dates" | "guests"
  >(null);

  // Target date being selected in calendar ("in" or "out")
  const [calendarTarget, setCalendarTarget] = useState<"in" | "out">("in");

  // Current month displayed in the calendar popover
  const [viewMonth, setViewMonth] = useState<Date>(
    new Date(defaultCheckIn.getFullYear(), defaultCheckIn.getMonth(), 1)
  );

  // Close popovers on click outside or Escape key
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setActiveDropdown(null);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveDropdown(null);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const formatDateDisplay = (date: Date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const formatDateParam = (date: Date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const isSameDay = (d1: Date, d2: Date) => {
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  };

  const isDateInRange = (date: Date) => {
    return date > checkInDate && date < checkOutDate;
  };

  const handleDateClick = (date: Date) => {
    if (date < today) return;

    if (calendarTarget === "in") {
      setCheckInDate(date);
      // If new checkIn is on or after checkOut, adjust checkOut to next day
      if (date >= checkOutDate) {
        const nextDay = new Date(date);
        nextDay.setDate(date.getDate() + 1);
        setCheckOutDate(nextDay);
      }
      // Switch target to checkout for quick two-click selection
      setCalendarTarget("out");
    } else {
      if (date <= checkInDate) {
        // If clicked date is before checkIn, make it new checkIn
        setCheckInDate(date);
        const nextDay = new Date(date);
        nextDay.setDate(date.getDate() + 1);
        setCheckOutDate(nextDay);
        setCalendarTarget("out");
      } else {
        setCheckOutDate(date);
        // Completed selection
        setActiveDropdown(null);
      }
    }
  };

  const handleCheckAvailability = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(
      `/reserve?villa=${selectedVillaId}&arrival=${formatDateParam(
        checkInDate
      )}&departure=${formatDateParam(checkOutDate)}&guests=${guests}`
    );
  };

  // Calendar calculations
  const year = viewMonth.getFullYear();
  const month = viewMonth.getMonth();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => {
    const prev = new Date(year, month - 1, 1);
    // Don't allow navigating to past months before current month
    if (
      prev.getFullYear() < today.getFullYear() ||
      (prev.getFullYear() === today.getFullYear() &&
        prev.getMonth() < today.getMonth())
    ) {
      return;
    }
    setViewMonth(prev);
  };

  const nextMonth = () => {
    setViewMonth(new Date(year, month + 1, 1));
  };

  const isPrevMonthDisabled =
    year === today.getFullYear() && month === today.getMonth();

  const selectedVilla =
    VILLAS.find((v) => v.id.toString() === selectedVillaId) || VILLAS[0];

  const totalNights = Math.max(
    1,
    Math.round(
      (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)
    )
  );

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.9, ease: LUXURY_EASE }}
      className="relative w-full max-w-5xl px-4 z-40"
    >
      <form
        onSubmit={handleCheckAvailability}
        className="relative mx-auto flex flex-col md:flex-row items-stretch md:items-center gap-2 rounded-lg border border-white/20 bg-black/50 p-2 shadow-[0_16px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl"
      >
        {/* 1. Sanctuary Choice */}
        <div className="relative flex-[1.3] min-w-[200px]">
          <button
            type="button"
            onClick={() =>
              setActiveDropdown(
                activeDropdown === "sanctuary" ? null : "sanctuary"
              )
            }
            className={`flex h-[52px] w-full flex-col justify-center rounded bg-white/5 px-3.5 py-1.5 text-left transition-colors hover:bg-white/10 active:scale-[0.99] ${
              activeDropdown === "sanctuary" ? "bg-white/10 ring-1 ring-[#84321F]" : ""
            }`}
          >
            <div className="flex items-center gap-1.5 text-[9.5px] font-light tracking-widest text-white/70 uppercase">
              <Home size={11} className="text-[#84321F]" />
              <span>Sanctuary</span>
            </div>
            <div className="mt-0.5 flex items-center justify-between">
              <span className="truncate text-xs font-light tracking-wide text-white">
                {selectedVilla.name}
              </span>
              <ChevronDown
                size={13}
                className={`text-white/50 transition-transform duration-200 ${
                  activeDropdown === "sanctuary" ? "rotate-180" : ""
                }`}
              />
            </div>
          </button>

          {/* Custom Sanctuary Dropdown Menu */}
          <AnimatePresence>
            {activeDropdown === "sanctuary" && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                transition={{ duration: 0.15 }}
                className="absolute bottom-full left-0 mb-2 w-72 sm:w-80 rounded-lg border border-white/20 bg-[#161413]/98 p-1.5 shadow-2xl backdrop-blur-xl z-50"
              >
                <p className="px-3 pt-2 pb-1 text-[10px] font-medium tracking-[0.2em] uppercase text-[#84321F]">
                  Select Sanctuary
                </p>
                <div className="space-y-1">
                  {VILLAS.map((v) => {
                    const isSelected = v.id.toString() === selectedVillaId;
                    return (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => {
                          setSelectedVillaId(v.id.toString());
                          setActiveDropdown(null);
                        }}
                        className={`flex w-full items-center justify-between rounded px-3 py-2 text-left transition-colors ${
                          isSelected
                            ? "bg-[#84321F] text-white"
                            : "text-stone-300 hover:bg-white/10"
                        }`}
                      >
                        <div>
                          <p className="text-xs font-medium tracking-wide">
                            {v.name}
                          </p>
                          <p
                            className={`text-[10px] ${
                              isSelected ? "text-white/80" : "text-stone-400"
                            }`}
                          >
                            {v.id === 1
                              ? "Clifftop Infinity Pool · Sunset Views"
                              : "Private Pool & Garden · Ocean Views"}
                          </p>
                        </div>
                        {isSelected && <Check size={14} className="text-white" />}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 2. Check-In Date */}
        <div className="relative flex-1 min-w-[140px]">
          <button
            type="button"
            onClick={() => {
              setCalendarTarget("in");
              setViewMonth(
                new Date(
                  checkInDate.getFullYear(),
                  checkInDate.getMonth(),
                  1
                )
              );
              setActiveDropdown(
                activeDropdown === "dates" && calendarTarget === "in"
                  ? null
                  : "dates"
              );
            }}
            className={`flex h-[52px] w-full flex-col justify-center rounded bg-white/5 px-3.5 py-1.5 text-left transition-colors hover:bg-white/10 active:scale-[0.99] ${
              activeDropdown === "dates" && calendarTarget === "in"
                ? "bg-white/10 ring-1 ring-[#84321F]"
                : ""
            }`}
          >
            <div className="flex items-center gap-1.5 text-[9.5px] font-light tracking-widest text-white/70 uppercase">
              <CalendarIcon size={11} className="text-[#84321F]" />
              <span>Check-In</span>
            </div>
            <div className="mt-0.5">
              <span className="truncate text-xs font-light tracking-wider text-white">
                {formatDateDisplay(checkInDate)}
              </span>
            </div>
          </button>
        </div>

        {/* 3. Check-Out Date */}
        <div className="relative flex-1 min-w-[140px]">
          <button
            type="button"
            onClick={() => {
              setCalendarTarget("out");
              setViewMonth(
                new Date(
                  checkOutDate.getFullYear(),
                  checkOutDate.getMonth(),
                  1
                )
              );
              setActiveDropdown(
                activeDropdown === "dates" && calendarTarget === "out"
                  ? null
                  : "dates"
              );
            }}
            className={`flex h-[52px] w-full flex-col justify-center rounded bg-white/5 px-3.5 py-1.5 text-left transition-colors hover:bg-white/10 active:scale-[0.99] ${
              activeDropdown === "dates" && calendarTarget === "out"
                ? "bg-white/10 ring-1 ring-[#84321F]"
                : ""
            }`}
          >
            <div className="flex items-center gap-1.5 text-[9.5px] font-light tracking-widest text-white/70 uppercase">
              <CalendarIcon size={11} className="text-[#84321F]" />
              <span>Check-Out</span>
            </div>
            <div className="mt-0.5">
              <span className="truncate text-xs font-light tracking-wider text-white">
                {formatDateDisplay(checkOutDate)}
              </span>
            </div>
          </button>
        </div>

        {/* 4. Guests */}
        <div className="relative flex-[0.85] min-w-[120px]">
          <button
            type="button"
            onClick={() =>
              setActiveDropdown(
                activeDropdown === "guests" ? null : "guests"
              )
            }
            className={`flex h-[52px] w-full flex-col justify-center rounded bg-white/5 px-3 py-1.5 text-left transition-colors hover:bg-white/10 active:scale-[0.99] ${
              activeDropdown === "guests" ? "bg-white/10 ring-1 ring-[#84321F]" : ""
            }`}
          >
            <div className="flex items-center gap-1.5 text-[9.5px] font-light tracking-widest text-white/70 uppercase">
              <Users size={11} className="text-[#84321F]" />
              <span>Guests</span>
            </div>
            <div className="mt-0.5 flex items-center justify-between">
              <span className="whitespace-nowrap text-xs font-light tracking-wide text-white">
                {guests} Guest{guests > 1 ? "s" : ""}
              </span>
              <ChevronDown
                size={13}
                className={`text-white/50 transition-transform duration-200 ${
                  activeDropdown === "guests" ? "rotate-180" : ""
                }`}
              />
            </div>
          </button>

          {/* Guests Dropdown Popover */}
          <AnimatePresence>
            {activeDropdown === "guests" && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                transition={{ duration: 0.15 }}
                className="absolute bottom-full left-0 mb-2 w-44 rounded-lg border border-white/20 bg-[#161413]/98 p-1.5 shadow-2xl backdrop-blur-xl z-50"
              >
                <p className="px-3 pt-2 pb-1 text-[10px] font-medium tracking-[0.2em] uppercase text-[#84321F]">
                  Guests
                </p>
                <div className="space-y-1">
                  {[1, 2, 3, 4, 5, 6].map((num) => {
                    const isSelected = guests === num;
                    return (
                      <button
                        key={num}
                        type="button"
                        onClick={() => {
                          setGuests(num);
                          setActiveDropdown(null);
                        }}
                        className={`flex w-full items-center justify-between rounded px-3 py-2 text-xs transition-colors ${
                          isSelected
                            ? "bg-[#84321F] font-medium text-white"
                            : "text-stone-300 hover:bg-white/10"
                        }`}
                      >
                        <span>
                          {num} Guest{num > 1 ? "s" : ""}
                        </span>
                        {isSelected && (
                          <Check size={14} className="text-white" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 5. Check Button */}
        <div className="flex-shrink-0">
          <button
            type="submit"
            className="group flex h-[52px] items-center justify-center gap-2 rounded bg-[#84321F] px-6 text-xs font-medium tracking-[0.18em] uppercase text-white shadow-lg transition-all duration-300 hover:bg-[#9B3C25] hover:brightness-105 active:scale-[0.98] whitespace-nowrap"
          >
            <span>Check</span>
            <ArrowRight
              size={13}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>
        </div>

        {/* Custom Luxury Themed Calendar Popover */}
        <AnimatePresence>
          {activeDropdown === "dates" && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.96 }}
              transition={{ duration: 0.18 }}
              className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-[300px] sm:w-[320px] rounded-xl border border-white/20 bg-[#161413]/98 p-3.5 shadow-2xl backdrop-blur-2xl z-50 text-white"
            >
              {/* Calendar Header */}
              <div className="flex items-center justify-between pb-2.5 border-b border-white/10">
                <div>
                  <p className="text-[10px] font-medium tracking-widest uppercase text-[#84321F]">
                    {calendarTarget === "in"
                      ? "Select Check-In"
                      : "Select Check-Out"}
                  </p>
                  <p className="text-sm font-medium tracking-wide">
                    {MONTH_NAMES[month]} {year}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    disabled={isPrevMonthDisabled}
                    onClick={prevMonth}
                    className="flex h-7 w-7 items-center justify-center rounded text-white/70 transition-colors hover:bg-white/10 disabled:opacity-20 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={nextMonth}
                    className="flex h-7 w-7 items-center justify-center rounded text-white/70 transition-colors hover:bg-white/10"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>

              {/* Day of Week Labels */}
              <div className="grid grid-cols-7 gap-1 pt-2.5 pb-1 text-center">
                {DAYS_OF_WEEK.map((d) => (
                  <span
                    key={d}
                    className="text-[10px] font-medium uppercase tracking-wider text-stone-400"
                  >
                    {d}
                  </span>
                ))}
              </div>

              {/* Days Grid */}
              <div className="grid grid-cols-7 gap-y-1 text-center text-xs">
                {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                  <div key={`empty-${i}`} className="h-7 w-7" />
                ))}

                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const dayNum = i + 1;
                  const date = new Date(year, month, dayNum);
                  const isPast = date < today;
                  const isCheckIn = isSameDay(date, checkInDate);
                  const isCheckOut = isSameDay(date, checkOutDate);
                  const isInRange = isDateInRange(date);

                  let cellStyle = "text-stone-200 hover:bg-white/15";
                  if (isPast) {
                    cellStyle = "text-stone-600 cursor-not-allowed";
                  } else if (isCheckIn || isCheckOut) {
                    cellStyle =
                      "bg-[#84321F] text-white font-medium shadow";
                  } else if (isInRange) {
                    cellStyle = "bg-[#84321F]/25 text-white";
                  }

                  return (
                    <div
                      key={dayNum}
                      className="flex h-7 w-full items-center justify-center"
                    >
                      <button
                        type="button"
                        disabled={isPast}
                        onClick={() => handleDateClick(date)}
                        className={`flex h-7 w-7 items-center justify-center rounded text-xs transition-colors ${cellStyle}`}
                      >
                        {dayNum}
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Calendar Footer */}
              <div className="mt-3 flex items-center justify-between pt-2.5 border-t border-white/10 text-xs">
                <div>
                  <span className="text-[9.5px] text-stone-400 block uppercase tracking-wider">
                    Duration
                  </span>
                  <span className="font-light text-white text-xs">
                    {totalNights} Night{totalNights > 1 ? "s" : ""}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveDropdown(null)}
                  className="rounded bg-[#84321F] px-3 py-1 text-xs font-medium uppercase tracking-wider text-white transition-all hover:brightness-110 active:scale-95"
                >
                  Done
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </motion.div>
  );
};

export default HeroBookingStrip;

