// src/screens/HomeScreen.tsx
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useTheme, ThemeColors } from '../styles/theme';

// We'll define a type for the tab navigator's params
type TabParamList = {
  Home: undefined;
  Create: undefined;
  'My Memes': undefined;
  Favorites: undefined;
};

const HomeScreen = () => {
  const theme = useTheme();
  const styles = createStyles(theme);
  const navigation = useNavigation<NavigationProp<TabParamList>>();

  const handlePress = () => {
    // Navigate to the 'Create' tab
    navigation.navigate('Create');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to the Meme Generator!</Text>
      <Text style={styles.subText}>Ready to make some memes?</Text>
      <Button
        title="Create Your Meme Now"
        onPress={handlePress}
        color={theme.primary}
      />
    </View>
  );
};

const createStyles = (theme: ThemeColors) => StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.background,
    padding: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.text,
    textAlign: 'center',
    marginBottom: 10,
  },
  subText: {
    fontSize: 16,
    color: theme.secondaryText,
    textAlign: 'center',
    marginBottom: 30,
  },
});

export default HomeScreen;