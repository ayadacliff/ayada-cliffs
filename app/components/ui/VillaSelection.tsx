"use client";

import React from "react";
import Image from "next/image";
import { VILLAS } from "@/app/data/Villas";
import { COLORS } from "@/app/theme/colors";
import { Villa } from "@/app/types/types";
import {
  Check,
  Users,
  Bed,
  Waves,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

interface VillaSelectionProps {
  selectedVilla: Villa | null;
  onVillaSelect: (villa: Villa) => void;
  onNext: () => void;
}

const VillaSelection: React.FC<VillaSelectionProps> = ({
  selectedVilla,
  onVillaSelect,
  onNext,
}) => {
  return (
    <div className="mx-auto w-full max-w-6xl pb-32">
      {/* Reservation Stepper */}
      <div className="mb-8 flex items-center justify-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-stone-300/70 bg-white/85 px-4 py-1.5 text-xs font-light shadow-xs backdrop-blur-md sm:gap-3">
          <span
            className="flex items-center gap-1.5 font-medium"
            style={{ color: COLORS.primary }}
          >
            <span
              className="flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-white"
              style={{ backgroundColor: COLORS.primary }}
            >
              1
            </span>
            <span>Choose Sanctuary</span>
          </span>
          <span className="text-stone-300">/</span>
          <span className="flex items-center gap-1.5 text-stone-400">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-stone-200 text-[10px] text-stone-500">
              2
            </span>
            <span>Dates & Guests</span>
          </span>
          <span className="text-stone-300">/</span>
          <span className="flex items-center gap-1.5 text-stone-400">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-stone-200 text-[10px] text-stone-500">
              3
            </span>
            <span>Details</span>
          </span>
        </div>
      </div>

      {/* Editorial Header */}
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <span className="text-[11px] font-medium tracking-[0.3em] uppercase text-[#84321F]/80">
          THE AYADA COLLECTION
        </span>
        <h2 className="mt-2 mb-3 text-3xl font-light tracking-wide text-stone-900 md:text-4xl">
          Choose Your Private Sanctuary
        </h2>
        <div className="mx-auto my-3 h-px w-12 bg-[#84321F]/40" />
        <p className="text-sm font-light leading-relaxed text-stone-600 md:text-base">
          Two secluded clifftop pool villas perched above the Arabian Sea. Every stay
          includes a dedicated Villa Host, chef-prepared breakfast, and breathtaking
          sunset panoramas.
        </p>
      </div>

      {/* Villas Grid */}
      <div className="space-y-8 md:space-y-10">
        {VILLAS.map((villa) => {
          const isSelected = selectedVilla?.id === villa.id;

          return (
            <div
              key={villa.id}
              onClick={() => onVillaSelect(villa)}
              className={`group relative cursor-pointer overflow-hidden rounded-xl border bg-white/95 transition-all duration-500 ${
                isSelected
                  ? "border-[#84321F] shadow-[0_16px_44px_rgba(132,50,31,0.16)] ring-2 ring-[#84321F]/25"
                  : "border-stone-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:border-stone-300 hover:shadow-[0_12px_36px_rgba(0,0,0,0.08)]"
              }`}
            >
              <div className="grid grid-cols-1 md:grid-cols-12">
                {/* Left: Villa Image */}
                <div className="relative h-72 overflow-hidden sm:h-80 md:col-span-5 md:h-auto">
                  <Image
                    src={villa.image}
                    alt={villa.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 42vw"
                    priority={villa.id === 1}
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30" />

                  {/* Top-left Badge */}
                  <div className="absolute top-4 left-4 rounded-full border border-white/20 bg-black/45 px-3 py-1 text-[10px] font-light tracking-widest uppercase text-white backdrop-blur-md">
                    Oceanfront Sanctuary
                  </div>

                  {/* Top-right Selected State */}
                  {isSelected ? (
                    <div className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full bg-[#84321F] px-3.5 py-1 text-xs font-medium text-white shadow-md">
                      <Check size={13} strokeWidth={2.5} />
                      <span>Selected</span>
                    </div>
                  ) : (
                    <div className="absolute top-4 right-4 rounded-full border border-white/20 bg-white/80 px-3 py-1 text-[11px] font-light text-stone-800 shadow-sm backdrop-blur-md">
                      Private Pool Villa
                    </div>
                  )}

                  {/* Bottom Image Micro-Highlights */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-light text-white/90">
                    <span className="flex items-center gap-1.5 drop-shadow-sm">
                      <Waves size={13} className="text-white/80" />
                      <span>Private Infinity Pool</span>
                    </span>
                    <span className="flex items-center gap-1.5 drop-shadow-sm">
                      <Sparkles size={13} className="text-white/80" />
                      <span>Dedicated Host</span>
                    </span>
                  </div>
                </div>

                {/* Right: Villa Info */}
                <div className="flex flex-col justify-between p-6 sm:p-8 md:col-span-7">
                  <div>
                    {/* Header with Title & Specs */}
                    <div className="mb-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-[#84321F]">
                            VARKALA CLIFFS · KERALA
                          </span>
                          <h3 className="mt-1 text-2xl font-light tracking-wide text-stone-900 md:text-3xl">
                            {villa.name}
                          </h3>
                        </div>

                        {isSelected && (
                          <div
                            className="hidden h-7 w-7 flex-shrink-0 items-center justify-center rounded-full sm:flex"
                            style={{ backgroundColor: COLORS.primary }}
                          >
                            <Check className="h-4 w-4 text-white" />
                          </div>
                        )}
                      </div>

                      {/* Specs Row */}
                      <div className="mt-3 flex flex-wrap items-center gap-4 text-xs font-light text-stone-600">
                        <div className="flex items-center gap-1.5">
                          <Users size={14} className="text-[#84321F]" />
                          <span>Up to {villa.maxGuests} Guests</span>
                        </div>
                        <span className="text-stone-300">·</span>
                        <div className="flex items-center gap-1.5">
                          <Bed size={14} className="text-[#84321F]" />
                          <span>
                            {villa.bedrooms} King Bedroom{villa.bedrooms > 1 ? "s" : ""}
                          </span>
                        </div>
                        <span className="text-stone-300">·</span>
                        <div className="flex items-center gap-1.5">
                          <ShieldCheck size={14} className="text-[#84321F]" />
                          <span>Cliffside Privacy</span>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="mb-6 text-sm font-light leading-relaxed text-stone-600">
                      {villa.description}
                    </p>

                    {/* Key Features Grid */}
                    <div className="mb-6">
                      <h4 className="mb-2.5 text-[11px] font-medium tracking-[0.2em] uppercase text-stone-500">
                        Key Features
                      </h4>
                      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                        {villa.features.map((feature, index) => (
                          <div
                            key={index}
                            className="flex items-start gap-2 text-xs font-light text-stone-700"
                          >
                            <span
                              className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full"
                              style={{ backgroundColor: COLORS.primary }}
                            />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Amenities Tags */}
                    <div className="mb-8 flex flex-wrap gap-1.5">
                      {villa.amenities.map((amenity, index) => (
                        <span
                          key={index}
                          className="rounded-sm border border-stone-200/80 bg-stone-50 px-2.5 py-1 text-[11px] font-light text-stone-600"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Action Button */}
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onVillaSelect(villa);
                        if (isSelected) {
                          onNext();
                        }
                      }}
                      className={`group flex w-full items-center justify-center gap-2 rounded-sm px-6 py-3.5 text-xs font-medium tracking-[0.2em] uppercase transition-all duration-300 active:scale-[0.99] ${
                        isSelected
                          ? "bg-[#84321F] text-white shadow-md hover:brightness-110"
                          : "bg-stone-900 text-white shadow-xs hover:bg-[#84321F]"
                      }`}
                    >
                      {isSelected ? (
                        <>
                          <span>Confirmed Sanctuary — Continue to Dates</span>
                          <ArrowRight
                            size={14}
                            className="transition-transform duration-300 group-hover:translate-x-1"
                          />
                        </>
                      ) : (
                        <>
                          <span>Select {villa.name}</span>
                          <ArrowRight
                            size={14}
                            className="transition-transform duration-300 group-hover:translate-x-1"
                          />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Bottom Quick Confirmation Dock */}
      {selectedVilla && (
        <div className="fixed bottom-6 inset-x-4 z-40 mx-auto max-w-2xl">
          <div className="flex items-center justify-between gap-4 rounded-full border border-white/15 bg-stone-950/90 p-2 pr-2.5 pl-5 text-white shadow-2xl backdrop-blur-xl">
            <div className="flex min-w-0 items-center gap-3">
              <div className="h-2 w-2 flex-shrink-0 animate-pulse rounded-full bg-emerald-400" />
              <div className="min-w-0">
                <p className="truncate text-xs font-medium tracking-wide text-white">
                  {selectedVilla.name}
                </p>
                <p className="truncate text-[10px] font-light text-stone-400">
                  Sanctuary selected · Ready for dates & guests
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onNext}
              className="inline-flex flex-shrink-0 items-center gap-2 rounded-full px-5 py-2.5 text-xs font-medium tracking-wider uppercase text-white transition-all duration-300 hover:brightness-110 active:scale-95 shadow-md"
              style={{ backgroundColor: COLORS.primary }}
            >
              <span>Next: Dates</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VillaSelection;
