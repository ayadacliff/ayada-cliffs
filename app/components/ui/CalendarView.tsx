import { DAYS, MONTHS } from "@/app/data/Reserve";
import { COLORS } from "@/app/theme/colors";
import { Villa } from "@/app/types/types";
import { ArrowLeft, ArrowRight } from "lucide-react";
import React, { JSX } from "react";

type CalendarViewProps = {
  selectedVilla: Villa | null;
  selectedArrival: Date | null;
  selectedDeparture: Date | null;
  onDateSelect: (day: number, month: number, year: number) => void;
  currentMonth: number;
  currentYear: number;
  nextMonth: number;
  nextMonthYear: number;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  adultCount: number;
  childrenCount: number;
  onAdultCountChange: (count: number) => void;
  onChildrenCountChange: (count: number) => void;
  onNext: () => void;
  onBack: () => void;
};

const CalendarView: React.FC<CalendarViewProps> = ({
  selectedVilla,
  selectedArrival,
  selectedDeparture,
  onDateSelect,
  currentMonth,
  currentYear,
  nextMonth,
  nextMonthYear,
  onPrevMonth,
  onNextMonth,
  adultCount,
  childrenCount,
  onAdultCountChange,
  onChildrenCountChange,
  onNext,
  onBack,
}) => {
  const getDaysInMonth = (month: number, year: number): number =>
    new Date(year, month + 1, 0).getDate();

  const getFirstDayOfMonth = (month: number, year: number): number =>
    new Date(year, month, 1).getDay();

  const isDateSelected = (
    day: number,
    month: number,
    year: number,
  ): boolean => {
    if (!selectedArrival) return false;
    const date = new Date(year, month, day);
    if (selectedArrival && selectedDeparture) {
      return date >= selectedArrival && date <= selectedDeparture;
    }
    return date.getTime() === selectedArrival.getTime();
  };

  const isDateArrival = (day: number, month: number, year: number): boolean => {
    if (!selectedArrival) return false;
    const date = new Date(year, month, day);
    return date.getTime() === selectedArrival.getTime();
  };

  const isDateDeparture = (
    day: number,
    month: number,
    year: number,
  ): boolean => {
    if (!selectedDeparture) return false;
    const date = new Date(year, month, day);
    return date.getTime() === selectedDeparture.getTime();
  };

  const formatDate = (date: Date | null): string => {
    if (!date) return "";
    return `${DAYS[date.getDay()]}, ${MONTHS[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  };

  const renderCalendar = (month: number, year: number) => {
    const daysInMonth = getDaysInMonth(month, year);
    const firstDay = getFirstDayOfMonth(month, year);
    const days: JSX.Element[] = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<td key={`empty-${i}`} className="p-2"></td>);
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);

      // 🚫 Prevent selecting past dates
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const isPastDate = date < today;

      const isSelected = isDateSelected(day, month, year);
      const isArrival = isDateArrival(day, month, year);
      const isDeparture = isDateDeparture(day, month, year);

      days.push(
        <td
          key={day}
          className={`p-1 md:p-2 text-center transition-colors select-none ${
            isPastDate
              ? "cursor-not-allowed bg-transparent"
              : "cursor-pointer hover:bg-stone-100/70"
          } ${isSelected && !isPastDate ? "bg-[#84321F]/10" : ""}`}
          onClick={() => {
            if (!isPastDate) {
              onDateSelect(day, month, year);
            }
          }}
        >
          <div
            className={`mx-auto flex h-7 w-7 md:h-10 md:w-10 items-center justify-center rounded-full text-xs md:text-sm font-light transition-all ${
              isPastDate
                ? "text-stone-300 line-through decoration-stone-300/60"
                : isArrival || isDeparture
                  ? "bg-[#84321F] text-white shadow-sm scale-105 font-medium"
                  : isSelected
                    ? "text-[#84321F] font-medium"
                    : "text-stone-800 hover:text-[#84321F]"
            }`}
          >
            {day}
          </div>
        </td>,
      );
    }

    // Group days into rows of 7
    const rows: JSX.Element[] = [];
    let cells: JSX.Element[] = [];

    days.forEach((cell, index) => {
      if (index % 7 === 0 && index > 0) {
        rows.push(<tr key={`row-${index}`}>{cells}</tr>);
        cells = [];
      }
      cells.push(cell);
    });

    // Add the last row with padding if needed
    if (cells.length > 0) {
      while (cells.length < 7) {
        cells.push(<td key={`empty-end-${cells.length}`} className="p-2"></td>);
      }
      rows.push(<tr key="row-last">{cells}</tr>);
    }

    return (
      <div>
        <div className="md:text-md mb-4 text-center text-sm">
          <h3
            className="text-base font-light tracking-wider uppercase"
            style={{ color: COLORS.primary }}
          >
            {MONTHS[month]} {year}
          </h3>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr>
              {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
                <th
                  key={index}
                  className="p-2 font-light"
                  style={{ color: COLORS.primary }}
                >
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </div>
    );
  };

  const today = new Date();
  const isCurrentMonthOrPast =
    currentYear < today.getFullYear() ||
    (currentYear === today.getFullYear() && currentMonth <= today.getMonth());
  const canCheckAvailability = selectedArrival && selectedDeparture;

  return (
    <div className="mx-auto max-w-6xl">
      <button
        onClick={onBack}
        className="mb-6 flex items-center text-sm font-light"
        style={{ color: COLORS.primary }}
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to villa selection
      </button>

      <div className="mb-8 text-center">
        <h2
          className="mb-2 text-2xl font-light"
          style={{ color: COLORS.primary }}
        >
          Select your dates for {selectedVilla ? selectedVilla.name : ""}
        </h2>
        {selectedArrival && (
          <div className="text-sm" style={{ color: COLORS.primary }}>
            {selectedDeparture ? (
              <span>
                {formatDate(selectedArrival)} - {formatDate(selectedDeparture)}
              </span>
            ) : (
              <span>
                {formatDate(selectedArrival)} - Please select departure date
              </span>
            )}
          </div>
        )}
      </div>

      <div className="mb-8 flex flex-col items-center justify-center md:flex-row">
        <button
          onClick={onPrevMonth}
          disabled={isCurrentMonthOrPast}
          className={`mb-2 p-2.5 rounded-full transition-colors md:mb-0 ${
            isCurrentMonthOrPast
              ? "opacity-25 cursor-not-allowed text-stone-400"
              : "hover:bg-stone-200/60 active:scale-95"
          }`}
          style={{ color: isCurrentMonthOrPast ? undefined : COLORS.primary }}
          aria-label="Previous month"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>

        <div className="mx-4 grid w-full max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
          <div className="rounded-md bg-white p-6 shadow-sm">
            {renderCalendar(currentMonth, currentYear)}
          </div>
          <div className="rounded-md bg-white p-6 shadow-sm">
            {renderCalendar(nextMonth, nextMonthYear)}
          </div>
        </div>

        <button
          onClick={onNextMonth}
          className="mt-2 p-2 md:mt-0"
          style={{ color: COLORS.primary }}
        >
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>

      <div className="mx-auto mb-8 grid w-full max-w-xl grid-cols-2 gap-4">
        <div>
          <label
            className="mb-2 block text-xs font-light tracking-widest uppercase"
            style={{ color: COLORS.primary }}
          >
            Adults
          </label>
          <select
            value={adultCount}
            onChange={(e) => onAdultCountChange(parseInt(e.target.value))}
            className="w-full rounded border p-2"
            style={{ borderColor: COLORS.primary, color: COLORS.primary }}
          >
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <option key={num} value={num}>
                {num} Adult{num !== 1 ? "s" : ""}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            className="mb-2 block text-xs font-light tracking-widest uppercase"
            style={{ color: COLORS.primary }}
          >
            Children
          </label>
          <select
            value={childrenCount}
            onChange={(e) => onChildrenCountChange(parseInt(e.target.value))}
            className="w-full rounded border p-2"
            style={{ borderColor: COLORS.primary, color: COLORS.primary }}
          >
            {[0, 1, 2, 3, 4, 5, 6].map((num) => (
              <option key={num} value={num}>
                {num} {num === 1 ? "Child" : "Children"}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={onNext}
          disabled={!canCheckAvailability}
          className="px-10 py-4 text-sm tracking-widest uppercase transition-all"
          style={{
            backgroundColor: COLORS.primary,
            color: COLORS.light,
            opacity: canCheckAvailability ? 1 : 0.5,
          }}
        >
          Check Availability
        </button>
      </div>
    </div>
  );
};

export default CalendarView;
