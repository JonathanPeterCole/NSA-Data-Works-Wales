# Setup the Circuit

First, setup the circuit to match the following diagram to connect a push button with a 10K ohm resistor:

![Circuit Diagram](/guides/images/content/diagram-push-button.png "Logo Title Text 1")

# Programming The Arduino

1. Open the Arduino application on your PC and make a new Sketch.

1. At the top of the Sketch, make a variable to hold the pin number for the button:  
`const int buttonPin = 2;`

1. Then in the setup function, set the pin as an INPUT:  
`pinMode(buttonPin, INPUT);`

1. Finally, get the reading from the button:
`int buttonReading = digitalRead(buttonPin);`

1. Now you can follow the **'Connecting an Arduino to Data Works'** guide to connect the Arduino to Data Works.

# Final Code

Here's the finished code for you to copy and paste:

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