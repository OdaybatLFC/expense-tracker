export type UserRole = "BASIC" | "PREMIUM";

export type AuthUser = {
  id: number;
  email: string;
  role: UserRole;
};

export type SignInRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  fullName: string;
  email: string;
  password: string;
};

export type AuthResponse = {
  token: string;
  userId: number;
  email: string;
  role: UserRole;
};
