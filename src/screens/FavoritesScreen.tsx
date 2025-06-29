import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  RefreshControl,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getMemes } from '../utils/memeStorage';
import { Meme } from '../types';
import ImageCard from '../components/ImageCard';
import { useTheme } from '../styles/theme';
import stylesGenerator from '../styles/screensStyles/FavoritesScreen.styles';
import ConnectionBanner from '@/components/ConnectionBanner';
import MemeActionsModal from '../components/MemeActionsModal';

const FavoritesScreen = () => {
  const theme = useTheme();
  const styles = stylesGenerator(theme);

  const [allMemes, setAllMemes] = useState<Meme[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedMeme, setSelectedMeme] = useState<Meme | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const loadData = useCallback(() => {
    const fetchMemes = async () => {
      const storedMemes = await getMemes();
      setAllMemes(storedMemes);
    };
    fetchMemes();
  }, []);

  useFocusEffect(loadData);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadData();
    setRefreshing(false);
  }, [loadData]);

  const openActionModal = (meme: Meme) => {
    setSelectedMeme(meme);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedMeme(null);
  };

  const favoriteMemes = allMemes.filter(meme => meme.isFavorite);

  const renderItem = ({ item }: { item: Meme }) => (
    <View style={styles.cardContainer}>
      <ImageCard image={{ uri: item.imageUri }} onPress={() => openActionModal(item)} />
    </View>
  );

  if (!refreshing && favoriteMemes.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.infoText}>You haven't favorited any memes yet.</Text>
        <Text style={styles.infoText}>Go to the "My Memes" tab to add some!</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <FlatList
        data={favoriteMemes}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={2}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={theme.primary}
          />
        }
      />
      <MemeActionsModal
        visible={modalVisible}
        onClose={closeModal}
        meme={selectedMeme}
        setMemes={setAllMemes}
      />
    </View>
  );
};

export default FavoritesScreen;
