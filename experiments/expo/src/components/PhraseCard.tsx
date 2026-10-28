import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Phrase } from '../data/phrases';

interface PhraseCardProps {
  phrase: Phrase;
  onPress: (phrase: Phrase) => void;
}

export const PhraseCard: React.FC<PhraseCardProps> = ({ phrase, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(phrase)}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityLabel={`Tarjeta: ${phrase.text}`}
      accessibilityHint="Toca una vez para pronunciar en voz alta y mostrar en pantalla grande"
    >
      <Text style={styles.emoji} accessibilityElementsHidden={true} importantForAccessibility="no">
        {phrase.emoji}
      </Text>
      <Text style={styles.text}>{phrase.text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minHeight: 130,
    minWidth: 130,
    backgroundColor: '#FFFFFF',
    borderWidth: 3,
    borderColor: '#0F172A',
    borderRadius: 18,
    padding: 14,
    margin: 8,
    alignItems: 'center',
    justifyContent: 'center',
    // Elevación y sombra sutil para percepción táctil de botón
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  emoji: {
    fontSize: 48,
    marginBottom: 8,
    textAlign: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
    textAlign: 'center',
  },
});
