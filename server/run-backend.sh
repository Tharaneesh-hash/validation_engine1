#!/bin/sh
export PATH="/c/Program Files/nodejs:$PATH"
export PORT=5001
export NODE_ENV="production"
export MONGODB_URI="mongodb+srv://tharaneeshk07_db_user:i0EHpgSdEkKbDrJP@cluster1.ugmnlf6.mongodb.net"
cd "/c/Users/Tharaneesh.k/Downloads/Validation_engine/server"
"/c/Program Files/nodejs/node.exe" server.js
