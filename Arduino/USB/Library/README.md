# Data Works USB Library

This library connects to the Data Works USB Link app to send sensor readings.

### Quick Start

1. Copy the `DataWorksUSB` folder to you Arduino libraries folder (usually `%UserProfile%\Documents\Arduino\libraries`)

2. Import the library and create an instance at the top of your Arduino Sketch  
  ```
  #include <DataWorksUSB.h>

  DataWorksUSB dataWorksUSB;
  ```

3. In the setup function, initialise a serial connection and call the connect function with a username and password
  ```
  void setup() {
    // Start a serial connection to the PC
    Serial.begin(9600);
    // Connect to Data Works USB Link
    dataWorksUSB.connect("TestUsername", "TestPassword");
  }
  ```

4. Send a reading in the loop
  ```
  void loop() {
    // Send a reading
    dataWorksUSB.sendTemperature(5, 12);
    delay(5000);
  }
  ```


### How it Works

1. **Serial Connection Established**  
  The Arduino is plugged in and the USB Link app establishes a serial connection.

1. **Library Sends a Connection Request**  
  The library sends a JSON object with a connect item and the authentication details.  
  `{"dataworks":{"connect":true, "auth":{"username":"testUsername", "password":"testPassword"}}}`

1. **USB Link App Checks the Auth and Sends a Status**  
  The USB Link checks the authentication details sent by the library and sends an 'okay' status to the Arduino if they are valid.

1. **Libary Recieves the Okay Status**  
  The library recieves the okay status and is ready to send readings.