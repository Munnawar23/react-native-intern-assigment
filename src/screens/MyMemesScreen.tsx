  import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, RefreshControl } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useNetInfo } from '@react-native-community/netinfo';

import { Meme } from '../types';
import { getMemes } from '../utils/memeStorage';
import ImageCard from '../components/ImageCard';
import ConnectionBanner from '../components/ConnectionBanner';
import MemeActionsModal from '../components/MemeActionsModal';
import { useTheme } from '../styles/theme';
import createStyles from '../styles/screensStyles/MyMemesScreen.styles';

const MyMemesScreen = () => {
  const theme = useTheme();
  const styles = createStyles(theme);
  const netInfo = useNetInfo();

  const [memes, setMemes] = useState<Meme[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedMeme, setSelectedMeme] = useState<Meme | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const loadData = useCallback(() => {
    const fetchMemes = async () => {
      const storedMemes = await getMemes();
      setMemes(storedMemes);
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
    setSelectedMeme(null);
    setModalVisible(false);
  };

  const renderItem = ({ item }: { item: Meme }) => (
    <View style={styles.cardContainer}>
      <ImageCard image={{ uri: item.imageUri }} onPress={() => openActionModal(item)} isFavorite={item.isFavorite} />
    </View>
  );

  if (!refreshing && memes.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.infoText}>You haven't saved any memes yet.</Text>
        <Text style={styles.infoText}>Go to the "Home" tab to make one!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={memes}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={2}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={theme.primary} />
        }
      />
      <MemeActionsModal
        visible={modalVisible}
        onClose={closeModal}
        meme={selectedMeme}
        setMemes={setMemes}
      />
    </View>
  );
};

export default MyMemesScreen;
