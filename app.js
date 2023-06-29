//import modules
const express = require("express");
const bodyParser = require("body-parser");

//initialize express
const app = express();
app.use(bodyParser.urlencoded({ extended: true })); //use body-parser
app.use(express.static("public")); //use local css and images
