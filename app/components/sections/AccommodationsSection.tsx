import React from "react";
import { COLORS } from "../../theme/colors";
import { motion } from "framer-motion";
import AccommodationCard from "../ui/AccommodationCard";
import { ACCOMMODATIONS } from "../../data/Accomodations";
import { LUXURY_EASE } from "../../data/Animations";

const AccommodationsSection = () => {
  return (
    <section
      id="stay"
      className="relative py-24 md:py-32 px-6 md:px-12"
      style={{
        backgroundColor: COLORS.secondary,
        backgroundImage:
          "radial-gradient(circle at 10% 90%, rgba(255,255,255,0.03) 0%, transparent 40%)",
      }}
    >
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          className="mb-16 md:mb-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: LUXURY_EASE }}
        >
          {/* Decorative Label */}
          <div className="flex items-center justify-center mb-5 gap-3">
            <div className="h-px w-10 bg-[#84321F]/25" />
            <span
              className="text-xs uppercase font-light tracking-[0.25em]"
              style={{ color: COLORS.primary }}
            >
              Curated Retreats
            </span>
            <div className="h-px w-10 bg-[#84321F]/25" />
          </div>

          <h2
            className="mb-6 text-3xl md:text-4xl lg:text-5xl font-light tracking-tight"
            style={{ color: COLORS.primary }}
          >
            Elevated Living Experiences
          </h2>

          <p
            className="mx-auto max-w-2xl text-base md:text-lg font-light leading-relaxed text-stone-700/90"
          >
            Discover our thoughtfully designed spaces where modern luxury meets
            coastal serenity — creating perfect moments of quiet indulgence.
          </p>
        </motion.div>

        {/* Accommodation Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 max-w-6xl mx-auto">
          {ACCOMMODATIONS.slice(0, 2).map((item, index) => (
            <AccommodationCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AccommodationsSection;
