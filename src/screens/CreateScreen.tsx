// src/screens/CreateScreen.tsx
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  Alert,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useRoute, useNavigation, RouteProp, NavigationProp } from '@react-navigation/native';
import ViewShot from 'react-native-view-shot';

import { useTheme } from '../styles/theme';
import { saveMeme } from '../utils/memeStorage';
import Button from '../components/Button';
import createStyles from '../styles/screensStyles/CreateScreen.styles';

type RootStackParamList = {
  Create: { imageUri: string };
  Main: { screen: string };
};
type CreateScreenRouteProp = RouteProp<RootStackParamList, 'Create'>;
type CreateScreenNavigationProp = NavigationProp<RootStackParamList>;

const CreateScreen = () => {
  const theme = useTheme();
  const styles = createStyles(theme);

  const route = useRoute<CreateScreenRouteProp>();
  const navigation = useNavigation<CreateScreenNavigationProp>();
  const { imageUri } = route.params;

  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const viewShotRef = useRef<ViewShot>(null);

  const handleSave = async () => {
    if (isSaving) return;
    setIsSaving(true);

    try {
      const viewShot = viewShotRef.current;
      if (!viewShot || typeof viewShot.capture !== 'function') {
        throw new Error('Capture component is not available.');
      }

      const capturedUri = await viewShot.capture();
      await saveMeme({ imageUri: capturedUri });

      Alert.alert('Success!', 'Your meme has been saved.', [
        { text: 'OK', onPress: () => navigation.navigate('Main', { screen: 'MyMemes' }) },
      ]);
    } catch (error) {
      console.error('Failed to save meme:', error);
      Alert.alert('Error', 'Could not save the meme. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <ViewShot ref={viewShotRef} style={styles.memeCanvas} options={{ format: 'jpg', quality: 0.9 }}>
          <Image source={{ uri: imageUri }} style={styles.imageBackground} />
          <View style={styles.textOverlay}>
            <Text style={styles.memeText} numberOfLines={2}>{topText}</Text>
            <Text style={styles.memeText} numberOfLines={2}>{bottomText}</Text>
          </View>
        </ViewShot>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter Top Text"
            placeholderTextColor={theme.placeholder}
            value={topText}
            onChangeText={setTopText}
            maxLength={50}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Bottom Text"
            placeholderTextColor={theme.placeholder}
            value={bottomText}
            onChangeText={setBottomText}
            maxLength={50}
          />
        </View>

        <View style={styles.buttonContainer}>
          {isSaving ? (
            <ActivityIndicator size="large" color={theme.primary} />
          ) : (
            <Button label="Save Meme" onPress={handleSave} />
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CreateScreen;
