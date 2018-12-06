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
    // Store authentication details in a variable
    _auth = "\"auth\":{\"username\":\"" + username + "\", \"password\":\"" + password + "\"}";
    // Send authentication details to dataworks
    Serial.println("{\"dataworks\":{\"connect\":true, " + _auth + "}");
    // Wait to recieve 'okay' from Data Works USB Link
    bool connected = false;
    while(!connected){
        if (Serial.readString().indexOf("okay") >= 0) {
            connected = true;
        }
    }
}

void DataWorksUSB::sendTemperature(int sensorID, int reading)
{
    submitReading("temperature", sensorID, reading);
}

void DataWorksUSB::submitReading(String type, int sensorID, int reading)
{
    sendData("\"sensorReading\":{\"type\":\"" + type + "\", \"sensorID\":\"" + String(sensorID) + "\", \"reading\":\"" + String(reading) + "\"}");
}

void DataWorksUSB::sendData(String data)
{
    Serial.println("{\"dataworks\":{" + _auth + ", " + data + "}}");
}