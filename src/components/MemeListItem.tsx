// src/components/MemeListItem.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Meme } from '../types';
import { getCachedImageUri } from '../services/imageCaching';
import { useTheme, ThemeColors } from '../styles/theme';

interface MemeListItemProps {
  meme: Meme;
  onDelete: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}

const MemeListItem = ({ meme, onDelete, onToggleFavorite }: MemeListItemProps) => {
  const theme = useTheme();
  const styles = createStyles(theme);

  const [imageToDisplay, setImageToDisplay] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadImage = async () => {
      setIsLoading(true);
      if (meme.imageUri.startsWith('http')) {
        const cachedUri = await getCachedImageUri(meme.imageUri);
        setImageToDisplay(cachedUri);
      } else {
        setImageToDisplay(meme.imageUri);
      }
      setIsLoading(false);
    };
    loadImage();
  }, [meme.imageUri]);

  const handleDeletePress = () => {
    Alert.alert(
      'Delete Meme',
      'Are you sure you want to delete this meme?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => onDelete(meme.id) },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {isLoading ? ( <ActivityIndicator color={theme.primary} /> ) :
      imageToDisplay ? (
        <>
          <Image source={{ uri: imageToDisplay }} style={styles.image} />
          <Text style={[styles.memeText, styles.topText]}>{meme.topText}</Text>
          <Text style={[styles.memeText, styles.bottomText]}>{meme.bottomText}</Text>

          <View style={styles.actionsContainer}>
            <TouchableOpacity onPress={() => onToggleFavorite(meme.id)} style={styles.actionButton}>
              <Ionicons
                name={meme.isFavorite ? 'star' : 'star-outline'}
                size={28}
                color={meme.isFavorite ? '#FFD700' : 'white'}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDeletePress} style={styles.actionButton}>
              <Ionicons name="trash-outline" size={28} color="#FF6347" />
            </TouchableOpacity>
          </View>
        </>
      ) : ( <Text style={styles.errorText}>Could not load image</Text> )}
    </View>
  );
};

const createStyles = (theme: ThemeColors) => StyleSheet.create({
  container: {
    height: 200, backgroundColor: theme.card, borderRadius: 8, marginVertical: 8,
    marginHorizontal: 16, justifyContent: 'center', alignItems: 'center',
    overflow: 'hidden', position: 'relative', borderWidth: 1, borderColor: theme.border,
  },
  image: { width: '100%', height: '100%' },
  memeText: {
    position: 'absolute', width: '90%', textAlign: 'center', fontSize: 20,
    fontWeight: '900', color: 'white', textShadowColor: 'black',
    textShadowOffset: { width: 2, height: 2 }, textShadowRadius: 3,
  },
  topText: { top: 10 },
  bottomText: { bottom: 10 },
  actionsContainer: {
    position: 'absolute', top: 5, right: 5, flexDirection: 'column',
  },
  actionButton: {
    padding: 8, backgroundColor: 'rgba(0,0,0,0.4)', borderRadius: 20, marginBottom: 10,
  },
  errorText: { color: theme.secondaryText },
});

export default MemeListItem;