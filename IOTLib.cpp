/*
  IOTLib.h - Library for communicating sensor readings to the IOT server
  Created by C1632962, November 16, 2018.
*/
#include "IOTLib.h"




// Constructor
IOTLib::IOTLib(const char *serverIP, const int &serverPort, const byte arduinoMacAddress[6], const int &ethernetPin) {
	// Ensure a serial output is setup (checking it's not already ready)
	if (!Serial) {
		Serial.begin(9600);
		while (!Serial) {
			; // wait for serial port to connect. Needed for native USB port only
		}
	}
	
	setupEthernetShield(arduinoMacAddress, ethernetPin);
	
	// Initialize the Ethernet client library
	// with the IP address and port of the server
	// that you want to connect to (port 80 is default for HTTP):
	EthernetClient ethernetClient;
	
	Serial.println("Connecting to server...");
	socketClient = &WebSocketClient(ethernetClient, serverIP, serverPort);
	socketClient->begin();
}


// Credit: https://github.com/arduino-libraries/Ethernet/blob/master/examples/WebClient/WebClient.ino
void IOTLib::setupEthernetShield(const byte arduinoMacAddress[6], const int &ethernetPin) {
	// Set the static IP address to use if the DHCP fails to assign
	const IPAddress ip(192, 168, 0, 177);
	const IPAddress myDns(192, 168, 0, 1);
	
	// Configure the CS pin
	Ethernet.init(ethernetPin);

	// Start the Ethernet connection:
	Serial.println("Initializing ethernet with DHCP...");
	if (Ethernet.begin(arduinoMacAddress) == 0) {
		Serial.println("Failed to configure Ethernet using DHCP");
		
		// Check for Ethernet hardware present
		if (Ethernet.hardwareStatus() == EthernetNoHardware) {
			Serial.println("Ethernet shield was not found.  Sorry, can't run without hardware. :(");
			while (true) {
				delay(1); // do nothing, no point running without Ethernet hardware
			}
		}
		
		// Check the ethernet cable is connected
		if (Ethernet.linkStatus() == LinkOFF) {
			Serial.println("Ethernet cable is not connected.");
		}

		// Try to congifure using IP address instead of DHCP:
		Ethernet.begin(arduinoMacAddress, ip, myDns);
	} else {
		Serial.print("DHCP assigned IP: ");
		Serial.println(Ethernet.localIP());
	}
	
	// Give the Ethernet shield a second to initialize:
	delay(1000);
}

// Function to format the websocket JSON to force Socket.IO to read it
String buildSocketIOString(String eventName, String stringPayload) {
	return '42["' + eventName + '", ' + stringPayload + ']';
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
	if (socketClient->connected()) {
		Serial.print("Sending reading...");
		
		socketClient->beginMessage(TYPE_TEXT);
		socketClient->print(buildSocketIOString("sensorReadings",    '"{"sensorID": "' + sensorID + '", "sensorValue": "' + sensorValue + '", "readingType": "' + readingType + '"}"')); // sprintf(buffer,"myNum=%d", myNum) has a HUGE overhead, concat this way is efficient
		socketClient->endMessage();
		
	} else {
		Serial.print("Failed to send reading, arduino is disconnected from server!");
	}
}