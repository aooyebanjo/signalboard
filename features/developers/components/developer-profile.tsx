import Image from "next/image";

import type { Developer } from "../types/developer";

import { RepositoryList } from "./repository-list";

import { DeveloperInsights } from "./developer-insights";

/**
 * DeveloperProfileProps interface
 * 
 * This interface defines the props for the DeveloperProfile component.
 * 
 * @property {Developer} developer - The developer to display.
 */
interface DeveloperProfileProps {
  developer: Developer;
}

/**
 * DeveloperProfile component
 * 
 * This component displays a profile card for a developer.
 * 
 * @param {DeveloperProfileProps} props - The props for the DeveloperProfile component.
 * @returns {JSX.Element} The DeveloperProfile component
 */
export function DeveloperProfile({
  developer,
}: DeveloperProfileProps) {
  // Return the DeveloperProfile component
  return (
    // Developer profile card
    <article className="rounded-lg border p-6">
      <div className="flex flex-col items-center gap-4 sm:flex-row">
        {/* Developer avatar */}
        {/* <img
          src={developer.avatarUrl}
          alt={`${developer.username} avatar`}
          className="h-24 w-24 rounded-full"
        /> */}
        <Image 
          src={developer.avatarUrl}
          alt={`${developer.username}'s avator`}
          width={96}
          height={96}
          className="h-24 w-24 shrink-0 rounded-full"
        />

        {/* Developer information */}
        <div className="w-full sm:min-w-0 sm:flex-1 space-y-2">
          {/* Developer name and username */}
          <div className="flex flex-col items-center sm:items-start">
            <h2 className="text-2xl font-semibold">
              {developer.name ?? developer.username}
            </h2>

            {/* Developer profile URL */}
            <a
              href={developer.profileUrl}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-muted-foreground underline"
            >
              @{developer.username}
            </a>
          </div>

          {/* Developer bio */}
          {developer.bio && (
            <p>{developer.bio}</p>
          )}

          {/* Developer followers, following, and repository count */}
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-md border p-3">
              <p className="text-sm text-muted-foreground">
                Repositories
              </p>

              <p className="text-xl font-semibold">
                {developer.repositoryCount}
              </p>
            </div>

            <div className="rounded-md border p-3">
              <p className="text-sm text-muted-foreground">
                Followers
              </p>

              <p className="text-xl font-semibold">
                {developer.followers}
              </p>
            </div>

            <div className="rounded-md border p-3">
              <p className="text-sm text-muted-foreground">
                Following
              </p>

              <p className="text-xl font-semibold">
                {developer.following}
              </p>
            </div>
          </div>

          {/* Developer company, location, website, and joined at */}
          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
            {developer.company && (
              <span>{developer.company}</span>
            )}

            {developer.location && (
              <span>{developer.location}</span>
            )}

            {developer.website && (
              <a
                href={developer.website}
                target="_blank"
                rel="noreferrer"
                className="break-all hover:underline"
              >
                {developer.website}
              </a>
            )}

            <span>
              Joined{" "}
              {developer.joinedAt.toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>

      {/**
       * The developer insights section
       */}
      <DeveloperInsights
        key={`${developer.username}-insights`}
        // The username of the developer to fetch insights for
        username={developer.username}
      />

      {/**
       * The repository list section
       */}
      <RepositoryList 
        key={`${developer.username}-repositories`}
        // The username of the developer to fetch repositories for
        username={developer.username} 
      />
    </article>
  );
}