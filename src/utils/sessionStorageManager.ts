// sessionStorageManager.ts

// Define a namespace for your storage keys to avoid conflicts
const STORAGE_KEY_PREFIX = "myApp_";

export const StorageKeys = {
  ACTIVE_FEATURE: `${STORAGE_KEY_PREFIX}activeFeature`,
  // Add more storage keys here as needed
};

export function saveToSessionStorage(key: string, data: any) {
  const storageKey = key;
  const serializedData = JSON.stringify(data);
  sessionStorage.setItem(storageKey, serializedData);
}

export function loadFromSessionStorage(key: string) {
  const storageKey = key;
  const serializedData = sessionStorage.getItem(storageKey);
  if (serializedData) {
    return JSON.parse(serializedData);
  }
  return null;
}

// You can add more utility functions here as needed
