import React, { createContext, useContext, useReducer, FC, ReactNode } from 'react';

interface PropertyState {
  property_id: null | string;
  user_id: null | string;
  name: string;
  description: string;
  latitude: null | number;
  longitude: null | number;
  features_and_amenities: string;
  max_guests: null | number;
  availability: boolean;
  monthly_price: null | number;
  weekly_price: null | number;
  daily_price: null | number;
  status: string;
  booked_start_date: null | Date;
  booked_end_date: null | Date;
  cat_property_id: string;
  size: string;
  bedrooms: number;
  bathrooms: number;
  rooms: number;
  city_fee: number;
  cleaning_fee: number;
  min_months_booking: number;
  extra_price_per_guest: number;
  verified: boolean;
  property_address: string;
  zip_code: string;
  country: string;
  city: string;
}

interface PropertyAction {
  type: string;
  payload?: any;
}

interface PropertyContextType {
  propertyState: PropertyState;
  setPropertyField: (field: string, value: any) => void;
  setPropertyId: (property_id: string) => void;
  resetProperty: () => void;
}

const initialState: PropertyState = {
  property_id: null,
  user_id: null,
  name: '',
  description: '',
  latitude: null,
  longitude: null,
  features_and_amenities: '',
  max_guests: null,
  availability: false,
  monthly_price: null,
  weekly_price: null,
  daily_price: null,
  status: '',
  booked_start_date: null,
  booked_end_date: null,
  cat_property_id: '',
  size: '',
  bedrooms: 0,
  bathrooms: 0,
  rooms: 0,
  city_fee: 0.0,
  cleaning_fee: 0.0,
  min_months_booking: 0,
  extra_price_per_guest: 0.0,
  verified: false,
  property_address: '',
  zip_code: '',
  country: '',
  city: '',
};

const actionTypes = {
  SET_PROPERTY_FIELD: 'SET_PROPERTY_FIELD',
  SET_PROPERTY_ID: 'SET_PROPERTY_ID',
  RESET_PROPERTY: 'RESET_PROPERTY',
};

const propertyReducer = (state: PropertyState, action: PropertyAction): PropertyState => {
  switch (action.type) {
    case actionTypes.SET_PROPERTY_FIELD:
      return {
        ...state,
        [action.payload.field]: action.payload.value,
      };
    case actionTypes.SET_PROPERTY_ID:
      return {
        ...state,
        property_id: action.payload.property_id,
      };
    case actionTypes.RESET_PROPERTY:
      return initialState;
    default:
      return state;
  }
};

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

interface PropertyProviderProps {
  children: ReactNode;
}

export const PropertyProvider: FC<PropertyProviderProps> = ({ children }) => {
  const [propertyState, dispatch] = useReducer(propertyReducer, initialState);

  const setPropertyField = (field: string, value: any) => {
    dispatch({
      type: actionTypes.SET_PROPERTY_FIELD,
      payload: { field, value },
    });
  };

  const setPropertyId = (property_id: string) => {
    dispatch({
      type: actionTypes.SET_PROPERTY_ID,
      payload: { property_id },
    });
  };

  const resetProperty = () => {
    dispatch({ type: actionTypes.RESET_PROPERTY });
  };

  return (
    <PropertyContext.Provider value={{ propertyState, setPropertyField, setPropertyId, resetProperty }}>
      {children}
    </PropertyContext.Provider>
  );
};

export const usePropertyContext = (): PropertyContextType => {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error('usePropertyContext must be used within a PropertyProvider');
  }
  return context;
};
