
@echo off
cls
color 0F
title IOTLib installer

echo Running installation...
echo.

SET libFolder=%UserProfile%\My Documents\Arduino\libraries\IOTLib

IF EXIST "%libFolder%" GOTO :AlreadyExists

:BeginInstall
echo Installing to %libFolder%:
xcopy "%~dp0library.json" /y "%libFolder%\"
xcopy "%~dp0library.properties" /y "%libFolder%\"
xcopy "%~dp0src" /e/y "%libFolder%\src\"

echo.
echo Installation finished, press any key to close...

pause>nul
exit


:AlreadyExists
set /p promptAnswer=IOTLib has been installed before, replace/update (y/n)? 

IF /I "%promptAnswer%" EQU "y" (
	echo Cleaning previous installations...
	rmdir "%libFolder%" /s /q
	echo.
	GOTO :BeginInstall
)

GOTO :BeginInstall
