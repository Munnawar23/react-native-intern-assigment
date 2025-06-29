// src/screens/SplashScreen.tsx
import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useTheme, ThemeColors } from '../styles/theme';

// Define a type for our navigation stack
type RootStackParamList = {
  Splash: undefined;
  Main: undefined; // This will represent our main app with tabs
};

const SplashScreen = () => {
  const theme = useTheme();
  const styles = createStyles(theme);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    // Navigate to the main app after a delay
    const timer = setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Main' }],
      });
    }, 2500); // 2.5 seconds

    // Cleanup the timer if the component unmounts
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meme Generator</Text>
      <Text style={styles.subtitle}>By [Your Name Here]</Text>
    </View>
  );
};

const createStyles = (theme: ThemeColors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: theme.primary,
  },
  subtitle: {
    fontSize: 18,
    color: theme.secondaryText,
    marginTop: 8,
  }
});

export default SplashScreen;