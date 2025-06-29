import React from 'react';
import { TouchableOpacity, Image, Text, View } from 'react-native';
import styles from '../styles/componentsStyles/MemeCard.styles';
import { useTheme } from '../styles/theme';

interface Props {
  image: any;
  title: string;
  onPress: () => void;
}

const MemeCard = ({ image, title, onPress }: Props) => {
  const theme = useTheme();

  return (
    <TouchableOpacity onPress={onPress} style={styles.cardContainer}>
      <View style={styles.card}>
        <Image source={image} style={styles.cardImage} />
      </View>
      <Text style={[styles.cardTitle, { color: theme.text }]} numberOfLines={1}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default MemeCard;
