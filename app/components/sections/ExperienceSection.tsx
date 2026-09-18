import React from "react";
import { COLORS } from "../../theme/colors";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { experiences } from "@/app/data/Experiences";
import { LUXURY_EASE } from "@/app/data/Animations";
import { ArrowRight } from "lucide-react";

const ExperienceSection = () => {
  return (
    <section
      className="relative py-28 md:py-36 bg-stone-50/50 overflow-hidden"
      id="experiences"
    >
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        {/* Heading */}
        <motion.div
          className="mb-20 md:mb-28 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: LUXURY_EASE }}
        >
          <div className="mb-5 flex items-center justify-center gap-3">
            <div
              className="h-px w-10 opacity-30"
              style={{ backgroundColor: COLORS.primary }}
            />
            <span
              className="text-xs font-light tracking-[0.25em] uppercase"
              style={{ color: COLORS.primary }}
            >
              Curated Moments
            </span>
            <div
              className="h-px w-10 opacity-30"
              style={{ backgroundColor: COLORS.primary }}
            />
          </div>

          <h2
            className="mb-6 text-3xl md:text-4xl lg:text-5xl font-light tracking-tight"
            style={{ color: COLORS.primary }}
          >
            Signature Experiences
          </h2>

          <p
            className="mx-auto max-w-xl text-base md:text-lg leading-relaxed font-light text-stone-600"
          >
            Discover the art of refined leisure through our thoughtfully crafted
            experiences, each designed to create lasting memories in serene luxury.
          </p>
        </motion.div>

        {/* Experiences List */}
        <div className="space-y-28 md:space-y-36">
          {experiences.map((experience, index) => (
            <div
              key={experience.id}
              className={`flex flex-col items-center gap-12 md:gap-16 ${
                experience.position === "left"
                  ? "md:flex-row-reverse"
                  : "md:flex-row"
              }`}
            >
              {/* Image */}
              <motion.div
                className="w-full md:w-1/2"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.9, ease: LUXURY_EASE }}
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-sm shadow-xl group">
                  <Image
                    src={experience.image}
                    alt={experience.title}
                    fill
                    priority={index === 0}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </div>
              </motion.div>

              {/* Text */}
              <motion.div
                className="w-full md:w-1/2"
                initial={{ opacity: 0, x: experience.position === "left" ? -24 : 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, delay: 0.1, ease: LUXURY_EASE }}
              >
                <span
                  className="mb-2 block text-xs font-light tracking-[0.25em] text-[#84321F]/70"
                >
                  0{index + 1}
                </span>
                <h3
                  className="mb-4 text-2xl md:text-3xl font-light tracking-wide"
                  style={{ color: COLORS.primary }}
                >
                  {experience.title}
                </h3>
                <p
                  className="mb-8 leading-relaxed font-light text-stone-600 text-sm md:text-base"
                >
                  {experience.description}
                </p>

                <Link
                  href="/gallery"
                  className="group/btn inline-flex items-center gap-2 text-xs tracking-widest uppercase transition-colors duration-300"
                  style={{ color: COLORS.primary }}
                >
                  <span className="relative pb-1">
                    Discover More
                    <span
                      className="absolute bottom-0 left-0 w-0 h-px transition-all duration-300 group-hover/btn:w-full"
                      style={{ backgroundColor: COLORS.primary }}
                    />
                  </span>
                  <ArrowRight size={13} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
                </Link>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <motion.div
          className="mt-24 md:mt-32 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: LUXURY_EASE }}
        >
          <Link
            href="/gallery"
            className="inline-flex items-center justify-center border border-[#84321F]/30 px-8 py-3 text-xs tracking-widest uppercase transition-all duration-300 hover:border-[#84321F] hover:bg-[#84321F]/5 active:scale-95 md:px-10 md:py-3.5"
            style={{ color: COLORS.primary }}
          >
            View All Experiences
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;
