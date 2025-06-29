import * as FileSystem from 'expo-file-system';

const permanentImageDir = `${FileSystem.documentDirectory}images/`;

const ensureDirExists = async () => {
  const dirInfo = await FileSystem.getInfoAsync(permanentImageDir);
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(permanentImageDir, { intermediates: true });
  }
};

export const copyImageToAppDir = async (tempUri: string): Promise<string> => {
  await ensureDirExists();
  const filename = tempUri.split('/').pop();
  const permanentUri = permanentImageDir + filename;
  await FileSystem.copyAsync({ from: tempUri, to: permanentUri });
  return permanentUri;
};
