// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.text());
app.use(bodyParser.json({
    type: "application/vnd.api+json"
}));

// =============================================================
var customers = [];

var waitlist = [];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
    // res.send("Welcome to the Star Wars Page!")
    res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/reserve", function(req, res) {
    // res.send("Welcome to the Star Wars Page!")
    res.sendFile(path.join(__dirname, "reserve.html"));
});
app.get("/tables", function(req, res) {
    // res.send("Welcome to the Star Wars Page!")
    res.sendFile(path.join(__dirname, "tables.html"));
});


app.get("/api/tables", function(req, res) {

    return res.json(customers);
});


app.get("/api/waitlist", function(req, res) {

    return res.json(waitlist);
});

// Create New Characters - takes in JSON input
app.post("/api/tables", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    var newcustomer = req.body;

    console.log(newcustomer);

    // We then add the json the user


    if (customers.length > 5) {
        app.post("/api/waitlist", function(req, res) {
            // req.body hosts is equal to the JSON post sent from the user
            var newWaitlistcustomer = req.body;

            console.log(newWaitlistcustomer);

            // We then add the json the user
            waitlist.push(newWaitlistcustomer);

            // We then display the JSON to the users
            res.json(newWaitlistcustomer);
        })
    } else {customers.push(newcustomer);

    }

    // We then display the JSON to the users
    res.json(newcustomer);
     res.json(newWaitlistcustomer);
})

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});