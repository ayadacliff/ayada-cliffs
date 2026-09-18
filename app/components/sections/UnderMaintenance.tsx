"use client";

import { COLORS } from "@/app/theme/colors";
import React, { useState, useEffect } from "react";
import Image from "next/image";

const UnderMaintenancePage = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen w-full overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={`absolute -top-40 -right-40 h-80 w-80 rounded-full bg-blue-100 opacity-20 transition-all duration-[3000ms] ${
            isLoaded ? "scale-100" : "scale-0"
          }`}
        ></div>
        <div
          className={`absolute -bottom-32 -left-32 h-64 w-64 rounded-full bg-indigo-100 opacity-30 transition-all delay-500 duration-[2500ms] ${
            isLoaded ? "scale-100" : "scale-0"
          }`}
        ></div>
      </div>

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <div
            className={`mb-12 transition-all duration-1500 ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <div
              className={`mx-auto mb-6 h-px bg-slate-300 transition-all delay-300 duration-1200 ${
                isLoaded ? "w-20 opacity-70" : "w-0 opacity-0"
              }`}
            ></div>
            <div
              className={`transition-all delay-1200 duration-1500 ${
                isLoaded
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }`}
            >
              <Image
                src="/images/logo/ayadaclifflogo-typo.png"
                alt="AYADA CLIFF"
                width={300}
                height={80}
                className="w-full h-auto"
                priority
              />
            </div>

            {/* Brand name divider */}
            <div className="mb-8">
              <div
                className={`mx-auto h-px bg-slate-300 transition-all delay-800 duration-1000 ${
                  isLoaded ? "w-40 opacity-50" : "w-0 opacity-0"
                }`}
              ></div>
            </div>

            <span
              className={`text-sm tracking-widest uppercase transition-all delay-1000 duration-1000 ${
                isLoaded
                  ? "translate-y-0 opacity-80"
                  : "translate-y-2 opacity-0"
              }`}
              style={{ color: COLORS.dark }}
            >
              A Sanctuary of Tranquility
            </span>
          </div>

          {/* Under Maintenance Message */}
          <div
            className={`transition-all delay-1200 duration-1200 ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            <h2
              className="mb-6 text-3xl font-light tracking-wide md:text-4xl"
              style={{ color: COLORS.primary }}
            >
              Under Maintenance
            </h2>
            <p
              className="mx-auto max-w-2xl text-base leading-relaxed font-light md:text-lg"
              style={{ color: COLORS.dark, opacity: 0.8 }}
            >
              We’re currently performing scheduled maintenance.  
              Please check back soon for an improved experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnderMaintenancePage;
