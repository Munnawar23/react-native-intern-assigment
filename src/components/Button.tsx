import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, ViewStyle } from 'react-native';
import { useTheme } from '../styles/theme';
import styles from '../styles/componentsStyles/Button.styles';

interface Props {
  label: string;
  onPress: () => void;
  variant?: 'default' | 'secondary' | 'danger';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
}

const Button: React.FC<Props> = ({
  label,
  onPress,
  variant = 'default',
  disabled = false,
  loading = false,
  style,
}) => {
  const theme = useTheme();

  const backgroundColor = {
    default: theme.primary,
    secondary: theme.border,
    danger: '#d63031',
  }[variant];

  const finalStyle: ViewStyle = {
    backgroundColor,
    opacity: disabled || loading ? 0.6 : 1,
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, finalStyle, style]}
      disabled={disabled || loading}
    >
      {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>{label}</Text>}
    </TouchableOpacity>
  );
};

export default Button;
