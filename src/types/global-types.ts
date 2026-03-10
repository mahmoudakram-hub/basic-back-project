/** @format */

export type Pagination = {
  query: string;
  limit: number;
  page: number;
  orderby: "name" | "email" | "order";
  order: "asc" | "desc";
  role: "superAdmin" | "admin";
};
