// src/components/UrlInputModal.tsx
import React from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '../styles/theme';
import styles from '../styles/componentsStyles/UrlInputModal.styles';

interface UrlInputModalProps {
  visible: boolean;
  value: string;
  error: string;
  onChange: (text: string) => void;
  onSubmit: () => void;
  onClose: () => void;
}

const UrlInputModal: React.FC<UrlInputModalProps> = ({
  visible,
  value,
  error,
  onChange,
  onSubmit,
  onClose,
}) => {
  const theme = useTheme();

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.modalBackground}>
        <View style={[styles.modalContent, { backgroundColor: theme.card }]}>
          <Text style={[styles.modalTitle, { color: theme.text }]}>Enter Image URL</Text>
          <TextInput
            style={[styles.input, { color: theme.text, borderColor: theme.border }]}
            placeholder="https://example.com/image.jpg"
            placeholderTextColor={theme.placeholder}
            value={value}
            onChangeText={onChange}
            autoCapitalize="none"
            autoCorrect={false}
          />
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
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

export default UrlInputModal;
