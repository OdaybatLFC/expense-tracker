import * as SecureStore from 'expo-secure-store';

const ACCESS_TOKEN_KEY = 'auth.accessToken';

let cachedToken: string | null | undefined;
let hydrationPromise: Promise<void> | null = null;

async function hydrateToken() {
  if (cachedToken !== undefined) {
    return;
  }

  if (hydrationPromise) {
    return hydrationPromise;
  }

  hydrationPromise = SecureStore.getItemAsync(ACCESS_TOKEN_KEY)
    .then((token) => {
      // Avoid overwriting a token that may have been set while hydration
      // was in progress.
      if (cachedToken === undefined) {
        cachedToken = token;
      }
    })
    .finally(() => {
      hydrationPromise = null;
    });

  return hydrationPromise;
}

export async function getAccessToken(): Promise<string | null> {
  await hydrateToken();
  return cachedToken ?? null;
}

export async function setAccessToken(token: string): Promise<void> {
  cachedToken = token;

  await SecureStore.setItemAsync(
    ACCESS_TOKEN_KEY,
    token,
  );
}

export async function clearAccessToken(): Promise<void> {
  cachedToken = null;

  await SecureStore.deleteItemAsync(
    ACCESS_TOKEN_KEY,
  );
}