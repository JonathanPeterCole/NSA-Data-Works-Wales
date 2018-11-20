#include "IOTLib.h" // Requires WebSocket library 1.X.X to be installed

const int dialPin = A0;
const int sendInterval = 1000;
int lastDialReading = 0;

// Setup code here is ran once (before loop is called):
void setup() {
  
}

// Code here runs repeatedly:
void loop() {
	IOTLib.loop("192.168.0.1", 81, "arduino", "trial"); // Maintain socket.io connection

	IOTLib.sendDialReading("button1", analogRead(potPin)); // Send server the new update

	delay(sendInterval); // Prevent the server being flooded with updates
}