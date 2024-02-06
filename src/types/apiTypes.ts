interface CountryName {
    common: string;
    official: string;
    // Add other properties if needed
  }
  
  interface Country {
    name: CountryName;
    // Add other properties if needed
  }
  
  export type FetchCountriesResponse = Country[];