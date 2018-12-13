#include <DataWorksUSB.h>

DataWorksUSB dataWorksUSB;

void setup() {
  // Start a serial connection to the PC
  Serial.begin(9600);
  // Connect to Data Works USB Link
  dataWorksUSB.connect("testUsername", "testPassword");
}

void loop() {
  // Send a reading
  dataWorksUSB.sendTemperatureReading(1, float(12.5));
  delay(5000);
}
