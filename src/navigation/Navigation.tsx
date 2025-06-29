// src/navigation/Navigation.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import SplashScreen from '../screens/SplashScreen';
import HomeScreen from '../screens/HomeScreen';
import CreateScreen from '../screens/CreateScreen';
import MyMemesScreen from '../screens/MyMemesScreen';
import FavoritesScreen from '../screens/FavoritesScreen';

import { useTheme } from '../styles/theme';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MainTabNavigator = () => {
  const theme = useTheme();

  return (
    <Tab.Navigator
      id={undefined}
      screenOptions={({ route }) => {
        let iconName: keyof typeof Ionicons.glyphMap = 'help';

        if (route.name === 'Home') iconName = 'home-outline';
        if (route.name === 'Create') iconName = 'create-outline';
        if (route.name === 'My Memes') iconName = 'images-outline';
        if (route.name === 'Favorites') iconName = 'star-outline';

        return {
          headerStyle: { backgroundColor: theme.primary },
          headerTintColor: '#fff',
          tabBarActiveTintColor: theme.primary,
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            backgroundColor: theme.card,
            borderTopColor: theme.border,
          },
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={
                focused
                  ? (iconName.replace('-outline', '') as keyof typeof Ionicons.glyphMap)
                  : iconName
              }
              size={size}
              color={color}
            />
          ),
        };
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Create" component={CreateScreen} options={{ title: 'Create Meme' }} />
      <Tab.Screen name="My Memes" component={MyMemesScreen} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" id={undefined}>
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={MainTabNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
