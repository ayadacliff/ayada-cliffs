import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { COLORS } from "../../theme/colors";
import { LUXURY_EASE } from "../../data/Animations";
import { ArrowRight, Plus } from "lucide-react";
import Image from "next/image";

interface Destination {
  id: number;
  name: string;
  description: string;
  image: string;
}

interface DestinationCardProps {
  destination: Destination;
  isSelected: boolean;
  onSelect: () => void;
}

const DestinationCard: React.FC<DestinationCardProps> = ({ destination, isSelected, onSelect }) => {
  return (
    <motion.div
      className={`relative cursor-pointer overflow-hidden rounded-sm transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] 
        ${isSelected 
          ? "w-full md:w-[46%] md:flex-[4] shadow-2xl" 
          : "w-full md:w-[18%] md:flex-[1.1] opacity-90 hover:opacity-100 shadow-md hover:shadow-xl"
        } 
        h-[320px] md:h-[480px] lg:h-[560px] flex-shrink-0 md:flex-shrink
        ${destination.id % 2 === 0 ? "md:mt-8" : "mt-0"}
        group`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: LUXURY_EASE }}
      onClick={onSelect}
      whileHover={{
        scale: isSelected ? 1 : 1.015,
      }}
    >
      {/* Subtle image overlay */}
      <div 
        className={`absolute inset-0 z-10 transition-colors duration-700 ${
          isSelected 
            ? "bg-gradient-to-t from-black/85 via-black/40 to-transparent" 
            : "bg-gradient-to-t from-black/75 via-black/30 to-black/10 group-hover:from-black/80"
        }`} 
      />
      
      {/* Image with hover effect */}
      <div className="absolute inset-0 overflow-hidden bg-stone-900">
        <Image
          src={destination.image}
          alt={destination.name}
          className={`h-full w-full object-cover transition-transform duration-1000 ease-out ${
            isSelected ? "scale-105" : "group-hover:scale-110"
          }`}
          fill
          sizes="(max-width: 768px) 100vw, 40vw"
        />
      </div>
      
      {/* Content overlay */}
      <div className="absolute inset-0 flex flex-col justify-end z-20 pointer-events-none">
        <AnimatePresence mode="wait">
          {isSelected ? (
            <motion.div
              key="selected"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.45, ease: LUXURY_EASE, delay: 0.1 }}
              className="p-6 md:p-8 lg:p-10 pointer-events-auto"
            >
              {/* Thin decorative line */}
              <div 
                className="mb-3 h-px w-10 opacity-70"
                style={{ backgroundColor: COLORS.secondary }}
              />
              
              {/* Title */}
              <h3
                className="mb-3 text-2xl md:text-3xl font-light tracking-wide text-white"
              >
                {destination.name}
              </h3>
              
              {/* Description */}
              <p 
                className="mb-5 text-xs md:text-sm font-light max-w-md text-stone-200 leading-relaxed"
              >
                {destination.description}
              </p>
              
              {/* Discover Link */}
              <div
                className="inline-flex items-center gap-2 text-xs tracking-widest uppercase transition-all duration-300 group/link text-white/90 hover:text-white"
              >
                <span>Discover Destination</span>
                <ArrowRight size={14} className="transition-transform duration-300 group-hover/link:translate-x-1" />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="collapsed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="p-5 md:p-6 pointer-events-auto h-full flex flex-row md:flex-col justify-between items-end md:items-start"
            >
              {/* Plus icon on top for desktop */}
              <div
                className="hidden md:flex h-8 w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm text-white transition-all duration-300 group-hover:bg-white/40 group-hover:scale-110"
              >
                <Plus size={16} strokeWidth={1.5} />
              </div>

              {/* Label for collapsed card: upright and readable on both desktop and mobile */}
              <div className="w-full md:pb-2">
                <h4
                  className="text-xs md:text-sm tracking-widest uppercase font-light text-white/90 group-hover:text-white transition-colors [writing-mode:horizontal-tb] md:[writing-mode:vertical-rl] md:rotate-180 select-none whitespace-nowrap"
                >
                  {destination.name}
                </h4>
              </div>

              {/* Plus icon for mobile */}
              <div
                className="flex md:hidden h-8 w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm text-white transition-all duration-300 group-hover:bg-white/40"
              >
                <Plus size={16} strokeWidth={1.5} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default DestinationCard;