"use client"

/**
 * React component for displaying analytics page client.
 */
import {
  useRouter,
  useSearchParams,
} from "next/navigation";

/**
 * Developer username form for the analytics page.
 */
import {
  DeveloperUsernameForm,
} from "./developer-username-form";

/**
 * Analytics dashboard for the analytics page.
 */
import {
  AnalyticsDashboard,
} from "./analytics-dashboard";

/**
 * Interface for the analytics page client component.
 */
interface AnalyticsPageClientProps {
  username: string;
};

/**
 * React component for displaying analytics page client.
 */
export function AnalyticsPageClient({
  username
}: AnalyticsPageClientProps) {

  /**
   * Router for the analytics page client.
   */
  const router = useRouter();

  /**
   * Search parameters for the analytics page client.
   */
  const searchParams = useSearchParams();

  /**
   * Handler function for the developer username form.
   */
  function handleUsernameSubmit(nextUsername: string): void {
    /**
     * If the next username is the same as the current username,
     * return early.
     */
    if (username.toLowerCase() === nextUsername.toLowerCase()) {
      return;
    }

    /**
     * Create a new URLSearchParams object.
     */
    const params = new URLSearchParams(
      searchParams.toString()
    );

    /**
     * Set the username in the URLSearchParams.
     */
    params.set(
      "username",
      nextUsername
    );

    /**
     * Push the new URL to the router.
     */
    router.push(
      `/analytics?${params.toString()}`
    );
  };

  return (
    /**
     * Main content section for the analytics page.
     */
    <div className="space-y-8">

      {/**
       * Developer username form for the analytics page.
       */}
      <DeveloperUsernameForm
        username={username}
        onSubmit={handleUsernameSubmit}
      />

      {/**
       * Analytics dashboard for the analytics page.
       */}
      <AnalyticsDashboard
        username={username}
      />
    </div>
  );
};








