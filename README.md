# IOT Team 6 - Data Works Wales

This project consists of multiple parts, including a web dashboard, Arduino libraries, and an app to connect Arduino's to the web dashboard via USB.

## Dashboard
* **Web Dashboard**  
  Recieves data from the Arduino's and displays the readings on a Dashboard.  
  [**Files**](./Dashboard) - [**Readme**](./Dashboard/README.md)

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

## Testing Strategy

Tests are implemented using Jest and Enzyme for both the web dashboard and USB Link app. Each test file is named using the the naming convention `component-name.spec.js`. Tests for this project include unit tests, integration tests, and snapshot tests, to ensure that the components are working, respond correctly to user input, and render as expected.

In these tests, Enzyme has been used to shallow render the tested components, isolating the tests so that only code from the relevant components are being tested.

Currently only a limited number of tests have been implemented to show the some of the various ways to implement testing. Given more time, the aim would be for over 90% test coverage.

The `npm run test` command can be run in the Dashboard and USB app directories to run these tests.