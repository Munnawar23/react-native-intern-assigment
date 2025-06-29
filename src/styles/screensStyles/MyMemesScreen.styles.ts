// src/styles/screensStyles/MyMemesScreen.styles.ts
import { StyleSheet } from 'react-native';
import { ThemeColors } from '../theme';

const createStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    centered: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      backgroundColor: theme.background,
    },
    infoText: {
      fontSize: 18,
      color: theme.secondaryText,
      textAlign: 'center',
      lineHeight: 26,
    },
    list: {
      padding: 4,
    },
    cardContainer: {
      flex: 1,
      margin: 4,
      maxWidth: '48%',
    },
  });

export default createStyles;
