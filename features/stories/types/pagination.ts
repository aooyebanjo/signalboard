import type { Story } from "./story .ts";

export interface Pagination {
  page: number;
  limit: number;
  hasMore: boolean;
};

export interface StoriesPage {
  data: Story[];
  pagination: Pagination;
};


