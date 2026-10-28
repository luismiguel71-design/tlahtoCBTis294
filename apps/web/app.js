/* ==========================================================================
   VOZZY - CAA Progressive Web Application Engine
   ========================================================================== */


// --- SVG Icons Map (Lucide Line Style) ---
const SVG_ICONS = {
  mic: `<svg viewBox="0 0 24 24"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="22"/><line x1="8" y1="22" x2="16" y2="22"/></svg>`,
  home: `<svg viewBox="0 0 24 24"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
  school: `<svg viewBox="0 0 24 24"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/><path d="M6 6h10"/><path d="M6 10h10"/></svg>`,
  doctor: `<svg viewBox="0 0 24 24"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M12 5v14"/><path d="M5 12h14"/></svg>`,
  food: `<svg viewBox="0 0 24 24"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>`,
  emotions: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>`,
  greetings: `<svg viewBox="0 0 24 24"><path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0"/><path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v6"/><path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 0 1 2 2v4a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/></svg>`,
  transport: `<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="15" rx="2"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/><path d="M3 9h18"/></svg>`,
  games: `<svg viewBox="0 0 24 24"><line x1="6" y1="12" x2="10" y2="12"/><line x1="8" y1="10" x2="8" y2="14"/><circle cx="15" cy="13" r="1"/><circle cx="17" cy="11" r="1"/><rect x="2" y="6" width="20" height="12" rx="6"/></svg>`,
  emergency: `<svg viewBox="0 0 24 24"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
  custom: `<svg viewBox="0 0 24 24"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>`,
  star: `<svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  back: `<svg viewBox="0 0 24 24"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>`,
  user: `<svg viewBox="0 0 24 24"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  settings: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
  sun: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`,
  moon: `<svg viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`,
  trash: `<svg viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>`,
  play: `<svg viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg>`,
  stop: `<svg viewBox="0 0 24 24"><rect x="6" y="6" width="12" height="12" rx="2"/></svg>`,
  repeat: `<svg viewBox="0 0 24 24"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>`,
  download: `<svg viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`,
  check: `<svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>`
};

// --- Preloaded Categories & Phrases (12 per category) ---
const CATEGORIES = [
  {
    id: 'frequent',
    name: 'Usados frecuentemente',
    icon: 'star',
    color: 'amber',
    isSmart: true,
    phrases: []
  },
  {
    id: 'casa',
    name: 'Casa',
    icon: 'home',
    color: 'purple',
    phrases: [
      { text: 'Tengo sed', icon: 'food' },
      { text: 'Tengo hambre', icon: 'food' },
      { text: 'Quiero ir al baño', icon: 'home' },
      { text: 'Tengo sueño', icon: 'moon' },
      { text: 'Ayúdame', icon: 'emergency' },
      { text: 'Sí', icon: 'check' },
      { text: 'No', icon: 'emergency' },
      { text: 'Me duele', icon: 'doctor' },
      { text: 'Quiero descansar', icon: 'moon' },
      { text: 'Estoy feliz', icon: 'emotions' },
      { text: 'Estoy triste', icon: 'emotions' },
      { text: 'Gracias', icon: 'greetings' }
    ]
  },
  {
    id: 'escuela',
    name: 'Escuela',
    icon: 'school',
    color: 'blue',
    phrases: [
      { text: 'Quiero ir al baño', icon: 'home' },
      { text: 'No entiendo', icon: 'school' },
      { text: 'Ya terminé', icon: 'check' },
      { text: 'Necesito ayuda', icon: 'emergency' },
      { text: 'Puedo jugar', icon: 'games' },
      { text: 'Tengo una pregunta', icon: 'school' },
      { text: 'Me siento mal', icon: 'doctor' },
      { text: 'Quiero agua', icon: 'food' },
      { text: 'Es mío', icon: 'user' },
      { text: 'Préstame', icon: 'school' },
      { text: 'Hola', icon: 'greetings' },
      { text: 'Adiós', icon: 'greetings' }
    ]
  },
  {
    id: 'doctor',
    name: 'Doctor',
    icon: 'doctor',
    color: 'red',
    phrases: [
      { text: 'Me duele la cabeza', icon: 'doctor' },
      { text: 'Me duele la panza', icon: 'doctor' },
      { text: 'Me duele aquí', icon: 'doctor' },
      { text: 'Tengo fiebre', icon: 'doctor' },
      { text: 'Tengo tos', icon: 'doctor' },
      { text: 'No me siento bien', icon: 'doctor' },
      { text: 'Me mareo', icon: 'doctor' },
      { text: 'Tengo alergia', icon: 'doctor' },
      { text: 'Necesito medicina', icon: 'doctor' },
      { text: 'Estoy mejor', icon: 'emotions' },
      { text: 'Quiero a mi mamá', icon: 'user' },
      { text: 'Tengo miedo', icon: 'emotions' }
    ]
  },
  {
    id: 'comida',
    name: 'Comida',
    icon: 'food',
    color: 'orange',
    phrases: [
      { text: 'Tengo hambre', icon: 'food' },
      { text: 'Tengo sed', icon: 'food' },
      { text: 'Quiero agua', icon: 'food' },
      { text: 'Quiero comer', icon: 'food' },
      { text: 'Está muy rico', icon: 'food' },
      { text: 'Está muy caliente', icon: 'sun' },
      { text: 'Está frío', icon: 'moon' },
      { text: 'Ya no quiero más', icon: 'check' },
      { text: 'Dame más por favor', icon: 'greetings' },
      { text: 'Quiero postre', icon: 'food' },
      { text: 'No me gusta esto', icon: 'emotions' },
      { text: 'Gracias por la comida', icon: 'greetings' }
    ]
  },
  {
    id: 'emociones',
    name: 'Emociones',
    icon: 'emotions',
    color: 'green',
    phrases: [
      { text: 'Estoy feliz', icon: 'emotions' },
      { text: 'Estoy triste', icon: 'emotions' },
      { text: 'Estoy enojado', icon: 'emotions' },
      { text: 'Tengo miedo', icon: 'emotions' },
      { text: 'Estoy cansado', icon: 'moon' },
      { text: 'Estoy sorprendido', icon: 'emotions' },
      { text: 'Me siento solo', icon: 'user' },
      { text: 'Estoy tranquilo', icon: 'emotions' },
      { text: 'Estoy emocionado', icon: 'emotions' },
      { text: 'Me siento confundido', icon: 'emotions' },
      { text: 'Necesito un abrazo', icon: 'greetings' },
      { text: 'Estoy bien', icon: 'check' }
    ]
  },
  {
    id: 'saludos',
    name: 'Saludos',
    icon: 'greetings',
    color: 'rose',
    phrases: [
      { text: 'Hola', icon: 'greetings' },
      { text: 'Buenos días', icon: 'sun' },
      { text: 'Buenas tardes', icon: 'sun' },
      { text: 'Buenas noches', icon: 'moon' },
      { text: 'Adiós', icon: 'greetings' },
      { text: 'Hasta luego', icon: 'greetings' },
      { text: 'Mucho gusto', icon: 'greetings' },
      { text: '¿Cómo estás?', icon: 'greetings' },
      { text: 'Bien, gracias', icon: 'check' },
      { text: 'Por favor', icon: 'greetings' },
      { text: 'Gracias', icon: 'greetings' },
      { text: 'De nada', icon: 'check' }
    ]
  },
  {
    id: 'transporte',
    name: 'Salir / Transporte',
    icon: 'transport',
    color: 'indigo',
    phrases: [
      { text: 'Quiero salir', icon: 'transport' },
      { text: 'Vamos a casa', icon: 'home' },
      { text: 'Quiero ir al parque', icon: 'sun' },
      { text: 'Súbete al auto', icon: 'transport' },
      { text: 'Tengo que irme', icon: 'transport' },
      { text: '¿Falta mucho?', icon: 'transport' },
      { text: 'Espérame aquí', icon: 'user' },
      { text: 'Abre la puerta', icon: 'home' },
      { text: 'Cierra la ventana', icon: 'home' },
      { text: 'Tengo frío', icon: 'moon' },
      { text: 'Tengo calor', icon: 'sun' },
      { text: 'Llevame con la familia', icon: 'user' }
    ]
  },
  {
    id: 'juegos',
    name: 'Juegos',
    icon: 'games',
    color: 'cyan',
    phrases: [
      { text: 'Quiero jugar', icon: 'games' },
      { text: 'Es mi turno', icon: 'user' },
      { text: 'Es tu turno', icon: 'user' },
      { text: 'Pasame el juguete', icon: 'games' },
      { text: 'Vamos a pintar', icon: 'custom' },
      { text: 'Quiero ver televisión', icon: 'games' },
      { text: 'Pon música', icon: 'mic' },
      { text: 'Ganaste', icon: 'star' },
      { text: 'Gané', icon: 'star' },
      { text: 'Jugamos de nuevo', icon: 'repeat' },
      { text: 'Guardemos las cosas', icon: 'home' },
      { text: 'Me divertí mucho', icon: 'emotions' }
    ]
  },
  {
    id: 'emergencias',
    name: 'Emergencias',
    icon: 'emergency',
    color: 'red',
    phrases: [
      { text: '¡Ayuda!', icon: 'emergency' },
      { text: 'Me siento muy mal', icon: 'doctor' },
      { text: 'Llama al doctor', icon: 'doctor' },
      { text: 'Me caí', icon: 'emergency' },
      { text: 'No puedo respirar bien', icon: 'doctor' },
      { text: 'Me perdí', icon: 'emergency' },
      { text: 'Busca a mis padres', icon: 'user' },
      { text: 'Necesito mi medicina', icon: 'doctor' },
      { text: 'Es urgente', icon: 'emergency' },
      { text: 'Por favor ayúdame', icon: 'emergency' },
      { text: 'Llame al 911', icon: 'emergency' },
      { text: 'Tengo dolor fuerte', icon: 'doctor' }
    ]
  },
  {
    id: 'custom_msg',
    name: 'Escribe tu mensaje',
    icon: 'custom',
    color: 'violet',
    isCustomWriter: true,
    phrases: []
  }
];

// --- Application State ---
const state = {
  userName: localStorage.getItem('vozzy_username') || '',
  welcomeDone: localStorage.getItem('vozzy_welcome_done') === 'true',
  tutorialDone: localStorage.getItem('vozzy_tutorial_done') === 'true',
  theme: localStorage.getItem('vozzy_theme') || 'light',
  colorTheme: localStorage.getItem('vozzy_color_theme') || 'multicolor',
  phraseUsage: JSON.parse(localStorage.getItem('vozzy_phrase_usage') || '{}'),
  speechSettings: JSON.parse(localStorage.getItem('vozzy_speech_settings') || '{"pitch":1.0,"rate":1.0}'),
  currentCategory: null,
  lastSpokenText: '',
  deferredInstallPrompt: null,
  tutorialSlide: 0
};

function isAppStandalone() {
  return window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
}

// Early capture of PWA beforeinstallprompt event
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  state.deferredInstallPrompt = e;
  console.log('[PWA] Captured beforeinstallprompt event');
  const installNavBtn = document.getElementById('nav-install-btn');
  if (installNavBtn && !isAppStandalone()) {
    installNavBtn.classList.remove('hidden');
  }
});

// --- Web Speech API Setup ---
let selectedVoice = null;
let hasOfflineSpanishVoice = false;
let offlineVoiceWarningDismissed = false;

function showOfflineVoiceNotice() {
  if (offlineVoiceWarningDismissed) return;
  const existing = document.getElementById('vozzy-offline-voice-notice');
  if (existing) return;

  const notice = document.createElement('div');
  notice.id = 'vozzy-offline-voice-notice';
  notice.className = 'vozzy-voice-notice';
  notice.setAttribute('role', 'alert');
  notice.innerHTML = `
    <div class="vozzy-voice-notice-inner">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="8" x2="12" y2="12"/>
        <line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
      <span>No hay voz en español disponible sin conexión. Descarga una voz en español en los ajustes de voz de tu dispositivo para usar Vozzy sin internet.</span>
      <button onclick="dismissOfflineVoiceNotice()" aria-label="Cerrar aviso">&times;</button>
    </div>
  `;
  document.body.appendChild(notice);

  setTimeout(() => {
    dismissOfflineVoiceNotice();
  }, 6000);
}

function dismissOfflineVoiceNotice() {
  offlineVoiceWarningDismissed = true;
  const notice = document.getElementById('vozzy-offline-voice-notice');
  if (notice) {
    notice.classList.add('fade-out');
    setTimeout(() => notice.remove(), 300);
  }
}

function loadSpanishVoices() {
  if (!('speechSynthesis' in window)) return;
  const voices = window.speechSynthesis.getVoices();
  // Manejo correcto de que getVoices() puede devolver array vacío al inicio
  if (!voices || voices.length === 0) return;

  // Filtrar voces en español
  const spanishVoices = voices.filter(v => v.lang && v.lang.toLowerCase().startsWith('es'));

  // Priorizar voces en español con localService === true (100% offline)
  const localSpanishVoices = spanishVoices.filter(v => v.localService === true);

  if (localSpanishVoices.length > 0) {
    hasOfflineSpanishVoice = true;
    selectedVoice = localSpanishVoices.find(v => v.lang === 'es-MX') ||
                    localSpanishVoices.find(v => v.lang === 'es-US') ||
                    localSpanishVoices.find(v => v.lang === 'es-ES') ||
                    localSpanishVoices[0];
  } else if (spanishVoices.length > 0) {
    // Hay voces en español pero ninguna localService === true
    hasOfflineSpanishVoice = false;
    selectedVoice = spanishVoices.find(v => v.lang === 'es-MX') ||
                    spanishVoices.find(v => v.lang === 'es-US') ||
                    spanishVoices.find(v => v.lang === 'es-ES') ||
                    spanishVoices[0];
  } else {
    // Sin voces en español disponibles
    hasOfflineSpanishVoice = false;
    selectedVoice = voices.find(v => v.default) || voices[0];
  }
}

if ('speechSynthesis' in window) {
  window.speechSynthesis.onvoiceschanged = loadSpanishVoices;
  window.speechSynthesis.addEventListener('voiceschanged', loadSpanishVoices);
  loadSpanishVoices();
}

function speakText(text, cardEl = null) {
  if (!text || !('speechSynthesis' in window)) return;

  if (!hasOfflineSpanishVoice && !offlineVoiceWarningDismissed) {
    showOfflineVoiceNotice();
  }

  window.speechSynthesis.cancel(); // Stop any active speech

  const utterance = new SpeechSynthesisUtterance(text);
  if (selectedVoice) utterance.voice = selectedVoice;
  utterance.rate = state.speechSettings.rate;
  utterance.pitch = state.speechSettings.pitch;
  utterance.lang = selectedVoice ? selectedVoice.lang : 'es-MX';

  state.lastSpokenText = text;

  // Track Usage for "Usados frecuentemente"
  trackPhraseUsage(text);

  // UI Feedback
  const floatingBar = document.getElementById('floating-voice-bar');
  const textLabel = document.getElementById('floating-spoken-text');
  if (textLabel) textLabel.textContent = `"${text}"`;
  if (floatingBar) floatingBar.classList.remove('hidden');

  if (cardEl) {
    document.querySelectorAll('.card-item').forEach(c => c.classList.remove('active-speaking'));
    cardEl.classList.add('active-speaking');
  }

  utterance.onend = () => {
    if (cardEl) cardEl.classList.remove('active-speaking');
    setTimeout(() => {
      if (!window.speechSynthesis.speaking && floatingBar) {
        floatingBar.classList.add('hidden');
      }
    }, 1200);
  };

  utterance.onerror = () => {
    if (cardEl) cardEl.classList.remove('active-speaking');
    if (floatingBar) floatingBar.classList.add('hidden');
  };

  window.speechSynthesis.speak(utterance);
}

function stopSpeech() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
  const floatingBar = document.getElementById('floating-voice-bar');
  if (floatingBar) floatingBar.classList.add('hidden');
  document.querySelectorAll('.card-item').forEach(c => c.classList.remove('active-speaking'));
}

function repeatLastSpeech() {
  if (state.lastSpokenText) {
    speakText(state.lastSpokenText);
  }
}

// --- Usage Tracker ("Usados Frecuentemente") ---
function trackPhraseUsage(text) {
  const now = Date.now();
  if (!state.phraseUsage[text]) {
    state.phraseUsage[text] = { count: 0, lastUsed: now };
  }
  state.phraseUsage[text].count += 1;
  state.phraseUsage[text].lastUsed = now;

  // Cleanup: remove entries older than 7 days without usage
  const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;
  Object.keys(state.phraseUsage).forEach(key => {
    if (now - state.phraseUsage[key].lastUsed > SEVEN_DAYS_MS) {
      delete state.phraseUsage[key];
    }
  });

  localStorage.setItem('vozzy_phrase_usage', JSON.stringify(state.phraseUsage));
  updateSmartCategoryData();
}

function getFrequentPhrases() {
  const entries = Object.entries(state.phraseUsage);
  // Qualifies if count >= 3
  const qualified = entries
    .filter(([_, data]) => data.count >= 3)
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 12)
    .map(([text, _]) => ({ text, icon: 'star' }));

  return qualified;
}

function updateSmartCategoryData() {
  const frequentCat = CATEGORIES.find(c => c.id === 'frequent');
  if (frequentCat) {
    frequentCat.phrases = getFrequentPhrases();
  }

  // Update badge on home screen
  const badgeEl = document.getElementById('smart-badge-count');
  if (badgeEl) {
    const count = frequentCat ? frequentCat.phrases.length : 0;
    badgeEl.textContent = `${count}`;
  }
}

// --- Theme Controller ---
function applyTheme(theme) {
  state.theme = theme;
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('vozzy_theme', theme);

  const themeBtn = document.getElementById('theme-toggle-btn');
  if (themeBtn) {
    themeBtn.innerHTML = theme === 'dark' ? SVG_ICONS.sun : SVG_ICONS.moon;
  }
}

function toggleTheme() {
  applyTheme(state.theme === 'light' ? 'dark' : 'light');
}

function applyColorTheme(themeName) {
  state.colorTheme = themeName;
  document.documentElement.setAttribute('data-color-theme', themeName);
  localStorage.setItem('vozzy_color_theme', themeName);

  document.querySelectorAll('.theme-swatch').forEach(btn => {
    if (btn.dataset.theme === themeName) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

// --- Navigation & Router ---
function navigateToHome() {
  state.currentCategory = null;
  document.getElementById('home-view').classList.remove('hidden');
  document.getElementById('category-view').classList.add('hidden');
  document.getElementById('custom-writer-view').classList.add('hidden');
  renderHomeScreen();
}

function openCategory(catId) {
  const category = CATEGORIES.find(c => c.id === catId);
  if (!category) return;

  state.currentCategory = category;

  if (category.isCustomWriter) {
    document.getElementById('home-view').classList.add('hidden');
    document.getElementById('category-view').classList.add('hidden');
    document.getElementById('custom-writer-view').classList.remove('hidden');
  } else {
    document.getElementById('home-view').classList.add('hidden');
    document.getElementById('custom-writer-view').classList.add('hidden');
    document.getElementById('category-view').classList.remove('hidden');
    renderCategoryScreen(category);
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// --- View Renderers ---
function renderHomeScreen() {
  // Greeting name
  const greetingEl = document.getElementById('user-greeting-name');
  if (greetingEl) {
    greetingEl.textContent = state.userName ? `Hola, ${state.userName}` : 'Hola';
  }

  updateSmartCategoryData();

  const gridContainer = document.getElementById('home-category-grid');
  gridContainer.innerHTML = '';

  CATEGORIES.forEach(cat => {
    const card = document.createElement('div');
    const colorClass = cat.color ? `cat-card-${cat.color}` : 'cat-card-purple';
    card.className = `card-item ${cat.isSmart ? 'smart-card' : ''} ${colorClass}`;
    card.setAttribute('data-color', cat.color || 'purple');
    card.onclick = () => openCategory(cat.id);

    let badgeHTML = '';
    if (cat.isSmart) {
      badgeHTML = `<span class="smart-badge" id="smart-badge-count">${cat.phrases.length}</span>`;
    }

    card.innerHTML = `
      ${badgeHTML}
      <div class="card-icon-wrapper" data-icon="${cat.icon}">
        <div class="card-icon">${SVG_ICONS[cat.icon] || SVG_ICONS.star}</div>
      </div>
      <div class="card-title">${cat.name}</div>
    `;
    gridContainer.appendChild(card);
  });
}

function renderCategoryScreen(category) {
  const titleEl = document.getElementById('category-title');
  const gridContainer = document.getElementById('category-phrases-grid');

  const catColor = category.color || 'purple';
  titleEl.className = 'section-title';
  titleEl.innerHTML = `
    <div class="category-header-badge cat-card-${catColor}" data-icon="${category.icon}">
      ${SVG_ICONS[category.icon] || ''}
    </div>
    <span>${category.name}</span>
  `;
  gridContainer.innerHTML = '';

  // Escribe tu mensaje Quick Access Card inside category
  const writerCard = document.createElement('div');
  writerCard.className = 'card-item smart-card cat-card-violet';
  writerCard.onclick = () => openCategory('custom_msg');
  writerCard.innerHTML = `
    <div class="card-icon-wrapper" data-icon="custom">
      <div class="card-icon">${SVG_ICONS.custom}</div>
    </div>
    <div class="card-title">Escribe tu mensaje</div>
  `;
  gridContainer.appendChild(writerCard);

  // If frequent category is empty
  if (category.isSmart && category.phrases.length === 0) {
    const emptyState = document.createElement('div');
    emptyState.style.gridColumn = '1 / -1';
    emptyState.style.textAlign = 'center';
    emptyState.style.padding = '40px 20px';
    emptyState.style.color = 'var(--text-muted)';
    emptyState.innerHTML = `
      <div style="font-size: 2.5rem; margin-bottom: 12px;">⭐</div>
      <h3 style="margin-bottom: 8px; color: var(--text-main);">Sin frases frecuentes aún</h3>
      <p style="font-size: 0.95rem; max-width: 400px; margin: 0 auto;">Aquí aparecerán automáticamente las frases que presiones 3 o más veces en la app.</p>
    `;
    gridContainer.appendChild(emptyState);
    return;
  }

  category.phrases.forEach(phrase => {
    const card = document.createElement('div');
    card.className = `card-item phrase-card cat-card-${catColor}`;
    card.onclick = () => speakText(phrase.text, card);

    const iconSVG = SVG_ICONS[phrase.icon] || SVG_ICONS.mic;

    card.innerHTML = `
      <div class="card-icon-wrapper" data-icon="${phrase.icon}">
        <div class="card-icon">${iconSVG}</div>
      </div>
      <div class="card-title">${phrase.text}</div>
    `;
    gridContainer.appendChild(card);
  });
}

// --- Welcome & User Profile Logic ---
function checkWelcomeFlow() {
  if (!state.welcomeDone) {
    document.getElementById('welcome-modal').classList.remove('hidden');
  } else if (!state.tutorialDone) {
    showTutorialModal();
  }
}

function saveWelcomeName() {
  const input = document.getElementById('welcome-name-input');
  const name = input.value.trim();
  state.userName = name;
  state.welcomeDone = true;
  localStorage.setItem('vozzy_username', name);
  localStorage.setItem('vozzy_welcome_done', 'true');

  document.getElementById('welcome-modal').classList.add('hidden');

  if (!state.tutorialDone) {
    showTutorialModal();
  } else {
    renderHomeScreen();
  }
}

function openProfileModal() {
  const nameInput = document.getElementById('profile-name-input');
  nameInput.value = state.userName;
  document.getElementById('profile-modal').classList.remove('hidden');
}

function saveProfile() {
  const nameInput = document.getElementById('profile-name-input');
  const newName = nameInput.value.trim();
  state.userName = newName;
  localStorage.setItem('vozzy_username', newName);

  document.getElementById('profile-modal').classList.add('hidden');
  renderHomeScreen();
}

function clearProfileName() {
  state.userName = '';
  localStorage.removeItem('vozzy_username');
  document.getElementById('profile-name-input').value = '';
  document.getElementById('profile-modal').classList.add('hidden');
  renderHomeScreen();
}

// --- Tutorial Carousel Logic ---
function showTutorialModal() {
  state.tutorialSlide = 0;
  updateTutorialSlide();
  document.getElementById('tutorial-modal').classList.remove('hidden');
}

function updateTutorialSlide() {
  const slides = [
    {
      title: 'Elige una categoría',
      desc: 'Explora frases organizadas por Casa, Doctor, Escuela, Comida y más.',
      svg: `<svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>`
    },
    {
      title: 'Toca un ícono y Vozzy habla',
      desc: 'Al presionar cualquier tarjeta, Vozzy la reproducirá en voz alta inmediatamente.',
      svg: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 2v4"/><path d="M12 18v4"/><path d="M4.93 4.93l2.83 2.83"/><path d="M16.24 16.24l2.83 2.83"/><path d="M2 12h4"/><path d="M18 12h4"/></svg>`
    },
    {
      title: 'Escribe lo que quieras decir',
      desc: 'Usa el teclado para escribir mensajes personalizados o usa frases rápidas.',
      svg: `<svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><line x1="9" y1="9" x2="15" y2="9"/><line x1="9" y1="13" x2="13" y2="13"/></svg>`
    }
  ];

  const current = slides[state.tutorialSlide];
  document.getElementById('slide-illu').innerHTML = current.svg;
  document.getElementById('slide-title').textContent = current.title;
  document.getElementById('slide-desc').textContent = current.desc;

  // Dots
  const dotsContainer = document.getElementById('tutorial-dots');
  dotsContainer.innerHTML = '';
  slides.forEach((_, idx) => {
    const dot = document.createElement('div');
    dot.className = `dot ${idx === state.tutorialSlide ? 'active' : ''}`;
    dot.onclick = () => {
      state.tutorialSlide = idx;
      updateTutorialSlide();
    };
    dotsContainer.appendChild(dot);
  });

  const nextBtn = document.getElementById('tutorial-next-btn');
  if (state.tutorialSlide === slides.length - 1) {
    nextBtn.textContent = 'Entendido, empezar';
  } else {
    nextBtn.textContent = 'Siguiente';
  }
}

function nextTutorialSlide() {
  if (state.tutorialSlide < 2) {
    state.tutorialSlide++;
    updateTutorialSlide();
  } else {
    state.tutorialDone = true;
    localStorage.setItem('vozzy_tutorial_done', 'true');
    document.getElementById('tutorial-modal').classList.add('hidden');
  }
}

// --- Settings Modal Logic ---
function openSettingsModal() {
  const speedSlider = document.getElementById('setting-rate');
  const pitchSlider = document.getElementById('setting-pitch');
  speedSlider.value = state.speechSettings.rate;
  pitchSlider.value = state.speechSettings.pitch;
  
  // Highlight active theme swatch
  document.querySelectorAll('.theme-swatch').forEach(btn => {
    if (btn.dataset.theme === state.colorTheme) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  document.getElementById('settings-modal').classList.remove('hidden');
}

function saveSettings() {
  const rate = parseFloat(document.getElementById('setting-rate').value);
  const pitch = parseFloat(document.getElementById('setting-pitch').value);
  state.speechSettings.rate = rate;
  state.speechSettings.pitch = pitch;
  localStorage.setItem('vozzy_speech_settings', JSON.stringify(state.speechSettings));
  document.getElementById('settings-modal').classList.add('hidden');
}

// --- Custom Text Writer Actions ---
function speakCustomWriterText() {
  const textarea = document.getElementById('custom-textarea');
  const text = textarea.value.trim();
  if (text) {
    speakText(text);
  }
}

function clearCustomWriterText() {
  document.getElementById('custom-textarea').value = '';
}

function appendQuickPhrase(phrase) {
  const textarea = document.getElementById('custom-textarea');
  if (textarea.value.trim().length > 0) {
    textarea.value += ' ' + phrase;
  } else {
    textarea.value = phrase;
  }
  speakText(phrase);
}

// --- PWA Installation Logic ---
function setupPWAInstall() {
  const installNavBtn = document.getElementById('nav-install-btn');
  const isStandalone = isAppStandalone();

  if (isStandalone) {
    console.log('[PWA] Running in standalone mode');
    if (installNavBtn) installNavBtn.classList.add('hidden');
    return;
  }

  // If running in browser mode (not installed PWA), show install button in header
  if (installNavBtn) {
    installNavBtn.classList.remove('hidden');
  }

  // Requisito 5: Solo mostrar si el dispositivo es iOS y NO está en modo standalone
  const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
  const iosModalDismissed = localStorage.getItem('vozzy_ios_modal_dismissed') === 'true';

  if (isIOS && !isStandalone && !iosModalDismissed) {
    setTimeout(() => {
      openInstallModal();
    }, 1500);
  }
}

function triggerAndroidInstall() {
  if (isAppStandalone()) return;

  if (state.deferredInstallPrompt) {
    state.deferredInstallPrompt.prompt();
    state.deferredInstallPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('[PWA] User accepted installation prompt');
        const installNavBtn = document.getElementById('nav-install-btn');
        if (installNavBtn) installNavBtn.classList.add('hidden');
      }
      state.deferredInstallPrompt = null;
    });
  } else {
    // Solo en iOS se muestra el modal explicativo de Safari; en Android y APK no aparece
    const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
    if (isIOS) {
      openInstallModal();
    }
  }
}

function openInstallModal() {
  const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
  const isStandalone = isAppStandalone();

  // Requisito 5: Solo se muestra si el dispositivo es iOS y la app NO está ya en modo standalone.
  // En Android y dentro del APK no debe aparecer.
  if (!isIOS || isStandalone) return;

  const modal = document.getElementById('ios-install-modal');
  if (!modal) return;

  const titleEl = modal.querySelector('.ios-app-title');
  const subtitleEl = modal.querySelector('.ios-app-subtitle');
  const stepsBox = modal.querySelector('.ios-steps-box');

  if (titleEl) titleEl.textContent = 'Descarga la APP de Vozzy';
  if (subtitleEl) subtitleEl.textContent = 'Instala Vozzy en tu iPhone o iPad en 3 simples pasos';

  if (stepsBox) {
    stepsBox.innerHTML = `
      <div class="ios-step-item">
        <div class="ios-step-num">1</div>
        <div>Toca el botón <strong>Compartir ⬆️</strong> en la barra inferior de Safari.</div>
      </div>
      <div class="ios-step-item">
        <div class="ios-step-num">2</div>
        <div>Desplázate y elige <strong>'Agregar a pantalla de inicio'</strong>.</div>
      </div>
      <div class="ios-step-item">
        <div class="ios-step-num">3</div>
        <div>Toca <strong>'Agregar'</strong> en la esquina superior derecha.</div>
      </div>
    `;
  }

  modal.classList.remove('hidden');
}

function closeIOSInstallModal() {
  localStorage.setItem('vozzy_ios_modal_dismissed', 'true');
  const modal = document.getElementById('ios-install-modal');
  if (modal) modal.classList.add('hidden');
}

// --- App Initialization ---
window.addEventListener('DOMContentLoaded', () => {
  // Apply saved theme & color theme
  applyTheme(state.theme);
  applyColorTheme(state.colorTheme);

  // Render initial icons into buttons
  document.getElementById('logo-icon-container').innerHTML = SVG_ICONS.mic;
  document.getElementById('theme-toggle-btn').innerHTML = state.theme === 'dark' ? SVG_ICONS.sun : SVG_ICONS.moon;
  document.getElementById('settings-toggle-btn').innerHTML = SVG_ICONS.settings;
  document.getElementById('profile-toggle-btn').innerHTML = SVG_ICONS.user;
  document.getElementById('back-to-home-btn').innerHTML = `${SVG_ICONS.back} <span>Inicio</span>`;
  document.getElementById('back-from-writer-btn').innerHTML = `${SVG_ICONS.back} <span>Inicio</span>`;
  document.getElementById('nav-install-btn').innerHTML = `${SVG_ICONS.download} <span>Instalar app</span>`;

  // Render home screen
  renderHomeScreen();

  // Service Worker Registration se gestiona en index.html al evento load

  // PWA logic
  setupPWAInstall();

  // Notify emergency.js (loaded after this script) that app is ready.
  // emergency.js listens for this event to run its patches and THEN
  // calls checkWelcomeFlow. We do NOT call checkWelcomeFlow here anymore.
  document.dispatchEvent(new CustomEvent('vozzy-app-ready'));
});
