import React from 'react';
import { View, Text } from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';
import { useTheme } from '../styles/theme';
import styles from '../styles/componentsStyles/ConnectionBanner.styles';

const ConnectionBanner = () => {
  const netInfo = useNetInfo();
  const theme = useTheme();

  if (netInfo.isConnected === false) {
    return (
      <View style={[styles.bannerContainer, { backgroundColor: theme.primary }]}>
        <Text style={[styles.bannerText, { color: theme.text }]}>
          No internet connection. You cannot create or share memes, only view them.
        </Text>
      </View>
    );
  }

  return null;
};

export default ConnectionBanner;
