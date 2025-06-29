import React, { createContext, useContext, ReactNode } from 'react';
import { useColorScheme } from 'react-native';

export interface ThemeColors {
  background: string;
  card: string;
  text: string;
  primary: string;
  secondaryText: string;
  border: string;
  placeholder: string;
}

export const lightTheme: ThemeColors = {
  background: '#f0f0f3',
  card: '#ffffff',
  text: '#2a2a3b',
  primary: '#ff3c78',
  secondaryText: '#d95d00',
  border: '#b48fde',
  placeholder: '#a398c7',
};

export const darkTheme: ThemeColors = {
  background: '#0d0d1a',
  card: '#1c1c33',
  text: '#e0e0ff',
  primary: '#ff3c78',
  secondaryText: '#ffa500',
  border: '#8a2be2',
  placeholder: '#9999cc',
};

const ThemeContext = createContext<ThemeColors>(lightTheme);

export const useTheme = () => useContext(ThemeContext);

interface ThemeProviderProps {
  children: ReactNode;
}

export const AppThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const colorScheme = useColorScheme();
  const activeTheme = colorScheme === 'dark' ? darkTheme : lightTheme;

  return <ThemeContext.Provider value={activeTheme}>{children}</ThemeContext.Provider>;
};
