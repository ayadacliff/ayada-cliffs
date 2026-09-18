"use client";
import React, { useState, useRef, useEffect } from "react";
import { COLORS } from "../../theme/colors";
import { motion, useInView, useMotionValue, useMotionTemplate } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Phone, MessageCircle, Mail, Instagram, MapPin } from "lucide-react";
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
        { name: "Dining", url: "/gallery" },
        { name: "Wellness", url: "/gallery" },
      ],
    },
    {
      title: "Information",
      links: [
        { name: "Contact", url: "/#footer" },
        { name: "Location", url: "/#location" },
        { name: "Gallery", url: "/gallery" },
      ],
    },
    {
      title: "Getting Here",
      links: [
        { name: "Directions", url: "https://www.google.com/maps?ll=8.763582,76.685863&z=20&t=h&hl=en&gl=IN&mapclient=embed&cid=4922930476359561407" },
        { name: "Nearest Airport", url: "https://www.adani.com/thiruvananthapuram-airport" },
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
      <div className="relative z-10 container mx-auto px-6 md:px-12 py-20 md:py-28">
        {/* Main content grid */}
        <div className="mb-20 grid gap-16 md:grid-cols-1 lg:grid-cols-12">
          {/* Brand section */}
          <motion.div
            className="space-y-6 lg:col-span-5"
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
            className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:col-span-7"
            variants={itemVariants}
          >
            {footerLinks.map((section, sectionIndex) => (
              <div key={section.title}>
                <motion.h4
                  className="mb-8 text-sm font-medium tracking-widest uppercase"
                  style={{ color: COLORS.primary, opacity: 0.6 }}
                  whileHover={{ opacity: 1 }}
                >
                  {section.title}
                </motion.h4>
                <ul className="space-y-4">
                  {section.links.map((link, linkIndex) => (
                    <motion.li key={link.name}>
                      <Link href={link.url}>
                        <motion.span
                          className="relative block cursor-pointer text-base font-light"
                          style={{ color: COLORS.primary, opacity: 0.7 }}
                          onHoverStart={() =>
                            setHoveredLink(`${sectionIndex}-${linkIndex}`)
                          }
                          onHoverEnd={() => setHoveredLink(null)}
                          whileHover={{
                            opacity: 1,
                            x: 8,
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
            {/* Contact info with hover effects */}
            <div className="col-span-2 space-y-6 md:col-span-4 lg:col-span-1">
              <div>
                <p
                  className="mb-4 text-sm font-medium tracking-widest uppercase"
                  style={{ color: COLORS.primary, opacity: 0.6 }}
                >
                  <MapPin size={16} className="inline mr-2" />
                  LOCATION
                </p>
                <p
                  className="mb-8 text-base font-light"
                  style={{ color: COLORS.primary, opacity: 0.8 }}
                >
                  Ayada Cliff Beach Villas
                  <br />
                  Vettakkada, Edava PO
                  <br />
                  Varkala, Kerala – 695311
                  <br />
                  India
                </p>
              </div>
              <div>
                <p
                  className="mb-4 text-sm font-medium tracking-widest uppercase"
                  style={{ color: COLORS.primary, opacity: 0.6 }}
                >
                  CONTACT
                </p>
                <div className="space-y-2">
                  <div className="flex flex-col gap-2">
                    <motion.a
                      href="tel:+918891916663"
                      className="inline-flex items-center gap-2 text-base font-light hover:underline"
                      style={{ color: COLORS.primary, opacity: 0.8 }}
                      whileHover={{ opacity: 1 }}
                    >
                      <Phone size={16} />
                      +91 88919 16663
                    </motion.a>
                    <motion.a
                      href="https://wa.me/918891916663"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-base font-light hover:underline"
                      style={{ color: COLORS.primary, opacity: 0.8 }}
                      whileHover={{ opacity: 1 }}
                    >
                      <MessageCircle size={16} />
                      WhatsApp
                    </motion.a>
                  </div>
                  <motion.a
                    href="mailto:info@ayadacliff.com"
                    className="inline-flex items-center gap-2 text-base font-light hover:underline"
                    style={{ color: COLORS.primary, opacity: 0.8 }}
                    whileHover={{ opacity: 1 }}
                  >
                    <Mail size={16} />
                    info@ayadacliff.com
                  </motion.a>
                </div>
              </div>
              {/* Social Media Links */}
              <div>
                <p
                  className="mb-4 text-sm font-medium tracking-widest uppercase"
                  style={{ color: COLORS.primary, opacity: 0.6 }}
                >
                  FOLLOW US
                </p>
                <motion.a
                  href="https://instagram.com/ayadacliff"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-base font-light hover:underline"
                  style={{ color: COLORS.primary, opacity: 0.8 }}
                  whileHover={{ opacity: 1 }}
                >
                  <Instagram size={16} />
                  @ayadacliff
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
        {/* Google Maps Section */}
        <motion.div className="mb-20" variants={itemVariants}>
          <div className="text-center mb-8">
            <motion.h3
              className="mb-4 text-2xl font-light"
              style={{ color: COLORS.primary, opacity: 0.9 }}
              whileHover={{ opacity: 1 }}
            >
              Find Us
            </motion.h3>
            <motion.p
              className="text-base font-light max-w-2xl mx-auto"
              style={{ color: COLORS.primary, opacity: 0.7 }}
            >
              Our property is just a short walk from the beach, 15 minutes from Varkala town, and only 1 hour from Trivandrum International Airport. It&apos;s easy to reach and perfectly located for both relaxation and exploring the area.
            </motion.p>
          </div>

          <motion.div
            className="relative overflow-hidden rounded-lg shadow-2xl"
            whileHover={{ scale: 1.01 }}
            id="location"
            transition={{ duration: 0.3 }}
            // MODIFIED: Added event handlers to the map wrapper
            onClick={() => setIsMapActive(true)}
            onMouseLeave={() => setIsMapActive(false)}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d331.29098234094744!2d76.68592018341018!3d8.763690895825375!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b05ef0025f67b59%3A0x4451c32f795b30bf!2sAyada%20Cliff%20Beach%20Villas!5e1!3m2!1sen!2sin!4v1754952051022!5m2!1sen!2sin"
              width="100%"
              height="450"
              // MODIFIED: Conditionally apply pointer-events class
              className={`border-0 w-full ${
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