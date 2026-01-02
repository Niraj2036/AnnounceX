export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
};

export type AuthResponse = {
  token: string;
  tokenType?: string;
  user: AuthUser;
};

export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type VerifyOtpPayload = {
  email: string;
  otp: string;
  purpose: "EMAIL_VERIFICATION";
};
