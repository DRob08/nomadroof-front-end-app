import NcInputNumber from "components/NcInputNumber/NcInputNumber";
import React, { FC, useEffect } from "react";
import Select from "shared/Select/Select";
import CommonLayout from "./CommonLayout";
import FormItem from "./FormItem";
import { usePropertyContextProvider } from '../../contexts/PropertyContext'; // Import the property context hook

export interface PageAddListing3Props {}

const PageAddListing3: FC<PageAddListing3Props> = () => {
  const { propertyState, setPropertyField } = usePropertyContextProvider(); // Get property state and setter function from context

  useEffect(() => {
    // Set the form fields with the property state values when the component mounts
    setFormFields(propertyState);
  }, [propertyState]);

  // Helper function to set form fields with property state values
  const setFormFields = (propertyState: any) => {
    setAcreage(propertyState.size);
    setGuests(propertyState.max_guests);
    setBedrooms(propertyState.bedrooms);
    setBeds(propertyState.rooms);
    setBathrooms(propertyState.bathrooms);
    setKitchen(propertyState.kitchen);
  };

  // Handler functions to update property context when form fields change
  const setAcreage = (size: string) => {
    setPropertyField('size', size);
  };

  const setGuests = (max_guests: number) => {
    setPropertyField('max_guests', max_guests);
  };

  const setBedrooms = (bedrooms: number) => {
    setPropertyField('bedrooms', bedrooms);
  };

  const setBeds = (rooms: number) => {
    setPropertyField('rooms', rooms);
  };

  const setBathrooms = (bathrooms: number) => {
    setPropertyField('bathrooms', bathrooms);
  };

  const setKitchen = (kitchen: number) => {
    setPropertyField('kitchen', kitchen);
  };

  return (
    <CommonLayout
      index="03"
      backtHref="/add-listing-2"
      nextHref="/add-listing-4"
    >
      <>
        <h2 className="text-2xl font-semibold">Size of your location</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        {/* FORM */}
        <div className="space-y-8">
          {/* ITEM */}
          <FormItem label="Acreage (m2)">
            <Select
              value={propertyState.size}
              onChange={(e) => setAcreage(e.target.value)}
            >
              <option value="100">100</option>
              <option value="200">200</option>
              <option value="300">300</option>
              <option value="400">400</option>
              <option value="500">500</option>
            </Select>
          </FormItem>
          <NcInputNumber
            label="Guests"
            defaultValue={propertyState.max_guests}
            onChange={(value: number) => setGuests(value)}
          />
          <NcInputNumber
            label="Bedroom"
            defaultValue={propertyState.bedrooms}
            onChange={(value: number) => setBedrooms(value)}
          />
          <NcInputNumber
            label="Beds"
            defaultValue={propertyState.rooms}
            onChange={(value: number) => setBeds(value)}
          />
          <NcInputNumber
            label="Bathroom"
            defaultValue={propertyState.bathrooms}
            onChange={(value: number) => setBathrooms(value)}
          />
          <NcInputNumber
            label="Kitchen"
            defaultValue={propertyState.kitchen}
            onChange={(value: number) => setKitchen(value)}
          />
        </div>
      </>
    </CommonLayout>
  );
};

export default PageAddListing3;
