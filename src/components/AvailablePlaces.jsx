import { useState, useEffect } from "react";

import Places from "./Places.jsx";

export default function AvailablePlaces({ onSelectPlace }) {
  const [isFetching, setIsFetching] = useState(false); // status of data loading/fetching
  const [availablePlaces, setAvailablePlaces] = useState([]); // fetched loaded data

  /*****************************************************************************
   * Sending http GET request to get all available places from backend server.
   *****************************************************************************/

  // Use useEffect() to prevent infinite loop
  useEffect(() => {
    // Use async await in modern JavaScript instead of promise function form ().then()
    async function fetchPlaces() {
      setIsFetching(true);
      const response = await fetch("http://localhost:3000/places");
      const resData = await response.json();
      setAvailablePlaces(resData.places);
      setIsFetching(false);
    }

    // we must execute the async function inside of this useEffect()
    fetchPlaces();
  }, []);

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="Fetching place data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
