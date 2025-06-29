import React from 'react';
import RootNavigator from './navigation/RootNavigator.tsx';
import { AppThemeProvider } from './styles/theme';

const App = () => {
  return (
    <AppThemeProvider>
      <RootNavigator />
    </AppThemeProvider>
  );
};

export default App;
