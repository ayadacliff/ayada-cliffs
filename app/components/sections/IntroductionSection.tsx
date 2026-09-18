import React, { useRef } from "react";
import { COLORS } from "../../theme/colors";
import { motion, useScroll, useTransform } from "framer-motion";
import { LUXURY_EASE } from "../../data/Animations";
import Image from "next/image";

const IntroductionSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section className="relative py-28 md:py-36 overflow-hidden bg-white" ref={sectionRef}>
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col items-center gap-12 md:flex-row md:gap-16">
          {/* Text Content */}
          <motion.div
            className="w-full md:w-1/2 md:pr-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.9, ease: LUXURY_EASE }}
          >
            <div className="mb-6 flex items-center gap-3">
              <div
                className="h-px w-8 opacity-40"
                style={{ backgroundColor: COLORS.primary }}
              />
              <span
                className="text-xs font-light tracking-[0.25em] uppercase"
                style={{ color: COLORS.primary }}
              >
                Our Sanctuary
              </span>
            </div>

            <h2
              className="mb-8 text-3xl md:text-4xl lg:text-5xl leading-[1.2] font-light tracking-tight"
              style={{ color: COLORS.primary }}
            >
              Perched on the dramatic cliff of Varkala, where the Arabian Sea meets the sky.
            </h2>

            <p
              className="mb-8 text-base md:text-lg leading-relaxed font-light text-stone-600"
            >
              AYADA CLIFF is a sanctuary of tranquility, offering uninterrupted
              ocean views from every corner of our luxury villas. Experience the
              perfect harmony of contemporary indulgence and authentic Kerala
              architectural grace.
            </p>

            <div className="flex items-center gap-8 pt-2 text-xs uppercase tracking-widest text-stone-500 font-light">
              <div>
                <span className="block text-2xl font-light text-[#84321F]">02</span>
                <span>Private Pool Villas</span>
              </div>
              <div className="h-8 w-px bg-stone-200" />
              <div>
                <span className="block text-2xl font-light text-[#84321F]">180°</span>
                <span>Panoramic Sea View</span>
              </div>
            </div>
          </motion.div>

          {/* Image Container with Smooth Parallax */}
          <div className="w-full md:w-1/2">
            <motion.div
              className="relative aspect-[4/5] w-full overflow-hidden rounded-sm shadow-2xl"
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1.0, ease: LUXURY_EASE }}
            >
              {/* Subtle offset accent border */}
              <div
                className="absolute -inset-2 -z-10 translate-x-3 translate-y-3 rounded-sm border border-[#84321F]/20"
              />

              <motion.div
                className="relative h-[115%] w-full -top-[7.5%]"
                style={{ y: imageY }}
              >
                <Image
                  src="/images/night-image.webp"
                  alt="Villa exterior overlooking the Arabian Sea"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-1000 ease-out hover:scale-105"
                  priority={false}
                />
              </motion.div>

              {/* Gentle Vignette */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/5" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroductionSection;
