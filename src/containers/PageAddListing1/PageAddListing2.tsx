import { MapPinIcon } from "@heroicons/react/24/solid";
import LocationMarker from "components/AnyReactComponent/LocationMarker";
import Label from "components/Label/Label";
import GoogleMapReact from "google-map-react";
import React, { FC, useState } from "react";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import Input from "shared/Input/Input";
import Select from "shared/Select/Select";
import CommonLayout from "./CommonLayout";
import FormItem from "./FormItem";

export interface PageAddListing2Props {}

const PageAddListing2: FC<PageAddListing2Props> = () => {
    const [currentLocation, setCurrentLocation] = useState({
        lat: 0,
        lng: 0,
        address: "",
        country: "",
        street: "",
        roomNumber: "",
        city: "",
        state: "",
        postalCode: "",
      });
    
      const getCurrentLocation = () => {
        // ... (same as before)
      };
    
      // Helper function to get address component based on type
      const getAddressComponent = (components: any[], type: string) => {
        const component = components.find((comp) => comp.types.includes(type));
        return component ? component.long_name : "";
      };
    
      return (
        <CommonLayout
          index="02"
          nextHref="/add-listing-3"
          backtHref="/add-listing-1"
        >
          <>
            <h2 className="text-2xl font-semibold">Your place location</h2>
            <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
            {/* FORM */}
            <div className="space-y-8">
              <ButtonSecondary onClick={getCurrentLocation}>
                <MapPinIcon className="w-5 h-5 text-neutral-500 dark:text-neutral-400" />
                <span className="ml-3">Use current location</span>
              </ButtonSecondary>
              {/* ITEM */}
              <FormItem label="Country/Region">
                <Select value={currentLocation.country} onChange={(e) => setCurrentLocation((prevLocation) => ({ ...prevLocation, country: e.target.value }))}>
                  <option value="Viet Nam">Viet Nam</option>
                  <option value="Thailand">Thailand</option>
                  <option value="France">France</option>
                  <option value="Singapore">Singapore</option>
                  <option value="Jappan">Jappan</option>
                  <option value="Korea">Korea</option>
                  <option value="...">...</option>
                </Select>
              </FormItem>
              <FormItem label="Street">
                <Input
                  placeholder="..."
                  value={currentLocation.street}
                  onChange={(e) => setCurrentLocation((prevLocation) => ({ ...prevLocation, street: e.target.value }))}
                />
              </FormItem>
              <FormItem label="Room number (optional)">
                <Input
                  value={currentLocation.roomNumber}
                  onChange={(e) => setCurrentLocation((prevLocation) => ({ ...prevLocation, roomNumber: e.target.value }))}
                />
              </FormItem>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-5">
                <FormItem label="City">
                  <Input
                    value={currentLocation.city}
                    onChange={(e) => setCurrentLocation((prevLocation) => ({ ...prevLocation, city: e.target.value }))}
                  />
                </FormItem>
                <FormItem label="State">
                  <Input
                    value={currentLocation.state}
                    onChange={(e) => setCurrentLocation((prevLocation) => ({ ...prevLocation, state: e.target.value }))}
                  />
                </FormItem>
                <FormItem label="Postal code">
                  <Input
                    value={currentLocation.postalCode}
                    onChange={(e) => setCurrentLocation((prevLocation) => ({ ...prevLocation, postalCode: e.target.value }))}
                  />
                </FormItem>
              </div>
              <div>
                <Label>Detailed address</Label>
                <span className="block mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                  {currentLocation.address}
                </span>
                <div className="mt-4">
                  <div className="aspect-w-5 aspect-h-5 sm:aspect-h-3">
                    <div className="rounded-xl overflow-hidden">
                      <GoogleMapReact
                        bootstrapURLKeys={{
                          key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY!,
                        }}
                        yesIWantToUseGoogleMapApiInternals
                        defaultZoom={15}
                        defaultCenter={{
                            lat: 55.9607277,
                            lng: 36.2172614,
                          }}
                      >
                        <LocationMarker
                          lat={currentLocation.lat}
                          lng={currentLocation.lng}
                        />
                      </GoogleMapReact>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        </CommonLayout>
      );
    };
    
    export default PageAddListing2;
