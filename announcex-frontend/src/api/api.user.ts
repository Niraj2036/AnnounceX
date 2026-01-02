import { api } from "./axios";

export const userApi = {
  me: async () => {
    const { data } = await api.get("/user/me");
    return data.data; // unwrap { message, data }
  },
};
