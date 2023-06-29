//import modules
const express = require("express");
const bodyParser = require("body-parser");

//initialize express
const app = express();
app.use(bodyParser.urlencoded({ extended: true })); //use body-parser
app.use(express.static("public")); //use local css and images

//Landing page -  Get
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

//Landing page - Post
app.post("/", function (req, res) {
  //gather user input
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  console.log(firstName, lastName, email);
});

//set port
const port = 3000;
app.listen(port, function () {
  console.log("Server is runing on port " + port);
});
