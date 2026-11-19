@echo off
set PATH=C:\Program Files\nodejs;%PATH%
cd /d "C:\Users\Tharaneesh.k\Downloads\Validation_engine\server"
set PORT=5001
set NODE_ENV=production
set MONGODB_URI=mongodb+srv://tharaneeshk07_db_user:i0EHpgSdEkKbDrJP@cluster1.ugmnlf6.mongodb.net
start "Validation Engine Backend" cmd /k "node server.js"
cd /d "C:\Users\Tharaneesh.k\Downloads\Validation_engine\client"
start "Validation Engine Frontend" cmd /k "npm run dev -- --host 0.0.0.0"
echo App launched.
echo Open http://localhost:5173
