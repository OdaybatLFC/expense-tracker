import { apiClient } from '../api/apiClient';
import { AuthResponse, AuthUser, RegisterRequest, SignInRequest } from '../types/user';
import {
  clearAccessToken,
  getAccessToken,
  setAccessToken,
} from './tokenStorage';

function extractAccessToken(response: AuthResponse): string {
  if (!response.token) {
    throw new Error(
      'The authentication response did not contain a JWT token.',
    );
  }

  return response.token;
}

function extractUser(response: AuthResponse): AuthUser {
  if (!response.userId || !response.email || !response.role) {
    throw new Error(
      'The authentication response did not contain valid user data.',
    );
  }

  return {
    id: response.userId,
    email: response.email,
    role: response.role,
  };
}

async function getMe(): Promise<AuthUser> {
  const response = await apiClient.get<AuthUser>('/me');

  return response.data;
}

async function authenticate(
  endpoint: '/login' | '/register',
  payload: SignInRequest | RegisterRequest,
): Promise<AuthUser> {
  const response = await apiClient.post<AuthResponse>(
    endpoint,
    payload,
  );

  const authResponse = response.data;
  const token = extractAccessToken(authResponse);

  await setAccessToken(token);

  return extractUser(authResponse);
}

export const authService = {
  async signIn(
    values: SignInRequest,
  ): Promise<AuthUser> {
    return authenticate('/login', values);
  },

  async register(
    values: RegisterRequest,
  ): Promise<AuthUser> {
    return authenticate('/register', values);
  },

  async getCurrentUser(): Promise<AuthUser> {
    return getMe();
  },

  async restoreSession(): Promise<AuthUser | null> {
    const token = await getAccessToken();

    if (!token) {
      return null;
    }

    try {
      return await getMe();
    } catch {
      await clearAccessToken();

      return null;
    }
  },

  async signOut(): Promise<void> {
    // No logout endpoint was provided, so logout is local.
    await clearAccessToken();
  },

  async requestPasswordReset(_email: string): Promise<void> {
    throw new Error(
      'Password reset is not implemented by the backend.',
    );
  },
};