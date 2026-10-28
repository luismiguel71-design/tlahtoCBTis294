@echo off
title Vozzy - Abrir en Android Studio
cd /d "%~dp0apps\mobile"

echo ======================================================
echo           ABRIENDO VOZZY EN ANDROID STUDIO
echo ======================================================
echo.
if not exist "node_modules\@capacitor\cli" (
    echo [INFO] Instalando dependencias de Capacitor...
    call npm ci
    if errorlevel 1 goto error
)

if not exist "android\gradlew.bat" (
    echo [INFO] Creando el proyecto Android...
    call npx cap add android
    if errorlevel 1 goto error
)

echo [INFO] Sincronizando la app web...
call npm run sync:android
if errorlevel 1 goto error

echo Abriendo Android Studio...
call npx cap open android
if errorlevel 1 goto error
echo.
echo ======================================================
echo INSTRUCCIONES EN ANDROID STUDIO:
echo 1. Espera que termine de cargar abajo a la derecha.
echo 2. En el menu superior ve a:
echo    Build -^> Build Bundle(s) / APK(s) -^> Build APK(s)
echo 3. Cuando termine saldra un aviso abajo a la derecha,
echo    toca en "locate" para ver tu app-debug.apk listo.
echo ======================================================
echo.
pause
exit /b 0

:error
echo.
echo [ERROR] No se pudo preparar o abrir el proyecto Android.
pause
exit /b 1
