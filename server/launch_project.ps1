$env:PATH = 'C:\Program Files\nodejs;' + $env:PATH
$env:PORT = '5001'
$env:NODE_ENV = 'production'
$env:MONGODB_URI = 'mongodb+srv://tharaneeshk07_db_user:i0EHpgSdEkKbDrJP@cluster1.ugmnlf6.mongodb.net'
Set-Location 'C:\Users\Tharaneesh.k\Downloads\Validation_engine\server'
Start-Process -FilePath 'C:\Program Files\nodejs\node.exe' -ArgumentList 'server.js' -WorkingDirectory 'C:\Users\Tharaneesh.k\Downloads\Validation_engine\server'
Set-Location 'C:\Users\Tharaneesh.k\Downloads\Validation_engine\client'
Start-Process -FilePath 'C:\Program Files\nodejs\npm.cmd' -ArgumentList 'run','dev','--','--host','0.0.0.0' -WorkingDirectory 'C:\Users\Tharaneesh.k\Downloads\Validation_engine\client'
Write-Host 'Open http://localhost:5173'
