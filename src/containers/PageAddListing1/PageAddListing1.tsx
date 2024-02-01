import React, { FC, useState, useEffect} from "react";
import Input from "shared/Input/Input";
import Select from "shared/Select/Select";
import CommonLayout from "./CommonLayout";
import FormItem from "./FormItem";
import {
  fetchCategories,
  createProperty,
  updateProperty
} from '../../api/axios';
import { usePropertyContextProvider } from '../../contexts/PropertyContext';


export interface PageAddListing1Props {}

interface Category {
  id: string;
  name: string;
}

const PageAddListing1: FC<PageAddListing1Props> = () => {


  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const { propertyState, setPropertyField, setPropertyId } = usePropertyContextProvider();

  // Destructure propertyState values
  const {
    property_id,
    name,
    description,
    cat_property_id,
    size,
    bedrooms,
    bathrooms,
    rooms,
    monthly_price,
    city_fee,
    cleaning_fee,
    min_months_booking,
    extra_price_per_guest,
    rentingType // Add this property to your propertyState
  } = propertyState;


  useEffect(() => {
    const fetchCategoriesData = async () => {
      try {
        const categoriesData = await fetchCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategoriesData();
  }, []);


  // Update propertyState when the form values change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setPropertyField(e.target.name, e.target.value);
  };
 
  // Update propertyState when the form values change
  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    const selectedCategoryId = categories.find((category) => category.name === value)?.id || '';
    setPropertyField('cat_property_id', selectedCategoryId);
  };



  return (
    <CommonLayout
      index="01"
      backtHref="/add-listing-1"
      nextHref="/add-listing-2"
    >
      <>
        <h2 className="text-2xl font-semibold">Choosing listing categories</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        {/* FORM */}
        <div className="space-y-8">
          {/* ITEM */}
          <FormItem
            label="Choose a property type"
            desc="Hotel: Professional hospitality businesses that usually have a unique style or theme defining their brand and decor"
          >
            <Select
              name="cat_property_id"
              value={cat_property_id}
              onChange={handleInputChange}
            >
              <option value="" disabled>
                Select a property type
              </option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Select>
          </FormItem>
          <FormItem
            label="Give me your best name"
            desc="A catchy name usually includes: House name + Room name + Featured property + Tourist destination"
          >
            <Input
              type="text"
              name="name"
              value={name}
              onChange={handleInputChange}
              placeholder="Places name"
            />
          </FormItem>
          <FormItem
          label="What are you renting?"
          desc="Entire place: Guests have the whole place to themselves—there's a private entrance and no shared spaces. A bedroom, bathroom, and kitchen are usually included."
        >
          <Select
            name="rentingType"  // Make sure the name matches the propertyState field
            value={rentingType}
            onChange={handleInputChange}
          >
            <option value="Hotel">Entire place</option>
            <option value="Private room">Private room</option>
            <option value="Share room">Share room</option>
          </Select>
        </FormItem>
        </div>
      </>
    </CommonLayout>
  );
};

export default PageAddListing1;
