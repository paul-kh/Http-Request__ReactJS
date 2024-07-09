import { useState, useEffect } from "react";

import Places from "./Places.jsx";

export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvailablePlaces] = useState([]);

  /*****************************************************************************
   * Sending http GET request to get all available places from backend server.
   *****************************************************************************/

  // Use useEffect() to prevent unfinite loop
  useEffect(() => {
    // Send http request to backend using vanilla js method 'fetch()'
    fetch("http://localhost:3000/places")
      .then((response) => {
        // using the standard json() method to extract data in response object
        return response.json();
      })
      .then((resData) => {
        setAvailablePlaces(resData.places);
      });
  }, []);

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
