"use client";
import React, { useState, useRef, useEffect } from "react";
import { COLORS } from "../../theme/colors";
import { motion, useInView, useMotionValue, useMotionTemplate } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { LUXURY_EASE } from "../../data/Animations";

const Footer = () => {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(footerRef, { once: true, amount: 0.1 });

  const [isMapActive, setIsMapActive] = useState(false);

  const mouseX = useMotionValue(200);
  const mouseY = useMotionValue(200);
  const radialBg = useMotionTemplate`radial-gradient(500px circle at ${mouseX}px ${mouseY}px, ${COLORS.primary}, transparent 70%)`;

  useEffect(() => {
    const node = footerRef.current;
    if (!node) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = node.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    };

    node.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      node.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: LUXURY_EASE,
      },
    },
  };

  const footerLinks = [
    {
      title: "Explore",
      links: [
        { name: "Accommodations", url: "/#stay" },
        { name: "Experiences", url: "/#experiences" },
        { name: "Destinations", url: "/#destinations" },
        { name: "Gallery", url: "/gallery" },
      ],
    },
    {
      title: "Sanctuaries",
      links: [
        { name: "Ocean Edge Villa", url: "/accommodations/ocean-edge" },
        { name: "Ocean Haven Villa", url: "/accommodations/ocean-haven" },
        { name: "Reserve Sanctuary", url: "/reserve" },
      ],
    },
    {
      title: "Getting Here",
      links: [
        { name: "Directions", url: "https://www.google.com/maps?ll=8.763582,76.685863&z=20&t=h&hl=en&gl=IN&mapclient=embed&cid=4922930476359561407" },
        { name: "Nearest Airport", url: "https://www.adani.com/thiruvananthapuram-airport" },
      ],
    },
    {
      title: "Connect",
      links: [
        { name: "+91 88919 16663", url: "tel:+918891916663" },
        { name: "WhatsApp", url: "https://wa.me/918891916663" },
        { name: "info@ayadacliff.com", url: "mailto:info@ayadacliff.com" },
        { name: "@ayadacliff", url: "https://instagram.com/ayadacliff" },
      ],
    },
  ];

  return (
    <motion.footer
      ref={footerRef}
      className="relative overflow-hidden"
      id="footer"
      style={{
        background: COLORS.secondary,
      }}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      {/* Ambient background gradient that follows mouse without React re-renders */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          background: radialBg,
        }}
      />
      <div className="relative z-10 container mx-auto px-6 md:px-12 py-14 sm:py-16 md:py-24 pb-20 md:pb-24">
        {/* Main content grid */}
        <div className="mb-14 md:mb-20 grid gap-10 md:gap-14 lg:grid-cols-12">
          {/* Brand section */}
          <motion.div
            className="space-y-6 lg:col-span-4"
            variants={itemVariants}
          >
            <div className="flex flex-col items-start">
              <Link href="/" className="inline-block transition-transform duration-300 hover:scale-[1.02]">
                <Image
                  src="/images/logo/ayadaclifflogo.png"
                  alt="Ayada Cliff"
                  width={340}
                  height={80}
                  className="h-auto w-48 md:w-64 object-contain"
                />
              </Link>
              <p className="mt-6 text-sm md:text-base font-light text-stone-600 max-w-sm leading-relaxed">
                Luxury cliffside private pool beach villas overlooking the infinite Arabian Sea in Varkala, Kerala.
              </p>
            </div>
          </motion.div>
          {/* Navigation links */}
          <motion.div
            className="grid grid-cols-2 gap-x-6 gap-y-8 sm:gap-8 md:grid-cols-4 lg:col-span-8"
            variants={itemVariants}
          >
            {footerLinks.map((section, sectionIndex) => (
              <div key={section.title}>
                <motion.h4
                  className="mb-4 md:mb-6 text-xs md:text-sm font-semibold tracking-[0.2em] uppercase text-[#84321F]/80"
                  whileHover={{ opacity: 1 }}
                >
                  {section.title}
                </motion.h4>
                <ul className="space-y-3 md:space-y-4">
                  {section.links.map((link, linkIndex) => (
                    <motion.li key={link.name}>
                      <Link
                        href={link.url}
                        target={link.url.startsWith("http") ? "_blank" : undefined}
                        rel={link.url.startsWith("http") ? "noopener noreferrer" : undefined}
                      >
                        <motion.span
                          className="relative inline-block cursor-pointer text-sm md:text-base font-light text-[#84321F]/80 hover:text-[#84321F]"
                          onHoverStart={() =>
                            setHoveredLink(`${sectionIndex}-${linkIndex}`)
                          }
                          onHoverEnd={() => setHoveredLink(null)}
                          whileHover={{
                            opacity: 1,
                            x: 4,
                            transition: { duration: 0.2 },
                          }}
                        >
                          {link.name}
                          <motion.div
                            className="absolute -bottom-1 left-0 h-px"
                            style={{ backgroundColor: COLORS.primary }}
                            initial={{ width: 0 }}
                            animate={{
                              width:
                                hoveredLink === `${sectionIndex}-${linkIndex}`
                                  ? "100%"
                                  : 0,
                            }}
                            transition={{ duration: 0.3 }}
                          />
                        </motion.span>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Google Maps & Location Section */}
        <motion.div className="mb-20" variants={itemVariants} id="location">
          <div className="text-center mb-8">
            <motion.h3
              className="mb-3 text-2xl md:text-3xl font-light"
              style={{ color: COLORS.primary, opacity: 0.9 }}
              whileHover={{ opacity: 1 }}
            >
              Find Us
            </motion.h3>
            <motion.p
              className="text-sm md:text-base font-light max-w-2xl mx-auto leading-relaxed"
              style={{ color: COLORS.primary, opacity: 0.75 }}
            >
              Our property is just a short walk from the beach, 15 minutes from Varkala town, and only 1 hour from Trivandrum International Airport. It&apos;s easy to reach and perfectly located for both relaxation and exploring the area.
            </motion.p>
          </div>

          {/* Clifftop Location & Address Bar */}
          <div className="mb-8 rounded-xl border border-[#84321F]/15 bg-white/50 p-5 md:p-6 backdrop-blur-sm shadow-xs max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-start gap-3">
                <MapPin size={20} className="mt-1 text-[#84321F] flex-shrink-0" />
                <div>
                  <p className="text-[11px] font-semibold tracking-widest uppercase text-[#84321F]/80">
                    LOCATION & ADDRESS
                  </p>
                  <p className="mt-0.5 text-sm md:text-base font-light text-stone-800 leading-relaxed">
                    <span className="font-medium">Ayada Cliff Beach Villas</span> · Vettakkada, Edava PO, Varkala, Kerala – 695311, India
                  </p>
                </div>
              </div>
              <a
                href="https://www.google.com/maps?ll=8.763582,76.685863&z=20&t=h&hl=en&gl=IN&mapclient=embed&cid=4922930476359561407"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[#84321F]/30 bg-[#84321F] px-5 py-2 text-xs font-medium tracking-wider uppercase text-white transition-all hover:brightness-110 active:scale-95 self-start sm:self-auto shadow-xs flex-shrink-0"
              >
                <span>Get Directions</span>
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          <motion.div
            className="relative h-72 sm:h-80 md:h-[420px] overflow-hidden rounded-xl shadow-xl border border-stone-200/50"
            whileHover={{ scale: 1.005 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsMapActive(true)}
            onMouseLeave={() => setIsMapActive(false)}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d331.29098234094744!2d76.68592018341018!3d8.763690895825375!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b05ef0025f67b59%3A0x4451c32f795b30bf!2sAyada%20Cliff%20Beach%20Villas!5e1!3m2!1sen!2sin!4v1754952051022!5m2!1sen!2sin"
              className={`h-full w-full border-0 ${
                isMapActive ? "pointer-events-auto" : "pointer-events-none"
              }`}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            
            {/* NEW: Overlay shown when map is inactive */}
            {!isMapActive && (
              <div className={`absolute inset-0 flex cursor-pointer items-center justify-center bg-[#84321F70] duration-1000 hover:bg-[#84321F20]`}>
                <p className={`bg-[#141111a5] px-4 py-2 text-white shadow-lg text-xs sm:text-sm`}>
                  Click to interact with the map
                </p>
              </div>
            )}

            {/* Overlay gradient for better integration */}
            <motion.div
              className="pointer-events-none absolute inset-0 opacity-10"
              style={{
                background: `linear-gradient(45deg, ${COLORS.secondary}, transparent)`,
              }}
            />
          </motion.div>
        </motion.div>
        {/* Divider with animation */}
        <motion.div
          className="mb-16 flex justify-center"
          variants={itemVariants}
        >
          <motion.div
            className="h-px w-full max-w-6xl"
            style={{ backgroundColor: COLORS.primary, opacity: 0.1 }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isInView ? 1 : 0 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          />
        </motion.div>
        {/* Bottom section */}
        <motion.div className="space-y-4 text-center" variants={itemVariants}>
          <motion.p
            className="text-sm font-light"
            style={{ color: COLORS.primary, opacity: 0.5 }}
            whileHover={{ opacity: 0.7 }}
          >
            © {new Date().getFullYear()} Ayada Cliff Beach Villas · All rights
            reserved
          </motion.p>
          <motion.p
            className="text-sm font-light"
            style={{ color: COLORS.primary, opacity: 0.4 }}
            whileHover={{ opacity: 0.6 }}
          >
            Designed & Developed by{" "}
            <motion.a
              href="https://github.com/Deflated-Pappadam"
              className="cursor-pointer hover:underline"
              style={{ color: COLORS.primary }}
              whileHover={{
                opacity: 1,
                scale: 1.05,
              }}
            >
              Deflated Pappadam
            </motion.a>
          </motion.p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;