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
        void sendTemperature(int sensorID, int reading);
    private:
        String _auth;
        void submitReading(String type, int sensorID, int reading);
        void sendData(String data);
};

#endif