import React, { useState, useCallback } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { INITIAL_PHRASES, Phrase } from '../src/data/phrases';
import { PhraseCard } from '../src/components/PhraseCard';
import { TextBar } from '../src/components/TextBar';
import { FullscreenPhrase } from '../src/components/FullscreenPhrase';
import { speakText } from '../src/services/speech';

export default function HomeScreen() {
  const [fullscreenState, setFullscreenState] = useState<{
    visible: boolean;
    text: string;
    emoji?: string;
  }>({
    visible: false,
    text: '',
    emoji: undefined,
  });

  // Maneja la selección de una tarjeta con 1 solo toque
  const handleSelectPhrase = useCallback((phrase: Phrase) => {
    speakText(phrase.text);
    setFullscreenState({
      visible: true,
      text: phrase.text,
      emoji: phrase.emoji,
    });
  }, []);

  // Maneja la locución de texto libre ingresado en la barra fija
  const handleSpeakCustomText = useCallback((text: string) => {
    speakText(text);
    setFullscreenState({
      visible: true,
      text: text,
      emoji: '💬',
    });
  }, []);

  const handleDismissFullscreen = useCallback(() => {
    setFullscreenState({
      visible: false,
      text: '',
      emoji: undefined,
    });
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      {/* Cuadrícula accesible de 2 columnas */}
      <FlatList
        data={INITIAL_PHRASES}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <PhraseCard phrase={item} onPress={handleSelectPhrase} />
        )}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />

      {/* Barra de escritura fija en la parte inferior */}
      <TextBar onSpeak={handleSpeakCustomText} />

      {/* Overlay a pantalla completa durante 3 segundos o al tocar */}
      <FullscreenPhrase
        visible={fullscreenState.visible}
        text={fullscreenState.text}
        emoji={fullscreenState.emoji}
        onDismiss={handleDismissFullscreen}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F5F9',
  },
  listContainer: {
    padding: 8,
    paddingBottom: 16,
  },
});
