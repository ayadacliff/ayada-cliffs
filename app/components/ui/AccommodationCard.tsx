import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Accommodation } from "../../types/types";
import { COLORS } from "../../theme/colors";
import { LUXURY_EASE } from "../../data/Animations";
import { ArrowRight } from "lucide-react";

const AccommodationCard: React.FC<{ item: Accommodation; index: number }> = ({
  item,
  index,
}) => {
  return (
    <motion.div
      className="group max-w-3xl mx-auto w-full"
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, delay: index * 0.15, ease: LUXURY_EASE }}
    >
      {/* Image Container with Enhanced Hover Effects */}
      <Link
        href={`/accommodations/${item.id}`}
        className="relative block mb-6 overflow-hidden rounded-sm shadow-lg group/img focus-visible:outline-none"
      >
        <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-700 group-hover/img:opacity-100 z-20" />
        
        {/* Gradient Overlay */}
        <div 
          className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover/img:opacity-90 transition-opacity duration-700 z-10"
        />
        
        {/* Next.js Image with optimizations */}
        <div className="relative aspect-[6/5] w-full overflow-hidden bg-stone-100">
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
            className="object-cover transition-transform duration-1000 ease-out group-hover/img:scale-105"
            priority={index === 0}
            quality={85}
          />
        </div>

        {/* Subtle corner accent */}
        <div 
          className="absolute top-4 left-4 w-6 h-6 border-l border-t opacity-0 transition-opacity duration-500 group-hover/img:opacity-80 z-20"
          style={{ borderColor: COLORS.light }}
        />
      </Link>

      {/* Content Section */}
      <div className="px-1 pt-2">
        <Link href={`/accommodations/${item.id}`} className="group/title inline-block">
          <h3
            className="mb-2.5 text-2xl md:text-3xl font-light tracking-wide leading-tight transition-colors duration-300 group-hover/title:text-[#84321F]"
            style={{ color: COLORS.primary }}
          >
            {item.name}
          </h3>
        </Link>

        {/* At-a-glance amenity tags */}
        {item.amenityBadges && item.amenityBadges.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {item.amenityBadges.map((badge, idx) => (
              <span
                key={idx}
                className="inline-flex items-center rounded-full border border-stone-300/70 bg-stone-100/80 px-2.5 py-0.5 text-[11px] font-light tracking-wider text-stone-700 backdrop-blur-xs transition-colors hover:border-[#84321F]/40 hover:text-[#84321F]"
              >
                {badge}
              </span>
            ))}
          </div>
        )}
        
        <p 
          className="mb-6 text-sm md:text-base font-light leading-relaxed text-stone-600 line-clamp-3"
        >
          {item.description}
        </p>

        {/* Enhanced CTA Link */}
        <Link
          href={`/accommodations/${item.id}`}
          className="group/link inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase font-medium transition-all duration-300"
          style={{ color: COLORS.primary }}
        >
          <span className="relative pb-1">
            Discover More
            <span
              className="absolute bottom-0 left-0 w-0 h-px transition-all duration-300 ease-out group-hover/link:w-full"
              style={{ backgroundColor: COLORS.primary }}
            />
          </span>
          <ArrowRight
            size={14}
            className="transition-transform duration-300 group-hover/link:translate-x-1"
          />
        </Link>
      </div>
    </motion.div>
  );
};

export default AccommodationCard;