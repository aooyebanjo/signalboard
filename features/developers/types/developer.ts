/**
 * Interface for a developer.
 */
export interface Developer {
  // The login name of the developer.
  username: string;
  // The ID of the developer.
  id: number;  
  // The URL of the developer's avatar.
  avatarUrl: string;
  // The URL of the developer's profile.
  profileUrl: string;
  // The URL of the developer's HTML page.
  website?: string;

  // The name of the developer, can be null.
  name?: string;
  // The company of the developer, can be null.
  company?: string;
  // The blog of the developer, can be null.
  blog?: string;
  // The location of the developer, can be null.
  location?: string;
  // The bio of the developer, can be null.
  bio?: string;

  // The number of public repositories the developer has.
  repositoryCount: number;
  // The number of followers the developer has.
  followers: number;
  // The number of following the developer has.
  following: number;

  // The date and time the developer joined the platform.
  joinedAt: Date;
  // The date and time the developer was updated.
  updatedAt: Date;
}