// src/screens/MyMemesScreen.tsx
import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getMemes, deleteMeme, toggleFavoriteStatus } from '../utils/memeStorage';
import { Meme } from '../types';
import MemeListItem from '../components/MemeListItem';
import { useTheme, ThemeColors } from '../styles/theme';

const MyMemesScreen = () => {
  const theme = useTheme();
  const styles = createStyles(theme);

  const [memes, setMemes] = useState<Meme[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = useCallback(() => {
    const fetchMemes = async () => {
      const storedMemes = await getMemes();
      setMemes(storedMemes);
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

  const handleDelete = async (id: string) => {
    await deleteMeme(id);
    setMemes(currentMemes => currentMemes.filter(meme => meme.id !== id));
  };

  const handleToggleFavorite = async (id: string) => {
    await toggleFavoriteStatus(id);
    setMemes(currentMemes =>
      currentMemes.map(meme =>
        meme.id === id ? { ...meme, isFavorite: !meme.isFavorite } : meme
      )
    );
  };

  if (!refreshing && memes.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.infoText}>You haven't saved any memes yet.</Text>
        <Text style={styles.infoText}>Go to the "Create" tab to make one!</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={memes}
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

export default MyMemesScreen;