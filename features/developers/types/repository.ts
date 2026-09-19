/**
 * Interface for a GitHub repository
 */
export interface Repository {
  // The unique identifier for the repository
  id: number;
  // The name of the repository
  name: string;
  // The full name of the repository
  fullName: string;
  // The URL of the repository

  // The URL of the repository
  url: string;
  // The description of the repository
  description?: string;
  // The language of the repository

  // The language of the repository
  language?: string;

  // The number of stars the repository has
  stars: number;
  // The number of forks the repository has
  forks: number;

  // Whether the repository is a fork
  isFork: boolean;
  // Whether the repository is archived
  isArchived: boolean;

  // The date the repository was created
  createdAt: Date;
  // The date the repository was last updated
  updatedAt: Date;
  // The date the repository was last pushed to
  pushedAt: Date;
};
