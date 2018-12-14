# Connecting via USB

1. First, download the Data Works USB Library.  
[**Download Library**](/guides/downloads/DataWorksUSB-Library.zip)

2. Open the ZIP file and copy the DataWorksUSB folder to your Arduino libraries folder:  
This is usually in Your Documents, Arduinos, and then libraries.

3. Import the library in your Arduino Sketch by adding the following lines to the top of your code:  
```
#include <DataWorksUSB.h>
DataWorksUSB dataWorksUSB;
```

4. Then, inside the setup function, start a serial connection with the following code:  
`Serial.begin(9600);`

5. After starting the serial connection, connect to Data Works by adding the following code, replacing username and password with your login details:  
`dataWorksUSB.connect("Username", "Password");`

6. Now you can send a reading inside the loop function.  
You can see a list of the supported sensors below.  
`dataWorksUSB.sendButtonReading(1, reading);`  

7. You can now download and run the Data Works USB Link app, which should automatically detect your Arduino and send the readings.  
[**Download USB Link**](/guides/downloads/DataWorksUSB-Link.exe)

# Supported Sensors

* **Button**  
  `sendButtonReading(id, value)`

* **Temperature**  
  `sendTemperatureReading(id, value)`

* **Light**  
  `sendLightReading(id, value)`

* **Noise**  
  `sendNoiseReading(id, value)`

* **Dial**  
  `sendDialReading(id, value)`

* **Moisture**  
  `sendMoistureReading(id, value)`

* **Other Sensors**  
  `sendReading(id, sensorType, value)`

# Example Code

Here's some the finished code for you to copy and paste, sending the readings for a button:

```
#include <DataWorksUSB.h>

DataWorksUSB dataWorksUSB;
const int buttonPin = 2;

void setup() {
  // Start a serial connection to the PC
  Serial.begin(9600);
  // Connect to Data Works USB Link
  dataWorksUSB.connect("YourUsername", "YourPassword");
  // Set the button pin as an input
  pinMode(buttonPin, INPUT);
}

void loop() {
  // Send the button reading
  dataWorksUSB.sendButtonReading(1, digitalRead(buttonPin));
  // Wait 2 seconds
  delay(2000);
}
```
