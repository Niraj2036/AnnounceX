import Cookies from "js-cookie";
import { AuthResponse } from "@/types/auth";

const TOKEN_KEY = "accessToken";

export const saveAuth = (token:string) => {
  Cookies.set(TOKEN_KEY, token, {
    expires: 7,
    sameSite: "lax",
  });
};

export const logout = () => {
  Cookies.remove(TOKEN_KEY);
  window.location.href = "/login";
};
