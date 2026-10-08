"use client";

import { 
  useEffect, 
  useRef, 
} from "react";

import { 
  Map, 
  Marker, 
  NavigationControl, 
  setWorkerUrl,
} from "maplibre-gl";

import type { 
  MapMouseEvent, 
} from "maplibre-gl";

import { Location } from "../types/location";

setWorkerUrl(
  "/maplibre/maplibre-gl-worker.mjs"
);

/**
 * A props interface for the LocationMap component.
 */
interface LocationMapProps {
  /**
   * The location to display on the map.
   */
  location: Location;

  /**
   * A function that is called when the location changes.
   * @param latitude - The latitude of the location.
   * @param longitude - The longitude of the location.
   */
  onLocationChange?: (
    latitude: number,
    longitude: number,
  ) => void;
};

/**
 * A map component that displays a location on a map.
 * @param location - The location to display on the map.
 * @returns A map component that displays a location on a map.
 */
export function LocationMap({ 
  location, 
  onLocationChange,
}: LocationMapProps) {
  /**
   * A reference to the container element.
   */
  const containerRef = useRef<HTMLDivElement | null>(null);

  /**
   * A reference to the map instance.
   */
  const mapRef = useRef<Map | null>(null);

  /**
   * A reference to the marker instance.
   */
  const markerRef = useRef<Marker | null>(null);

  /**
   * A reference to the onLocationChange function.
   */
  const onLoccationChangeRef = useRef(onLocationChange);

  /**
   * A function that updates the onLocationChange reference when the onLocationChange prop changes.
   * @description This function is called when the onLocationChange prop changes.
   * @returns A function that updates the onLocationChange reference when the onLocationChange prop changes.
   */
  useEffect(() => {
    onLoccationChangeRef.current = onLocationChange;
  }, [
    onLocationChange
  ]);

  /**
   * A function that creates the map and marker when the component mounts.
   * @description This function is called when the component mounts.
   * @returns A function that creates the map and marker when the component mounts.
   */
  useEffect(() => {
    if(!containerRef.current) {
      return;
    }
    /**
     * A new map instance.
     */
    const map: Map = new Map({
      container: containerRef.current,
      style: "https://demotiles.maplibre.org/style.json",
      center: [0, 0],
      zoom: 3,
    });

    /**
     * A new navigation control instance.
     */
    map.addControl(
      new NavigationControl(),
      "top-right",
    );

    /**
     * A function that handles the map click event.
     * @param event - The map click event.
     * @returns A function that handles the map click event.
     */
    const handleMapClick = (event: MapMouseEvent) => {
      const { lng, lat } = event.lngLat;
      console.log("Map clicked at: longitude =", lng, "latitude =", lat);
      onLoccationChangeRef.current?.(lat, lng);
    };

    /**
     * A new marker instance.
     */
    const marker: Marker = new Marker()
                     .setLngLat([0, 0])
                     .addTo(map);

    /**
     * Add a click event listener to the map.
     */
    map.on(
      "click", 
      handleMapClick
    );

    /**
     * A reference to the map instance.
     */
    mapRef.current = map;
    /**
     * A reference to the marker instance.
     */
    markerRef.current = marker;

    return () => {
      /**
       * Remove the click event listener from the map.
       */
      map.off(
        "click", 
        handleMapClick
      );

      /**
       * Remove the marker from the map.
       */
      marker.remove();
      /**
       * Remove the map from the container.
       */
      map.remove();

      /**
       * Reset the references to the map and marker.
       */
      markerRef.current = null;
      /**
       * Reset the reference to the map instance.
       */
      mapRef.current = null;
    }
  }, []);

  /**
   * A function that updates the map and marker when the location changes.
   * @description This function is called when the location changes.
   * @returns A function that updates the map and marker when the location changes.
   */
  useEffect(() => {
    /**
     * A reference to the map instance.
     */
    const map = mapRef.current;
    /**
     * A reference to the marker instance.
     */
    const marker = markerRef.current;

    /**
     * If the map or marker is not found, return.
     */
    if(!map || !marker) {
      return;
    }

    /**
     * A new coordinates tuple, of longitude and latitude.
     */
    const coordinates: [number, number] = [
      location.longitude, 
      location.latitude,
    ];

    /**
     * Set the marker's coordinates.
     */
    marker.setLngLat(coordinates);

    /**
     * Fly to the coordinates.
     */
    map.flyTo({
      center: coordinates,
      zoom: 3,
      essential: true,
    });
  }, [
    location.longitude, 
    location.latitude,
  ]);

  /**
   * A function that returns the map component.
   * @returns A map component that displays a location on a map.
   */
  return (
    <div
     ref={containerRef}
     className="h-[480px] w-full rounded-lg border-2 border-black/10"
     aria-label={`Map showing ${location.displayName}`}
    />
  );
};

