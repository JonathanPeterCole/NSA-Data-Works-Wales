/*
  IOTLib.h - Library for communicating sensor readings to the IOT server
  Created by C1632962, November 16, 2018.
*/
#include "Arduino.h"
#include "IOTLib.h"
#include "WebSocketsClient.h"

WebSocketsClient webSocket;
bool isConnected = false;


// Constructor
IOTLib::IOTLib() {	
	// Ensure a serial output is setup
	if (!Serial) {
		Serial.begin(9600);
	}
}

// Callback function to handle messages from the websocket server
void webSocketEvent(WStype_t type, uint8_t * payload, size_t length) {
    switch(type) {
        case WStype_DISCONNECTED:
            Serial.print("Connection with server closed!");
            isConnected = false;
            break;
			
        case WStype_CONNECTED:
			Serial.print("Connected to server!");
			isConnected = true;
            break;
    }
}

// Func to connect to the webserver or keep the WebSocket active
void IOTLib::loop(const char *serverIP, int serverPort, const char *username, const char *password) {
	if (isConnected) {
		webSocket.loop(); // Used to keep webSocket working, must be called every loop() iteration
		
	} else {
		Serial.print("Connecting...");
		webSocket.beginSSL(serverIP, serverPort);
		webSocket.setAuthorization(username, password); // Basic HTTP authentication
		webSocket.setReconnectInterval(5000); // Auto-reconnect interval if the connection drops
	}
}

// Terminate the connection with the server
void IOTLib::disconnect() {
	Serial.print("Disconnecting from server...");
	webSocket.disconnect();
}

// Function to format the websocket JSON to force Socket.IO to read it
void sendSocketIOString(String eventName, String stringPayload) {
	webSocket.sendTXT('42["' + eventName + '", ' + stringPayload + ']');
}

// Simple functions to auto-format readings
void IOTLib::sendOtherReading(String sensorID, String value) { sendReading(sensorID, String(value), IOTLib::OTHER); }
void IOTLib::sendButtonReading(String sensorID, int value) { sendReading(sensorID, String(value), IOTLib::BUTTON); }
void IOTLib::sendDialReading(String sensorID, float value) { sendReading(sensorID, String(value), IOTLib::DIAL); }
void IOTLib::sendTemperatureReading(String sensorID, float value) { sendReading(sensorID, String(value), IOTLib::TEMPERATURE); }
void IOTLib::sendLightReading(String sensorID, float value) { sendReading(sensorID, String(value), IOTLib::LIGHT); }
void IOTLib::sendNoiseReading(String sensorID, float value) { sendReading(sensorID, String(value), IOTLib::NOISE); }

// Function to parse reading into JSON string and send to server
void IOTLib::sendReading(String sensorID, String sensorValue, int readingType) {
	Serial.print("Sending reading");
	
	// sprintf(buffer,"My num is: %d",myNum) has a HUGE overhead ;(  Unfortunately have to concat strings like this:
	sendSocketIOString("sensorReadings", '"{"sensorID": "' + sensorID + '", "sensorValue": "' + sensorValue + '", "readingType": "' + readingType + '"}"');
}