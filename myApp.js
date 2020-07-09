
var express = require('express');
var app = express();

// --> 7)  Mount the Logger middleware here


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


/** 6) Use the .env file to configure the app */
 
 
/** 7) Root-level Middleware - A logger */
//  place it before all the routes !


/** 8) Chaining middleware. A Time server */


/** 9)  Get input from client - Route parameters */


/** 10) Get input from client - Query parameters */
// /name?first=<firstname>&last=<lastname>

  
/** 11) Get ready for POST Requests - the `body-parser` */
// place it before all the routes !


/** 12) Get data form POST  */



// This would be part of the basic setup of an Express app
// but to allow FCC to run tests, the server is already active
/** app.listen(process.env.PORT || 3000 ); */

//---------- DO NOT EDIT BELOW THIS LINE --------------------

 module.exports = app;
