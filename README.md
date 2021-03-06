# Planner Web Application
### Installation
+ Clone this repo onto your machine
+ Run **npm install** to install node modules
+ You will need to install MongoDB onto your machine

### Development
+ In a separate terminal window, in the **/bin** folder of the MongoDB installation location, run **./mongod**
+ This will start an instance of Mongo for local testing
+ Start simple express server by running **node server** in the root directory of the project
+ Navigate in your browser to **http://localhost:8000** to view the frontend application
+ To make POST/GET requests, use http://localhost:8000/planner/tasks/

### Mobile App
+ Basic ionic scaffold can be found under mobile/planner
+ Run **npm install && bower install**
+ Serve with live reload using **ionic serve**
+ View on all platforms concurrently with **ionic serve --l** and navigate to http://localhost:8000/ionic-lab
