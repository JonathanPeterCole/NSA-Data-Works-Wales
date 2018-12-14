/*
  DataWorksUSB.cpp - Library for sending sensor readings to Data Works via USB.
  Created by IOT Team 6, December 6, 2018.
*/

#include "DataWorksUSB.h"

DataWorksUSB::DataWorksUSB()
{
    ;
}

void DataWorksUSB::connect(String username, String password)
{
    // Wait for the serial to be ready
    while (!Serial) {
        ;
    }
    // Store authentication details in a variable
    _auth = "\"auth\":{\"username\":\"" + username + "\", \"password\":\"" + password + "\"}";
    // Send authentication details to dataworks
    Serial.println("{\"dataworks\":{\"connect\":true, " + _auth + "}}");
    // Wait to recieve 'okay' from Data Works USB Link
    bool connected = false;
    while(!connected){
        if (Serial.readString().indexOf("okay") >= 0) {
            connected = true;
        }
    }
}

void DataWorksUSB::sendButtonReading(int sensorID, int reading)
{
    submitReading("button", sensorID, String(reading));
}

void DataWorksUSB::sendTemperatureReading(int sensorID, float reading)
{
    submitReading("temperature", sensorID, String(reading));
}

void DataWorksUSB::sendLightReading(int sensorID, float reading)
{
    submitReading("light", sensorID, String(reading));
}

void DataWorksUSB::sendNoiseReading(int sensorID, float reading)
{
    submitReading("noise", sensorID, String(reading));
}

void DataWorksUSB::sendDialReading(int sensorID, float reading)
{
    submitReading("dial", sensorID, String(reading));
}

void DataWorksUSB::sendMoistureReading(int sensorID, float reading)
{
    submitReading("moisture", sensorID, String(reading));
}

void DataWorksUSB::sendReading(int sensorID, String sensorType, float reading)
{
    submitReading(sensorType, sensorID, String(reading));
}

void DataWorksUSB::submitReading(String type, int sensorID, String reading)
{
    sendData("\"sensorReading\":{\"type\":\"" + type + "\", \"sensorID\":\"" + String(sensorID) + "\", \"reading\":\"" + reading + "\"}");
}

void DataWorksUSB::sendData(String data)
{
    Serial.println("{\"dataworks\":{" + _auth + ", " + data + "}}");
}