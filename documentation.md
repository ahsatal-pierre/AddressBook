# Documentation 



### Overview
- This is a RESTful API in Node.js (Javascript) for an AddressBook.  
The app enables users to register and manage their own contact list by adding contacts to Firebase realtime database.
The app serve all kinds of clients — both mobile apps and websites using a RESTful API. 
The app  use two different storage services to maintain the data: User accounts are stored in  an SQL database , whereas contacts are stored in Firebase.

### configuration 
- copie .env.sample and put your credentials


# Launch
create:
- config.json
- .env
- fireCreds.json

npm install
npm start 
firebase emulators:start

Check on postman: 
development:
http://localhost:8080/api/auth/signup
http://localhost:8080/api/contact/create
http://localhost:8080/api/contact/read

production:
(Go easy with my account)
https://adressbook-49786ec9db24.herokuapp.com/api/auth/signup
https://adressbook-49786ec9db24.herokuapp.com/api/contact/create
https://adressbook-49786ec9db24.herokuapp.com/api/contact/read

don't forget x-access-token in postman

you can docker-compose up

tests: npm test (clean the test database between each test)

### Base URL
- https://adressbook-49786ec9db24.herokuapp.com/

## User Authentication & authorization

- JWT tokens is used for user authentication and authorization.
- JWT token life time in set to 12 hours, modifie it in auth.controller.js at "expiresIn:".
- An email (format: foo@bar.com) and a password (without restriction) are needed.

## Rate Limiting

- Users have five attempts per fifteen-minute period to connect. 
- You can change this in authLimiter.js.

## Endpoints

List and describe each API endpoint. Include the following information for each endpoint:

# For users: 
- get("/") = homepage
- to register: (post) /api/auth/signup
Email and password are needed.
JWT token and ID are provided when user register
- to sign in: (post) /api/auth/signin
Email and password are needed.
JWT token and ID are provided when user logs in.


# To create a contact: 
- (post) '/create':
- The route  is accessed by sending a POST request to the "/create" endpoint. Only authenticated users with a valid JWT token can access it
- Then, the route extract the data from the request body and get the user ID from the 'req.userId' property set by the middleware. 
'contactData' object is created and pushed to the database.
The data is stored under the 'contact/' path followed by the user's ID. 

So one user can create his own list only. 

# To retrieve contacts: 
- (get) '/read':
- The route is accessed by sending a "get" request to the '/read' endpoint. 
- When the route is accessed, it gets the user'sID from the req.userID property set by the middleware. 
- Then, the route use the database to retrieve the data from the database by calling the once() method on a reference to the 'contact/' path followed by the user's ID. 
So the user can only read his own contacts. 

# Test:
    - (get) ("/api/test/user") with an x-access-token

# Get one user 
And retrive his ID, email, hashed password and the dates of creation and update: 
    - by ID: 
(get) "/api/user/:userId" with an x-access-token
    - by email: 
(get) "/api/user/email/:email" with an x-access-token

## Libraries and SDKs

- Firebase's SDK is needed
- some dependencies: 
    - bcryptjs
    - jsonwebtoken
    - sequelize
    - jest 


## Support and Contact

- You can make a pull request on the github repository




