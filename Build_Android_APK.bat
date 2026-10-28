@echo off
title Vozzy - Generador de APK Android
cd /d "%~dp0apps\mobile"

echo ======================================================
echo           VOZZY - GENERADOR DE APK ANDROID
echo ======================================================
echo.

:: 1. Verificar Node.js
where node >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo [ERROR] Node.js no esta instalado.
    echo Por favor descargalo e instalalo desde: https://nodejs.org
    echo.
    pause
    exit /b 1
)

:: 1. Verificar dependencias de Capacitor
echo [1/3] Verificando dependencias de Capacitor...
if not exist "node_modules\@capacitor\cli" (
    echo [INFO] Instalando paquetes de Capacitor...
    call npm ci
    if errorlevel 1 (
        echo [ERROR] Fallo la instalacion de paquetes npm.
        pause
        exit /b 1
    )
) else (
    echo [OK] Dependencias de Capacitor ya estan listas.
)

:: 2. Verificar plataforma Android
echo [2/3] Verificando plataforma Android...
if not exist "android" (
    echo [INFO] Creando plataforma Android nativa...
    call npx cap add android
    if errorlevel 1 (
        echo [ERROR] No se pudo agregar la plataforma Android.
        pause
        exit /b 1
    )
) else (
    echo [OK] Proyecto nativo Android existente.
)

:: 3. Sincronizar la web y los plugins con Android
echo [3/3] Sincronizando con el proyecto Android...
call npm run sync:android
if errorlevel 1 (
    echo [ERROR] Fallo al sincronizar assets con Android.
    pause
    exit /b 1
)
echo [OK] Sincronizacion completada con exito!
echo.

:: Menu de opciones
echo ======================================================
echo                 OPCIONES DE COMPILACION
echo ======================================================
echo  1. Abrir en Android Studio (Recomendado: compilar o firmar)
echo  2. Generar APK Debug directo por consola (requiere JDK)
echo  3. Salir (el proyecto Android ya quedo actualizado)
echo ======================================================
echo.
set /p OPCION="Selecciona una opcion (1, 2 o 3): "

if "%OPCION%"=="1" (
    echo.
    echo [INFO] Abriendo Android Studio...
    call npx cap open android
    echo.
    echo [GUIA] Una vez abierto Android Studio:
    echo        1. Espera que Gradle termine de sincronizar
    echo        2. Ve a Build ^> Build Bundle(s) / APK(s) ^> Build APK(s)
    echo        3. En la notificacion inferior toca 'locate' para ver tu APK
) else if "%OPCION%"=="2" (
    echo.
    echo [INFO] Compilando APK Debug con Gradle...
    if exist "android\gradlew.bat" (
        cd android
        call gradlew.bat assembleDebug
        if %ERRORLEVEL% equ 0 (
            echo.
            echo ======================================================
            echo  [EXITO] APK generado exitosamente en:
            echo  "%~dp0apps\mobile\android\app\build\outputs\apk\debug\app-debug.apk"
            echo ======================================================
        ) else (
            echo.
            echo [AVISO] La compilacion por linea de comandos fallo.
            echo Esto ocurre comunmente si no tienes la variable JAVA_HOME o Android SDK en PATH.
            echo Te recomendamos usar la Opcion 1 para abrirlo en Android Studio.
        )
        cd ..
    ) else (
        echo [ERROR] No se encontro gradlew.bat en apps\mobile\android.
    )
) else (
    echo Saliendo...
)

echo.
pause
