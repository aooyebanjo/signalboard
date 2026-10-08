"use client";

import { useCallback, useRef, useEffect } from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

/**
 * A hook that is used to set and clear the coordinates in the URL.
 * @returns An object with the search params, set coordinates, and clear coordinates functions.
 */
export function useLocationUrl() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  /**
   * A ref to store the URLSearchParams instance.
   */
  const paramsRef = useRef<URLSearchParams | null>(null);

  /**
   * A ref to store the URLSearchParams instance.
   * Initialize the ref with the current search params.
   */
  useEffect(() => {
  /**
   * A new URLSearchParams instance.
   * why is searchParams.toString() used? Because we want to keep the existing search params.
   * what if it has no search params? Then it will return an empty string.
   */
    paramsRef.current = new URLSearchParams(searchParams.toString());
  }, [
    searchParams,
  ]);

  /**
   * A function that is used to set the coordinates in the URL.
   * @param latitude - The latitude of the location.
   * @param longitude - The longitude of the location.
   */
  const setCoordinates = useCallback(
    (latitude: number, longitude: number) => {
      /**
       * The URLSearchParams instance.
       */
      const params = paramsRef.current;

      /**
       * If the params ref is not initialized, return.
       */
      if (!params) {
        return;
      }

      /**
       * Set the latitude and longitude in the URL search params.
       */
      params.set("lat", latitude.toString());
      params.set("lng", longitude.toString());

      /**
       * Replace the URL with the new search params.
       */
      router.replace(`${pathname}?${params.toString()}`);
    },
    [
      router, 
      pathname, 
      searchParams,
    ]
  );

  /**
   * A function that is used to clear the coordinates in the URL.
   */
  const clearCoordinates = useCallback(
    () => {
      /**
       * A new URLSearchParams instance.
       */
      const params = paramsRef.current;
      /**
       * If the params ref is not initialized, return.
       */
      if (!params) {
        return;
      }

      /**
       * If the latitude and longitude are not in the URL search params, return.
       */
      if(!params.has("lat") && !params.has("lng")) {
        return;
      }

      /**
       * Delete the latitude and longitude from the URL search params.
       */
      params.delete("lat");
      params.delete("lng");

      /**
       * A new query string.
       */
      const queryString = params.toString();

      /**
       * Replace the URL with the new search params.
       */
      router.replace(
        queryString 
          ? `${pathname}?${queryString}` 
          : pathname
      );
    },
    [
      router, 
      pathname, 
      searchParams,
    ]
  );

  /**
   * Return the search params, set coordinates, and clear coordinates functions.
   * @returns An object with the search params, set coordinates, and clear coordinates functions.
   */
  return {
    searchParams,
    setCoordinates,
    clearCoordinates,
  }
};


