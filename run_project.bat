@echo off
title Web Form Input Validation Engine Launcher
echo ========================================================
echo  Starting Web Form Input Validation Engine (Regex & DFA)
echo ========================================================
echo.
echo Starting Backend Server on port 5000...
start "Validation Engine - Backend" cmd /k "cd /d ""%~dp0server"" && set PORT=5000 && set NODE_ENV=development && ""C:\Program Files\nodejs\node.exe"" server.js"

timeout /t 2 /nobreak >nul

echo Starting Frontend Dev Server on port 5173...
start "Validation Engine - Frontend" cmd /k "cd /d ""%~dp0client"" && ""C:\Program Files\nodejs\npm.cmd"" run dev"

echo.
echo ========================================================
echo  Application is launching!
echo  Backend Health : http://localhost:5000/api/health
echo  Frontend UI    : http://localhost:5173
echo ========================================================
echo.
pause
