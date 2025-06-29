// src/styles/theme.tsx
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
  background: '#f5f5f5',
  card: '#ffffff',
  text: '#000000',
  primary: '#f4511e',
  secondaryText: '#666666',
  border: '#cccccc',
  placeholder: '#9e9e9e',
};

export const darkTheme: ThemeColors = {
  background: '#121212',
  card: '#1e1e1e',
  text: '#ffffff',
  primary: '#ff7043',
  secondaryText: '#a0a0a0',
  border: '#444444',
  placeholder: '#757575',
};

// Create the context with a default value
const ThemeContext = createContext<ThemeColors>(lightTheme);

// Custom hook to consume the theme in components
export const useTheme = () => useContext(ThemeContext);

// The provider component that will wrap our app
interface ThemeProviderProps {
  children: ReactNode;
}

export const AppThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const colorScheme = useColorScheme();

  // This log is our proof. It MUST appear in your terminal when you change the theme.
  console.log(`[THEME SYSTEM] Phone theme is currently: ${colorScheme}`);

  const activeTheme = colorScheme === 'dark' ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={activeTheme}>
      {children}
    </ThemeContext.Provider>
  );
};