# Dashboard

This web app recieves data from the Arduino's and displays the readings on a Dashboard.

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

* **Start**  
  Runs the application on port 3000.  
  `npm run start`

* **Start Development**  
  Builds and runs the application on port 3000, listenting for changes.  
  `npm run startDev`

* **Build**  
  Runs webpack to build the client-side Javascript.  
  `npm run build`  

* **Build Development**  
  Runs webpack to build the client-side Javascript with sourcemaps for easier debugging.  
  `npm run buildDev` 

* **Watch**
  Runs webpack to build the client-side Javascript and listens for changes.  
  `npm run watch`

* **Test**  
  Runs Jest to test the code.  
  `npm run test`

* **Linting**  
  Runs ESLint to lint both the client and server-side code.  
  `npm run lint`

* **Linting Fix**  
  Runs ESLint with --fix to lint the code and attempt to automatically apply fixes.  
  `npm run lintFix`

### Database

To run this project, you will need a MongoDB server running on your machine. 

[**Download MongoDB**](https://www.mongodb.com/download-center/community)

On NSA laptops, MongoDB is already installed, but needs to be configured. To do this, follow these steps:

1. Open a command line window

1. Set the data directory  
  `"C:\mongodb\bin\mongod.exe" --dbpath "C:\mongodb\data"`

1. Check that the database is running  
  `mongo --shell`

### Database Structure

```
{
  "users": [
    {
      "_id": ObjectId("000000001"),
      "username": "TestUsername",
      "password": "HashedPassword",
      "arduinos": [
        ObjectId("123456789"),
        ...
      ],
      "projects": [
        ObjectId("987654321"),
        ...
      ]
    }
  ]
  "arduinos": [
    {
      "_id": ObjectId("123456789"),
      "udid": "abc123",
      "name": "Unnamed Arduino",
      "colour": "blue"
      "sensors": [
        {
          "id": 0,
          "type": "temperature",
          "readings": [ 
            {
              "reading": 10,
              "time": 123456789
            }
          ]
        },
        ...
      ]
    },
    ...
  ],
  "projects": [
    {
      "_id": ObjectId("987654321"),
      "name": "Unnamed Project",
      "owner": ObjectId("000000001"),
      "arduinos": [
        ObjectId("123456789"),
        ...
      ]
    }
  ]
}
```