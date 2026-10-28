/* ==========================================================================
   VOZZY - emergency.js  v2.0
   Registro de datos de emergencia + botón SOS + panel SOS + ficha médica.

   ORDEN DE CARGA: este archivo se carga DESPUÉS de app.js.
   Se activa con el evento personalizado 'vozzy-app-ready' que app.js
   dispara al final de su DOMContentLoaded, garantizando que todas las
   funciones globales (state, renderHomeScreen, showTutorialModal, etc.)
   ya existen cuando este módulo los necesita.
   ========================================================================== */

/* -----------------------------------------------------------------------
   1. CONSTANTE DE CLAVE localStorage
   ----------------------------------------------------------------------- */
const EMERGENCY_KEY = 'vozzy_emergency';
const MEDICAL_DOCS_KEY = 'vozzy_medical_docs';
const MAX_DOC_SIZE_BYTES = 2 * 1024 * 1024; // 2 MB per file

/* -----------------------------------------------------------------------
   2. UTILIDADES GENERALES
   ----------------------------------------------------------------------- */

/**
 * Escapa caracteres HTML para evitar inyección al insertar datos
 * del usuario en el DOM con innerHTML.
 */
function escHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Limpia un número de teléfono eliminando espacios, guiones y paréntesis,
 * pero conservando el "+" inicial si existe.
 * @param {string} raw - Número crudo ingresado por el usuario.
 * @returns {string} Número limpio.
 */
function cleanPhone(raw) {
  if (!raw) return '';
  const str = String(raw);
  const hasPlus = str.trimStart().startsWith('+');
  const cleaned = str.replace(/[\s\-()]/g, '');
  return hasPlus ? '+' + cleaned.replace(/^\+/, '') : cleaned;
}

/**
 * Devuelve el objeto de datos de emergencia guardado, o null si no existe.
 * @returns {object|null}
 */
function getEmergencyData() {
  try {
    const raw = localStorage.getItem(EMERGENCY_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

/**
 * Persiste el objeto de emergencia en localStorage.
 * @param {object} data
 */
function saveEmergencyToStorage(data) {
  localStorage.setItem(EMERGENCY_KEY, JSON.stringify(data));
}

/* -----------------------------------------------------------------------
   2b. MEDICAL DOCUMENTS MANAGEMENT
   ----------------------------------------------------------------------- */

/** Temporary in-memory array used while the emergency form is open. */
let _pendingDocs = [];

/**
 * Returns stored medical documents array from localStorage.
 * Each doc: { id, name, type, dataUrl, addedAt }
 * @returns {Array}
 */
function getMedicalDocs() {
  try {
    const raw = localStorage.getItem(MEDICAL_DOCS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

/** Persists the docs array to localStorage. */
function saveMedicalDocs(docs) {
  try {
    localStorage.setItem(MEDICAL_DOCS_KEY, JSON.stringify(docs));
  } catch (e) {
    // localStorage quota exceeded — notify user
    alert('No hay espacio suficiente en el dispositivo para guardar más archivos. Elimina algún documento e intenta de nuevo.');
  }
}

/**
 * Reads a File object and returns a promise resolving to a data URL string.
 * @param {File} file
 * @returns {Promise<string>}
 */
function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

/**
 * Processes file(s) from the file input or drag-and-drop.
 * Validates type & size, reads as base64, adds to _pendingDocs, re-renders gallery.
 * @param {FileList} files
 */
async function processUploadedFiles(files) {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/bmp', 'application/pdf'];

  for (const file of files) {
    if (!allowedTypes.includes(file.type)) {
      alert(`"${file.name}" no es un tipo de archivo permitido. Solo se aceptan imágenes y PDF.`);
      continue;
    }
    if (file.size > MAX_DOC_SIZE_BYTES) {
      alert(`"${file.name}" excede el límite de 2 MB. Intenta con un archivo más pequeño.`);
      continue;
    }
    try {
      const dataUrl = await readFileAsDataUrl(file);
      _pendingDocs.push({
        id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
        name: file.name,
        type: file.type,
        dataUrl,
        addedAt: new Date().toISOString()
      });
    } catch (err) {
      console.error('Error reading file:', file.name, err);
    }
  }
  renderUploadGallery();
}

/**
 * Renders the thumbnail gallery of pending docs inside the emergency form.
 */
function renderUploadGallery() {
  const gallery = document.getElementById('ef-upload-gallery');
  if (!gallery) return;

  if (_pendingDocs.length === 0) {
    gallery.innerHTML = '';
    return;
  }

  gallery.innerHTML = _pendingDocs.map((doc, idx) => {
    const isPDF = doc.type === 'application/pdf';
    const thumbHTML = isPDF
      ? `<div class="ef-doc-thumb ef-doc-thumb-pdf">
           <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
             <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
             <polyline points="14 2 14 8 20 8"/>
             <line x1="16" y1="13" x2="8" y2="13"/>
             <line x1="16" y1="17" x2="8" y2="17"/>
             <polyline points="10 9 9 9 8 9"/>
           </svg>
           <span>PDF</span>
         </div>`
      : `<img class="ef-doc-thumb" src="${doc.dataUrl}" alt="${escHtml(doc.name)}">`;

    return `
      <div class="ef-doc-item" data-doc-idx="${idx}">
        <div class="ef-doc-preview" onclick="previewDocFromForm(${idx})">
          ${thumbHTML}
        </div>
        <div class="ef-doc-name" title="${escHtml(doc.name)}">${escHtml(doc.name)}</div>
        <button class="ef-doc-delete" onclick="removeUploadedDoc(${idx})" title="Eliminar" aria-label="Eliminar ${escHtml(doc.name)}">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
    `;
  }).join('');
}

/** Removes a doc from the pending list by index. */
function removeUploadedDoc(idx) {
  _pendingDocs.splice(idx, 1);
  renderUploadGallery();
}

/** Preview a doc from the upload form gallery. */
function previewDocFromForm(idx) {
  const doc = _pendingDocs[idx];
  if (doc) openDocViewer(doc);
}

/* -----------------------------------------------------------------------
   2c. FULL-SCREEN DOCUMENT VIEWER
   ----------------------------------------------------------------------- */

let _docViewerEscHandler = null;

/**
 * Opens the full-screen document viewer for a given doc object.
 * @param {{ name: string, type: string, dataUrl: string }} doc
 */
function openDocViewer(doc) {
  const modal = document.getElementById('doc-viewer-modal');
  const nameEl = document.getElementById('doc-viewer-name');
  const contentEl = document.getElementById('doc-viewer-content');
  const downloadLink = document.getElementById('doc-viewer-download');
  if (!modal || !contentEl) return;

  nameEl.textContent = doc.name;
  downloadLink.href = doc.dataUrl;
  downloadLink.download = doc.name;

  if (doc.type === 'application/pdf') {
    // Try to embed PDF; fallback to download link
    contentEl.innerHTML = `
      <object data="${doc.dataUrl}" type="application/pdf" class="doc-viewer-pdf">
        <div class="doc-viewer-fallback">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
          </svg>
          <p>No se puede previsualizar el PDF en este navegador.</p>
          <a href="${doc.dataUrl}" download="${escHtml(doc.name)}" class="btn btn-primary" style="margin-top:12px;">Descargar PDF</a>
        </div>
      </object>`;
  } else {
    contentEl.innerHTML = `<img src="${doc.dataUrl}" alt="${escHtml(doc.name)}" class="doc-viewer-img">`;
  }

  modal.classList.remove('hidden');
  _docViewerEscHandler = emAddEscListener(closeDocViewer);
}

/** Closes the full-screen document viewer. */
function closeDocViewer() {
  const modal = document.getElementById('doc-viewer-modal');
  if (!modal) return;
  if (_docViewerEscHandler) {
    document.removeEventListener('keydown', _docViewerEscHandler);
    _docViewerEscHandler = null;
  }
  modal.classList.add('hidden');
  document.getElementById('doc-viewer-content').innerHTML = '';
}

/* -----------------------------------------------------------------------
   2d. UPLOAD ZONE EVENT WIRING (called once from init)
   ----------------------------------------------------------------------- */

function _wireUploadZone() {
  const zone = document.getElementById('ef-upload-zone');
  const fileInput = document.getElementById('ef-file-input');
  if (!zone || !fileInput) return;

  // Click to open file picker
  zone.addEventListener('click', () => fileInput.click());
  zone.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fileInput.click(); }
  });

  // File input change
  fileInput.addEventListener('change', () => {
    if (fileInput.files.length) processUploadedFiles(fileInput.files);
    fileInput.value = ''; // reset so same file can be re-selected
  });

  // Drag & Drop
  zone.addEventListener('dragover', (e) => { e.preventDefault(); zone.classList.add('ef-upload-zone--dragover'); });
  zone.addEventListener('dragleave', () => zone.classList.remove('ef-upload-zone--dragover'));
  zone.addEventListener('drop', (e) => {
    e.preventDefault();
    zone.classList.remove('ef-upload-zone--dragover');
    if (e.dataTransfer.files.length) processUploadedFiles(e.dataTransfer.files);
  });
}

/* -----------------------------------------------------------------------
   3. GESTIÓN DE FOCO ACCESIBLE EN MODALES
   ----------------------------------------------------------------------- */

/**
 * Mueve el foco al primer elemento interactivo dentro del modal.
 * @param {string} modalId
 */
function emFocusModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  const focusable = modal.querySelector(
    'button:not([disabled]), [href], input:not([disabled]), ' +
    'select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
  );
  if (focusable) {
    // requestAnimationFrame garantiza que el modal sea visible antes de enfocar
    requestAnimationFrame(() => focusable.focus());
  }
}

/**
 * Registra un listener de Escape en el documento para cerrar un modal.
 * Devuelve la función handler para poder eliminarla después.
 * @param {Function} closeFn - Función que cierra el modal.
 * @returns {Function} handler listo para removeEventListener.
 */
function emAddEscListener(closeFn) {
  const handler = (e) => {
    if (e.key === 'Escape') closeFn();
  };
  document.addEventListener('keydown', handler);
  return handler;
}

/* -----------------------------------------------------------------------
   4. FORMULARIO DE REGISTRO DE EMERGENCIA
   ----------------------------------------------------------------------- */

// Referencia interna al callback post-guardado (p. ej. abrir tutorial)
let _efOnSaveCallback = null;
// Handler de Escape activo para el formulario
let _efEscHandler = null;

/**
 * Abre el modal de formulario de emergencia.
 * @param {Function|null} onSaveCallback - Se llama tras guardar con éxito.
 */
function openEmergencyForm(onSaveCallback) {
  const modal = document.getElementById('emergency-form-modal');
  if (!modal) return;

  _efOnSaveCallback = onSaveCallback || null;

  // Pre-rellenar con datos existentes si hay
  const data = getEmergencyData() || {};
  document.getElementById('ef-contact-name').value        = data.contactName       || '';
  document.getElementById('ef-contact-phone').value       = data.contactPhone      || '';
  document.getElementById('ef-relationship').value        = data.relationship      || '';
  document.getElementById('ef-blood-type').value          = data.bloodType         || '';
  document.getElementById('ef-allergies').value           = data.allergies         || '';
  document.getElementById('ef-conditions').value          = data.conditions        || '';
  document.getElementById('ef-medications').value         = data.medications       || '';
  document.getElementById('ef-how-to-communicate').value  = data.howToCommunicate  || '';

  // Load existing medical docs into pending array
  _pendingDocs = getMedicalDocs().slice(); // shallow copy
  renderUploadGallery();

  // Limpiar errores previos
  document.getElementById('ef-error-msg').textContent = '';

  // Botón Cancelar siempre visible
  const cancelBtn = document.getElementById('ef-close-btn');
  if (cancelBtn) {
    cancelBtn.style.display = '';
  }

  modal.classList.remove('hidden');
  emFocusModal('emergency-form-modal');

  // Listener Escape — siempre cierra el formulario
  _efEscHandler = emAddEscListener(() => {
    closeEmergencyForm();
  });
}

/** Cierra el formulario sin guardar. */
function closeEmergencyForm() {
  const modal = document.getElementById('emergency-form-modal');
  if (!modal) return;
  if (_efEscHandler) {
    document.removeEventListener('keydown', _efEscHandler);
    _efEscHandler = null;
  }
  modal.classList.add('hidden');
  const cb = _efOnSaveCallback;
  _efOnSaveCallback = null;
  if (typeof cb === 'function') {
    cb(null);
  }
}

/**
 * Valida y guarda el formulario de emergencia.
 * Llamado desde el botón "Guardar datos" en el HTML.
 */
function saveEmergencyForm() {
  const contactNameEl  = document.getElementById('ef-contact-name');
  const contactPhoneEl = document.getElementById('ef-contact-phone');
  const errorEl        = document.getElementById('ef-error-msg');

  const contactName  = contactNameEl.value.trim();
  const contactPhone = cleanPhone(contactPhoneEl.value);

  // --- Validación: nombre obligatorio ---
  if (!contactName) {
    errorEl.textContent = 'El nombre del contacto es obligatorio.';
    requestAnimationFrame(() => contactNameEl.focus());
    return;
  }

  // --- Validación: teléfono con al menos 10 dígitos ---
  const digitsOnly = contactPhone.replace(/^\+/, '').replace(/\D/g, '');
  if (digitsOnly.length < 10) {
    errorEl.textContent = 'El teléfono debe tener al menos 10 dígitos (sin espacios ni guiones).';
    requestAnimationFrame(() => contactPhoneEl.focus());
    return;
  }

  errorEl.textContent = '';

  // --- Guardar ---
  const data = {
    contactName,
    contactPhone,
    relationship:     document.getElementById('ef-relationship').value.trim(),
    bloodType:        document.getElementById('ef-blood-type').value.trim(),
    allergies:        document.getElementById('ef-allergies').value.trim(),
    conditions:       document.getElementById('ef-conditions').value.trim(),
    medications:      document.getElementById('ef-medications').value.trim(),
    howToCommunicate: document.getElementById('ef-how-to-communicate').value.trim(),
  };

  saveEmergencyToStorage(data);

  // Save medical documents
  saveMedicalDocs(_pendingDocs);

  // Guardar callback local antes de cerrarlo
  const cb = _efOnSaveCallback;
  _efOnSaveCallback = null;
  closeEmergencyForm();

  // Disparar evento personalizado (útil para extensibilidad futura)
  document.dispatchEvent(new CustomEvent('emergency-saved', { detail: data }));

  if (typeof cb === 'function') cb(data);
}

/* -----------------------------------------------------------------------
   5. VERIFICACIÓN DEL REGISTRO EN EL FLUJO DE BIENVENIDA
   ----------------------------------------------------------------------- */

/**
 * Comprueba si hay un registro de emergencia.
 * Si no hay, abre el formulario y pasa afterCallback como onSave.
 * Si ya hay, llama afterCallback directamente.
 * @param {Function} afterCallback
 */
function checkEmergencyRegistration(afterCallback) {
  if (!getEmergencyData()) {
    openEmergencyForm(afterCallback);
  } else {
    if (typeof afterCallback === 'function') afterCallback();
  }
}

/**
 * Flujo completo post-bienvenida:
 *   registro de emergencia → tutorial (si no hecho) → inicio.
 */
function runPostWelcomeFlow() {
  checkEmergencyRegistration(() => {
    // El registro está completo; ahora verificar tutorial
    if (localStorage.getItem('vozzy_tutorial_done') !== 'true') {
      if (typeof showTutorialModal === 'function') showTutorialModal();
    }
    // Si el tutorial ya está hecho, la home ya está renderizada.
  });
}

/* -----------------------------------------------------------------------
   6. PANEL SOS
   ----------------------------------------------------------------------- */

// Handler de Escape del panel SOS
let _sosEscHandler = null;

/**
 * Abre el panel SOS.
 * El panel SOS se abre SIEMPRE, con o sin datos guardados.
 */
function openSOSPanel() {
  const data = getEmergencyData();

  // Actualizar enlaces dinámicos (tel: y sms:), soporta data null o incompleto
  _renderSOSPanel(data);

  const panel = document.getElementById('sos-panel-modal');
  if (panel) {
    panel.classList.remove('hidden');
    emFocusModal('sos-panel-modal');
  }

  if (_sosEscHandler) {
    document.removeEventListener('keydown', _sosEscHandler);
    _sosEscHandler = null;
  }
  _sosEscHandler = emAddEscListener(closeSOSPanel);
}

/** Cierra el panel SOS y la ficha médica si está abierta. */
function closeSOSPanel() {
  const panel = document.getElementById('sos-panel-modal');
  if (!panel) return;
  if (_sosEscHandler) {
    document.removeEventListener('keydown', _sosEscHandler);
    _sosEscHandler = null;
  }
  panel.classList.add('hidden');
  closeMedCard();
}

/**
 * Actualiza los href y listeners del panel SOS con los datos guardados.
 * Funciona con data null o incompleto sin lanzar errores.
 * @param {object|null} data - Objeto de datos de emergencia.
 */
function _renderSOSPanel(data) {
  const phoneClean = data?.contactPhone ? cleanPhone(data.contactPhone) : '';
  const hasValidPhone = Boolean(phoneClean && phoneClean.replace(/\D/g, '').length >= 3);

  // 1. Botón de llamada al 911 — siempre visible y activo
  const btn911 = document.querySelector('.sos-action-911');
  if (btn911) {
    btn911.href = 'tel:911';
    btn911.classList.remove('hidden');
  }

  // 2. Botón de llamada de voz
  const callBtnOld = document.getElementById('sos-call-contact');
  if (callBtnOld) {
    const callBtnNew = callBtnOld.cloneNode(true);
    callBtnOld.parentNode.replaceChild(callBtnNew, callBtnOld);

    const subEl = callBtnNew.querySelector('.sos-action-sub');
    if (hasValidPhone) {
      callBtnNew.href = `tel:${phoneClean}`;
      if (subEl) {
        subEl.textContent = data?.contactName ? `(llamada a ${data.contactName}: ${phoneClean})` : `(${phoneClean})`;
      }
    } else {
      callBtnNew.href = '#';
      if (subEl) subEl.textContent = '(Sin contacto registrado)';
      callBtnNew.addEventListener('click', (e) => {
        e.preventDefault();
        closeSOSPanel();
        openEmergencyForm(() => openSOSPanel());
      });
    }
  }

  // 3. Botón SMS — usa un click handler para esperar geolocalización
  const smsBtnOld = document.getElementById('sos-sms-contact');
  if (smsBtnOld) {
    const smsBtnNew = smsBtnOld.cloneNode(true);
    smsBtnOld.parentNode.replaceChild(smsBtnNew, smsBtnOld);

    const smsSubEl = smsBtnNew.querySelector('.sos-action-sub');
    if (hasValidPhone) {
      smsBtnNew.href = '#';
      if (smsSubEl) {
        smsSubEl.textContent = data?.contactName ? `(SMS a ${data.contactName})` : '(SMS con mi ubicación)';
      }
      smsBtnNew.addEventListener('click', (e) => {
        e.preventDefault();
        _buildAndSendSMS(data);
      });
    } else {
      smsBtnNew.href = '#';
      if (smsSubEl) smsSubEl.textContent = '(Sin contacto registrado)';
      smsBtnNew.addEventListener('click', (e) => {
        e.preventDefault();
        closeSOSPanel();
        openEmergencyForm(() => openSOSPanel());
      });
    }
  }

  // 4. Botón de ficha médica — conserva SOLO el onclick="openMedCard()" del HTML
  const medBtn = document.getElementById('sos-med-card-btn');
  if (medBtn) {
    const medSubEl = medBtn.querySelector('.sos-action-sub');
    if (medSubEl) {
      medSubEl.textContent = !data
        ? '(Sin ficha registrada)'
        : '(tipo de sangre, alergias, condiciones)';
    }
  }
}

/**
 * Construye el URI sms: con o sin ubicación y navega a él.
 * - Intenta geolocalizar con un timeout de 4 segundos.
 * - Si falla o se deniega, envía el SMS sin coordenadas.
 * - Usa encodeURIComponent en el body.
 *
 * NOTA: La PWA no puede enviar el SMS automáticamente. Este enlace
 * abre la app de mensajes del sistema con el número y el texto ya escritos.
 * El usuario debe pulsar "Enviar" manualmente.
 */
function _buildAndSendSMS(data) {
  const phoneClean = cleanPhone(data.contactPhone);
  const userName   = localStorage.getItem('vozzy_username') || 'alguien';
  const baseMsg    = `EMERGENCIA: ${userName} necesita ayuda urgente y no puede hablar. Por favor llámame o ven por mí.`;

  function navigateSMS(locationStr) {
    const body = locationStr ? `${baseMsg} Ubicación: ${locationStr}` : baseMsg;
    // Formato sms: compatible con Android e iOS instaladas como PWA
    window.location.href = `sms:${phoneClean}?&body=${encodeURIComponent(body)}`;
  }

  if (!navigator.geolocation) {
    navigateSMS(null);
    return;
  }

  // Timeout manual de 4 s para no bloquear si el usuario niega el permiso
  let geoResolved = false;
  const geoTimeout = setTimeout(() => {
    if (!geoResolved) {
      geoResolved = true;
      navigateSMS(null);
    }
  }, 4000);

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      if (geoResolved) return;
      geoResolved = true;
      clearTimeout(geoTimeout);
      const lat = pos.coords.latitude.toFixed(6);
      const lng = pos.coords.longitude.toFixed(6);
      navigateSMS(`https://maps.google.com/?q=${lat},${lng}`);
    },
    () => {
      if (geoResolved) return;
      geoResolved = true;
      clearTimeout(geoTimeout);
      navigateSMS(null);
    },
    { timeout: 4000, maximumAge: 60000 }
  );
}

/** Abre el formulario de edición desde dentro del panel SOS. */
function editFromSOSPanel() {
  closeSOSPanel();
  openEmergencyForm(() => openSOSPanel());
}

/* -----------------------------------------------------------------------
   7. FICHA MÉDICA
   ----------------------------------------------------------------------- */

// Handler de Escape de la ficha médica
let _medEscHandler = null;

/**
 * Muestra la ficha médica con los datos guardados.
 * Solo renderiza los campos que tienen contenido.
 */
function openMedCard() {
  const data = getEmergencyData();
  if (!data) {
    if (confirm('No tienes una ficha médica registrada. ¿Deseas registrarla ahora?')) {
      closeSOSPanel();
      openEmergencyForm(() => openSOSPanel());
    }
    return;
  }

  const card = document.getElementById('med-card-modal');
  if (!card) return;

  // Campos que se muestran (en orden, con etiqueta legible)
  const FIELDS = [
    { label: 'Contacto de emergencia',     key: 'contactName' },
    { label: 'Teléfono',                   key: 'contactPhone' },
    { label: 'Parentesco',                 key: 'relationship' },
    { label: 'Tipo de sangre',             key: 'bloodType' },
    { label: 'Alergias / Medicamentos',    key: 'allergies' },
    { label: 'Condiciones / Discapacidad', key: 'conditions' },
    { label: 'Medicamentos actuales',      key: 'medications' },
    { label: 'Cómo comunicarse',           key: 'howToCommunicate' },
  ];

  // Filtrar solo campos con valor y construir HTML escapado
  const rowsHTML = FIELDS
    .filter(f => data[f.key] && data[f.key].trim() !== '')
    .map(f => `
      <div class="med-card-row">
        <div class="med-card-label">${escHtml(f.label)}</div>
        <div class="med-card-value">${escHtml(data[f.key])}</div>
      </div>
    `).join('');

  const bodyEl = document.getElementById('med-card-body');
  bodyEl.innerHTML = rowsHTML || '<p style="padding:16px;color:var(--text-muted);">No hay datos registrados.</p>';

  // Render uploaded medical documents
  const docsSection = document.getElementById('med-card-docs');
  const docs = getMedicalDocs();
  if (docsSection) {
    if (docs.length > 0) {
      const docsHTML = docs.map((doc, idx) => {
        const isPDF = doc.type === 'application/pdf';
        const thumbHTML = isPDF
          ? `<div class="mc-doc-thumb mc-doc-thumb-pdf">
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                 <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                 <polyline points="14 2 14 8 20 8"/>
                 <line x1="16" y1="13" x2="8" y2="13"/>
                 <line x1="16" y1="17" x2="8" y2="17"/>
               </svg>
               <span>PDF</span>
             </div>`
          : `<img class="mc-doc-thumb" src="${doc.dataUrl}" alt="${escHtml(doc.name)}">`;

        return `
          <div class="mc-doc-item" onclick="openDocViewerFromMedCard(${idx})">
            ${thumbHTML}
            <div class="mc-doc-name">${escHtml(doc.name)}</div>
          </div>
        `;
      }).join('');

      docsSection.innerHTML = `
        <div class="mc-docs-header">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
          </svg>
          <span>Documentos médicos (${docs.length})</span>
        </div>
        <div class="mc-docs-grid">${docsHTML}</div>
      `;
    } else {
      docsSection.innerHTML = '';
    }
  }

  card.classList.remove('hidden');
  emFocusModal('med-card-modal');

  _medEscHandler = emAddEscListener(closeMedCard);
}

/** Cierra la ficha médica. */
function closeMedCard() {
  const card = document.getElementById('med-card-modal');
  if (!card) return;
  if (_medEscHandler) {
    document.removeEventListener('keydown', _medEscHandler);
    _medEscHandler = null;
  }
  card.classList.add('hidden');
}

/** Opens the doc viewer from the medical card by reading stored docs. */
function openDocViewerFromMedCard(idx) {
  const docs = getMedicalDocs();
  if (docs[idx]) openDocViewer(docs[idx]);
}

/* -----------------------------------------------------------------------
   8. INICIALIZACIÓN: escuchar 'vozzy-app-ready' de app.js
   ----------------------------------------------------------------------- */

/**
 * Punto de entrada de este módulo.
 * Se ejecuta cuando app.js termina su inicialización y lanza el evento.
 */
document.addEventListener('vozzy-app-ready', () => {

  /* --- 8.1 Botón SOS en el header --- */
  const sosBtn = document.getElementById('sos-header-btn');
  if (sosBtn) {
    sosBtn.addEventListener('click', openSOSPanel);
  }

  /* --- 8.1b Wire medical document upload zone --- */
  _wireUploadZone();

  /* --- 8.2 Botón de emergencia en el perfil --- */
  const profileEmBtn = document.getElementById('profile-emergency-btn');
  if (profileEmBtn) {
    profileEmBtn.addEventListener('click', () => {
      // Cerrar perfil y abrir formulario de emergencia
      const profileModal = document.getElementById('profile-modal');
      if (profileModal) profileModal.classList.add('hidden');
      openEmergencyForm(null);
    });
  }

  /* --- 8.3 Parchear saveWelcomeName para insertar el paso de emergencia ---
       La función original en app.js cierra la bienvenida y llama a
       showTutorialModal() directamente. La reemplazamos para que
       primero muestre el formulario de emergencia.
  --- */
  window.saveWelcomeName = function () {
    // Replicar guardado del nombre (igual que en app.js original)
    const input = document.getElementById('welcome-name-input');
    const name = input ? input.value.trim() : '';

    // Actualizar state (definido en app.js, accesible globalmente)
    if (typeof state !== 'undefined') {
      state.userName    = name;
      state.welcomeDone = true;
    }
    localStorage.setItem('vozzy_username', name);
    localStorage.setItem('vozzy_welcome_done', 'true');

    // Cerrar bienvenida
    const welcomeModal = document.getElementById('welcome-modal');
    if (welcomeModal) welcomeModal.classList.add('hidden');

    // Actualizar saludo en header
    if (typeof renderHomeScreen === 'function') renderHomeScreen();

    // Nuevo flujo: registro → tutorial → inicio
    runPostWelcomeFlow();
  };

  /* --- 8.4 Iniciar flujo de bienvenida ---
       app.js ya NO llama a checkWelcomeFlow (lo eliminamos).
       Lo hacemos aquí, usando la lógica ampliada que incluye emergencias.
  --- */
  const welcomeDone  = localStorage.getItem('vozzy_welcome_done') === 'true';
  const tutorialDone = localStorage.getItem('vozzy_tutorial_done') === 'true';

  if (!welcomeDone) {
    // Primer uso: mostrar pantalla de bienvenida.
    // saveWelcomeName (parcheado arriba) se encarga del resto.
    const welcomeModal = document.getElementById('welcome-modal');
    if (welcomeModal) {
      welcomeModal.classList.remove('hidden');
      emFocusModal('welcome-modal');
    }
  } else {
    // Ya pasó la bienvenida: verificar si falta el registro de emergencia
    runPostWelcomeFlow();
  }
});
