// src/components/ImageCard.tsx
import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';

interface Props {
  image: any;
  onPress: () => void;
}

const ImageCard = ({ image, onPress }: Props) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <Image source={image} style={styles.image} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    width: 150,
    height: 150,
    borderRadius: 8,
    margin: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export default ImageCard;
