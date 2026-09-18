"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { X, ArrowLeft, ArrowRight, Camera } from "lucide-react";
import Header from "@/app/components/sections/Header";
import Footer from "@/app/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { COLORS } from "@/app/theme/colors";
import Image from "next/image";

/* ================== Types ================== */
interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category: Category;
  title: string;
  height: "tall" | "medium" | "square";
}
type Category =
  | "All"
  | "Villas"
  | "Interiors"
  | "Views"
  | "Wellness"
  | "Beach"
  | "Gardens"
  | "Amenities";

/* ================== Data ================== */
const GALLERY_IMAGES: GalleryImage[] = [
  {
    id: 1,
    src: "/images/ocean-haven/gallery/1.webp",
    alt: "Villa Pool at Night",
    category: "Villas",
    title: "Ocean Haven Pool",
    height: "medium",
  },
  {
    id: 2,
    src: "/images/ocean-haven/gallery/2.webp",
    alt: "Bedroom Interior",
    category: "Interiors",
    title: "Cozy Bedroom",
    height: "square",
  },
  {
    id: 3,
    src: "/images/ocean-haven/gallery/3.webp",
    alt: "Living Area with TV",
    category: "Interiors",
    title: "Modern Living Room",
    height: "square",
  },
  {
    id: 4,
    src: "/images/ocean-haven/gallery/4.webp",
    alt: "Evening View with Palm Trees",
    category: "Views",
    title: "Evening Vibes",
    height: "tall",
  },
  {
    id: 5,
    src: "/images/ocean-edge/gallery/1.webp",
    alt: "Outdoor Dining Area",
    category: "Amenities",
    title: "Terrace Dining",
    height: "medium",
  },
  {
    id: 6,
    src: "/images/ocean-edge/gallery/2.webp",
    alt: "Garden Walkway",
    category: "Gardens",
    title: "Garden Retreat",
    height: "tall",
  },
  {
    id: 7,
    src: "/images/ocean-edge/gallery/3.webp",
    alt: "Bright Bedroom Interior",
    category: "Interiors",
    title: "Sunlit Bedroom",
    height: "square",
  },
  {
    id: 8,
    src: "/images/ocean-edge/gallery/4.webp",
    alt: "Dining Area",
    category: "Amenities",
    title: "Indoor Dining",
    height: "medium",
  },
  {
    id: 9,
    src: "/images/ocean-edge/gallery/5.webp",
    alt: "Poolside View",
    category: "Amenities",
    title: "Pool Escape",
    height: "medium",
  },
  {
    id: 10,
    src: "/images/ocean-edge/gallery/6.webp",
    alt: "Seaside Deck",
    category: "Views",
    title: "Ocean Deck",
    height: "tall",
  },
];

const CATEGORY_OPTIONS: Category[] = [
  "All",
  ...Array.from(new Set(GALLERY_IMAGES.map((g) => g.category))).sort(),
] as Category[];

const GalleryPage: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const [lightboxImage, setLightboxImage] = useState<GalleryImage | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isLightboxAnimating, setIsLightboxAnimating] = useState(false);
  const [categoryTransition, setCategoryTransition] = useState(false);

  const heroRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lightboxImageRef = useRef<HTMLImageElement>(null);

  // Smoother scroll handling with RAF throttling
  useEffect(() => {
    let rafId: number;
    const onScroll = () => {
      rafId = requestAnimationFrame(() => {
        setScrollY(window.scrollY);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const filteredImages = useMemo(
    () =>
      selectedCategory === "All"
        ? GALLERY_IMAGES
        : GALLERY_IMAGES.filter((img) => img.category === selectedCategory),
    [selectedCategory],
  );

  // Enhanced intersection observer with smoother entrance animations
  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            // Add a small delay for smoother staggered animation
            const delay = parseInt(el.dataset.index || "0") * 60;
            setTimeout(() => {
              el.style.transition =
                "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
              el.classList.add("opacity-100", "translate-y-0", "scale-100");
              el.classList.remove("opacity-0", "translate-y-8", "scale-95");
            }, delay);
            observerRef.current?.unobserve(el);
          }
        });
      },
      { threshold: 0.15, rootMargin: "50px 0px 0px 0px" },
    );

    itemRefs.current.forEach((node) => {
      if (node) observerRef.current?.observe(node);
    });

    return () => observerRef.current?.disconnect();
  }, [filteredImages]);

  // Enhanced category change with smooth transition
  const handleCategoryChange = useCallback(
    (category: Category) => {
      if (category === selectedCategory) return;

      setCategoryTransition(true);

      // Fade out current items
      itemRefs.current.forEach((node) => {
        if (node) {
          node.style.transition = "all 0.3s ease-out";
          node.classList.remove("opacity-100", "translate-y-0", "scale-100");
          node.classList.add("opacity-0", "translate-y-4", "scale-98");
        }
      });

      setTimeout(() => {
        setSelectedCategory(category);
        setCategoryTransition(false);
      }, 300);
    },
    [selectedCategory],
  );

  // Enhanced lightbox with smoother animations
  const openLightbox = useCallback((img: GalleryImage) => {
    setLightboxImage(img);
    setIsLightboxAnimating(true);
    document.body.style.overflow = "hidden";

    // Smooth fade-in animation
    requestAnimationFrame(() => {
      setIsLightboxOpen(true);
      setTimeout(() => setIsLightboxAnimating(false), 400);
    });
  }, []);

  const closeLightbox = useCallback(() => {
    setIsLightboxAnimating(true);
    setTimeout(() => {
      setIsLightboxOpen(false);
      setLightboxImage(null);
      setIsLightboxAnimating(false);
      document.body.style.overflow = "";
    }, 300);
  }, []);

  // Enhanced navigation with smooth image transitions
  const navigateLightbox = useCallback(
    (dir: "next" | "prev") => {
      if (!lightboxImage || isLightboxAnimating) return;

      const idx = filteredImages.findIndex((i) => i.id === lightboxImage.id);
      if (idx === -1) return;

      const nextIndex =
        dir === "next"
          ? (idx + 1) % filteredImages.length
          : (idx - 1 + filteredImages.length) % filteredImages.length;

      setIsLightboxAnimating(true);

      // Smooth transition between images
      if (lightboxImageRef.current) {
        lightboxImageRef.current.style.transition =
          "all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
        lightboxImageRef.current.style.transform = `scale(0.95) ${dir === "next" ? "translateX(-20px)" : "translateX(20px)"}`;
        lightboxImageRef.current.style.opacity = "0.7";
      }

      setTimeout(() => {
        setLightboxImage(filteredImages[nextIndex]);

        if (lightboxImageRef.current) {
          lightboxImageRef.current.style.transform = `scale(1.05) ${dir === "next" ? "translateX(20px)" : "translateX(-20px)"}`;

          requestAnimationFrame(() => {
            if (lightboxImageRef.current) {
              lightboxImageRef.current.style.transform =
                "scale(1) translateX(0)";
              lightboxImageRef.current.style.opacity = "1";
            }
          });
        }

        setTimeout(() => setIsLightboxAnimating(false), 300);
      }, 150);
    },
    [lightboxImage, filteredImages, isLightboxAnimating],
  );

  useEffect(() => {
    if (!isLightboxOpen) return;

    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      else if (e.key === "ArrowRight" && !isLightboxAnimating)
        navigateLightbox("next");
      else if (e.key === "ArrowLeft" && !isLightboxAnimating)
        navigateLightbox("prev");
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isLightboxOpen, closeLightbox, navigateLightbox, isLightboxAnimating]);

  // Enhanced preloading
  useEffect(() => {
    if (!lightboxImage) return;
    const idx = filteredImages.findIndex((i) => i.id === lightboxImage.id);
    const preload = (i: number) => {
      const img = filteredImages[i];
      if (!img) return;
      const preloadImg = new window.Image(1);
      preloadImg.src = img.src;
    };
    preload((idx + 1) % filteredImages.length);
    preload((idx - 1 + filteredImages.length) % filteredImages.length);
  }, [lightboxImage, filteredImages]);

  const setItemRef = useCallback((id: number, node: HTMLDivElement | null) => {
    if (node) itemRefs.current.set(id, node);
    else itemRefs.current.delete(id);
  }, []);

  const getHeightClass = (h: GalleryImage["height"]) => {
    switch (h) {
      case "tall":
        return "md:row-span-2";
      default:
        return "md:row-span-1";
    }
  };

  return (
    <>
      <Header
        scrollY={scrollY}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />
      <div
        className="page-content min-h-screen"
        style={{ backgroundColor: COLORS.secondary, color: COLORS.dark }}
      >

      {/* Enhanced hero section with smoother parallax */}
      <div
        ref={heroRef}
        className="relative flex h-[70vh] min-h-[520px] items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0">
          <Image
            src="/images/forest-path.webp"
            alt="Forest Path"
            fill
            priority
            className="object-cover transition-transform duration-700 ease-out"
            style={{
              transform: `translateY(${scrollY * 0.15}px) scale(${1 + scrollY * 0.0002})`,
            }}
            sizes="100vw"
          />
          <div
            className="absolute inset-0 transition-opacity duration-700"
            style={{
              backgroundColor: COLORS.dark,
              opacity: Math.min(0.4 + scrollY * 0.0008, 0.7),
            }}
          />
        </div>
        <div
          className="relative z-10 px-4 text-center transition-all duration-700 ease-out"
          style={{
            transform: `translateY(${scrollY * 0.3}px)`,
            opacity: Math.max(1 - scrollY * 0.002, 0.3),
          }}
        >
          <div className="mb-6 flex justify-center">
            <Camera
              className="h-12 w-12 animate-pulse md:h-16 md:w-16"
              style={{
                color: COLORS.light,
                animationDuration: "3s",
              }}
            />
          </div>
          <h1
            className="mb-4 text-4xl font-light tracking-wider transition-all duration-1000 ease-out md:text-6xl lg:text-7xl"
            style={{ color: COLORS.light }}
          >
            GALLERY
          </h1>
          <p
            className="mx-auto max-w-2xl text-lg font-light tracking-wide opacity-90 transition-all delay-200 duration-1000 ease-out md:text-xl"
            style={{ color: COLORS.light }}
          >
            Discover the beauty and tranquility of AYADA CLIFF through our
            curated collection of moments
          </p>
        </div>
      </div>

      {/* Enhanced category filter with smooth transitions */}
      <div
        className="sticky top-16 z-30 border-b border-white/5 backdrop-blur-md transition-all duration-300"
        style={{ backgroundColor: `${COLORS.secondary}E6` }}
      >
        <div className="container mx-auto px-4 py-4 md:py-6">
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {CATEGORY_OPTIONS.map((c, index) => {
              const active = c === selectedCategory;
              return (
                <Button
                  key={c}
                  onClick={() => handleCategoryChange(c)}
                  variant="ghost"
                  className={`transform px-4 py-2 text-xs font-light tracking-wider transition-all duration-300 ease-out hover:scale-105 md:text-sm ${
                    active
                      ? "scale-105 shadow-lg"
                      : "hover:bg-white/10 hover:shadow-md focus-visible:ring-1"
                  }`}
                  style={{
                    backgroundColor: active ? COLORS.primary : "transparent",
                    color: active ? COLORS.secondary : COLORS.primary,
                    transitionDelay: `${index * 50}ms`,
                  }}
                  aria-pressed={active}
                  disabled={categoryTransition}
                >
                  {c.toUpperCase()}
                </Button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Enhanced gallery grid */}
      <div className="container mx-auto px-4 py-10 md:py-14">
        <div className="columns-1 gap-4 [column-fill:_balance] sm:columns-2 lg:columns-3 xl:columns-4">
          {filteredImages.map((img, i) => (
            <div
              key={`${img.id}-${selectedCategory}`}
              ref={(node) => setItemRef(img.id, node)}
              data-index={i}
              className={`group mb-4 translate-y-8 scale-95 transform cursor-zoom-in break-inside-avoid overflow-hidden rounded-lg opacity-0 ${getHeightClass(
                img.height,
              )}`}
              onClick={() => openLightbox(img)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") openLightbox(img);
              }}
              aria-label={`${img.title} – open image`}
            >
              <div className="relative w-full overflow-hidden rounded-lg">
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={800}
                  height={1000}
                  className="h-auto w-full scale-100 transform object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:brightness-110"
                  loading="lazy"
                  decoding="async"
                  sizes="(max-width:768px) 100vw, (max-width:1280px) 50vw, 25vw"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-all duration-500 ease-out group-hover:opacity-100" />
                <div className="pointer-events-none absolute right-4 bottom-4 left-4 translate-y-6 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                  <h3
                    className="mb-1 transform text-lg font-light tracking-wide transition-transform duration-500 ease-out group-hover:scale-105"
                    style={{ color: COLORS.light }}
                  >
                    {img.title}
                  </h3>
                  <p
                    className="transform text-xs font-light tracking-wider opacity-80 transition-all delay-100 duration-500 ease-out group-hover:scale-105"
                    style={{ color: COLORS.light }}
                  >
                    {img.category.toUpperCase()}
                  </p>
                </div>
              </div>
            </div>
          ))}
          {filteredImages.length === 0 && (
            <div
              className="py-20 text-center text-sm font-light opacity-70 transition-opacity duration-500"
              style={{ color: COLORS.primary }}
            >
              No images found in this category.
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Lightbox with smoother animations */}
      {isLightboxOpen && lightboxImage && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-400 ease-out ${
            isLightboxAnimating && !isLightboxOpen
              ? "scale-95 opacity-0"
              : "scale-100 opacity-100"
          }`}
          style={{ backgroundColor: "rgba(0,0,0,0.92)" }}
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label={`Viewing ${lightboxImage.title}`}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 rounded-full p-2 text-white/90 transition-all duration-300 ease-out hover:scale-110 hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:outline-none"
            aria-label="Close lightbox"
          >
            <X className="h-6 w-6" />
          </button>

          {filteredImages.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (!isLightboxAnimating) navigateLightbox("prev");
                }}
                className="absolute top-1/2 left-3 -translate-y-1/2 rounded-full p-3 text-white/80 transition-all duration-300 ease-out hover:scale-110 hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:outline-none md:left-6"
                aria-label="Previous image"
                disabled={isLightboxAnimating}
              >
                <ArrowLeft className="h-6 w-6" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (!isLightboxAnimating) navigateLightbox("next");
                }}
                className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full p-3 text-white/80 transition-all duration-300 ease-out hover:scale-110 hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:outline-none md:right-6"
                aria-label="Next image"
                disabled={isLightboxAnimating}
              >
                <ArrowRight className="h-6 w-6" />
              </button>
            </>
          )}

          <div
            className="relative max-h-[90vh] max-w-[92vw] transition-all duration-400 ease-out"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              ref={lightboxImageRef}
              src={lightboxImage.src}
              alt={lightboxImage.alt}
              width={1600}
              height={1200}
              className="max-h-[90vh] w-auto rounded-lg object-contain transition-all duration-400 ease-out"
              priority
              sizes="(max-width:768px) 90vw, 70vw"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 rounded-b-lg bg-gradient-to-t from-black/90 to-transparent p-5 transition-all duration-500 ease-out">
              <h3
                className="mb-1 text-xl font-light tracking-wide transition-all duration-500 ease-out md:text-2xl"
                style={{ color: COLORS.light }}
              >
                {lightboxImage.title}
              </h3>
              <p
                className="text-xs font-light tracking-wider opacity-80 transition-all delay-100 duration-500 ease-out md:text-sm"
                style={{ color: COLORS.light }}
              >
                {lightboxImage.category.toUpperCase()}
              </p>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
    </>
  );
};

export default GalleryPage;
