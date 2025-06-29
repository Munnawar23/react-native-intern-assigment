// src/services/imageCaching.ts
import * as FileSystem from 'expo-file-system';
import CryptoJS from 'crypto-js';

// Define a directory for our cached images to keep things organized.
const cacheDirectory = `${FileSystem.cacheDirectory}imageCache/`;

/**
 * Ensures the cache directory exists.
 */
const ensureDirExists = async () => {
  const dirInfo = await FileSystem.getInfoAsync(cacheDirectory);
  if (!dirInfo.exists) {
    console.log("Image cache directory doesn't exist, creating...");
    await FileSystem.makeDirectoryAsync(cacheDirectory, { intermediates: true });
  }
};

/**
 * Takes a remote image URL, checks if it's already cached,
 * and if not, downloads and caches it.
 *
 * @param uri The remote URL of the image.
 * @returns The local URI of the cached image, or null if an error occurs.
 */
export const getCachedImageUri = async (uri: string): Promise<string | null> => {
  // Create a safe, unique filename from the URL.
  const filename = CryptoJS.SHA256(uri).toString();
  const localUri = `${cacheDirectory}${filename}`;

  await ensureDirExists();

  const fileInfo = await FileSystem.getInfoAsync(localUri);

  if (fileInfo.exists) {
    console.log('Cache HIT: Loading image from local cache.');
    return localUri;
  }

  console.log('Cache MISS: Downloading and caching image.');
  try {
    await FileSystem.downloadAsync(uri, localUri);
    return localUri;
  } catch (e) {
    console.error('Failed to download image:', e);
    return null; // Return null if download fails
  }
};