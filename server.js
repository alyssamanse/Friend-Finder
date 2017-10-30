// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");


// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

var htmlRoutes = require("./app/routing/htmlRoutes.js");
var apiRoutes = require("./app/routing/apiRoutes.js");

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// App listening
app.listen(PORT, function() {
    console.log("App is listening on PORT " + PORT);
});

app.use("/", htmlRoutes);

app.use("/survey", htmlRoutes);

// app.get("/api/friends", apiRoutes);

app.post("/api/friends", apiRoutes);

