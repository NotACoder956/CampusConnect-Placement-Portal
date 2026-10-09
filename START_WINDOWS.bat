@echo off
cd /d "%~dp0"
echo CampusConnect setup
node --version
if errorlevel 1 pause & exit /b 1
call npm install
call npm run install:all
call npm run seed
call npm run dev
pause
