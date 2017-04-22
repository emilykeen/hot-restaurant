// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.text());
app.use(bodyParser.json({
    type: "application/vnd.api+json"
}));

var customers = [];

var waitlist = [];

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


app.post("/api/tables", function(req, res) {

    var newcustomer = req.body;

    console.log(newcustomer);

    if (customers.length > 4) {
        res.redirect(307, '/api/waitlist')
    } else {
        customers.push(newcustomer);

    }


    res.json(newcustomer);
    res.json(newWaitlistcustomer);
})
app.get("/api/waitlist", function(req, res) {

    res.send("works!");
})

app.post("/#", function(req, res) {

    console.log(res);
    customers.empty();

    // customers.splice(0,customers.length);
})
app.post("/api/waitlist", function(req, res) {

    var newWaitlistcustomer = req.body;

    console.log(newWaitlistcustomer);

    waitlist.push(newWaitlistcustomer);

    res.json(newWaitlistcustomer);
})

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});