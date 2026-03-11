@echo off
echo Starting Socket.io Server...
cd backend
call venv\Scripts\activate
python socket_server.py
pause
