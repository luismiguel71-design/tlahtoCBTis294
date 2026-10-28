# Vozzy - Tu voz, en un toque

**Vozzy** es una herramienta de Comunicación Aumentativa y Alternativa (CAA / AAC) diseñada como Progressive Web App (PWA) rápida, accesible y moderna para personas mudas o con dificultades del habla.

## Estructura del proyecto

```text
apps/
  web/                 # Fuente unica de la PWA: HTML, CSS, JS, fuentes e iconos
  mobile/              # Capacitor, configuracion y plataforma Android generada
experiments/
  expo/                # Prototipo Expo/React Native separado; no genera la APK actual
tools/
  icons/               # Herramientas para generar los iconos de la PWA
```

`apps/mobile/www` es una copia generada de `apps/web`: no edites esos archivos
directamente. La sincronizacion de Capacitor los vuelve a generar antes de
preparar Android.

---

## ✨ Características principales

- 🗣️ **Síntesis de voz instantánea (TTS):** Reproduce frases organizadas por categorías cotidianas con selección de voz, velocidad y tono personalizables.
- ✍️ **Redactor de mensajes libres:** Área de texto con frases rápidas y lectura en voz alta.
- 🚨 **Módulo de Emergencia SOS:** Llamadas al 911, SMS con GPS, ficha médica digital.
- 🎨 **Diseño adaptativo:** Temas de color, modo oscuro, animaciones fluidas.
- 📴 **100% Offline:** Funciona sin internet una vez instalada.

---

## 📴 Funcionamiento Offline (PWA)

La app usa un **Service Worker v5** con estrategia **Cache-First + Stale-While-Revalidate**:

- Todos los assets (HTML, CSS, JS, fuentes, íconos) se cachean en la primera visita.
- A partir de entonces, la app carga instantáneamente aunque no haya red.
- Si hay conexión, los archivos se actualizan en segundo plano automáticamente.
- Las fuentes Inter se cargan **localmente** desde `/fonts/` (sin Google Fonts).

---

## 📱 Cómo instalar Vozzy (sin conexión permanente)

### Android — Instalar como PWA (recomendado)
1. Abre Chrome y visita la URL de Vozzy.
2. Toca el menú ⋮ → **"Agregar a pantalla de inicio"** o **"Instalar app"**.
3. La app aparece en tu lanzador como una app nativa.

### Android — Instalar como APK nativo
Ver sección **"Generar APK Android"** más abajo.

### iOS / iPhone / iPad — Instalar como PWA
1. Abre **Safari** (obligatorio — Chrome no soporta instalación PWA en iOS).
2. Toca el botón **Compartir ⬆️** en la barra inferior.
3. Selecciona **"Agregar a pantalla de inicio"**.
4. Toca **"Agregar"** en la esquina superior derecha.
5. Vozzy aparece en tu pantalla de inicio como app nativa.

### Windows / macOS — Instalar como PWA
1. Abre Chrome/Edge y visita la URL de Vozzy.
2. Haz clic en el ícono de instalación en la barra de dirección.
3. La app se instala como aplicación de escritorio con ícono propio.

---

## 📲 Atajos de pantalla de inicio (Android)

Al mantener presionado el ícono de Vozzy en Android, aparecen atajos rápidos:
- **🚨 Emergencia SOS** — Abre directamente el panel de emergencias
- **✍️ Escribir mensaje** — Abre el redactor libre de texto

---

## 🔨 Generar APK Android (Capacitor)

### Requisitos previos
- [Node.js](https://nodejs.org) v18+
- [Android Studio](https://developer.android.com/studio) con SDK Android 14+
- JDK 17+

### Pasos rápidos (script automático)
```
Doble clic en Build_Android_APK.bat
```

### Pasos manuales
```bash
cd apps/mobile
npm ci
npm run add:android        # primera vez
npm run sync:android       # sincroniza la fuente apps/web
npx cap open android       # abre Android Studio
# En Android Studio: Build → Build APK(s)
```

El APK de debug estará en:
`apps/mobile/android/app/build/outputs/apk/debug/app-debug.apk`

### APK firmado (para publicar en Play Store)
En Android Studio: **Build → Generate Signed Bundle / APK**

---

## 🍎 Generar IPA iOS (Capacitor)

> Requiere una Mac con Xcode 15+ y una cuenta de desarrollador Apple.

```bash
cd apps/mobile
npm ci
npx cap add ios            # primera vez
npx cap sync ios           # sincroniza assets web
npx cap open ios           # abre Xcode
# En Xcode: Product → Archive → Distribute App
```

---

## 🚀 Despliegue en Vercel (PWA web)

1. Sube estos cambios a GitHub en la rama `main`.
2. Inicia sesión en [Vercel](https://vercel.com/) con GitHub y autoriza el acceso al repositorio `luismiguel71-design/tlahtoCBTis294`.
3. En Vercel, selecciona **Add New → Project** e importa `luismiguel71-design/tlahtoCBTis294`.
4. En la configuración del proyecto, establece **Root Directory** en `apps/web`.
5. Usa **Framework Preset: Other**. No agregues comando de build ni instales dependencias: Vozzy es una PWA estática y Vercel publicará los archivos directamente.
6. Pulsa **Deploy**. Vercel generará una URL pública y desplegará automáticamente los siguientes cambios que subas a GitHub.

El archivo `apps/web/vercel.json` ya configura encabezados para que el navegador no mantenga obsoleto el Service Worker. No elijas `apps/mobile` como directorio raíz: esa carpeta contiene Capacitor para compilar Android, no el sitio web.

## Prototipo Expo

El proyecto Expo anterior se conserva aparte en `experiments/expo`, con su
propio `package.json` y `app.json`. No participa en la compilacion de la APK
Capacitor. Para probarlo, ejecuta `npm install` y `npm run start` desde esa
carpeta.

---

## 🛠️ Tecnologías

| Capa | Tecnología |
|------|-----------|
| Frontend | HTML5, CSS3, JavaScript ES6+ (Vanilla) |
| Offline | Service Worker v5, Cache API (Cache-First) |
| Instalable | Web App Manifest v3 + Capacitor 6 |
| APIs | Web Speech API, Geolocation API, LocalStorage |
| Fuentes | Inter (local, sin CDN, 100% offline) |
| APK nativo | Capacitor 6 (Android + iOS) |
