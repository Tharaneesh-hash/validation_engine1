@echo off
echo ========================================================
echo   Starting Validation Engine (Backend + Frontend)
echo ========================================================
start "Validation Engine Backend (Port 5000)" cmd /k "cd /d ""%~dp0server"" && npm run dev"
timeout /t 3 /nobreak >nul
start "Validation Engine Frontend (Port 5173)" cmd /k "cd /d ""%~dp0client"" && npm run dev"
echo Backend running on http://localhost:5000
echo Frontend running on http://localhost:5173
echo ========================================================
