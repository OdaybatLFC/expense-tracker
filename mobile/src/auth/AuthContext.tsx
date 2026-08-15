import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { authService } from './authService';
import { AuthUser, RegisterRequest, SignInRequest } from '../types/user';

type AuthContextValue = {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: (values: SignInRequest) => Promise<void>;
  register: (values: RegisterRequest) => Promise<void>;
  signOut: () => Promise<void>;
  requestPasswordReset: (email: string) => Promise<void>;
};

const AuthContext = createContext<
  AuthContextValue | undefined
>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({
  children,
}: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function restoreSession() {
      try {
        const currentUser =
          await authService.restoreSession();

        if (isMounted) {
          setUser(currentUser);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    restoreSession();

    return () => {
      isMounted = false;
    };
  }, []);

  async function signIn(values: SignInRequest) {
    const authenticatedUser =
      await authService.signIn(values);

    setUser(authenticatedUser);
  }

  async function register(values: RegisterRequest) {
    const authenticatedUser =
      await authService.register(values);

    setUser(authenticatedUser);
  }

  async function signOut() {
    await authService.signOut();
    setUser(null);
  }

  async function requestPasswordReset(email: string) {
    await authService.requestPasswordReset(email);
  }

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isLoading,
      isAuthenticated: Boolean(user),
      signIn,
      register,
      signOut,
      requestPasswordReset,
    }),
    [user, isLoading],
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      'useAuth must be used inside an AuthProvider.',
    );
  }

  return context;
}