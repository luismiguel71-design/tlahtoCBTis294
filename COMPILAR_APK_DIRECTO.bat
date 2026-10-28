@echo off
title Vozzy - Compilar APK Android
cd /d "%~dp0apps\mobile"

echo ======================================================
echo           COMPILANDO APK ANDROID DE VOZZY
echo ======================================================
echo.

if not exist "node_modules\@capacitor\cli" (
    echo [INFO] Instalando dependencias de Capacitor...
    call npm ci
    if errorlevel 1 (
        echo [ERROR] No se pudieron instalar las dependencias.
        pause
        exit /b 1
    )
)

if not exist "android\gradlew.bat" (
    echo [INFO] Creando el proyecto Android...
    call npx cap add android
    if errorlevel 1 (
        echo [ERROR] No se pudo crear el proyecto Android.
        pause
        exit /b 1
    )
)

echo [INFO] Sincronizando el contenido web...
call npm run sync:android
if errorlevel 1 (
    echo [ERROR] No se pudo sincronizar el proyecto Android.
    pause
    exit /b 1
)

echo [INFO] Generando APK con Gradle (esto puede tardar 1 o 2 minutos la primera vez)...
echo.
pushd android
call gradlew.bat assembleDebug
set BUILD_RESULT=%ERRORLEVEL%
popd

if %BUILD_RESULT% equ 0 (
    echo.
    echo ======================================================
    echo  [EXITO!] EL APK FUE GENERADO CORRECTAMENTE
    echo ======================================================
    echo.
    echo Ubicacion del archivo:
    echo "%~dp0apps\mobile\android\app\build\outputs\apk\debug\app-debug.apk"
    echo.
    echo Abriendo la carpeta donde esta el APK para que te lo pases al celular...
    explorer "%~dp0apps\mobile\android\app\build\outputs\apk\debug"
) else (
    echo.
    echo ======================================================
    echo  [AVISO] No se pudo compilar por linea de comandos.
    echo ======================================================
    echo Esto pasa si tu sistema no tiene configurado Java JDK en el PATH.
    echo.
    echo Solucion facil:
    echo Vamos a abrir el proyecto en Android Studio para que lo compile con 1 clic.
    echo.
    pause
    call npx cap open android
)

echo.
pause
