// src/screens/CreateScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Image, Keyboard, ActivityIndicator, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNetInfo } from '@react-native-community/netinfo';
import { getCachedImageUri } from '../services/imageCaching';
import { saveMeme } from '../utils/memeStorage';
import { copyImageToAppDir } from '../utils/imageUtils';
import { useTheme, ThemeColors } from '../styles/theme';

const CreateScreen = () => {
  const theme = useTheme();
  const styles = createStyles(theme);
  const netInfo = useNetInfo(); // Get network state

  const [urlInput, setUrlInput] = useState('');
  const [sourceImageUri, setSourceImageUri] = useState<string | null>(null);
  const [displayedImageUri, setDisplayedImageUri] = useState<string | null>(null);
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const resetState = () => {
    setUrlInput('');
    setSourceImageUri(null);
    setDisplayedImageUri(null);
    setTopText('');
    setBottomText('');
  };

  const handleLoadImageFromUrl = async () => {
    if (!urlInput.trim()) return alert('Please enter an image URL.');
    Keyboard.dismiss();
    setIsLoading(true);
    setDisplayedImageUri(null);
    const cachedUri = await getCachedImageUri(urlInput);
    if (cachedUri) {
      setDisplayedImageUri(cachedUri);
      setSourceImageUri(urlInput);
    } else {
      alert('Failed to load image.');
    }
    setIsLoading(false);
  };

  const handleChooseImageFromGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setIsLoading(true);
      const tempUri = result.assets[0].uri;
      const permanentUri = await copyImageToAppDir(tempUri);
      setDisplayedImageUri(permanentUri);
      setSourceImageUri(permanentUri);
      setUrlInput('');
      setIsLoading(false);
    }
  };

  const handleSaveMeme = async () => {
    if (!sourceImageUri) {
      return Alert.alert('No Image', 'Please load an image first.');
    }
    await saveMeme({ imageUri: sourceImageUri, topText, bottomText });
    Alert.alert('Success', 'Meme saved successfully!');
    resetState();
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <View style={styles.imagePreview}>
        {isLoading && <ActivityIndicator size="large" color={theme.primary} />}
        {!isLoading && displayedImageUri && (
          <>
            <Image source={{ uri: displayedImageUri }} style={styles.image} resizeMode="contain" />
            <Text style={[styles.memeText, styles.topText]}>{topText}</Text>
            <Text style={[styles.memeText, styles.bottomText]}>{bottomText}</Text>
          </>
        )}
        {!isLoading && !displayedImageUri && <Text style={styles.placeholderText}>Image will appear here</Text>}
      </View>

      <View style={styles.controlsContainer}>
        <TextInput style={styles.input} placeholder="Top Text" placeholderTextColor={theme.placeholder} value={topText} onChangeText={setTopText} />
        <TextInput style={styles.input} placeholder="Bottom Text" placeholderTextColor={theme.placeholder} value={bottomText} onChangeText={setBottomText} />
        <View style={styles.buttonContainer}>
          <Button title="Choose from Gallery" onPress={handleChooseImageFromGallery} color={theme.primary} />
        </View>
        <TextInput style={styles.input} placeholder="...or enter image URL" placeholderTextColor={theme.placeholder} value={urlInput} onChangeText={setUrlInput} />
        <Button
          title="Load Image from URL"
          onPress={handleLoadImageFromUrl}
          color={theme.primary}
          disabled={!netInfo.isConnected}
        />
        {!netInfo.isConnected && (
            <Text style={styles.offlineText}>
                URL loading is disabled while offline.
            </Text>
        )}
        <View style={styles.saveButton}>
          <Button title="Save Meme" onPress={handleSaveMeme} color="#4CAF50" disabled={!displayedImageUri} />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const createStyles = (theme: ThemeColors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.background },
  imagePreview: {
    flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#333',
    margin: 10, borderRadius: 8, position: 'relative',
  },
  image: { width: '100%', height: '100%' },
  placeholderText: { color: theme.placeholder, fontSize: 16 },
  memeText: {
    position: 'absolute', width: '90%', textAlign: 'center', fontSize: 28,
    fontWeight: '900', color: 'white', textShadowColor: 'black',
    textShadowOffset: { width: 2, height: 2 }, textShadowRadius: 5,
  },
  topText: { top: 10 },
  bottomText: { bottom: 10 },
  controlsContainer: { padding: 20, backgroundColor: theme.card, borderTopWidth: 1, borderTopColor: theme.border },
  input: {
    height: 40, borderColor: theme.border, borderWidth: 1, borderRadius: 5,
    paddingHorizontal: 10, marginBottom: 10, color: theme.text,
  },
  buttonContainer: { marginBottom: 10 },
  saveButton: { marginTop: 10 },
  offlineText: {
    textAlign: 'center',
    color: theme.secondaryText,
    fontSize: 12,
    marginTop: 5,
  }
});

export default CreateScreen;