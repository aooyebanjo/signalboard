"use client";

/**
 * React component for displaying analytics overview for a given username.
 */
import { useAnalytics } from "@/features/analytics/hooks/use-analytics";

import { AnalyticsOverview } from "@/features/analytics/components/analytics-overview";

/**
 * Interface for the analytics dashboard props.
 */
interface AnalyticsDashboardProps {
  /**
   * The username to retrieve analytics for.
   */
  username: string;
};

/**
 * AnalyticsDashboard is a React Component that displays the analytics overview for a given username.
 * 
 * @param username The username to retrieve analytics for.
 * @returns A React component that displays the analytics overview for a given username.
 */
export function AnalyticsDashboard({
  username,
}: AnalyticsDashboardProps) {
  /**
   * Retrieve the analytics overview for the given username.
   */
  const {
    data,
    isPending,
    isError,
    error,
    refetch,
    isFetching,
  } = useAnalytics(username);

  /**
   * Render loading state if the query is pending.
   */
  if (isPending) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex min-h-64 items-center justify-center"
      >
        Loading Analytics...
      </div>
    )
  }

  /**
   * Render error state if the query failed.
   */
  if (isError) {
    return (
      <div
        role="alert"
        className="rounded-lg border p-6"
      >
        <h2
          className="text-lg font-semibold"
        >
          Unable to load analytics
        </h2>

        <p
          className="mt-2 text-sm text-muted-foreground"
        >
          {error.message}
        </p>

        <button
          type="button"
          onClick={() => refetch()}
          className="mt-4 rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted"
        >
          Try again
        </button>
      </div>
    )
  }

  /**
   * Render analytics overview if the query was successful.
   */
  return (
    <section className="space-y-6">
      {/**
       * Header section for the analytics dashboard.
       */}
      <header className="space-y-2">
        {/**
         * Main heading for the analytics dashboard.
         */}
        <h1 className="text-3xl font-bold tracking-tight">
          Analytics Overview
        </h1>

        <p className="text-muted-foreground">
          Explore technology engagement and Github repository statistics.
        </p>

        <button
          type="button"
          onClick={() => refetch()}
          disabled={isFetching}
          className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isFetching ? 'Refreshing...' : 'Refresh Analysis'}
        </button>
      </header>

      {/**
       * Show refetch status when the query is refetching.
       */}
      {isFetching && (
        <p
          role="status"
          className="text-sm text-muted-foreground"
        >
          Refetching analysis...
        </p>
      )}

      {/**
       * Render analytics overview if the query was successful.
       */}
      <AnalyticsOverview
        analytics={data}
      />
    </section>
  );
};

