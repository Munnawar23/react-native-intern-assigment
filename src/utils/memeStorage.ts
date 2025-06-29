import AsyncStorage from '@react-native-async-storage/async-storage';
import { Meme } from '../types';

const MEMES_STORAGE_KEY = '@MemeApp:memes';

type NewMemeData = {
  imageUri: string;
};

export const getMemes = async (): Promise<Meme[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem(MEMES_STORAGE_KEY);
    const memes = jsonValue ? JSON.parse(jsonValue) : [];
    return memes
      .filter((meme: any) => meme.createdAt)
      .sort((a: Meme, b: Meme) => b.createdAt - a.createdAt);
  } catch {
    return [];
  }
};

const setMemes = async (memes: Meme[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(MEMES_STORAGE_KEY, JSON.stringify(memes));
  } catch {}
};

export const saveMeme = async (data: NewMemeData): Promise<void> => {
  const existingMemes = await getMemes();
  const newMeme: Meme = {
    imageUri: data.imageUri,
    id: Date.now().toString(),
    createdAt: Date.now(),
    isFavorite: false,
  };
  await setMemes([newMeme, ...existingMemes]);
};

export const deleteMeme = async (id: string): Promise<void> => {
  const existingMemes = await getMemes();
  await setMemes(existingMemes.filter(meme => meme.id !== id));
};

export const toggleFavoriteStatus = async (id: string): Promise<void> => {
  const existingMemes = await getMemes();
  const updatedMemes = existingMemes.map(meme =>
    meme.id === id ? { ...meme, isFavorite: !meme.isFavorite } : meme
  );
  await setMemes(updatedMemes);
};
