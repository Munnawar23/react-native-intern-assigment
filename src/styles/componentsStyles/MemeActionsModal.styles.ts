// src/styles/componentsStyles/MemeActionsModal.styles.ts
import { StyleSheet } from 'react-native';
import { ThemeColors } from '../theme';

const createStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modal: {
      backgroundColor: theme.card,
      padding: 20,
      paddingBottom: 30,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      alignItems: 'stretch',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: theme.text,
      textAlign: 'center',
      marginBottom: 24,
    },
  });

export default createStyles;
