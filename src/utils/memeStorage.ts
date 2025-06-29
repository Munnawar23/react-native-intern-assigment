// src/utils/memeStorage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Meme } from '../types';

const MEMES_STORAGE_KEY = '@MemeApp:memes';

type NewMemeData = Omit<Meme, 'id' | 'createdAt' | 'isFavorite'>;

/**
 * Retrieves all memes from AsyncStorage.
 */
export const getMemes = async (): Promise<Meme[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem(MEMES_STORAGE_KEY);
    const memes = jsonValue != null ? JSON.parse(jsonValue) : [];
    return memes.sort((a: Meme, b: Meme) => b.createdAt - a.createdAt);
  } catch (e) {
    console.error('Failed to fetch memes.', e);
    return []; // Return empty array on error
  }
};

/**
 * A helper function to save the entire memes array.
 */
const setMemes = async (memes: Meme[]): Promise<void> => {
    try {
        const jsonValue = JSON.stringify(memes);
        await AsyncStorage.setItem(MEMES_STORAGE_KEY, jsonValue);
    } catch (e) {
        console.error('Failed to set memes in storage.', e);
    }
}

/**
 * Saves a new meme to AsyncStorage.
 */
export const saveMeme = async (data: NewMemeData): Promise<void> => {
  const existingMemes = await getMemes();
  const newMeme: Meme = {
    ...data,
    id: Date.now().toString(),
    createdAt: Date.now(),
    isFavorite: false,
  };
  const updatedMemes = [newMeme, ...existingMemes];
  return setMemes(updatedMemes); // Explicitly return the promise
};

/**
 * Deletes a meme by its ID.
 */
export const deleteMeme = async (id: string): Promise<void> => {
  const existingMemes = await getMemes();
  const updatedMemes = existingMemes.filter((meme) => meme.id !== id);
  return setMemes(updatedMemes); // Explicitly return the promise
};

/**
 * Toggles the favorite status of a meme by its ID.
 */
export const toggleFavoriteStatus = async (id: string): Promise<void> => {
  const existingMemes = await getMemes();
  const updatedMemes = existingMemes.map((meme) => {
    if (meme.id === id) {
      return { ...meme, isFavorite: !meme.isFavorite };
    }
    return meme;
  });
  return setMemes(updatedMemes); // Explicitly return the promise
};