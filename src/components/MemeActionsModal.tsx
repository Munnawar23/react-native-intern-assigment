import React, { useState } from 'react';
import { Modal, Pressable, Text, View, Alert } from 'react-native';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import { useNetInfo } from '@react-native-community/netinfo';

import { Meme } from '../types';
import { deleteMeme, toggleFavoriteStatus } from '../utils/memeStorage';
import Button from './Button';
import { useTheme } from '../styles/theme';
import createStyles from '../styles/componentsStyles/MemeActionsModal.styles';

interface Props {
  visible: boolean;
  onClose: () => void;
  meme: Meme | null;
  setMemes: React.Dispatch<React.SetStateAction<Meme[]>>;
}

const MemeActionsModal = ({ visible, onClose, meme, setMemes }: Props) => {
  const theme = useTheme();
  const styles = createStyles(theme);
  const netInfo = useNetInfo();

  const [isSharing, setIsSharing] = useState(false);

  const handleDelete = async () => {
    if (!meme) return;
    Alert.alert('Delete Meme', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel', onPress: onClose },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteMeme(meme.id);
            setMemes((prev) => prev.filter((m) => m.id !== meme.id));
            onClose();
            Alert.alert('Success', 'Meme deleted!');
          } catch {
            Alert.alert('Error', 'Failed to delete meme.');
          }
        },
      },
    ]);
  };

  const handleToggleFavorite = async () => {
    if (!meme) return;
    try {
      await toggleFavoriteStatus(meme.id);
      setMemes((prev) =>
        prev.map((m) => (m.id === meme.id ? { ...m, isFavorite: !m.isFavorite } : m))
      );
      onClose();
    } catch {
      Alert.alert('Error', 'Failed to update favorite.');
    }
  };

  const handleShareMeme = async () => {
    if (!meme) return;

    if (!netInfo.isConnected) {
      Alert.alert('No Internet Connection', 'You need internet to share memes.');
      return;
    }

    setIsSharing(true);
    const available = await Sharing.isAvailableAsync();
    if (!available) {
      Alert.alert('Error', 'Sharing is not available.');
      setIsSharing(false);
      return;
    }

    try {
      let localUri = meme.imageUri;

      if (localUri.startsWith('http')) {
        const download = await FileSystem.downloadAsync(
          meme.imageUri,
          `${FileSystem.cacheDirectory}meme_${Date.now()}.jpg`
        );
        localUri = download.uri;
      }

      await Sharing.shareAsync(localUri);
    } catch {
      Alert.alert('Error', 'Sharing failed.');
    } finally {
      setIsSharing(false);
      onClose();
    }
  };

  return (
    <Modal animationType="slide" transparent visible={visible} onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.modal}>
          <Text style={styles.title}>Meme Actions</Text>

          <Button
            label={meme?.isFavorite ? '❤️ Remove from Favorites' : '🤍 Add to Favorites'}
            onPress={handleToggleFavorite}
            disabled={isSharing}
          />

          <Button
            label={isSharing ? 'Sharing...' : '📤 Share Meme'}
            onPress={handleShareMeme}
            disabled={isSharing}
          />

          <Button
            label="🗑️ Delete Meme"
            onPress={handleDelete}
            style={{ backgroundColor: '#ff3b30' }}
            disabled={isSharing}
          />

          <Button
            label="Cancel"
            onPress={onClose}
            style={{ backgroundColor: theme.border }}
          />
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default MemeActionsModal;
