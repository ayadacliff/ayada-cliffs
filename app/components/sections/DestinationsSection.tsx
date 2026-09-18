import React from 'react';
import { COLORS } from '../../theme/colors';
import { motion } from "framer-motion";
import { LUXURY_EASE } from '../../data/Animations';
import { DESTINATIONS } from '../../data/Destinations';
import DestinationCard from '../ui/DestinationCard';
import { useRouter } from 'next/navigation';

interface DestinationsSectionProps {
  selectedFeature: number;
  setSelectedFeature: (id: number) => void;
}

const DestinationsSection: React.FC<DestinationsSectionProps> = ({ selectedFeature, setSelectedFeature }) => {
  const router = useRouter();

  return (
    <section
      className="py-24 md:py-32"
      id='destinations'
      style={{ background: COLORS.secondary }}
    >
      <div className="container mx-auto px-4 md:px-8">
        {/* Refined section header */}
        <motion.div
          className="mb-16 md:mb-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.9, ease: LUXURY_EASE }}
        >
          {/* Decorative elements */}
          <div className="flex items-center justify-center mb-5 gap-3">
            <div className="h-px w-10 opacity-30" style={{ backgroundColor: COLORS.primary }}></div>
            <span className="text-xs tracking-[0.25em] uppercase font-light" style={{ color: COLORS.primary }}>
              Explore
            </span>
            <div className="h-px w-10 opacity-30" style={{ backgroundColor: COLORS.primary }}></div>
          </div>
          
          <h2 className="mb-5 text-3xl md:text-4xl lg:text-5xl font-light tracking-tight" style={{ color: COLORS.primary }}>
            Discover Extraordinary Destinations
          </h2>
          
          <p className="mx-auto max-w-2xl text-base md:text-lg font-light text-stone-700/85">
            Immerse yourself in the wonders of Varkala and its surrounding coastal treasures
          </p>
        </motion.div>
        
        {/* Destinations interactive gallery */}
        <div className="flex flex-col md:flex-row md:flex-nowrap items-stretch justify-center gap-4 lg:gap-6 w-full max-w-6xl mx-auto">
          {DESTINATIONS.map((destination) => (
            <DestinationCard 
              key={destination.id}
              destination={destination}
              isSelected={selectedFeature === destination.id}
              onSelect={() => selectedFeature === destination.id ? router.push(destination.url) : setSelectedFeature(destination.id)}
            />
          ))}
        </div>
        
        {/* Decorative bottom element */}
        <div className="mt-20 h-px w-16 mx-auto opacity-25" style={{ backgroundColor: COLORS.primary }}></div>
      </div>
    </section>
  );
};

export default DestinationsSection;