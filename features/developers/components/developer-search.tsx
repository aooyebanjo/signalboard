"use client";

import { FormEvent, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { useDeveloper } from "@/features/developers/hooks/use-developer";
import { DeveloperProfile } from "@/features/developers/components/developer-profile";
import { DeveloperProfileSkeleton } from "@/features/developers/components/developer-profile-skeleton";

/**
 * DeveloperSearch component
 * 
 * This component allows users to search for a developer by their GitHub username.
 * It fetches developer data from the GitHub API and displays it in a card format.
 * 
 * @returns {JSX.Element} The DeveloperSearch component
 */
export function DeveloperSearch(){
  // Hook to navigate to the developer profile page
  const router = useRouter();
  // Hook to get the search params from the URL
  const searchParams = useSearchParams();

  // Get the username from the search params
  const username = searchParams.get("username") || "";

  // State to store the input value
  const [inputValue, setInputValue] = useState(username);

  // Determine if the search button should be disabled
  const isSearchDisabled = inputValue.trim().length === 0;

  // State to store the submitted username
  // const [submittedUsername, setSubmittedUsername] = useState("");

  // Hook to fetch developer data
  const {
    data: developer,
    error,
    isPending,
    isFetching,
    isError,
  } = useDeveloper(username);

  // Effect to set the input value when the username changes
  useEffect(() => {
    setInputValue(username);
  }, [username]);

  // Function to handle form submission
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Trim the input value to remove whitespace
    // const username = inputValue.trim();

    // Normalize the username by trimming whitespace
    const normalizedUsername = inputValue.trim();

    // If the username is empty, do nothing
    if(!normalizedUsername) {
      console.log("Username is empty: Add implmentation to display an empty container message to the user");
      return;
    }

    // Set the submitted username to the trimmed username
    // setSubmittedUsername(username);

    // Navigate to the developer profile page with the normalized username
    router.push(
      `/developers?username=${encodeURIComponent(normalizedUsername)}`
    );
  }

  return (
    <div className="space-y-6">
      <form 
        className="flex gap-2"
        onSubmit={handleSubmit}
        >
          <label
            htmlFor="github-username"
            className="text-md font-medium flex items-center"
          >
            GitHub username
          </label>

          <input
            type="text"
            id="github-username"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            placeholder="Enter a GitHub username"
            autoComplete="off"
            className="min-w-0 flex-1 rounded-md border px-3 px-y"
          />

          <button 
            type="submit" 
            disabled={isSearchDisabled}
            className="rounded-md border px-4 py-2 disabled:opacity-50"
          >
            Search
          </button>
      </form>

    {/* Show loading state if the developer is being fetched */}
      {isPending && username && (
        <DeveloperProfileSkeleton 
        />
      )}

    {/* Show refreshing state if the developer is being fetched */}
    {isFetching &&
      !isPending &&
      developer && (
        <p
          className="text-sm text-muted-foreground"
          role="status"
        >
          Refreshing developer data...
        </p>
      )}

      {/* Show error message if the developer data fails to load */}
      {isError && (
        <div
          role="alert"
          className="rounded-lg border p-4"
        >
          <p className="font-medium">
            Unable to load developer
          </p>

          <p className="mt-1 text-sm text-muted-foreground">
            {error instanceof Error
              ? error.message
              : "An unexpected error occurred."}
          </p>
        </div>
      )}

      {/* Show developer data if it is available */}
      {developer && (
        <DeveloperProfile 
          developer={developer} 
        />
      )}
    </div>
  );
};
