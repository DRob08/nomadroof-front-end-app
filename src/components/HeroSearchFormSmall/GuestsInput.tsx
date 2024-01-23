import React, { useEffect, useState } from "react";
import { FC } from "react";
import ClearDataButton from "./ClearDataButton";
import ButtonSubmit from "./ButtonSubmit";
import useOutsideAlerter from "hooks/useOutsideAlerter";
import { GuestsObject } from "components/HeroSearchForm/type";
import NcInputNumber from "components/NcInputNumber/NcInputNumber";

export interface GuestsInputProps {
  className?: string;
  fieldClassName?: string;
  autoFocus?: boolean;
  submitLink: string;
}

const GuestsInput: FC<GuestsInputProps> = ({
  fieldClassName = "[ nc-hero-field-padding--small ]",
  className = "",
  autoFocus = false,
  submitLink,
}) => {
  const refContainer = React.createRef<HTMLDivElement>();
  const [isOpen, setIsOpen] = useState(false);
  useOutsideAlerter(refContainer, () => setIsOpen(false));

  const [guestAdultsInputValue, setGuestAdultsInputValue] = useState(1);
  const [guestChildrenInputValue, setGuestChildrenInputValue] = useState(0);
  const [guestInfantsInputValue, setGuestInfantsInputValue] = useState(0);

  useEffect(() => {
    setIsOpen(autoFocus);
  }, [autoFocus]);

  const handleChangeData = (value: number, type: keyof GuestsObject) => {
    if (type === "guestAdults") {
      setGuestAdultsInputValue(value);
    }
    if (type === "guestChildren") {
      setGuestChildrenInputValue(value);
    }
    if (type === "guestInfants") {
      setGuestInfantsInputValue(value);
    }
  };

  const totalGuests = guestChildrenInputValue + guestAdultsInputValue;

  return (
    <div className={`flex z-10 relative ${className}`} ref={refContainer}>
      <div
        className={`flex z-10 relative flex-1 text-left justify-between items-center focus:outline-none cursor-pointer ${
          isOpen ? "nc-hero-field-focused--2" : ""
        }`}
      >
        <div
          className={`${fieldClassName} flex-1`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex-1 text-left">
            <span className="block font-semibold">
              {totalGuests || ""} Guests
            </span>
            <span className="block mt-1 text-sm text-neutral-400 leading-none font-light">
              {totalGuests ? "Guests" : "Add guests"}
            </span>
          </div>
        </div>
        <div className="relative">
          {!!totalGuests && isOpen && (
            <ClearDataButton
              onClick={() => {
                setGuestAdultsInputValue(0);
                setGuestChildrenInputValue(0);
                setGuestInfantsInputValue(0);
              }}
            />
          )}
        </div>
        <div className="pr-2">
          <ButtonSubmit href={submitLink} />
        </div>
      </div>

      {isOpen && (
        <div className="h-8 absolute self-center top-1/2 -translate-y-1/2 z-0 -left-0.5 right-10 bg-white dark:bg-neutral-800"></div>
      )}

      {isOpen && (
        <div className="absolute right-0 z-30 w-full sm:min-w-[340px] max-w-sm bg-white dark:bg-neutral-800 top-full mt-3 py-5 sm:py-6 px-4 sm:px-8 rounded-3xl shadow-xl">
          <NcInputNumber
            className="w-full"
            defaultValue={guestAdultsInputValue}
            onChange={(value) => handleChangeData(value, "guestAdults")}
            max={10}
            min={1}
            label="Adults"
            desc="Ages 18 or above"
          />
          {/* Remove NcInputNumber for guestChildren and guestInfants */}
        </div>
      )}
    </div>
  );
};

export default GuestsInput;
