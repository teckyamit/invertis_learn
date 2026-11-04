@echo off
title Invertis Learn - Academic Resource Platform
color 0B
cd /d "%~dp0"

echo ===============================================================================
echo            INVERTIS LEARN - ACADEMIC COMPANION PLATFORM
echo                Invertis University, Bareilly
echo ===============================================================================
echo.

:: Check Node.js installation
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed or not found in system PATH.
    echo Please install Node.js from https://nodejs.org/ to run Invertis Learn.
    echo.
    pause
    exit /b 1
)

:: Check if node_modules exists
if not exist "node_modules\" (
    echo [SETUP] Installing project dependencies...
    call npm install
    if %errorlevel% neq 0 (
        echo [ERROR] Failed to install npm dependencies.
        pause
        exit /b 1
    )
)

:: Check if Prisma Client is generated
if not exist "node_modules\.prisma\client\" (
    echo [SETUP] Generating Prisma Client...
    call npx prisma generate
)

echo [READY] Starting Invertis Learn development server...
echo.
echo   * Local URL:  http://localhost:3000
echo   * Press Ctrl+C in this window anytime to stop the server.
echo.
echo ===============================================================================
echo.

:: Automatically open browser after 3 seconds in background
start "" cmd /c "timeout /t 3 /nobreak >nul & start http://localhost:3000"

:: Start the Next.js development server
call npm run dev

pause
