/*
  DataWorksUSB.h - Library for sending sensor readings to Data Works via USB.
  Created by IOT Team 6, December 6, 2018.
*/

#ifndef DataWorksUSB_h
#define DataWorksUSB_h

#include "Arduino.h"
#include "HardwareSerial.h"

class DataWorksUSB
{
    public:
        DataWorksUSB();
        void connect(String username, String password);
        void sendButtonReading(int sensorID, int value);
        void sendTemperatureReading(int sensorID, float value);
        void sendLightReading(int sensorID, float value);
        void sendNoiseReading(int sensorID, float value);
        void sendDialReading(int sensorID, float value);
        void sendMoistureReading(int sensorID, float value);
        void sendReading(int sensorID, String type, float value);

    private:
        String _auth;
        void submitReading(String type, int sensorID, String reading);
        void sendData(String data);
};

#endif