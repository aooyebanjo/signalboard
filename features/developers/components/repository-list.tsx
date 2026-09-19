"use client";

import { useState} from "react";
import { useRepositories } from "../hooks/use-repositories";

/**
 * Props for the RepositoryList component
 * @param username - The username of the developer to fetch repositories for
 */
interface RepositoryListProps {
  username: string;
};

/**
 * The number of repositories to fetch per page
 */
const PAGE_SIZE = 5;

/**
 * The RepositoryList component
 * @param username - The username of the developer to fetch repositories for
 * @returns A list of repositories for the given developer
 */
export function RepositoryList({
  username,
}: RepositoryListProps) {
  /**
   * The current page of repositories to fetch
   */
  const [ page, setPage ] = useState(1);

  /**
   * The data from the useRepositories hook
   */
  const {
    data,
    isPending,
    isError,
    error,
    isFetching,
    isPlaceholderData,
  } = useRepositories(
      username, 
      { 
        page, 
        limit: PAGE_SIZE,
      },
    );

    /**
     * If the repositories are still loading, show a loading message
     */
    if (isPending) {
      return (
        <p>Loading repositories...</p>
      );
    }

    {/**
     * If the repositories are still loading, show a loading message
     */}
    {isFetching && (
      <p
        role="status"
        className="text-sm text-muted-foreground"
      >
        Loading repositories...
      </p>
    )}

    /**
     * If there is an error loading the repositories, show an error message
     */
    if (isError) {
      return (
        <p>
          {error instanceof Error 
            ? error.message 
            : 'Unable to load repositories for this user'
          }
        </p>
      );
    }

    /**
     * The repositories to display
     */
    const repositories = data?.data ?? [];

    /**
     * The RepositoryList component
     * @returns A list of repositories for the given developer
     */
    return (
      <section className="space-y-4">
        {/**
         * The header of the repository list
         */}
        <div>
          <h3 className="text-sm font-semibold">
            Repositories
          </h3>

          <p className="text-smtext-muted-foreground">
            Page {page}
          </p>
        </div>

        {/**
         * The list of repositories
         */}
        <div className="space-y-3">
          {/**
           * The list of repositories
           */}
          {repositories.map(
            (repository) => (
              <article
                key={repository.id}
                className="rounded-lg border p-4"
              >
                <a 
                  href={repository.url}
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium underline"
                >
                  {repository.name}
                </a>

                {repository.description && (
                  <p className="mt-1 text-sm">
                    {repository.description}
                  </p>
                )}

                <div className="mt-2 flex flex-wrap gap-4 text-sm text-muted-foreground">
                  {repository.language && (
                    <span>
                      {repository.language}
                    </span>
                  )}

                  <span>
                    {repository.stars} stars
                  </span>

                  <span>
                    {repository.forks} forks
                  </span>
                </div>
              </article>
            ))
          }
        </div>

        {/**
         * The pagination buttons
         */}
        <div className="flex item-center gap-2">
          {/**
           * The previous page button
           */}
          <button
            type="button"
            className="rounded-md border px-3 py-2 disabled:opacity-50"
            disabled={page === 1 || isFetching}
            onClick={() => setPage(
              (currentPage) => currentPage - 1
            )}
          >
            Previous
          </button>

          {/**
           * The next page button
           */}
          <button
            type="button"
            className="rounded-md border px-3 py-2 disabled:opacity-50"
            disabled={ isPlaceholderData || !data?.pagination.hasMore}
            onClick={() => setPage(
              (currentPage) => currentPage + 1)
            }
          >
            Next
          </button>
        </div>
      </section>
    );
};

