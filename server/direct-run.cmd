@echo off
set PATH=C:\Program Files\nodejs;%PATH%
cd /d "C:\Users\Tharaneesh.k\Downloads\Validation_engine\server"
set NODE_ENV=production
MONGODB_USERNAME="tharaneeshk07_db_user"
MONGODB_PASSWORD="i0EHpgSdEkKbDrJP"
MONGODB_URI="mongodb+srv://tharaneeshk07_db_user:i0EHpgSdEkKbDrJP@cluster1.ugmnlf6.mongodb.net"
PORT=5000
"C:\Program Files\nodejs\node.exe" server.js
