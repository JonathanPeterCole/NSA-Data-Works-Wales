#include <DataWorksUSB.h>

DataWorksUSB dataWorksUSB;
const int sensorPin = 0;

void setup() {
  // Start a serial connection to the PC
  Serial.begin(9600);
  // Connect to Data Works USB Link
  dataWorksUSB.connect("testUsername", "testPassword");
}

void loop() {
  // Get the reading
  float reading = analogRead(sensorPin);
  // Convert the reading to degrees
  reading = (((reading/1024.0)*5)-0.5)*100;
  // Send the reading
  dataWorksUSB.sendTemperatureReading(1, reading);
  delay(2000);
}
