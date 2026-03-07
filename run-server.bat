@echo off
echo Starting Aqua Haven Swim Development Server...
echo Please wait while the server starts. A browser window should open automatically.
start http://localhost:8080
npx http-server -p 8080
IF %ERRORLEVEL% NEQ 0 (
    echo It seems 'npx' is not installed or failed. Trying Python's built-in server instead...
    start http://localhost:8000
    python -m http.server 8000
)
pause
