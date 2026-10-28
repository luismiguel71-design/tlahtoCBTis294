@echo off
title Vozzy - Tu voz, en un toque
cd /d "%~dp0apps\web"

echo ============================================
echo        Iniciando Vozzy PWA
echo ============================================
echo.

:: 1. Intentar con Python si esta instalado
where python >nul 2>nul
if %ERRORLEVEL% equ 0 (
    echo [INFO] Iniciando servidor con Python en el puerto 8080...
    start "" "http://localhost:8080"
    python -m http.server 8080
    goto end
)

where py >nul 2>nul
if %ERRORLEVEL% equ 0 (
    echo [INFO] Iniciando servidor con Python Launcher en el puerto 8080...
    start "" "http://localhost:8080"
    py -m http.server 8080
    goto end
)

:: 2. Intentar con Node.js / npx
where npx >nul 2>nul
if %ERRORLEVEL% equ 0 (
    echo [INFO] Iniciando servidor con npx http-server...
    start "" "http://localhost:8080"
    npx -y http-server -p 8080
    goto end
)

:: 3. Modo directo (sin necesidad de instalar nada)
echo [INFO] Abriendo directamente en tu navegador web predeterminado...
start "" "%~dp0apps\web\index.html"

:end
