import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import MyMemesScreen from '../screens/MyMemesScreen';
import FavoritesScreen from '../screens/FavoritesScreen';

import { useTheme } from '../styles/theme';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  const theme = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        const icons: Record<string, string> = {
          Home: 'home-outline',
          'My Memes': 'images-outline',
          Favorites: 'star-outline',
        };
        const iconName = icons[route.name] || 'help';

        return {
          headerShown: true,
          headerStyle: {
            backgroundColor: theme.primary,
            height: 100,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
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
                  : (iconName as keyof typeof Ionicons.glyphMap)
              }
              size={size}
              color={color}
            />
          ),
        };
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="My Memes" component={MyMemesScreen} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabs;
