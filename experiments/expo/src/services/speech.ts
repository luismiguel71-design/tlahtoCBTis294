import * as Speech from 'expo-speech';

/**
 * Servicio centralizado para la sintetización de voz usando expo-speech (motor nativo).
 * Intenta usar español de México (es-MX). Si no está disponible en el dispositivo,
 * utiliza el idioma nativo por defecto e informa en la consola.
 */
export const speakText = async (text: string): Promise<void> => {
  if (!text || text.trim() === '') return;

  // Detiene cualquier locución previa para reproducir inmediatamente el nuevo mensaje
  Speech.stop();

  const trimmedText = text.trim();

  try {
    const voices = await Speech.getAvailableVoicesAsync();
    const hasEsMx = voices.some(
      (voice) =>
        voice.language === 'es-MX' ||
        voice.language === 'es_MX' ||
        voice.language?.toLowerCase().startsWith('es-mx')
    );

    if (hasEsMx) {
      Speech.speak(trimmedText, {
        language: 'es-MX',
        pitch: 1.0,
        rate: 0.9,
        onError: (err) => {
          console.warn('[Vozzy Speech Warning]: Error al reproducir con es-MX, usando voz por defecto:', err);
          Speech.speak(trimmedText, { pitch: 1.0, rate: 0.9 });
        },
      });
    } else {
      console.warn(
        '[Vozzy Speech Warning]: El idioma "es-MX" no se encuentra disponible en las voces nativas de este dispositivo. Se usará el idioma por defecto del sistema.'
      );
      Speech.speak(trimmedText, {
        pitch: 1.0,
        rate: 0.9,
      });
    }
  } catch (error) {
    console.warn(
      '[Vozzy Speech Warning]: No se pudo verificar la lista de voces nativas. Intentando locución con es-MX o defecto:',
      error
    );
    Speech.speak(trimmedText, {
      language: 'es-MX',
      pitch: 1.0,
      rate: 0.9,
      onError: () => {
        Speech.speak(trimmedText, { pitch: 1.0, rate: 0.9 });
      },
    });
  }
};

export const stopSpeech = (): void => {
  Speech.stop();
};

