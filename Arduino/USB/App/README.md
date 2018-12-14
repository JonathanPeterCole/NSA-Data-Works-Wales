# Data Works USB Link App

This app connects to an Arduino using the USB library to send readings to the Data Works Server.

### Quick Start

1. Open a terminal to the App directory

1. Install the npm packages  
  `npm install`

1. Build and run the application  
  `npm run buildRun`

### Commands

* **Start**  
  Runs the application.  
  `npm run start`

* **Start Development**  
  Builds and runs the application on port 3000, listenting for changes.  
  `npm run startDev`

* **Build**  
  Runs webpack to build the React Javascript.  
  `npm run build`  

* **Build Development**  
  Runs webpack to build the React Javascript with sourcemaps for easier debugging.  
  `npm run buildDev` 

* **Build Run**  
  Builds and starts the application.  
  `npm run buildRun` 

* **Package**  
  Packages the app for distribution.  
  `npm run pack`

* **Linting**  
  Runs ESLint to lint both the client and server-side code.  
  `npm run lint`

* **Linting Fix**  
  Runs ESLint with --fix to lint the code and attempt to automatically apply fixes.  
  `npm run lintFix`

### Configuration

To connect to Data Works, this app needs to know the servers network location. This location is defined in `config/server.json`.