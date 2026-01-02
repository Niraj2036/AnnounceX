import { api } from "./axios";
import {
  RegisterPayload,
  LoginPayload,
  VerifyOtpPayload,
  AuthResponse,
} from "@/types/auth";

export const authApi = {
  register: async (payload: RegisterPayload) => {
    const { data } = await api.post<AuthResponse>(
      "/auth/register",
      payload
    );
    return data;
  },

  login: async (payload: LoginPayload) => {
    const { data } = await api.post<AuthResponse>(
      "/auth/login",
      payload
    );
    return data;
  },

  verifyOtp: async (payload: VerifyOtpPayload) => {
    const { data } = await api.post<AuthResponse>(
      "/auth/verify-otp",
      payload
    );
    return data;
  },
};
