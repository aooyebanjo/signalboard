import { PageHeader } from "@/components/ui/page-header";

import { AnalyticsPageClient } from "@/features/analytics/components/analytics-page-client";

/**
 * Interface for the analytics page component.
 */
interface AnalyticsPageProps {
  searchParams: Promise<{
    username?: string | string[]
  }>
};

/**
 * React component for displaying analytics dashboard.
 */
import { AnalyticsDashboard } from "@/features/analytics/components/analytics-dashboard";

export default async function AnalyticsPage({
  searchParams,
}: AnalyticsPageProps) {
  const params = await searchParams;

  const username = typeof params.username === "string"
    ? params.username
    : "octocat";

  return (
    <section className="p-4 sm:p-6 md:p-8">
      <PageHeader
        title="Analytics"
        description="Analyze trends and derived intelligence from application data."
      />

      {/**
       * Main content section for the analytics page.
       */}
      <main className="mt-4 space-y-6">
        {/**
         * Analytics page client for the given username.
         */}
        <AnalyticsPageClient
          username={username}
        />
      </main>
    </section>
  );
}
