// src/utils/imageUtils.ts
import * as FileSystem from 'expo-file-system';

// A directory to store images selected from the gallery
const permanentImageDir = `${FileSystem.documentDirectory}images/`;

const ensureDirExists = async () => {
  const dirInfo = await FileSystem.getInfoAsync(permanentImageDir);
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(permanentImageDir, { intermediates: true });
  }
};

/**
 * Copies an image from a temporary URI to a permanent location in the app's directory.
 * @param tempUri The temporary URI of the image (from the image picker).
 * @returns The permanent file URI of the copied image.
 */
export const copyImageToAppDir = async (tempUri: string): Promise<string> => {
    await ensureDirExists();
    const filename = tempUri.split('/').pop();
    const permanentUri = permanentImageDir + filename;
    await FileSystem.copyAsync({ from: tempUri, to: permanentUri });
    return permanentUri;
};