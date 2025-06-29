import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import SplashScreen from '../screens/SplashScreen';
import CreateScreen from '../screens/CreateScreen';
import BottomTabs from './BottomTabs';
import { useTheme } from '../styles/theme';

const Stack = createStackNavigator();

const RootNavigator = () => {
  const isDark = useColorScheme() === 'dark';
  const theme = useTheme();

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen
            name="Splash"
            component={SplashScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Main"
            component={BottomTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Create"
            component={CreateScreen}
            options={{
              headerShown: true,
              headerStyle: {
                backgroundColor: theme.primary,
                height: 100,
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
              title: 'Create Meme',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default RootNavigator;
