const fs = require('fs');
const path = require('path');

const srcDir = path.resolve(__dirname, '..', 'web');
const destDir = path.resolve(__dirname, 'www');

const filesToCopy = [
  'index.html',
  'app.js',
  'emergency.js',
  'style.css',
  'manifest.json',
  'sw.js'
];

const dirsToCopy = ['fonts', 'icons'];

if (!fs.existsSync(srcDir)) {
  throw new Error(`No se encontro el codigo web en: ${srcDir}`);
}

fs.rmSync(destDir, { recursive: true, force: true });
fs.mkdirSync(destDir, { recursive: true });

filesToCopy.forEach((file) => {
  const src = path.join(srcDir, file);
  const dest = path.join(destDir, file);
  if (!fs.existsSync(src)) {
    throw new Error(`Falta un archivo web requerido: ${src}`);
  }

  fs.copyFileSync(src, dest);
  console.log(`[OK] Copiado: ${file}`);
});

dirsToCopy.forEach((dir) => {
  const src = path.join(srcDir, dir);
  const dest = path.join(destDir, dir);
  if (!fs.existsSync(src)) {
    throw new Error(`Falta un directorio web requerido: ${src}`);
  }

  fs.cpSync(src, dest, { recursive: true });
  console.log(`[OK] Copiado directorio: ${dir}`);
});

console.log('Sincronizacion de www completada con exito.');
