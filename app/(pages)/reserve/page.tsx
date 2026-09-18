"use client";
import React, { useState, useEffect, JSX, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { COLORS } from "@/app/theme/colors";
import Header from "@/app/components/sections/Header";
import VillaSelection from "@/app/components/ui/VillaSelection";
import CalendarView from "@/app/components/ui/CalendarView";
import GuestDetails from "@/app/components/ui/GuestDetails";
import ConfirmationCard from "@/app/components/ui/ConfirmationCard";
import { Villa } from "@/app/types/types";
import { VILLAS } from "@/app/data/Villas";

interface FormData {
  prefix: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialRequest: string;
}

type Step = "selection" | "calendar" | "details" | "confirmation";

function VillaBookingAppContent(): JSX.Element {
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState<Step>("selection");
  const [selectedVilla, setSelectedVilla] = useState<Villa | null>(null);
  const [selectedArrival, setSelectedArrival] = useState<Date | null>(null);
  const [selectedDeparture, setSelectedDeparture] = useState<Date | null>(null);
  const [adultCount, setAdultCount] = useState<number>(2);
  const [childrenCount, setChildrenCount] = useState<number>(0);
  const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());
  const [formData, setFormData] = useState<FormData>({
    prefix: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specialRequest: "",
  });

  // Handle pre-filled parameters from Hero Quick Booking Strip
  useEffect(() => {
    if (!searchParams) return;

    const villaParam = searchParams.get("villa");
    const arrivalParam = searchParams.get("arrival");
    const departureParam = searchParams.get("departure");
    const guestsParam = searchParams.get("guests");

    if (villaParam) {
      const found = VILLAS.find((v) => String(v.id) === villaParam);
      if (found) setSelectedVilla(found);
    }

    if (arrivalParam) {
      const arr = new Date(arrivalParam);
      if (!isNaN(arr.getTime())) {
        setSelectedArrival(arr);
        setCurrentMonth(arr.getMonth());
        setCurrentYear(arr.getFullYear());
      }
    }

    if (departureParam) {
      const dep = new Date(departureParam);
      if (!isNaN(dep.getTime())) {
        setSelectedDeparture(dep);
      }
    }

    if (guestsParam) {
      const g = parseInt(guestsParam);
      if (!isNaN(g)) setAdultCount(g);
    }

    if (villaParam && (arrivalParam || departureParam)) {
      setCurrentStep("calendar");
    }
  }, [searchParams]);

  const nextMonth: number = currentMonth === 11 ? 0 : currentMonth + 1;
  const nextMonthYear: number = currentMonth === 11 ? currentYear + 1 : currentYear;

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const handleVillaSelect = (villa: Villa): void => {
    setSelectedVilla(villa);
  };

  const handleDateSelect = (day: number, month: number, year: number): void => {
    const selectedDate = new Date(year, month, day);

    if (!selectedArrival || (selectedArrival && selectedDeparture)) {
      setSelectedArrival(selectedDate);
      setSelectedDeparture(null);
    } else if (selectedDate > selectedArrival) {
      setSelectedDeparture(selectedDate);
    } else {
      setSelectedArrival(selectedDate);
      setSelectedDeparture(null);
    }
  };

  const handlePrevMonth = (): void => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = (): void => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setCurrentStep("confirmation");
  };

  const handleReset = (): void => {
    setCurrentStep("selection");
    setSelectedVilla(null);
    setSelectedArrival(null);
    setSelectedDeparture(null);
    setAdultCount(2);
    setChildrenCount(0);
    setFormData({
      prefix: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      specialRequest: "",
    });
  };

  return (
    <>
      <Header 
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        isLightBackground={true}
      />
      <div className="page-content min-h-screen h-full flex flex-col justify-between items-center" style={{ backgroundColor: COLORS.secondary }}>
        <div className="px-4 py-8 pt-24">
        {currentStep === "selection" && (
          <VillaSelection
            selectedVilla={selectedVilla}
            onVillaSelect={handleVillaSelect}
            onNext={() => setCurrentStep("calendar")}
          />
        )}

        {currentStep === "calendar" && (
          <CalendarView
            selectedVilla={selectedVilla}
            selectedArrival={selectedArrival}
            selectedDeparture={selectedDeparture}
            onDateSelect={handleDateSelect}
            currentMonth={currentMonth}
            currentYear={currentYear}
            nextMonth={nextMonth}
            nextMonthYear={nextMonthYear}
            onPrevMonth={handlePrevMonth}
            onNextMonth={handleNextMonth}
            adultCount={adultCount}
            childrenCount={childrenCount}
            onAdultCountChange={setAdultCount}
            onChildrenCountChange={setChildrenCount}
            onNext={() => setCurrentStep("details")}
            onBack={() => setCurrentStep("selection")}
          />
        )}

        {currentStep === "details" && (
          <GuestDetails
            selectedVilla={selectedVilla}
            selectedArrival={selectedArrival}
            selectedDeparture={selectedDeparture}
            adultCount={adultCount}
            childrenCount={childrenCount}
            formData={formData}
            onFormChange={handleFormChange}
            onSubmit={handleFormSubmit}
            onBack={() => setCurrentStep("calendar")}
          />
        )}

        {currentStep === "confirmation" && (
          <ConfirmationCard
            selectedVilla={selectedVilla}
            selectedArrival={selectedArrival}
            selectedDeparture={selectedDeparture}
            adultCount={adultCount}
            childrenCount={childrenCount}
            formData={formData}
            onReset={handleReset}
          />
        )}
      </div>
    </div>
    </>
  );
}

export default function VillaBookingApp(): JSX.Element {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FBF9F5]" />}>
      <VillaBookingAppContent />
    </Suspense>
  );
}