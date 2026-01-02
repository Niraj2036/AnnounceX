import { api } from "./axios";
import {
  CreateUserPayload,
  UpdateUserPayload,
  GetUsersParams,
} from "@/types/users";

export const adminUsersApi = {
  create: async (payload: CreateUserPayload) => {
    const { data } = await api.post("/admin/users", payload);
    return data;
  },

  update: async ({ id, ...payload }: UpdateUserPayload) => {
    const { data } = await api.put(`/admin/users/${id}`, payload);
    return data;
  },

  getAll: async (params: GetUsersParams) => {
    const { data } = await api.get("/admin/users", { params });
    return data;
  },

  delete: async (id: string) => {
    const { data } = await api.delete(`/admin/users/${id}`);
    return data;
  },
};
