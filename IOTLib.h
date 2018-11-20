/*
  IOTLib.h - Library for communicating sensor readings to the IOT server
  Created by C1632962, November 16, 2018.
*/
#ifndef IOTLib_h

	#define IOTLib_h
	#include "Arduino.h"
	#include "WebSocketsClient.h"

	
	
	class IOTLib
	{
		public:
			IOTLib();
			
			bool isConnected;
			void loop(const char *serverIP, int serverPort, const char *username, const char *password);
			void disconnect();
			
			void sendOtherReading(String sensorID, String value);
			void sendButtonReading(String sensorID, int value);
			void sendTemperatureReading(String sensorID, float value);
			void sendLightReading(String sensorID, float value);
			void sendNoiseReading(String sensorID, float value);
			void sendDialReading(String sensorID, float value);

			
		private:			
			WebSocketsClient webSocket;
			
			enum ReadingType {
				OTHER = 0,
				BUTTON = 1,
				TEMPERATURE = 2,
				LIGHT = 3,
				NOISE = 4,
				DIAL = 5,
			};
			static IOTLib::ReadingType IOTLib::readingType;
			
			void sendSocketIOString(String eventName, String stringPayload);
			
			void sendReading(String sensorID, String sensorValue, int readingType);
	};
	
#endif