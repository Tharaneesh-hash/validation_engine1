@echo off
title Validation Engine - Backend Server
cd /d "%~dp0server"
set PORT=5000
set NODE_ENV=development
set PATH=C:\Program Files\nodejs;%PATH%
"C:\Program Files\nodejs\node.exe" server.js
pause
