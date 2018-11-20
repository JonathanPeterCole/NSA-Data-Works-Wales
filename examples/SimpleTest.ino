#include "IOTLib.h"

// Enter a MAC address for your controller below.
// Newer Ethernet shields have a MAC address printed on a sticker on the shield
const byte mac[] = { 0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED };

// Create library instance with server info
// IP, port, Arduino Mac address, Arduino ethernet shield pin number
IOTLib iotLib("192.168.0.1", 81, mac, 10);



const int dialPin = A0;
int lastDialReading = 0;

// Setup code here is ran once (before loop is called):
void setup() { }

// Code here runs repeatedly:
void loop() {
	iotLib.sendDialReading("button1", analogRead(dialPin)); // Send server the new update

	delay(1000); // Prevent the server being flooded with updates
}