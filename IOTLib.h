/*
  IOTLib.h - Library for communicating sensor readings to the IOT server
  Created by C1632962, November 16, 2018.
*/
#ifndef IOTLib_h

	#define IOTLib_h
	#include "Arduino.h"

	class IOTLib
	{
		public:
			IOTLib();
			void connect();
			void disconnect();
			
			void sendOtherReading(String sensorID, String value)
			void sendButtonReading(String sensorID, int value)
			void sendTemperatureReading(String sensorID, float value)
			void sendLightReading(String sensorID, float value)
			void sendNoiseReading(String sensorID, float value)

			
		private:
			IPAddress _serverIP;
			String _serverIP;
			String _username;
			String _password;
			
			enum ReadingType {
				OTHER = 0,
				BUTTON = 1,
				TEMPERATURE = 2,
				LIGHT = 3,
				NOISE = 4,
			};
			void sendReading(String sensorID, String sensorValue, ReadingType readingType)
	};
	
#endif