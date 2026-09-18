"use client";
import React, { useState, useRef, useEffect } from "react";
import { ChevronRight, Menu, X, ChevronDown } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { COLORS } from "../../theme/colors";
import { NAV_ITEMS, SECONDARY_NAV_ITEMS, VILLAS_DROPDOWN_ITEMS } from "../../data/Navigation";
import Image from "next/image";

interface NavigationMenuProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface HeaderProps {
  scrollY?: number;
  isMenuOpen?: boolean;
  setIsMenuOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  isLightBackground?: boolean;
}

const LOGO_PATHS = {
  mark: "/images/logo/ayadaclifflogo-mark.png",
  typo: "/images/logo/ayadaclifflogo-typo.png",
} as const;

const VARIANTS = {
  overlay: { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } },
  navItem: { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 } },
  dropdown: { 
    initial: { opacity: 0, y: 8, scale: 0.98 }, 
    animate: { opacity: 1, y: 0, scale: 1 }, 
    exit: { opacity: 0, y: 6, scale: 0.98 } 
  },
} as const;

const getColors = (isScrolled: boolean, isMenuOpen = false, isLightBackground = false) => ({
  text: isScrolled || isMenuOpen || isLightBackground ? COLORS.dark : COLORS.light,
  border: isScrolled ? COLORS.primary : COLORS.light,
  primary: COLORS.primary,
});

const Logo = ({
  isMobile = false,
  isScrolled = false,
  isLightBackground = false,
  isMenuOpen = false,
}: {
  isMobile?: boolean;
  isScrolled?: boolean;
  isLightBackground?: boolean;
  isMenuOpen?: boolean;
}) => {
  const shouldInvert = !isScrolled && !isLightBackground && !isMenuOpen;
  return (
    <Link href="/" aria-label="Ayada Cliff Home" className="transition-transform duration-300 hover:scale-[1.02]">
      {isMobile ? (
        <Image
          src={LOGO_PATHS.typo}
          alt="Ayada Cliff Logo"
          width={170}
          height={38}
          priority
          className={`transition-all duration-500 ${shouldInvert ? 'brightness-0 invert' : ''}`}
        />
      ) : (
        <div className="flex items-center gap-3">
          <Image
            src={LOGO_PATHS.mark}
            alt="Ayada Cliff Mark"
            width={28}
            height={28}
            priority
            className={`transition-all duration-500 ${shouldInvert ? 'brightness-0 invert' : ''}`}
          />
          <Image
            src={LOGO_PATHS.typo}
            alt="Ayada Cliff Typography"
            width={170}
            height={38}
            priority
            className={`transition-all duration-500 ${shouldInvert ? 'brightness-0 invert' : ''}`}
          />
        </div>
      )}
    </Link>
  );
};

const ReserveButton = ({ href = "/reserve", color }: { href?: string; color: string }) => (
  <Link
    href={href}
    className="inline-flex items-center justify-center px-6 py-2.5 text-xs tracking-widest font-medium text-white transition-all duration-300 hover:opacity-90 active:scale-95 shadow-sm rounded-sm"
    style={{ backgroundColor: color }}
  >
    BOOK NOW
  </Link>
);


const NavItem = ({
  item,
  index,
  onClick,
  delay = 0.1,
}: {
  item: { name: string; link: string };
  index: number;
  onClick: () => void;
  delay?: number;
}) => (
  <motion.li
    initial={VARIANTS.navItem.initial}
    animate={VARIANTS.navItem.animate}
    transition={{ delay: delay * index }}
  >
    <Link
      href={item.link}
      className="group flex items-center justify-between text-2xl transition-all duration-300 text-dark"
      onClick={onClick}
    >
      <span>{item.name}</span>
      <ChevronRight size={18} className="opacity-0 transition-opacity group-hover:opacity-100" />
    </Link>
  </motion.li>
);

const MobileStayItem = ({ onClick, delay = 0.1 }: { onClick: () => void; delay?: number }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.li
      initial={VARIANTS.navItem.initial}
      animate={VARIANTS.navItem.animate}
      transition={{ delay }}
    >
      <div className="space-y-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group flex items-center justify-between text-2xl transition-all duration-300 text-dark w-full text-left"
        >
          <span>VILLAS</span>
          <ChevronDown 
            size={18} 
            className={`transition-all duration-300 ${isOpen ? 'rotate-180' : ''}`} 
          />
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.ul
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="ml-4 space-y-3 overflow-hidden"
            >
              {VILLAS_DROPDOWN_ITEMS.map((subItem, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={subItem.link}
                    className="block text-lg text-gray-600 hover:text-dark transition-colors"
                    onClick={onClick}
                  >
                    {subItem.name}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </motion.li>
  );
};

const DesktopNavigation = ({ isScrolled = false, isLightBackground = false }: { isScrolled?: boolean; isLightBackground?: boolean }) => {
  const color = getColors(isScrolled, false, isLightBackground).text;
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav>
      <ul className="flex space-x-8 items-center">
        {NAV_ITEMS.map((item, i) => (
          <li 
            key={i} 
            ref={item.name === "VILLAS" ? dropdownRef : null}
            className={item.name === "VILLAS" ? "relative" : ""}
          >
            {item.name === "VILLAS" ? (
              <div 
                className="relative"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <button
                  className="flex items-center space-x-1.5 py-2 text-xs tracking-widest font-light transition-opacity duration-300 hover:opacity-75 focus-visible:outline-none"
                  style={{ color }}
                  aria-expanded={dropdownOpen}
                >
                  <span>{item.name}</span>
                  <ChevronDown size={14} className={`transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      {...VARIANTS.dropdown}
                      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute left-0 top-full mt-2 bg-white/95 backdrop-blur-md border border-stone-200/60 shadow-xl rounded-md py-2 min-w-[190px] z-50 overflow-hidden"
                    >
                      {VILLAS_DROPDOWN_ITEMS.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          href={subItem.link}
                          className="block px-4 py-2.5 text-xs tracking-wider uppercase text-stone-700 hover:bg-[#84321F]/10 hover:text-[#84321F] transition-colors"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                href={item.link}
                className="relative group text-xs font-light tracking-widest transition-opacity duration-300 hover:opacity-75"
                style={{ color }}
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-current transition-all duration-300 group-hover:w-full" />
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

const MobileMenuButton = ({
  isMenuOpen,
  onClick,
  isScrolled = false,
  isLightBackground = false,
}: {
  isMenuOpen: boolean;
  onClick: () => void;
  isScrolled?: boolean;
  isLightBackground?: boolean;
}) => {
  const color = getColors(isScrolled, isMenuOpen, isLightBackground).text;
  return (
    <button
      onClick={onClick}
      className="z-50 p-1.5 md:hidden transition-transform duration-300 active:scale-95"
      style={{ color }}
      aria-label={isMenuOpen ? "Close menu" : "Open menu"}
    >
      {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
    </button>
  );
};

const NavigationMenu = ({ isOpen, setIsOpen }: NavigationMenuProps) => {
  const close = () => setIsOpen(false);
  
  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          {...VARIANTS.overlay}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-40 bg-white/95 backdrop-blur-md overflow-y-auto"
        >
          {/* Scrollable container with proper padding */}
          <div className="min-h-full px-8 py-24">
            <div className="container mx-auto grid gap-12 md:grid-cols-2">
              <div className="space-y-8">
                <ul className="space-y-6">
                  {NAV_ITEMS.map((item, i) => (
                    item.name === "VILLAS" ? (
                      <MobileStayItem key={i} onClick={close} delay={0.08 * i} />
                    ) : (
                      <NavItem key={i} item={item} index={i} onClick={close} delay={0.08} />
                    )
                  ))}
                </ul>
                <div className="pt-2">
                  <ReserveButton color={COLORS.primary} />
                </div>
              </div>
              <div className="space-y-6">
                <h3 className="text-xs tracking-widest uppercase font-light text-[#84321F]/70">INFORMATION</h3>
                <ul className="space-y-5">
                  {SECONDARY_NAV_ITEMS.map((item, i) => (
                    <NavItem key={i} item={item} index={i} onClick={close} delay={0.08} />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Header = ({ scrollY, isMenuOpen: externalMenuOpen, setIsMenuOpen: externalSetIsMenuOpen, isLightBackground = false }: HeaderProps) => {
  const [internalMenuOpen, setInternalMenuOpen] = useState(false);
  const [internalScrolled, setInternalScrolled] = useState(false);

  const isMenuOpen = externalMenuOpen !== undefined ? externalMenuOpen : internalMenuOpen;
  const setIsMenuOpen = externalSetIsMenuOpen !== undefined ? externalSetIsMenuOpen : setInternalMenuOpen;

  useEffect(() => {
    if (scrollY !== undefined) return;

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollPos = window.scrollY || document.documentElement.scrollTop || 0;
          const scrolled = scrollPos > 50;
          setInternalScrolled((prev) => (prev !== scrolled ? scrolled : prev));
          ticking = false;
        });
        ticking = true;
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollY]);

  const isScrolled = scrollY !== undefined ? scrollY > 50 : internalScrolled;
  const colors = getColors(isScrolled, isMenuOpen, isLightBackground);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const headerClasses =
    `fixed top-0 left-0 z-50 w-full transition-all duration-500 ` +
    (isScrolled
      ? "bg-white/90 backdrop-blur-md py-3 shadow-[0_4px_24px_rgba(0,0,0,0.06)] border-b border-stone-200/50"
      : isLightBackground
      ? "bg-white/50 backdrop-blur-sm py-4 border-b border-stone-200/30"
      : "bg-transparent py-6");

  return (
    <>
      <header className={headerClasses}>
        {/* Mobile */}
        <div className="container mx-auto flex items-center justify-between px-6 md:hidden">
          <MobileMenuButton
            isMenuOpen={isMenuOpen}
            onClick={toggleMenu}
            isScrolled={isScrolled}
            isLightBackground={isLightBackground}
          />
          <Logo isMobile isScrolled={isScrolled} isLightBackground={isLightBackground} isMenuOpen={isMenuOpen} />
          <div className="w-6" /> {/* spacer */}
        </div>

        {/* Desktop */}
        <div className="container mx-auto hidden items-center justify-between md:flex px-6">
          <Logo isScrolled={isScrolled} isLightBackground={isLightBackground} isMenuOpen={isMenuOpen} />
          <DesktopNavigation isScrolled={isScrolled} isLightBackground={isLightBackground} />
          <ReserveButton color={colors.primary} />
        </div>
      </header>

      <NavigationMenu isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
    </>
  );
};

export default Header;