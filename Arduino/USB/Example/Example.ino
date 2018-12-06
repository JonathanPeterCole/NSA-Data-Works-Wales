#include <DataWorksUSB.h>

DataWorksUSB dataWorksUSB;

void setup() {
  // Start a serial connection to the PC
  Serial.begin(9600);
  // Connect to Data Works USB Link
  dataWorksUSB.connect("TestUsername", "TestPassword");
}

void loop() {
  // Send a reading
  dataWorksUSB.sendTemperature(5, 12);
  delay(5000);
}
