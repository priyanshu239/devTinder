- create a repository
- initialize the repository -- npm init
- node_modules, package.json, package-lock.josn
- install express
- create a server
- listen to port 7777
- write a request handler for /test
- install nodemon and update scripts inside package.json
- installed nodemon -- auto restart our server when we make any changes
- initialised git
- gitignore
- create a remote repo on github
- push all code to remote origin
- routes and extensions
- order of the routes matter a lot
- http methods - post, get , patch , delete
- install postman app and make a workspace/collection ans test API call
- write logic to handle GET, POST, DELETE and test on POSTMAN
- explore routing and use of ?, +, (), * int the routes and use of regex in routes /a/ /.*fly$/
- reading the query params in the routes
- readin the dynamic routes (req.params)
- handling multple route handlers
- next()
- next function and errors along with res.send()
- middlewares. why do we need it??
- how express js basically handles the requests behind the scene
- difference between app.use and app.all (both works as middlewares for all method GET, POST, PATCH, DELETE)
- write a dummy auth middleware for admin
- write a dummy auth middleware for all user routes ,except /user/login
- error handling using app.use("/", (err, req, res, next) = {})
- create a free cluster on mongodb official website (mongo atlas)
- install mongoose library
- connect your application to the Database
- Call the connectDB function snd connect to database before starting application on 7777
- create a userSchema & userModel
- create a /signup API to add data to database
- push some documents using API calls from postman
- error handling using try catch
- difference between js object and json
  add the express.json middleware to your app
- make yoour signup API dynamic to recieve data from end user
- user.findOne --> with duplicate email id's which object will be returned
- update the user API
- epxlore models methods from mongoose documentation
- explore schematype from the documentation
- add required, unique, lowercase, min, minlength, trim
- add default
- create a custom validator for gender
- improve the DB schema - put appropriate validations on each field
- add timestamps to the userSchema
- API level validation on PATCH request and signup POST api
- API level data sanitization
- Data Sanitizing - Add API validator for each field
- Install validator
- Explore validator library functions and use validator functions for password, email, password
- validate data in signup API
- install bcrypt package
- create a password hash using bcrypt.hash
- create login API
- compare passwords and throw errors if email or password is invalid
- install cookie-parser
- send a dummy cookie to user
- create GET/profile API and check if you get cookie back
- install jsonwebtoken
- in login API after email and password validation create a JWT token send it back to user
- read the cookies inside your profile API and find the logged in user
- write the userAuth middleware
- Add the userAuth middleware in your profile API and a new sendConnectionRequest API
- set the expiry of JWT tokens and cookies to 7 days
- create userSchema method to getJWT()
- create userSchema methods to comoarePassword(passowrdInputByUser, passwordHash);
- Explore tinder APIs
- Create a list of all API you can think of in DEVTINDER
- group multiple routes 
- Read documentation for express.Router
- Create routes folder for managing auth,profile,request routers
- create authRouter, profileRouter, requestRouter
- Import this router in app.js
- Create PATCH /profile/edit
- Create PATCH /profile/password (forgot password api)
- Make you validate all data in every POST, PATCH apis

- Create Connection request schems
- send connection request API
- think about all corner cases
- $or query / $and query (read)
- schema.pre("save) function 
- Read this article about compound indexes 
- Read more about indexes in mongoDB
- Why indexes?? advantages and disadvantages 
- write code with proper validations for POST /request/review/:status/:requestId
- thought process - POST vs GET
- Read about ref and populate 
- create GET /user/requests/received with all the checks
- Create GET /user/connections

- Logic for GET /feed API
- Explore the $nin, $and, $ne and others query operators

/feed?page=1&limit=10 => first 10 users (1-10) => .skip(0) & .limit(10)

/feed?page=2&limit=10 => first 10 users (11-20) => .skip(10) & .limit(10)

/feed?page=3&limit=10 => first 10 users (21-30) => .skip(20) & .limit(10)

skip = (page-1)*limit

