import React from 'react';
import { TouchableOpacity, Image, View, Text } from 'react-native';
import styles from '../styles/componentsStyles/ImageCard.styles';

interface Props {
  image: any;
  onPress: () => void;
  isFavorite?: boolean;
}

const ImageCard = ({ image, onPress, isFavorite }: Props) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <Image source={image} style={styles.image} />
    {isFavorite && (
      <View style={styles.favoriteBadge}>
        <Text style={styles.favoriteIcon}>❤️</Text>
      </View>
    )}
  </TouchableOpacity>
);

export default ImageCard;
