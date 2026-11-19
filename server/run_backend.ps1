$env:PATH = 'C:\Program Files\nodejs;' + $env:PATH
$env:PORT='5000'
$env:NODE_ENV='production'
$env:MONGODB_URI='mongodb+srv://tharaneeshk07_db_user:i0EHpgSdEkKbDrJP@cluster1.ugmnlf6.mongodb.net'
Set-Location 'C:\Users\Tharaneesh.k\Downloads\Validation_engine\server'
& 'C:\Program Files\nodejs\node.exe' server.js
