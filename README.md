# IOT Team 6 - Data Works Wales

This project consists of multiple parts, including a web dashboard, Arduino libraries, and an app to connect Arduino's to the web dashboard via USB.

## Dashboard
* **Web Dashboard**  
  Recieves data from the Arduino's and displays the readings on a Dashboard.  
  [**Files**](./Dashboard) - [**Readme**](./Dashboard/README.md)


## Learn and build page - Creating guides
1. Create a markdown file in `Dashboard\client\guides`
2. Place an image inside `Dashboard\client\guides\images`
3. Add an entry to the `guides.json` file with the corresponding guide and image paths

[**Click here**](https://rexxars.github.io/react-markdown/) for a live easy to use markdown file editor


## Arduino USB
* **Data Works USB Link App**  
  Connects Arduino's using the USB libary to Data Works.  
  [**Files**](./Arduino/USB/App) - [**Readme**](./Arduino/USB/App/README.md)
* **Data Works USB Library**  
  Connects to the Data Works USB Link app to send sensor readings.  
  [**Files**](./Arduino/USB/Library) - [**Readme**](./Arduino/USB/Library/README.md)

## Linting

This project is linted with ESlint standard. Commits with linting issues will be blocked. You can lint manually with `npm run lint`, and automatically fix some issues with `npm run lintFix`.
Exceptions can be added to force ESLint to force-ignore undefined func errors by adding entries to `Dashboard/package.json > eslintConfig > globals`.