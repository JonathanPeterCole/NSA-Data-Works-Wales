/*
  IOTLib.h - Library for communicating sensor readings to the IOT server
  Created by C1632962, November 16, 2018.
*/
#include "Arduino.h"
#include "IOTLib.h"
#include "WebSocketsClient.h"

// Constructor
IOTLib::IOTLib() {
	// Ensure a serial output is setup
	if (!Serial) {
		Serial.begin(9600);
	}
}

// Func to connect to the webserver
void IOTLib::connect(IPAddress serverIP, String username, String password) {
	_serverIP = serverIP;
	_username = username;
	_password = password;
	
	delay(250);
	Serial.print("Connecting...");
}

// Terminate the connection with the server

void IOTLib::disconnect() {
	Serial.print("Disconnected");
}



void IOTLib::sendOtherReading(String sensorID, String value) { sendReading(sensorID, String(value), ReadingType.OTHER }
void IOTLib::sendButtonReading(String sensorID, int value) { sendReading(sensorID, String(value), ReadingType.BUTTON }
void IOTLib::sendTemperatureReading(String sensorID, float value) { sendReading(sensorID, String(value), ReadingType.TEMPERATURE }
void IOTLib::sendLightReading(String sensorID, float value) { sendReading(sensorID, String(value), ReadingType.LIGHT }
void IOTLib::sendNoiseReading(String sensorID, float value) { sendReading(sensorID, String(value), ReadingType.NOISE }


void IOTLib::sendReading(String sensorID, String sensorValue, ReadingType readingType) {
	Serial.print("Sending reading");
}