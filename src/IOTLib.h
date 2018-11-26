/*
  IOTLib.h - Library for communicating sensor readings to the IOT server
  Created by C1632962, November 16, 2018.
*/
#ifndef IOTLib_h

	#define IOTLib_h
	#include "Arduino.h"
	#include "Ethernet.h"
	// #include "WiFi101.h"
	#include "ArduinoHttpClient.h"
	
	class IOTLib
	{
		public:
			IOTLib(const char *serverIP, const int &serverPort, uint8_t arduinoMacAddress[], const int &ethernetPin);
			// IOTLib(const char *serverIP, const int &serverPort, const char *wifiSSID, const char *wifiPassword);

			void sendOtherReading(String sensorID, String value);
			void sendButtonReading(String sensorID, int value);
			void sendTemperatureReading(String sensorID, float value);
			void sendLightReading(String sensorID, float value);
			void sendNoiseReading(String sensorID, float value);
			void sendDialReading(String sensorID, float value);

			
		private:
			EthernetClient ethernetClient; // Initialize the Ethernet client library
			// WiFiClient wifiClient; // Initialize the WiFi client library
			WebSocketClient *socketClient; // Create pointer to WebSocketClient data type to allow it to be created later in the IOTLib constructor with server details after EthernetShield is initiated
			
			void initializeLib();
			
			void setupEthernetShield(uint8_t arduinoMacAddress[], const int &ethernetPin);
			
			enum ReadingType {
				OTHER = 0,
				BUTTON = 1,
				TEMPERATURE = 2,
				LIGHT = 3,
				NOISE = 4,
				DIAL = 5,
			};
			static IOTLib::ReadingType readingType;
			
			String sendSocketIOString(const String &eventName, const String &stringPayload);
			
			void sendReading(const String &sensorID, const String &sensorValue, const ReadingType &readingType);
	};
	
#endif