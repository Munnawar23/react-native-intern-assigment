import { StyleSheet } from 'react-native';
import { ThemeColors } from '../theme';

const stylesGenerator = (theme: ThemeColors) =>
  StyleSheet.create({
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

export default stylesGenerator;
