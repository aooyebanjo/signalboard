"use client";

import { useState, useEffect } from "react";

/**
 * useDebouncedValue hook, for debouncing the input value, used to prevent unnecessary re-renders.
 */
import { useDebouncedValue } from "../hooks/use-debounced-value";

/**
 * useLocationSearch hook, for searching for locations based on the search query.
 */
import { useLocationSearch } from "../hooks/use-location-search";

/**
 * useLocationByCoordinates hook, for getting a location by coordinates, with respect to latitude and longitude coordinates.
 */
import { useLocationByCoordinates } from "../hooks/use-location-by-coordinates";

/**
 * useLocationUrl hook, for getting the search params, set coordinates, and clear coordinates functions.
 */
import { useLocationUrl } from "../hooks/use-location-url";

/**
 * parseCoordinates function, for parsing the latitude and longitude coordinates.
 */
import { parseCoordinates } from "../utils/parse-coordinate";

import { Location } from "../types/location";

import { LocationMap } from "./location-map";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

import { useQueryClient } from "@tanstack/react-query"; // Used to invalidate the query when the selected location changes.

import { locationQueryKeys } from "../utils/location-query-keys"; // Used to invalidate the query when the selected location changes.

import { LoaderCircle } from "lucide-react";

/**
 * A component that allows the user to search for locations.
 */
export function LocationSearch() {
  const resultsListid = "location-search-results";

  // The value of the input field.
  const [ inputValue, setInputValue ] = useState("");

  // The selected location.
  const [ selectedLocation, setSelectedLocation ] = useState<Location | null>(null);

  // The active index of the location list.
  const [ activeIndex, setActiveIndex] = useState<number>(-1);

  // Whether the location list is open.
  const [ isOpen, setIsOpen ] = useState(false);

  // The router, pathname, and search params. Used to navigate to the selected location.
  // const router = useRouter();  // Helps to give access to Next.js client-side navigation features.
  // const pathname = usePathname();  // Helps to give access to the current pathname.
  // const searchParams = useSearchParams();  // Helps to give access to the current search params. Used to get the current search params.

  /**
   * The search params, set coordinates, and clear coordinates functions.
   */
  const { 
    searchParams,      // The search params. Used to get the current search params.
    setCoordinates,    // A function that is used to set the coordinates in the URL.
    clearCoordinates,  // A function that is used to clear the coordinates in the URL.
  } = useLocationUrl();

  const queryClient = useQueryClient(); // Used to invalidate the query when the selected location changes. This is a hook from the Tanstack Query library.

  // The latitude of the location.
  // const latitudeParam: string | null = searchParams.get("lat");
  // The longitude of the location.
  // const longitudeParam: string | null = searchParams.get("lng");

  // Parse the latitude as a number from latitude parameter.
  // const latitude = latitudeParam ? Number(latitudeParam) : null;
  // Parse the longitude as a number from longitude parameter.
  // const longitude = longitudeParam ? Number(longitudeParam) : null;

  // Check if the latitude is a valid number and is within the range of -90 to 90.
  // const validLatitide = latitude && 
  //                       Number.isFinite(latitude) && 
  //                       latitude >= -90 && 
  //                       latitude <= 90 
  //                         ? latitude 
  //                         : null;
  const validLatitude = parseCoordinates(
    searchParams.get("lat"), 
    "latitude"
  );

  // Check if the longitude is a valid number and is within the range of -180 to 180.
  // const validLongitude = longitude && 
  //                        Number.isFinite(longitude) && 
  //                        longitude >= -180 && 
  //                        longitude <= 180 
  //                          ? longitude 
  //                          : null;
  const validLongitude = parseCoordinates(
    searchParams.get("lng"), 
    "longitude"
  );

  // The debounced value of the input field.
  const debouncedQuery = useDebouncedValue(inputValue, 300);

  // The search query as the derived state with respect to the selected location.
  const searchQuery = selectedLocation ? "" : debouncedQuery;

  // The locations data.
  const {
    data: locations,
    isPending, // Whether the locations are being fetched.
    isFetching, // Whether the locations are being fetched.
    isError, // Whether the locations are being fetched.
    error, // The error message.
  } = useLocationSearch(searchQuery);

  // The location by coordinates data.
  const {
    data: urlLocation,
    isPending: isResolvingLocation,
    isFetching: isResolvingLocationFetching,
    isError: isLocationError,
    error: locationError,
    refetch: retryLocationResolution,
  } = useLocationByCoordinates({
    latitude: validLatitude,
    longitude: validLongitude,
  });

  /**
   * This is a derived state that says whether the coordinates are valid.
   * What does this do? It checks if the coordinates are valid.
   * What does it simulate? It simulates the coordinates.
   */
  const hasValidCoordinates =
    validLatitude !== null &&
    validLongitude !== null;

  /**
   * This is a derived state that says whether the location restoration error is present.
   * What does this do? It checks if the location restoration error is present.
   * What does it simulate? It simulates the location restoration error.
   */
  const isLocationRestorationError =
    hasValidCoordinates &&
    isLocationError &&
    !selectedLocation;

  /**
   * This is a derived state that says whether the location is being restored.
   * What does this do? It checks if the location is being restored.
   * What does it simulate? It simulates the location being restored.
   */
  const isRestoringLocation =
    hasValidCoordinates &&
    isResolvingLocationFetching &&
    !selectedLocation &&
    !isLocationError;

  // This is a derived state that says whether the locations have results. It is used to determine whether to show the results list.
  const hasResults = isOpen && !selectedLocation && !!locations?.length;

  /**
   * This effect is used to close the location list when the locations change.
   */
  useEffect(() => {
    setIsOpen(false);
  }, [
    locations
  ]);

  /**
   * This effect is used to set the selected location and input value when the URL location changes.
   */
  useEffect(() => {
    if(!urlLocation) {
      return;
    }

    // Set the selected location, if it is not the same as the URL location, then set the URL location.
    setSelectedLocation(
      (currentLocation) => {
        if(currentLocation?.id === urlLocation.id) {
          return currentLocation;
        }

        return urlLocation;
      }
    );

    // Set the input value, if it is not the same as the URL location's display name, then set the URL location's display name.
    setInputValue(
      (currentDisplayName) => {
        return (currentDisplayName === urlLocation.displayName) 
                  ? currentDisplayName 
                  : urlLocation.displayName;
      }
  );

    setIsOpen(false);
  }, [
    urlLocation
  ]);

  // A function to get the ID of the option at the given index.
  const getOptionId = (index: number) => `location-option-${index}`;

  // Handle the location select.
  const handleLocationSelect = (location: Location) => {
    setSelectedLocation(location);
    setInputValue(location.displayName);
    setIsOpen(false);

    // What is setQueryData? It is a function that is used to set the data in the query cache. It is a hook from the Tanstack Query library.
    // Why is it needed? Because when the user selects a location, we want to update the query cache with the selected location.
    queryClient.setQueryData(
      locationQueryKeys.location(
        location.latitude,
        location.longitude,
      ),
      location
    );

    // // Update the search params with the selected location.
    // const params = new URLSearchParams(
    //   searchParams.toString()
    // );

    // // Set the latitude and longitude search params.
    // params.set(
    //   "lat", 
    //   location.latitude.toString()
    // );

    // // Set the longitude search param.
    // params.set(
    //   "lng", 
    //   location.longitude.toString()
    // );

    // // Navigate to the selected location.
    // router.replace(
    //   `${pathname}?${params.toString()}`
    // );

    /**
     * Set the coordinates in the URL, with the selected location, and replaces the previous implementation of updating the search params.
     * @param latitude - The latitude of the location.
     * @param longitude - The longitude of the location.
     */
    setCoordinates(
      location.latitude, 
      location.longitude,
    );
  };

  // Handle the key down event, used to navigate the location list.
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if(!locations || locations?.length === 0) {
      return;
    }

    // Handle the arrow down event.
    if (event.key === "ArrowDown") {
      event.preventDefault();

      setActiveIndex(
        (currentIndex) => {
          if (currentIndex === locations.length - 1) {
            return 0;
          }

          return currentIndex + 1;
        }
      );

      return;
    }

    // Handle the arrow up event.
    if (event.key === "ArrowUp") {
      event.preventDefault();

      setActiveIndex(
        (currentIndex) => {
          if (currentIndex <= 0) {
            return locations.length - 1;
          }

          return currentIndex - 1;
        }
      );

      return;
    }

    // Handle the enter key event.
    if (event.key === "Enter" && activeIndex >= 0) {
      event.preventDefault();

      handleLocationSelect(
        locations[activeIndex]
      );

      return;
    }

    // Handle the escape key event.
    if (event.key === "Escape") {
      setIsOpen(false);
    }
  };

  // Handle the input change event.
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInputValue(event.target.value);
    setSelectedLocation(null);
    setActiveIndex(-1);
    setIsOpen(true);
  
    // If the latitude or longitude search params are present, then delete them.
    // if (
    //   searchParams.has("lat") ||
    //   searchParams.has("lng")
    // ) {
    //   // Get the search params.
    //   const params =
    //     new URLSearchParams(
    //       searchParams.toString()
    //     );
  
    //   // Delete the latitude and longitude search params.
    //   params.delete("lat");
    //   params.delete("lng");
  
    //   // Get the query string.
    //   const queryString =
    //     params.toString();
  
    //   // Navigate to the selected location.
    //   router.replace(
    //     queryString
    //       ? `${pathname}?${queryString}`
    //       : pathname
    //   );
    // }

    /**
     * Clear the coordinates in the URL, and replaces the previous implementation of updating the search params.
     */
    clearCoordinates();
  };

  // Handle the map location change event, used to navigate to the new location.
  const handleMapLocationChange = (latitude: number, longitude: number) => {
    // // Update the search params with the new location.
    // const params = new URLSearchParams(
    //   searchParams.toString()
    // );

    // // Set the latitude and longitude search params.
    // params.set(
    //   "lat", 
    //   latitude.toString()
    // );

    // // Set the longitude search param.
    // params.set(
    //   "lng", 
    //   longitude.toString()
    // );

    // // Navigate to the new location.
    // router.replace(
    //   `${pathname}?${params.toString()}`
    // );

    /**
     * Set the coordinates in the URL, with the new location, and replaces the previous implementation of updating the search params.
     * @param latitude - The latitude of the location.
     * @param longitude - The longitude of the location.
     */
    setCoordinates(
      latitude, 
      longitude,
    );
  };

  // Render the component.
  return (
    <section className="space-y-2">
      <label
        htmlFor="location-search"
        className="block font-medium"
      >
        Search locations
      </label>

      <input
        id="location-search"
        type="search"
        role="combobox"  // This tells assistive technologies that this input controls a combobox containing a list of possible values.
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        aria-autocomplete="list" // This communicates to the assistive technologies that autocomplete suggestions are presented as a list.
        aria-expanded={hasResults} // This communicates to the assistive technologies whether the associated list is currently available or visible, opened or closed.
        aria-controls={resultsListid} // This communicates to the assistive technologies that the combobox controls the element whose ID is "location-search-results".
        aria-activedescendant={
          activeIndex >= 0 && locations 
            ? getOptionId(activeIndex) 
            : undefined
        } // This communicates to the assistive technologies that the list-item element whose ID is "location-option-0", "location-option-1", etc. is currently the active element.
        placeholder="Search for a city or location"
        autoComplete="off"
        className="mt-2 w-full rounded-md border px-3 py-2"
      />

      {/* This is the location restoration error. */}
      {isLocationRestorationError && (
        <div
          className="mt-2 flex min-h-[400px] flex-col items-center justify-center gap-4 rounded-lg border p-6 text-center"
          role="alert"
        >
          <p className="font-semibold">
            Unable to restore location
          </p>

          <p className="max-w-md text-sm text-muted-foreground">
            We couldn't retrieve the location for
            these coordinates. Please try again.
          </p>

          <button
            type="button"
            onClick={() => {
              void retryLocationResolution();
            }}
            disabled={isResolvingLocationFetching}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
          >
            {isResolvingLocationFetching
              ? "Retrying..."
              : "Try again"}
          </button>
        </div>
      )}

      {/* This is the loading state of the location search. */}
      {/*((isResolvingLocationFetching || (inputValue.length === 0)) && !selectedLocation) */ isRestoringLocation && (
        <div 
          className="min-h-[500px] flex justify-center items-center mt-2"
          role="status"  // This tells assistive technologies that the element's content is status information and should be presented to the user.
          aria-live="polite"  // But what is polite? It means that the content is important, but not urgent.
        >
          {(!isResolvingLocationFetching && inputValue.length === 0) && (
              <span 
                className="text-sm font-medium" 
                role="alert"  // This tells assistive technologies that the element's content is important and should be presented to the user.
                aria-atomic="true"  // This tells assistive technologies that the element's content should not be split into smaller parts. But what is atomic? It means that the content is indivisible and should not be split into smaller parts.
              >
                Enter a city location to get started.
              </span>
          )}
          {(isResolvingLocationFetching && !selectedLocation) && (
            <div className="w-auto flex flex-col items-center gap-2">
              <LoaderCircle 
                className="size-12 animate-spin text-blue-500"
                aria-hidden="true"
              />
              <span 
                className="text-sm font-medium"
                role="alert"  // This tells assistive technologies that the element's content is important and should be presented to the user.
                aria-atomic="true"  // This tells assistive technologies that the element's content should not be split into smaller parts. But what is atomic? It means that the content is indivisible and should not be split into smaller parts.
              >
                Resolving location...
              </span>
            </div>
          )}
        </div>
      )}

      {isFetching && (
        <p
          role="status"
          className="mt-2 text-sm text-muted-foreground"
        >
          Searching...
        </p>
      )}

      {isError && (
        <div
          role="alert"
          className="mt-2 text-sm"
        >
          <p>Unable to search locations.</p>

          {/* <pre className="mt-2 whitespace-pre-wrap">
            {error instanceof Error
              ? error.message
              : String(error)}
          </pre> */}
        </div>
      )}

      {(!selectedLocation && !isFetching && locations && locations.length > 0) && (
        <ul
          id={resultsListid} // This communicates to the assistive technologies that the unordered list element's ID is "location-search-results".
          className="mt-3 divide-y rounded-md border"
          role="listbox" // This tells assistive technologies that the unordered list element's role is a listbox which is directly linked to the element with aria-controls, "location-search-results".
        >
          {locations.map(
            (location, index) => (
              <li 
                id={getOptionId(index)} // This communicates to the assistive technologies that the list item element's ID is "location-option-0", "location-option-1", etc.
                key={location.id}
                className="p-2"
                role="option" // This tells assistive technologies that the list item element's role is an option.
                aria-selected={index === activeIndex} // This communicates to the assistive technologies whether the option is currently selected.
                onMouseDown={(event) => {
                  event.preventDefault();
                  handleLocationSelect(location)
                }}
              >
                <div
                  className={
                    index === activeIndex
                     ? "w-full bg-blue-200 py-3 px-2 text-left"
                     : "w-full py-3 px-2 text-left hover:bg-blue-200"
                  }
                >
                  <span className="block font-medium">
                    {location.name}
                  </span>

                  <span className="block text-sm text-muted-foreground">
                    {location.displayName}
                  </span>
                </div>
              </li>
            )
          )}
        </ul>
      )}

      {selectedLocation && (
        <article className="mt-6 rounded-lg border p-4">
          <h2 className="font-semibold">
            {selectedLocation.name}
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            {selectedLocation.displayName}
          </p>

          <dl className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <dt className="text-sm font-medium">
                Latitude
              </dt>

              <dd>
                {selectedLocation.latitude}
              </dd>
            </div>

            <div>
              <dt className="text-sm font-medium">
                Longitude
              </dt>

              <dd>
                {selectedLocation.longitude}
              </dd>
            </div>
          </dl>

          <div className="mt-6">
            <LocationMap 
              location={selectedLocation}
              onLocationChange={handleMapLocationChange}
            />
          </div>
        </article>
      )}
    </section>
  );
};
