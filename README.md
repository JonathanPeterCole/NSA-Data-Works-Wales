# IOTLib by TEAM 6
A library to easily setup sensors with the IOT webserver by team 6.

<br>

## Installation
Clone or download (and unzip) this repository inside your `My Documents\Arduino\libraries\` folder

<br>

## Examples
Example uses of this library can be found inside the `examples` folder.

<br>

## FAQ
### Deciding ethernet pin number
|   Arduino board                            | Recommended pin |
| ------------------------------------------ | --------------- |
| Most Arduino shields                       | 10              |
| MKR ETH shield                             | 5               |
| Teensy 2.0                                 | 0               |
| Teensy++ 2.0                               | 20              |
| ESP8266 with Adafruit Featherwing Ethernet | 15              |
| ESP32 with Adafruit Featherwing Ethernet   | 33              |

### Dependencies
**WARNING**: Installing future releases of these libraries may break compatibility!
* [Ethernet 2.0.0](https://github.com/arduino-libraries/Ethernet/releases/tag/2.0.0)
* [ArduinoHttpClient 0.3.1](https://github.com/arduino-libraries/ArduinoHttpClient/releases/tag/0.3.1)