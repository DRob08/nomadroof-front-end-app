import { MapPinIcon } from "@heroicons/react/24/solid";
import LocationMarker from "components/AnyReactComponent/LocationMarker";
import Label from "components/Label/Label";
import GoogleMapReact from "google-map-react";
import React, { FC, useState, useEffect } from "react";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import Input from "shared/Input/Input";
import Select from "shared/Select/Select";
import CommonLayout from "./CommonLayout";
import FormItem from "./FormItem";
import { loadGoogleMapsScript, getLatLngFromAddress } from "../../utils/googleMaps";
import { usePropertyContextProvider } from '../../contexts/PropertyContext';

export interface PageAddListing2Props { }

const PageAddListing2: FC<PageAddListing2Props> = () => {
    // const [currentLocation, setCurrentLocation] = useState({
    //     lat: 25.790654,
    //     lng: -80.1300455,
    //     address: "",
    //     country: "",
    //     street: "",
    //     roomNumber: "",
    //     city: "",
    //     state: "",
    //     postalCode: "",
    //     full_address: "",
    // });

    const { propertyState, setPropertyField, resetProperty } = usePropertyContextProvider();

    const [currentLocation, setCurrentLocation] = useState({
        lat: propertyState.latitude || 25.790654, // Default to 25.790654 if latitude is not set
        lng: propertyState.longitude || -80.1300455, // Default to -80.1300455 if longitude is not set
        address: propertyState.property_address || "",
        country: propertyState.country || "",
        street: "",
        roomNumber: "",
        city: propertyState.city || "",
        state: propertyState.state || "",
        postalCode: propertyState.zip_code || "",
        full_address: propertyState.property_address || "",
    });

    useEffect(() => {
        // Update currentLocation state when propertyState changes
        setCurrentLocation({
            lat: propertyState.latitude || 25.790654,
            lng: propertyState.longitude || -80.1300455,
            address: propertyState.property_address || "",
            country: propertyState.country || "",
            street:  "",
            roomNumber: "",
            city: propertyState.city || "",
            state: propertyState.state || "",
            postalCode: propertyState.zip_code || "",
            full_address: propertyState.property_address || "",
        });
    }, [propertyState]);

    const getCurrentLocation = () => {
        // ... (same as before)
    };

    // Helper function to get address component based on type
    const getAddressComponent = (components: any[], type: string) => {
        const component = components.find((comp) => comp.types.includes(type));
        return component ? component.long_name : "";
    };

    useEffect(() => {
        const initAutoComplete = async () => {
            try {
                const google = await loadGoogleMapsScript();

                // console.log('Google object:', google);

                const autocompleteInput = document.getElementById('autocomplete-input');
                if (autocompleteInput) {
                    const autocomplete = new google.maps.places.Autocomplete(autocompleteInput);

                    autocomplete.addListener('place_changed', async () => {
                        const place = autocomplete.getPlace();
                        if (!place.geometry) {
                            console.error('Place details not found for input:', place.name);
                            return;
                        }

                        const latLng = await getLatLngFromAddress(place.formatted_address);
                        setCurrentLocation((prevLocation) => ({
                            ...prevLocation,
                            lat: latLng.lat,
                            lng: latLng.lng,
                            address: place.formatted_address,
                        }));
                    });
                }
            } catch (error) {
                console.error('Error loading Google maps script:', error);
            }
        };

        initAutoComplete();
    }, []); // Run this effect only once when the component mounts

    const handleFieldBlur = async () => {
        const { address, city, state, postalCode } = currentLocation;

        if (address && city && state && postalCode) {
            try {
                const { lat, lng } = await getLatLngFromAddress(buildAddress());
                console.log('Latitude:', lat);
                console.log('Longitude:', lng);
                updateLocation(lat, lng);

            } catch (error) {
                console.error('Error getting latitude and longitude:', error);
                console.warn('Skipping geocoding due to error.');
            }
        } else {
            console.warn('Skipping geocoding. One or more fields are empty.');
        }
    };

    const handleAddressChange = (address: string) => {
        setCurrentLocation((prevLocation) => ({ ...prevLocation, address }));
        setPropertyField('property_address', address); 
    };

    const handleCityChange = (city: string) => {
        setCurrentLocation((prevLocation) => ({ ...prevLocation, city }));
        setPropertyField('city', city); // Update the 'city' field in property context
    };
    

    const handleStateChange = (state: string) => {
        setCurrentLocation((prevLocation) => ({ ...prevLocation, state }));
        setPropertyField('state', state);
    };

    const handlePostalCodeChange = (postalCode: string) => {
        setCurrentLocation((prevLocation) => ({ ...prevLocation, postalCode }));
        setPropertyField('zip_code', postalCode);
        
    };

    const buildAddress = () => {
        const {
            address,
            roomNumber,
            city,
            state,
            postalCode,
            country,
        } = currentLocation;

        // Customize this based on the format you want
        return `${address} ${city}, ${state} ${postalCode}`;
    };

   
    // Helper function to update location in state
    const updateLocation = (lat: number, lng: number) => {
        setCurrentLocation((prevLocation) => ({
            ...prevLocation,
            lat,
            lng,
            full_address: buildAddress(),
        }));
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
                    <FormItem label="Address">
                        <Input
                            id="autocomplete-input-street"
                            placeholder="Enter Address"
                            value={currentLocation.address}
                            onChange={(e) => handleAddressChange(e.target.value)}
                            onBlur={handleFieldBlur}
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
                                onChange={(e) => handleCityChange(e.target.value)}
                                onBlur={handleFieldBlur}
                            />
                        </FormItem>
                        <FormItem label="State">
                            <Input
                                value={currentLocation.state}
                                onChange={(e) => handleStateChange(e.target.value)}
                                onBlur={handleFieldBlur}
                            />
                        </FormItem>
                        <FormItem label="Postal code">
                            <Input
                                value={currentLocation.postalCode}
                                onChange={(e) => handlePostalCodeChange(e.target.value)}
                                onBlur={handleFieldBlur}
                            />
                        </FormItem>
                    </div>
                    <div>
                        <Label>Detailed address</Label>
                        <span className="block mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                            {currentLocation.full_address}
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
                                        center={{
                                            lat: currentLocation.lat,
                                            lng: currentLocation.lng,
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
