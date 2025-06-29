import React, { useState } from 'react';
import {
  View,
  Text,
  Alert,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { useNetInfo } from '@react-native-community/netinfo';

import { useTheme } from '../styles/theme';
import ConnectionBanner from '../components/ConnectionBanner';
import { copyImageToAppDir } from '../utils/imageUtils';
import { getCachedImageUri } from '../services/imageCaching';
import { indianMemes, topTemplates } from '../data/memesData';
import styles from '../styles/screensStyles/HomeScreen.styles';
import EnterUrlModal from '../components/EnterUrlModal';
import MemeCard from '../components/MemeCard';

type StackParamList = {
  Create: { imageUri: string };
};

const HomeScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp<StackParamList>>();
  const netInfo = useNetInfo();

  const [urlModalVisible, setUrlModalVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [errorText, setErrorText] = useState('');

  const showOfflineAlert = () => {
    Alert.alert('No Internet', 'An internet connection is required to create a meme.');
  };

  const handleNavigateToCreate = (uri: string) => {
    if (!netInfo.isConnected) return showOfflineAlert();
    navigation.navigate('Create', { imageUri: uri });
  };

  const openGallery = async () => {
    if (!netInfo.isConnected) return showOfflineAlert();
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      const { uri, width, height } = result.assets[0];
      const size = Math.min(width!, height!);

      const cropped = await ImageManipulator.manipulateAsync(
        uri,
        [{
          crop: {
            originX: (width! - size) / 2,
            originY: (height! - size) / 2,
            width: size,
            height: size,
          },
        }],
        { compress: 1, format: ImageManipulator.SaveFormat.PNG }
      );

      const permanentUri = await copyImageToAppDir(cropped.uri);
      handleNavigateToCreate(permanentUri);
    }
  };

  const openUrlModal = () => {
    if (!netInfo.isConnected) return showOfflineAlert();
    setImageUrl('');
    setErrorText('');
    setUrlModalVisible(true);
  };

  const handleSubmitUrl = async () => {
    if (!netInfo.isConnected) return showOfflineAlert();
    if (!imageUrl) return setErrorText('URL cannot be empty.');

    try {
      new URL(imageUrl);
    } catch {
      return setErrorText('Please enter a valid URL.');
    }

    try {
      const cachedUri = await getCachedImageUri(imageUrl);
      if (cachedUri) {
        setUrlModalVisible(false);
        handleNavigateToCreate(cachedUri);
      } else {
        setErrorText('Failed to load image. Please check the URL.');
      }
    } catch {
      setErrorText('Something went wrong. Please try again.');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ConnectionBanner />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={styles.mainHeader}>
          <Text style={[styles.mainTitle, { color: theme.text }]}>🎭 Meme Creator</Text>
          <Text style={[styles.mainSubtitle, { color: theme.placeholder }]}>
            Choose a template or create from scratch
          </Text>
        </View>

        <View style={styles.createSection}>
          <Text style={[styles.primarySectionTitle, { color: theme.text }]}>🎨 Create Your Meme</Text>
          <Text style={[styles.sectionDescription, { color: theme.placeholder }]}>
            Upload your own image or use a URL to get started
          </Text>

          <View style={styles.createOptionsGrid}>
            <TouchableOpacity
              style={[styles.createOptionCard, { borderColor: theme.border, backgroundColor: theme.card }]}
              onPress={openGallery}
            >
              <Text style={styles.createOptionEmoji}>📱</Text>
              <Text style={[styles.createOptionText, { color: theme.text }]}>From Gallery</Text>
              <Text style={[styles.createOptionSubtext, { color: theme.placeholder }]}>
                Choose from your photos
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.createOptionCard, { borderColor: theme.border, backgroundColor: theme.card }]}
              onPress={openUrlModal}
            >
              <Text style={styles.createOptionEmoji}>🔗</Text>
              <Text style={[styles.createOptionText, { color: theme.text }]}>From URL</Text>
              <Text style={[styles.createOptionSubtext, { color: theme.placeholder }]}>
                Enter image link
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.templatesSection}>
          <Text style={[styles.primarySectionTitle, { color: theme.text }]}>📋 Create from Templates</Text>

          <View style={styles.subsection}>
            <Text style={[styles.subsectionTitle, { color: theme.text }]}>Famous Indian Memes</Text>
            <View style={styles.cardsGrid}>
              {indianMemes.map((item, index) => (
                <MemeCard
                  key={`indian-${index}`}
                  image={item.image}
                  title={item.title}
                  onPress={() => handleNavigateToCreate(Image.resolveAssetSource(item.image).uri)}
                />
              ))}
            </View>
          </View>

          <View style={styles.subsection}>
            <Text style={[styles.subsectionTitle, { color: theme.text }]}>Top Meme Templates</Text>
            <View style={styles.cardsGrid}>
              {topTemplates.map((item, index) => (
                <MemeCard
                  key={`template-${index}`}
                  image={item.image}
                  title={item.title}
                  onPress={() => handleNavigateToCreate(Image.resolveAssetSource(item.image).uri)}
                />
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      <EnterUrlModal
        visible={urlModalVisible}
        onClose={() => setUrlModalVisible(false)}
        imageUrl={imageUrl}
        onChangeUrl={setImageUrl}
        errorText={errorText}
        onSubmit={handleSubmitUrl}
      />
    </View>
  );
};

export default HomeScreen;
