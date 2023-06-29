/*
 Author: Yuhao Peng
 Date: 2023-06-29
*/

//import modules
const express = require("express");
const bodyParser = require("body-parser");
const mailchimp = require("@mailchimp/mailchimp_marketing");

//listing ID: c282788d7c
//API key: 7f8011d4f89b8f8978d064ed799b58a4-us13

//initialize express
const app = express();
app.use(bodyParser.urlencoded({ extended: true })); //use body-parser
app.use(express.static("public")); //use local css and images

//set up Mailchimp
mailchimp.setConfig({
  apiKey: "7f8011d4f89b8f8978d064ed799b58a4-us13",
  server: "us13",
});

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
  const listID = "c282788d7c";

  //create a new user base on given information
  const newUser = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };

  //add user to the email list
  const run = async () => {
    const response = await mailchimp.lists.batchListMembers(listID, newUser);
    console.log(response);
    // direct to success page
    res.sendFile(__dirname + "/success.html");
    console.log(
      `Successfully added contact as an audience member. The contact's id is ${response.id}.`
    );
  };

  run().catch((e) => res.sendFile(__dirname + "/failure.html")); //direct to failure page if error occured
});

//Failure page - Post
app.post("/failure", function (req, res) {
  //redirect back to landing page
  res.redirect("/");
});

//set up port
const port = 3000;
app.listen(port, function () {
  console.log(`Server is runing on port ${port}.`);
});
