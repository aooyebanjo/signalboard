import type { GitHubUser } from "@/features/developers/schemas/github-user.schema";
import type { Developer } from "@/features/developers/types/developer";

/**
 * Maps a validated GitHub user into our domain `Developer` model.
 */
export function mapGithubUser(
  user: GitHubUser
): Developer {
  return {
    // The ID of the developer.
    id: user.id,
    // The login name of the developer.
    username: user.login,
    // The name of the developer, can be null.
    name: user.name ?? undefined,

    // The URL of the developer's avatar.
    avatarUrl: user.avatar_url,
    // The URL of the developer's profile.
    profileUrl: user.html_url,

    // The bio of the developer, can be null.
    bio: user.bio ?? undefined,
    // The company of the developer, can be null.
    company: user.company ?? undefined,
    // The location of the developer, can be null.
    location: user.location ?? undefined,
    // The website of the developer, can be null.
    website: user.blog ?? undefined,

    // The number of public repositories the developer has.
    repositoryCount: user.public_repos,
    // The number of followers the developer has.
    followers: user.followers,
    // The number of following the developer has.
    following: user.following,

    // The date and time the developer joined the platform.
    joinedAt: new Date(user.created_at),
    // The date and time the developer was updated.
    updatedAt: new Date(user.updated_at),
  }
}

