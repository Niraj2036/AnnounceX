export type UserRole = "user" | "admin";

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
};

export type CreateUserPayload = {
  name: string;
  email: string;
  password: string;
  role: UserRole;
};

export type UpdateUserPayload = {
  id: string;
  name?: string;
  password?: string;
  role?: UserRole;
};

export type GetUsersParams = {
  pageNo: number;
  pageSize: number;
  search?: string;
  role?: UserRole;
  sort?: "NEWEST" | "OLDEST" | "A_Z" | "Z_A";
};
