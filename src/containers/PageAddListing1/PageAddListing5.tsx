import React, { FC } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Input from "shared/Input/Input";
import CommonLayout from "./CommonLayout";
import { usePropertyContextProvider } from "../../contexts/PropertyContext";

export interface PageAddListing5Props {}

const PageAddListing5: FC<PageAddListing5Props> = () => {
  const { propertyState, setBooleanProperty } = usePropertyContextProvider();

  const renderRadio = (
    name: string,
    id: string,
    label: string,
    checked: boolean
  ) => {
    const handleChange = () => {
      setBooleanProperty(name, !propertyState[name]);
    };

    return (
      <div className="flex items-center">
        <input
          checked={checked}
          id={id + name}
          name={name}
          type="radio"
          className="focus:ring-primary-500 h-6 w-6 text-primary-500 border-neutral-300 !checked:bg-primary-500 bg-transparent"
          onChange={handleChange}
        />
        <label
          htmlFor={id + name}
          className="ml-3 block text-sm font-medium text-neutral-700 dark:text-neutral-300"
        >
          {label}
        </label>
      </div>
    );
  };

  const renderNoInclude = (text: string) => {
    return (
      <div className="flex items-center justify-between py-3">
        <span className="text-neutral-6000 dark:text-neutral-400 font-medium">
          {text}
        </span>
        <i className="text-2xl text-neutral-400 las la-times-circle hover:text-neutral-900 dark:hover:text-neutral-100 cursor-pointer"></i>
      </div>
    );
  };

  return (
    <CommonLayout
      index="05"
      backtHref="/add-listing-4"
      nextHref="/add-listing-6"
    >
      <>
        <div>
          <h2 className="text-2xl font-semibold">
            Set house rules for your guests{" "}
          </h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            Guests must agree to your house rules before they book.
          </span>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        {/* FORM */}
        <div className="space-y-8">
          {/* ITEM */}
          <div>
            <label className="text-lg font-semibold" htmlFor="">
              General amenities
            </label>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {renderRadio("allow_smoking", "Do", "Do not allow", !propertyState.allow_smoking)}
              {renderRadio("allow_smoking", "Allow", "Allow", propertyState.allow_smoking)}
              {/* {renderRadio("allow_smoking", "Charge", "Charge", false)} */}
            </div>
          </div>

          {/* ITEM */}
          <div>
            <label className="text-lg font-semibold" htmlFor="">
              Pet
            </label>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {renderRadio("allow_pet", "Do", "Do not allow", !propertyState.allow_pet)}
              {renderRadio("allow_pet", "Allow", "Allow", propertyState.allow_pet)}
              {/* {renderRadio("allow_pet", "Charge", "Charge", false)} */}
            </div>
          </div>

          {/* ITEM */}
          <div>
            <label className="text-lg font-semibold" htmlFor="">
              Party organizing
            </label>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {renderRadio("allow_party_organizing", "Do", "Do not allow", !propertyState.allow_party_organizing)}
              {renderRadio("allow_party_organizing", "Allow", "Allow", propertyState.allow_party_organizing)}
              {/* {renderRadio("allow_party_organizing", "Charge", "Charge", false)} */}
            </div>
          </div>

          {/* ITEM */}
          <div>
            <label className="text-lg font-semibold" htmlFor="">
              Cooking
            </label>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {renderRadio("allow_cooking", "Do", "Do not allow", !propertyState.allow_cooking)}
              {renderRadio("allow_cooking", "Allow", "Allow", propertyState.allow_cooking)}
              {/* {renderRadio("allow_cooking", "Charge", "Charge", false)} */}
            </div>
          </div>

          {/* ----------- */}
          <div className=" border-b border-neutral-200 dark:border-neutral-700"></div>
          <span className="block text-lg font-semibold">Additional rules</span>
          <div className="flow-root">
            <div className="-my-3 divide-y divide-neutral-100 dark:divide-neutral-800">
              {renderNoInclude("No smoking in common areas")}
              {renderNoInclude("Do not wear shoes/shoes in the house")}
              {renderNoInclude("No cooking in the bedroom")}
            </div>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between space-y-3 sm:space-y-0 sm:space-x-5">
            <Input className="!h-full" placeholder="No smoking..." />
            <ButtonPrimary className="flex-shrink-0">
              <i className="text-xl las la-plus"></i>
              <span className="ml-3">Add tag</span>
            </ButtonPrimary>
          </div>
        </div>
      </>
    </CommonLayout>
  );
};

export default PageAddListing5;
