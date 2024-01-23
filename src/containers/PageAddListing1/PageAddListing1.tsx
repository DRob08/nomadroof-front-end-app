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
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="" disabled>
                Select a property type
              </option>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </Select>
          </FormItem>
          <FormItem
            label="Place name"
            desc="A catchy name usually includes: House name + Room name + Featured property + Tourist destination"
          >
            <Input placeholder="Places name" />
          </FormItem>
          <FormItem
            label="Rental form"
            desc="Entire place: Guests have the whole place to themselves—there's a private entrance and no shared spaces. A bedroom, bathroom, and kitchen are usually included."
          >
            <Select>
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
