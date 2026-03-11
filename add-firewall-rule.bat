@echo off
echo Adding Windows Firewall rule for Socket.io server (port 8001)...
netsh advfirewall firewall add rule name="Dementia Care Socket Server" dir=in action=allow protocol=TCP localport=8001
echo.
echo Firewall rule added successfully!
echo The socket server on port 8001 should now be accessible from your mobile device.
pause
