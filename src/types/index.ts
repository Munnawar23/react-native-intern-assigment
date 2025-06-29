// src/types/index.ts
export interface Meme {
  id: string;
  imageUri: string; // The original remote URL
  topText: string;
  bottomText: string;
  createdAt: number;
  isFavorite: boolean;
}