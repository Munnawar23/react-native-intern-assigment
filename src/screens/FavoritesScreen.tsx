// src/screens/FavoritesScreen.tsx
import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getMemes, deleteMeme, toggleFavoriteStatus } from '../utils/memeStorage';
import { Meme } from '../types';
import MemeListItem from '../components/MemeListItem';
import { useTheme, ThemeColors } from '../styles/theme';

const FavoritesScreen = () => {
  const theme = useTheme();
  const styles = createStyles(theme);

  const [allMemes, setAllMemes] = useState<Meme[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  // Load all memes from storage
  const loadData = useCallback(() => {
    const fetchMemes = async () => {
      const storedMemes = await getMemes();
      setAllMemes(storedMemes);
    };
    fetchMemes();
  }, []);

  useFocusEffect(loadData);

  const onRefresh = useCallback(() => {
    const refreshData = async () => {
      setRefreshing(true);
      await loadData();
      setRefreshing(false);
    };
    refreshData();
  }, [loadData]);

  // Handlers for delete and favorite are the same as in MyMemesScreen
  const handleDelete = async (id: string) => {
    await deleteMeme(id);
    setAllMemes(currentMemes => currentMemes.filter(meme => meme.id !== id));
  };

  const handleToggleFavorite = async (id: string) => {
    await toggleFavoriteStatus(id);
    // Un-favoriting a meme will make it disappear from this list instantly
    setAllMemes(currentMemes =>
      currentMemes.map(meme =>
        meme.id === id ? { ...meme, isFavorite: !meme.isFavorite } : meme
      )
    );
  };

  // Filter the full list to get only favorites for rendering
  const favoriteMemes = allMemes.filter(meme => meme.isFavorite);

  if (!refreshing && favoriteMemes.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.infoText}>You haven't favorited any memes yet.</Text>
        <Text style={styles.infoText}>Tap the star icon on a meme to add it here!</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={favoriteMemes} // <-- Render only the filtered list
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <MemeListItem
          meme={item}
          onDelete={handleDelete}
          onToggleFavorite={handleToggleFavorite}
        />
      )}
      contentContainerStyle={styles.list}
      style={{ backgroundColor: theme.background }}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={theme.primary}
          colors={[theme.primary]}
        />
      }
    />
  );
};

const createStyles = (theme: ThemeColors) => StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: theme.background,
  },
  infoText: {
    fontSize: 18,
    color: theme.secondaryText,
    textAlign: 'center',
  },
  list: {
    paddingTop: 8,
    paddingBottom: 8,
  },
});

export default FavoritesScreen;