import React, { useEffect } from 'react';
import { Modal, TouchableOpacity, Text, StyleSheet, View } from 'react-native';

interface FullscreenPhraseProps {
  visible: boolean;
  text: string;
  emoji?: string;
  onDismiss: () => void;
}

export const FullscreenPhrase: React.FC<FullscreenPhraseProps> = ({
  visible,
  text,
  emoji,
  onDismiss,
}) => {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onDismiss();
      }, 3000); // Se oculta automáticamente a los 3 segundos

      return () => clearTimeout(timer);
    }
  }, [visible, onDismiss]);

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      transparent={false}
      animationType="fade"
      onRequestClose={onDismiss}
    >
      <TouchableOpacity
        style={styles.container}
        onPress={onDismiss}
        activeOpacity={0.9}
        accessibilityRole="button"
        accessibilityLabel={`Mensaje en pantalla completa: ${text}. Toca en cualquier lugar para cerrar.`}
      >
        <View style={styles.content}>
          {emoji ? <Text style={styles.emoji}>{emoji}</Text> : null}
          <Text style={styles.phraseText}>{text}</Text>
          <Text style={styles.subtext}>Toca en cualquier lugar para cerrar</Text>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 90,
    marginBottom: 24,
    textAlign: 'center',
  },
  phraseText: {
    fontSize: 44,
    fontWeight: '900',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 56,
  },
  subtext: {
    fontSize: 16,
    color: '#94A3B8',
    marginTop: 40,
    fontWeight: '600',
  },
});
