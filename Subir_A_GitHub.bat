@echo off
title Vozzy - Subiendo cambios a GitHub
cd /d "%~dp0"

echo ======================================================
echo      SUBIENDO CAMBIOS A GITHUB (luismiguel71-design/tlahtoCBTis294)
echo ======================================================
echo.

:: Asegurar la URL remota exacta
git remote set-url origin https://github.com/luismiguel71-design/tlahtoCBTis294.git

echo [1/3] Preparando archivos modificados (git add)...
git add .

echo [2/3] Creando commit...
git commit -m "feat: offline PWA con Service Worker v5 y soporte para Capacitor APK"

echo [3/3] Enviando a https://github.com/luismiguel71-design/tlahtoCBTis294.git...
git push origin main
if %ERRORLEVEL% equ 0 (
    echo.
    echo ======================================================
    echo  [EXITO] Cambios subidos correctamente a GitHub!
    echo ======================================================
) else (
    echo.
    echo Intentando push a la rama por defecto...
    git push -u origin HEAD
)

echo.
pause
