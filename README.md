# IOT Team 6

This project consists of two parts, the Arduino code, and the web dashboard code.

## Dashboard

### Quick Start

1. Open a terminal to the Dashboard directory.

1. Install the npm packages  
  `npm install`

1. Build the application  
  `npm run build`

1. Run the application  
  `npm run start`

1. Open your browser and go to [http://localhost:3000/](http://localhost:3000/)

### Commands

* **Build**  
  Runs webpack to build the client-side Javascript.  
  `npm run build`  

* **Build Development**  
  Runs webpack to build the client-side Javascript with sourcemaps for easier debugging.  
  `npm run buildDev` 

* **Test**  
  Runs Jest to test the code.  
  `npm run test`

* **Linting**  
  Runs ESLint to lint both the client and server-side code.  
  `npm run lint`

* **Linting Fix**  
  Runs ESLint with --fix to lint the code and attempt to automatically apply fixes.  
  `npm run lintFix`

* **Start**  
  Runs the application on port 3000.  
  `npm run start`

 
## IOTLib
A library to easily setup sensors with the IOT webserver by team 6.

### Installation
Run install.bat or copy src, library.json and library.properties into Documents\Arduino\libraries\IOTLib

### Examples
Example uses of this library can be found inside the `examples` folder.

### FAQ
#### Deciding ethernet pin number
|   Arduino board                            | Recommended pin |
| ------------------------------------------ | --------------- |
| Most Arduino shields                       | 10              |
| MKR ETH shield                             | 5               |
| Teensy 2.0                                 | 0               |
| Teensy++ 2.0                               | 20              |
| ESP8266 with Adafruit Featherwing Ethernet | 15              |
| ESP32 with Adafruit Featherwing Ethernet   | 33              |

#### Dependencies
**WARNING**: Installing future releases of these libraries may break compatibility!
* [Ethernet 2.0.0](https://github.com/arduino-libraries/Ethernet/releases/tag/2.0.0)
* [ArduinoHttpClient 0.3.1](https://github.com/arduino-libraries/ArduinoHttpClient/releases/tag/0.3.1)