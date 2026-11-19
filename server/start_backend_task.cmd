@echo off
set PATH=C:\Program Files\nodejs;%PATH%
cd /d "C:\Users\Tharaneesh.k\Downloads\Validation_engine\server"
set PORT=5001
set NODE_ENV=production
set MONGODB_URI=mongodb+srv://tharaneeshk07_db_user:i0EHpgSdEkKbDrJP@cluster1.ugmnlf6.mongodb.net
"C:\Program Files\nodejs\node.exe" server.js
