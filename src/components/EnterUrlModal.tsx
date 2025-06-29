import React from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import styles from '../styles/componentsStyles/EnterUrlModal.styles';
import { useTheme } from '../styles/theme';

interface Props {
  visible: boolean;
  onClose: () => void;
  imageUrl: string;
  onChangeUrl: (text: string) => void;
  errorText: string;
  onSubmit: () => void;
}

const EnterUrlModal = ({
  visible,
  onClose,
  imageUrl,
  onChangeUrl,
  errorText,
  onSubmit,
}: Props) => {
  const theme = useTheme();

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.modalBackground}>
        <View style={[styles.modalContent, { backgroundColor: theme.card }]}>
          <Text style={[styles.modalTitle, { color: theme.text }]}>Enter Image URL</Text>
          <TextInput
            style={[styles.input, { color: theme.text, borderColor: theme.border }]}
            placeholder="https://example.com/meme.jpg"
            placeholderTextColor={theme.placeholder}
            value={imageUrl}
            onChangeText={onChangeUrl}
            autoCapitalize="none"
            autoCorrect={false}
          />
          {errorText ? <Text style={styles.errorText}>{errorText}</Text> : null}
          <View style={styles.modalButtons}>
            <TouchableOpacity onPress={onClose} style={styles.modalButton}>
              <Text style={[styles.modalButtonText, { color: theme.primary }]}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onSubmit} style={styles.modalButton}>
              <Text style={[styles.modalButtonText, { color: theme.primary }]}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default EnterUrlModal;
