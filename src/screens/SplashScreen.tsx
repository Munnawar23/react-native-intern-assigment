// src/screens/SplashScreen.tsx
import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useTheme } from '../styles/theme';
import { createStyles } from '../styles/screensStyles/SplashScreen.styles'; 

type RootStackParamList = {
  Splash: undefined;
  Main: undefined;
};

const SplashScreen = () => {
  const theme = useTheme();
  const styles = createStyles(theme);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Main' }],
      });
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meme Generator</Text>
    </View>
  );
};

export default SplashScreen;
