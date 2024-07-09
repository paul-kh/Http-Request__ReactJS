import { useState, useEffect } from "react";

import Places from "./Places.jsx";

export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvailablePlaces] = useState([]);

  /*****************************************************************************
   * Sending http GET request to get all available places from backend server.
   *****************************************************************************/

  // Use useEffect() to prevent infinite loop
  useEffect(() => {
    // Use async await in modern JavaScript instead of promise function form ().then()
    async function fetchPlaces() {
      const response = await fetch("http://localhost:3000/places");
      const resData = await response.json();
      setAvailablePlaces(resData.places);
    }

    // we must execute the async function inside of this useEffect()
    fetchPlaces();
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
