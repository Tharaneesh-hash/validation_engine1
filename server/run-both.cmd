@echo off
set PATH=C:\Program Files\nodejs;%PATH%
start "Backend" cmd /k "cd /d "C:\Users\Tharaneesh.k\Downloads\Validation_engine\server" && set PORT=5000 && set NODE_ENV=production && set MONGODB_URI=mongodb+srv://tharaneeshk07_db_user:i0EHpgSdEkKbDrJP@cluster1.ugmnlf6.mongodb.net && "C:\Program Files\nodejs\node.exe" server.js"
start "Frontend" cmd /k "cd /d "C:\Users\Tharaneesh.k\Downloads\Validation_engine\client" && "C:\Program Files\nodejs\npm.cmd" run dev -- --host 0.0.0.0"
echo Started backend and frontend.
echo Visit http://localhost:5173
