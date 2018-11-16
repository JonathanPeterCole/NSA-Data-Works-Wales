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
			void disconnect();
		private:
			IPAddress _serverIP;
			String _serverIP;
			String _username;
			String _password;
			
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
		
		// Function overloading to support all datatypes
		void IOTLib::sendReading(String sensorName, String value) { sendReading(value) }
		void IOTLib::sendReading(String sensorName, int value) { sendReading(value) }
		void IOTLib::sendReading(String sensorName, long value) { sendReading(value) }
		void IOTLib::sendReading(String sensorName, float value) { sendReading(value) }
		
		void IOTLib::sendReading(String sensorName) {
			Serial.print("Sending reading");
		}
	};
	
#endif