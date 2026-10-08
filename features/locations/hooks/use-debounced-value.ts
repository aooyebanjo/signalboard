"use client";

import { useState, useEffect } from "react";

/**
 * A hook to debounce a value.
 * @param value - The value to debounce.
 * @param delay - The delay in milliseconds.
 * @returns The debounced value.
 */
export function useDebouncedValue<T>(
  value: T,
  delay: number,
) {
  // The debounced value.
  const [ debouncedValue, setDebouncedValue ] = useState(value);

  // Set the debounced value after the delay.
  useEffect(() => {
    // Set the debounced value after the delay.
    const timeoutId = setTimeout(
      () => {
        // Set the debounced value.
        setDebouncedValue(value);
      }, 
      delay,
    );

    // Clear the timeout when the component unmounts or the value or delay changes.
    return () => clearTimeout(timeoutId);
  }, [value, delay]);

  // Return the debounced value.
  return debouncedValue;
};

