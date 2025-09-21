***********Event Management App developed by Gamage Recruiters Software Engineer Intern **************


*********************Project Description********************

The Event Management Application allows the users to easily manage events with details such as title,description,date etc...
The application provides a simple dashboard to view single or all events and a detailed card view for each event,making event information clear and accessible.


****************Key Features**********************

1.Add,Edit and Delete events.
2.View all events or single event.
3.Responsive Design for desktop and mobile.
4.About us


************************Setup and Installations Instructions**************************

-------------React--------------
1.npm install - installing react libaries.
2.npm start - Starting development server.
3.npm run build - build for production.


-------------Backend services -------------------
1.node -v - Verify version
2.npm -v - Shows the Node.js version
3.mkdir event-management-backend - created a folder
4.cd event-management-backend and backend - moving to a folder.
5.npm init -y - initialize the node.js
6.npm install express - installing express js as the backend
7.npm run dev - starting backend server
8.npm install -g nodemon  - automatically restarts your server on file changes.
9.nodeman backend.js
10.npm install axios - sends http requests from application to a server or API


*******************Server*******************

1.Create an account on mongodb atlas.
2.Create a cluster and apply current IP address.
3.Create a database called events and collection called events.
4.Connect the database and get connection string.
5.Applying connection string and paste in .env file.
6.Add a database called events.


******************POSTMAN*****************
1.Complete backend with APIs first.
2.Apply the RESTENDPOINTS by testing in POSTMAN
3.Fetch the details and see working.
4.Then connect both backend and frontend to work on live.


****************How to run Frontend and Backend to work smoothly with Features implemented *******************************

----------------------Frontend-------------------------

1.First move with specific folder called event-management to event by using cd.
2.Then type npm start and run it.
3.You have an EventForm,EventList and About Us.
4.Select the EventForm to create an event.The created event will be displayed automatically in Event List Feature.
5.In Event List you can search a title or event by using title.
6.In EventList you can have option to delete or edit the event.
7.Before removing or editing a particular events user will get a prompt message based on the feature.
8.In about us you can see the application what is about.


-----------------------backend-----------------------------------

1.Same like frontend move with a specific folder by using cd[event-management-backend -> backend].
2.Apply npm run dev to start backend server.
3.You should run both frontend + backend to run the application otherwise the application may failed.


-----------------------Step 03[Mongodb atlas]--------------------

1.Visit Mongodb atlas and search or browse for colelctions in clusters.
2.Once in collections it automatically shows the data related events database and collection.


*****************API Endpoints Documentation**************

Method     Endpoint            Description

GET        /api/events         Fetch all events
GET        /api/events/:id     Fetch event by ID
POST       /api/events         Create a new event
PUT        /api/events/:id     Update an event
DELETE     /api/events/:id     Delete an event



*****************Screenshots of the Application*******************

Here is the provided link of sreenshots : 


****************Demonstration of the Event Management App************************

Here to access the video :


****************GitHub Repository*************************************************

Here is the access to my source code : 


*****************Technologies used*************

Frontend : React.js,CSS3 (Custom + responsive design)
Icons & Styling : Unicode emojis / custom CSS
Backend : Node.js and Express.js
Database : Mongodb
Version Control : GitHub


**************Challenges faced during development ********************

1.Error related cors

❌ MongoDB connection error: MongooseError: The `uri` parameter to `openUri()` must be a string, got "undefined". Make sure the first parameter to `mongoose.connect()` or `mongoose.createConnection()` is a string.

How to fix it?

First create an .env file and apply port number and database connection string.

2.openUri() got mismatch

❌ MongoDB connection error: MongooseError: The `uri` parameter to `openUri()` must be a string, got "undefined". Make sure the first parameter to `mongoose.connect()` or `mongoose.createConnection()` is a string.

How to fix it?

Fixing url in.env file

3.Server is not running

❌ MongoDB connection error: MongooseServerSelectionError: connect ECONNREFUSED 127.0.0.1:27017

How to fix it?

Created a cluster and fix it with IP Address given by mongodb.

4.Authentication Failure

❌ MongoDB connection error: MongoServerError: bad auth : authentication failed

How to fix it?

Updated with my password given to the database connection.

5.Path Problem

PathError [TypeError]: Missing parameter name at index 1: *; visit https://git.new/pathToRegexpError for info

How to fix it?

I update this path

app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});
  

to 

app.all('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

6.Tailwind css issue with @apply

@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  @apply bg-gray-100 text-gray-900;
}

h1, h2, h3 {
  @apply font-bold;
}

How to fix it?

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",  // Scan all React files inside src
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}


7.App.js and index.js file issue regarding CRA 

Could not find a required file. Name: index.js

How to fix it?

I just moved App.js and index.js to src folder.Because these are starting files of CRA so it should be root folder.

8.LowerCase issue

EventList.js:24 Uncaught TypeError: Cannot read properties of undefined (reading 'toLowerCase')


How to fix it?

I fixed this by applying this code :

events
  .filter((event) =>
    event.title?.toLowerCase().includes(searchTerm.toLowerCase())
  )
  .map((event) => (
    <div key={event.id}>{event.title}</div>
  ));


9.NavBar issue with not aligned correctly and professionally

How to Fix it?

I just updated several time on CSS file and make it look better.

10.EventDetails UI rendering issues

The problem is after applying the code the design quiet not good or not changing/updating still yet.



****************Stack and Feature to Hard implement**************


1.Tailwind CSS due to its libraries issue i could not do with this Stack.Not updating the UI design.

2.The problem is after applying the code the design quiet not good or not changing/updating still yet.













