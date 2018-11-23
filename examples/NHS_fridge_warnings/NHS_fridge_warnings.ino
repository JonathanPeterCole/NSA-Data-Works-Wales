#include "IOTLib.h"

// Enter a MAC address for your controller below.
// Newer Ethernet shields have a MAC address printed on a sticker on the shield
const byte mac[] = { 0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED };

// Create library instance with server info
// IP, port, Arduino Mac address, Arduino ethernet shield pin number
IOTLib iotLib("192.168.0.1", 81, mac, 10);

const int tempSensorPin = 0;


// Setup code here is ran once (before loop is called):
void setup() { }

// Code here runs repeatedly:
void loop() {
  int tempVoltage = analogRead(tempSensorPin);
  iotLib.sendTemperatureReading("tempsensor1", (5.0 * tempVoltage * 1000.0) / (1024 * 10)); // Send server the temperature reading formatted in degrees

  delay(1000); // Prevent the server being flooded with updates
}
