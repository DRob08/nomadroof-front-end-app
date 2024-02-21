// src/utils/googleMaps.js

let googleMapsPromise;

export const loadGoogleMapsScript = () => {
  if (window.google && window.google.maps && window.google.maps.places) {
      // If already loaded, resolve the existing instance
      return Promise.resolve(window.google);
  }

  // Otherwise, load the script
  return new Promise((resolve, reject) => {
      const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

      if (!apiKey) {
          console.error('Google Maps API key not found.');
          reject(new Error('Google Maps API key not found.'));
          return;
      }

      const googleMapsScript = document.createElement('script');
      googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      googleMapsScript.async = true;
      googleMapsScript.onload = () => {
          console.log('Google Maps script loaded successfully.');
          if (window.google && window.google.maps && window.google.maps.places) {
              resolve(window.google);
          } else {
              reject(new Error('Google Maps API not initialized correctly.'));
          }
      };
      googleMapsScript.onerror = (error) => {
          console.error('Error loading Google Maps script:', error);
          reject(error);
      };

      document.head.appendChild(googleMapsScript);
  });
};


  
  


  export const getLatLngFromAddress = async (address) => {
    const geocoder = new window.google.maps.Geocoder();
  
    return new Promise((resolve, reject) => {
      geocoder.geocode({ address }, (results, status) => {
        if (status === 'OK' && results.length > 0) {
          const location = results[0].geometry.location;
          const latLng = { lat: location.lat(), lng: location.lng() };
          resolve(latLng);
        } else {
          reject(new Error(`Geocode was not successful for the following reason: ${status}`));
        }
      });
    });
  };
  