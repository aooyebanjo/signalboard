"use client";

import { useDeveloperInsights } from "@/features/developers/hooks/use-developer-insights";

/**
 * Props for the DeveloperInsights component
 * @param username - The username of the developer to fetch insights for
 */
interface DeveloperInsightsProps {
  username: string;
};

/**
 * DeveloperInsights component
 * @param props - The props for the component
 * @returns The DeveloperInsights component
 */
export function DeveloperInsights({ 
  username, 
}: DeveloperInsightsProps) {
  /**
   * State for the DeveloperInsights component
   * @param developerInsights - The developer insights data
   * @param isPending - Whether the developer insights are loading
   * @param isError - Whether the developer insights are in error
   * @param error - The error object
   */
  const {
    data: developerInsights,
    isPending,
    isError,
    error,
  } = useDeveloperInsights(username);

  /**
   * If the developer insights are loading, return a loading message
   * @returns The loading message
   */
  if (isPending) {
    return (
      <p>Loading developer insights...</p>
    );
  }

  /**
   * If the developer insights are in error, return an error message
   * @returns The error message
   */
  if (isError) {
    return (
      <p>
        {error instanceof Error 
          ? error.message 
          : "Unable to load developer insights. Please try again later."
        }
      </p>
    );
  }

  /**
   * If the developer insights are loaded, return the developer insights
   * @returns The developer insights
   */
  return (
    <section className="space-y-4 mb-4">
      <div>
        <h3 className="text-xl font-semibold">
          Developer Insights
        </h3>

        <p className="text-sm text-muted-foreground">
          Repository Activity Summary
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <article className="rounded-lg border p-4">
          <p className="text-sm text-muted-foreground">
            Repositories
          </p>

          <p className="text-2xl font-semibold">
            {developerInsights.totalRepositories}
          </p>
        </article>

        <article className="rounded-lg border p-4">
          <p className="text-sm text-muted-foreground">
            Total Stars
          </p>

          <p className="text-2xl font-semibold">
            {developerInsights.totalStars}
          </p>
        </article>

        <article  className="rounded-lg border p-4">
          <p className="text-sm text-muted-foreground">
            Total Forks
          </p>

          <p className="text-2xl font-semibold">
            {developerInsights.totalForks}
          </p>
        </article>
      </div>

      {developerInsights.mostStarredRepository && (
        <article className="rounded-lg border p-4">
          <p className="text-sm text-muted-foreground">
            Most Starred Repository
          </p>

          <a
           href={
             developerInsights
              .mostStarredRepository
              .url
            } 
           target="_blank"
           rel="noreferrer"
           className="font-medium underline"
          >
            {developerInsights
              .mostStarredRepository
              .name
            }
          </a>

          <p className="text-sm">
            {developerInsights
               .mostStarredRepository
               .stars}
               {" "} stars
          </p>
        </article>
      )}

      {(developerInsights.languages.length > 0) && (
        <article className="rounded-lg border p-4">
          <h4 className="font-medium">
            Languages
          </h4>

          <div className="mt-2 flex flex-wrap gap-2">
            {developerInsights.languages.map(
              ({ language, count }) => (
                <span
                 key={language}
                 className="rounded-md border px-2 py-1 text-sm"
                >
                  {language}: {count}
                </span>
              )
            )}
          </div>
        </article>
      )}

      {developerInsights.recentlyUpdatedRepositories.length >
        0 && (
        <article className="rounded-lg border p-4">
          <h4 className="font-medium">
            Recent Repository Activity
          </h4>

          <div className="mt-3 space-y-2">
            {developerInsights.recentlyUpdatedRepositories.map(
              (repository) => (
                <div key={repository.url}>
                  <a
                    href={repository.url}
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium underline"
                  >
                    {repository.name}
                  </a>

                  <p className="text-sm text-muted-foreground">
                    Last pushed{" "}
                    {repository.pushedAt.toLocaleDateString()}
                  </p>
                </div>
              )
            )}
          </div>
        </article>
      )}
    </section>
  );
};
