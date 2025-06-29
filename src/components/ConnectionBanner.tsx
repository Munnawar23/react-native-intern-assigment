// src/components/ConnectionBanner.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';
import { useTheme } from '../styles/theme';

const ConnectionBanner = () => {
  const netInfo = useNetInfo();
  const theme = useTheme();
  
  // We only want to show the banner if the connection is explicitly lost
  // netInfo.isConnected can be null initially, so we check for `false`
  if (netInfo.isConnected === false) {
    return (
      <View style={[styles.banner, { backgroundColor: theme.primary }]}>
        <Text style={styles.bannerText}>No Internet Connection</Text>
      </View>
    );
  }

  // If connected, render nothing
  return null;
};

const styles = StyleSheet.create({
  banner: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ConnectionBanner;