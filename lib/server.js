
'use strict';
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
// expressy stuff
const express = require('express');
let app = express();

let http = null;
let isRunning = false;

app.use(morgan('dev'));
app.use(
  cors({
    origin: process.env.CORS_ORIGINS,
    credentials: true,
  })
);

app.use(bodyParser.json({limit:'50mb'})); app.use(bodyParser.urlencoded({extended:true, limit:'50mb'}))
app.use(require("../routes/blogRoutes.js"));



// 404 Handler
app.use("*", (req,res,next) => {
  res.sendStatus(404);
  next();
});

app.use(require('../lib/middleware/error'));

module.exports = {

  start: (port) => {
    let usePort = port || process.env.PORT;
    if ( isRunning ) {
      throw Error ("Server is already running");
    }
    http = app.listen(usePort, () => {
      isRunning = true;
      console.log("Server up and running on port", usePort);
    });
  },

  stop: () => {
    if(! isRunning) {
      throw Error("Server is already off");
    }
    if ( ! http ) {
      throw Error("Invalid Server");
    }

    http.close( () => {
      http = null;
      isRunning = false;
      console.log("Bye Bye");
    });
  },

};
