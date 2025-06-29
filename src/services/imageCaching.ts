import * as FileSystem from 'expo-file-system';
import CryptoJS from 'crypto-js';

const cacheDirectory = `${FileSystem.cacheDirectory}imageCache/`;

const ensureDirExists = async () => {
  const dirInfo = await FileSystem.getInfoAsync(cacheDirectory);
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(cacheDirectory, { intermediates: true });
  }
};

export const getCachedImageUri = async (uri: string): Promise<string | null> => {
  const filename = CryptoJS.SHA256(uri).toString();
  const localUri = `${cacheDirectory}${filename}`;

  await ensureDirExists();

  const fileInfo = await FileSystem.getInfoAsync(localUri);
  if (fileInfo.exists) return localUri;

  try {
    await FileSystem.downloadAsync(uri, localUri);
    return localUri;
  } catch {
    return null;
  }
};
