// src/screens/styles/SplashScreen.styles.ts
import { StyleSheet } from 'react-native';
import { ThemeColors } from '../../styles/theme';

export const createStyles = (theme: ThemeColors) =>
  StyleSheet.create({
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
    },
  });
