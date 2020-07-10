
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

// --> 7)  Mount the Logger middleware here
const fnLogger = function(req, res, next) {
  //Find which verb, path and ip address of the request
  const verb = req.method;
  const path = req.path;
  const ip = req.ip;
  
  //Log the request to the console
  console.log( verb + " " + path + " - " + ip);
  
  next();
}

//app.use( fnLogger); 

// --> 11)  Mount the body-parser middleware  here


/** 1) Meet the node console. */
console.log("Hello World");

/** 2) A first working Express Server */
const myHandler = function(req, res) {
  res.send('Hello Express');
}


//app.get("/", myHandler);

/** 3) Serve an HTML file */
const absolutePath = __dirname + "/views/index.html";

const myFileHandler = function(req, res) {
  res.sendFile( absolutePath);
}

app.get("/", myFileHandler);


/** 4) Serve static assets  */
const cssPath = __dirname + "/public";

const myCSSHandler = function() {
  express.static( cssPath);
}

//app.use(myCSSHandler); //app.use doesn't seem to take a function
app.use(express.static(__dirname + "/public"));

/** 5) serve JSON on a specific route */
const myObjHandler = function(req, res) {
  const myObj = {"message": "Hello json"};
  res.json( myObj);
}

app.get("/json", myObjHandler);


/** 6) Use the .env file to configure the app */
const myEnvHandler = function(req, res) {
  if (process.env.MESSAGE_STYLE === "uppercase") {
    const myObj = {"message": "Hello json".toUpperCase() };
    res.json( myObj);
  } else {
    const myObj = {"message": "Hello json" };
    res.json( myObj);
  }

}

//app.get("/json", myEnvHandler);
 
/** 7) Root-level Middleware - A logger */
//  place it before all the routes !


/** 8) Chaining middleware. A Time server */

app.get('/now', function(req, res, next) {
  /*Instead of responding with the time we can also add any arbitrary property to the request object
  and pass it to the next function by calling the next() method. This avoids using global variables.*/
  req.time = {"time" : new Date().toString() };
  next();
}, function(req, res) {
  res.send( req.time);
});



/** 9)  Get input from client - Route parameters */
const route_path = '/:word/echo';
app.get(route_path, function(req, res, next) {
  req.word = { echo: res.params.word };
  next();
}, function(req, res) {
  res.send( req.word);
});


/** 10) Get input from client - Query parameters */
// /name?first=<firstname>&last=<lastname>

const input_path = '/name';
const fnQuery = function(req, res, next) {
  req.name = { name: req.query.first + ' ' + req.query.last };
  next();
}

const fnResponse = function(req, res) {
  // Use template literals to form a formatted string
  res.json({
    name: `${req.query.first} ${req.query.last}`
  });
}

/*Note: In the following exercise you are going to receive data from a POST request, at the same /name route path.
If you want, you can use the method app.route(path).get(handler).post(handler). This syntax allows you to chain 
different verb handlers on the same path route. You can save a bit of typing, and have cleaner code.*/
//app.get(route_path, fnQuery, fnResponse);
app.route(input_path).get(fnQuery, fnResponse).post(fnQuery, fnResponse)





  
/** 11) Get ready for POST Requests - the `body-parser` */
// place it before all the routes !


/** 12) Get data form POST  */



// This would be part of the basic setup of an Express app
// but to allow FCC to run tests, the server is already active
/** app.listen(process.env.PORT || 3000 ); */

//---------- DO NOT EDIT BELOW THIS LINE --------------------

 module.exports = app;
