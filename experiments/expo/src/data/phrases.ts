export interface Phrase {
  id: string;
  text: string;
  emoji: string;
}

export const INITIAL_PHRASES: Phrase[] = [
  { id: '1', text: 'Sí', emoji: '👍' },
  { id: '2', text: 'No', emoji: '👎' },
  { id: '3', text: 'Necesito ayuda', emoji: '🆘' },
  { id: '4', text: 'Gracias', emoji: '🙏' },
  { id: '5', text: 'No entendí', emoji: '❓' },
  { id: '6', text: 'Repite por favor', emoji: '🔄' },
  { id: '7', text: 'Estoy ocupado', emoji: '⏳' },
  { id: '8', text: 'Me duele algo', emoji: '🤕' },
];
