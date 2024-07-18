import { useState, useEffect } from "react";

import Places from "./Places.jsx";
import Error from "./Error.jsx";
import { sortPlacesByDistance } from "../loc.js";
import { fetchAvailablePlaces } from "../http.js";

export default function AvailablePlaces({ onSelectPlace }) {
  // Note: when fetching data, it's very common to have the below 3 pieces of states
  const [isFetching, setIsFetching] = useState(false); // status of data loading/fetching
  const [availablePlaces, setAvailablePlaces] = useState([]); // fetched loaded data
  const [error, setError] = useState(); // for showing pential error on the UI when failed to fetch data

  /*****************************************************************************
   * Sending http GET request to get all available places from backend server.
   *****************************************************************************/

  // Use useEffect() to prevent infinite loop
  useEffect(() => {
    // Use async await in modern JavaScript instead of promise function form ().then()
    async function fetchPlaces() {
      setIsFetching(true);

      // Handle Error when sending Http request
      try {
        const places = await fetchAvailablePlaces();

        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(
            places,
            position.coords.latitude,
            position.coords.longitude
          );
          setAvailablePlaces(sortedPlaces);
          setIsFetching(false);
        });
      } catch (error) {
        setError({
          message:
            error.message || "Could not fetch places, please try again later.",
        });
        setIsFetching(false);
      }
    }

    // we must execute the async function inside of this useEffect()
    fetchPlaces();
  }, []);

  if (error) {
    return <Error title="An Error Occurs" message={error.message} />;
  }
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
