// src/App.tsx
import React from 'react';
import AppNavigator from './navigation/Navigation';
import { AppThemeProvider } from './styles/theme';

export default function App() {
  return (
    // We wrap our entire app in the provider.
    // It will handle all theme changes.
    <AppThemeProvider>
      <AppNavigator />
    </AppThemeProvider>
  );
}