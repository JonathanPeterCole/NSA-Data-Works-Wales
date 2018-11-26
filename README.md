# IOT Team 6

This project consists of two parts, the Arduino code, and the web dashboard code.

## Dashboard

### Quick Start

1. Install and start MongoDB

1. Open a terminal to the Dashboard directory

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

### Database

To run this project, you will need a MongoDB server running on your machine. 

[**Download MongoDB**](https://www.mongodb.com/download-center/community)

On NSA laptops, MongoDB is already installed, but needs to be configured. To do this, follow these steps:

1. Open a command line window

1. Set the data directory  
  `"C:\mongodb\bin\mongod.exe" --dbpath "C:\mongodb\data"`

1. Check that the database is running  
  `mongo --shell`