const express = require("express");
const webPush = require("web-push");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

//Set static path
app.use(express.static(path.join(__dirname, "client")));
app.use(bodyParser.json());

const publicVapidKey =
  "BNkhU-A4_K68clJ3qXdN0CkJjPSqxuI6InnD9P3Bi42V_n3B0f6kHVm42CE0z_NfgLCf64avUveJ6vUtQEbAtwg";
const privateVapidKey = "nW5RHnWeU6bwFjhCaD3PKYvqCbJkxg5vKmAx2NvJPgo";

webPush.setVapidDetails(
  "mailto:test@test.com",
  publicVapidKey,
  privateVapidKey
);

//Subscribe Route
app.post("/subscribe", (req, res) => {
  //Get pushSubcription object
  const subscribtion = req.body;
  res.status(200).json({});

  //Create payload
  const payload = JSON.stringify({ title: "Monggo To Do List" });

  //Pass object into sendNotification
  webPush
    .sendNotification(subscribtion, payload)
    .catch(err => console.error(err));
});


const port = 5000;

app.listen(port, ()=> console.log(`Server started on port ${port}`));