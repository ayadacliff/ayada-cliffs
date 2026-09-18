"use client";
import React, { useState, useEffect } from "react";
import Header from "./components/sections/Header";
import Footer from "./components/sections/Footer";
import LoadingScreen from "./loading";
import UnderMaintenancePage from "./components/sections/UnderMaintenance";
import dynamic from "next/dynamic";
import HeroSection from "./components/sections/HeroSection";



const IntroductionSection = dynamic(
  () => import("./components/sections/IntroductionSection"),
  { ssr: true },
);

const AccommodationsSection = dynamic(
  () => import("./components/sections/AccommodationsSection"),
  { ssr: false },
);

const DestinationsSection = dynamic(
  () => import("./components/sections/DestinationsSection"),
  { ssr: false },
);
const CarouselSection = dynamic(
  () => import("./components/sections/CarouselSection"),
  { ssr: false },
);
const ExperienceSection = dynamic(
  () => import("./components/sections/ExperienceSection"),
  { ssr: false },
);

import { AnimatePresence } from "framer-motion";
import MobileBookingBar from "./components/ui/MobileBookingBar";

const AyadaCLIFFPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState(0);
  const [loading, setLoading] = useState(true);

  // ✅ Explicit cast + default
  const prodEnvironment: "development" | "production" | "maintenance" =
    (process.env.NEXT_PUBLIC_ENVIRONMENT as
      | "development"
      | "production"
      | "maintenance") || "development";

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.body.style.overflow = loading ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [loading]);

  if (prodEnvironment === "maintenance") {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
        <UnderMaintenancePage />
      </div>
    );
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <LoadingScreen key="loader" />}
      </AnimatePresence>

      {!loading && (
        <Header
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
        />
      )}

      <div className="page-content text-dark hide-scrollbar min-h-screen overflow-x-hidden bg-white font-light">
        <HeroSection />

        <IntroductionSection />
        <AccommodationsSection />
        <CarouselSection />
        <ExperienceSection />

        <DestinationsSection
          selectedFeature={selectedFeature}
          setSelectedFeature={setSelectedFeature}
        />

        <Footer />
        <MobileBookingBar />
      </div>
    </>
  );
};

export default AyadaCLIFFPage;
