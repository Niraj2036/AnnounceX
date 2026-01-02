import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/api/api.auth";
import { saveAuth } from "@/lib/auth";
import { AuthResponse} from "@/types/auth";

export const useRegister = () =>
  useMutation({
    mutationFn: authApi.register,
  });

export const useLogin = () =>
  useMutation({
    mutationFn: authApi.login,
    onSuccess: (data:AuthResponse) => {
      saveAuth(data.token);
    },
  });

export const useVerifyOtp = () =>
  useMutation({
    mutationFn: authApi.verifyOtp,
    onSuccess: (data:AuthResponse) => {
      saveAuth(data.token);
    },
  });
