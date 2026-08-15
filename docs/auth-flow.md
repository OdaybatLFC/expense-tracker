# Authentication Flow

This document describes the JWT authentication flow used by the React Native application.

## Flow overview

```text
App starts
   |
   v
SecureStore loads JWT
   |
   +-- No token ------------------> Welcome / Sign in / Register
   |
   +-- Token exists
          |
          v
        GET /me
          |
          +-- 200 ----------------> Home
          |
          +-- 401 ----------------> Clear token and show auth screens
```

## Authentication lifecycle

1. The application starts.
2. The persisted JWT is loaded from `expo-secure-store`.
3. If no token exists, the unauthenticated navigation stack is displayed:
   - Welcome
   - Sign in
   - Register
4. If a token exists, the application requests `GET /me`.
5. If `GET /me` succeeds with HTTP `200`, the returned user is stored in the authentication context and the Home screen is displayed.
6. If `GET /me` returns HTTP `401`, the stored token is removed and the unauthenticated screens are displayed.

## Login and registration

### Sign in

1. The user submits the sign-in form.
2. The form is validated with Zod and React Hook Form.
3. The application sends the credentials to `POST /login`.
4. The JWT returned by the backend is stored securely in `expo-secure-store`.
5. The application obtains the authenticated user either from the login response or by calling `GET /me`.
6. The authentication context is updated and the navigation switches to Home.

### Register

1. The user submits the registration form.
2. The form is validated with Zod and React Hook Form.
3. The application sends the registration data to `POST /register`.
4. The returned JWT is stored securely in `expo-secure-store`.
5. The application obtains the authenticated user either from the registration response or by calling `GET /me`.
6. The authentication context is updated and the navigation switches to Home.

## Applying the JWT to API requests

All authenticated requests must use the shared Axios instance:

```ts
import { apiClient } from '../api/apiClient';

const response = await apiClient.get('/some-protected-endpoint');
```

The Axios request interceptor reads the token from the token storage and adds the following header automatically:

```http
Authorization: Bearer <jwt>
```

Do not create separate Axios instances for protected API calls unless they also include the same interceptor configuration.

## Logout

No logout endpoint is currently defined. Logout is therefore handled locally:

1. Remove the JWT from `expo-secure-store`.
2. Clear the current user from the authentication context.
3. Render the unauthenticated navigation stack.

If a backend logout or token revocation endpoint is added later, call it before clearing the local token. The local token should still be cleared even if the backend request fails.

## Error handling

- `400` or `422`: display validation or request errors returned by the backend.
- `401`: clear the stored JWT and treat the session as unauthenticated.
- `403`: show an authorization or permissions error; do not automatically log the user out unless the backend requires it.
- `5xx`: show a temporary server error and allow the user to retry.
- Network timeout: show a connectivity message and allow the user to retry.

## Security considerations

- Store access tokens in `expo-secure-store`, not plain `AsyncStorage`.
- Never log JWTs, passwords, or authorization headers.
- Use HTTPS in production.
- Keep the JWT lifetime short where possible.
- If refresh tokens are introduced, store them securely and implement token refresh with a single queued refresh request to avoid concurrent refresh races.
- Clear the token on an unrecoverable authentication failure.

## Backend contract

The application currently uses these endpoints:

| Method | Endpoint | Purpose | Authentication |
|---|---|---|---|
| `GET` | `/health` | Health check | Usually public |
| `POST` | `/login` | Authenticate an existing user | Public |
| `POST` | `/register` | Create a user and authenticate them | Public |
| `GET` | `/me` | Return the current authenticated user | JWT required |

The login and register response should contain a JWT using one of the agreed property names, for example:

```json
{
  "accessToken": "eyJ..."
}
```

The response may also include the authenticated user:

```json
{
  "accessToken": "eyJ...",
  "user": {
    "id": "user-id",
    "email": "alex@example.com"
  }
}
```

Keep the response format consistent between `/login` and `/register` where possible.

## Relevant modules

```text
src/
├── api/
│   ├── apiClient.ts       # Axios instance and JWT interceptors
│   └── healthApi.ts       # Health-check API calls
├── auth/
│   ├── auth.types.ts       # Authentication request and user types
│   ├── authService.ts      # Login, register, /me, logout
│   ├── AuthContext.tsx     # Session state and authentication actions
│   └── tokenStorage.ts     # SecureStore token persistence
└── navigation/
    └── AppNavigator.tsx    # Authenticated and unauthenticated stacks
```

## Session state

The authentication context should expose at least:

```ts
type AuthContextValue = {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: (values: SignInRequest) => Promise<void>;
  register: (values: RegisterRequest) => Promise<void>;
  signOut: () => Promise<void>;
};
```

`isLoading` prevents the app from rendering the wrong navigation stack while SecureStore and `/me` are being checked during startup.
