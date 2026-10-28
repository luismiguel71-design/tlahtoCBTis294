import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface TextBarProps {
  onSpeak: (text: string) => void;
}

export const TextBar: React.FC<TextBarProps> = ({ onSpeak }) => {
  const [inputText, setInputText] = useState('');

  const handleSpeak = () => {
    if (inputText.trim()) {
      onSpeak(inputText.trim());
      setInputText('');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Escribe un mensaje libre..."
        placeholderTextColor="#64748B"
        value={inputText}
        onChangeText={setInputText}
        accessibilityLabel="Campo para escribir texto libre"
        accessibilityHint="Ingresa el mensaje que deseas que el teléfono pronuncie"
        returnKeyType="done"
        onSubmitEditing={handleSpeak}
      />
      <TouchableOpacity
        style={styles.speakButton}
        onPress={handleSpeak}
        activeOpacity={0.7}
        accessibilityRole="button"
        accessibilityLabel="Hablar"
        accessibilityHint="Toca una vez para pronunciar el texto ingresado en voz alta"
      >
        <Text style={styles.speakButtonText}>Hablar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 3,
    borderTopColor: '#0F172A',
    alignItems: 'center',
    gap: 10,
  },
  input: {
    flex: 1,
    height: 64,
    backgroundColor: '#F8FAFC',
    borderWidth: 2,
    borderColor: '#0F172A',
    borderRadius: 14,
    paddingHorizontal: 16,
    fontSize: 18,
    fontWeight: '600',
    color: '#0F172A',
  },
  speakButton: {
    minWidth: 100,
    height: 64,
    backgroundColor: '#0F172A',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    elevation: 2,
  },
  speakButtonText: {
    fontSize: 20,
    fontWeight: '900',
    color: '#FFFFFF',
    textTransform: 'uppercase',
  },
});
