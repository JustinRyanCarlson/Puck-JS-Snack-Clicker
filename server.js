var express = require("express");
var app = express();
var path = require("path");
var slackAPI = require('slackbotapi');

app.use(express.static(path.join(__dirname, 'static_files')));

// Starting bot connection
var slack = new slackAPI({
    'token': 'xoxb-233947548631-NBW0FzAPtW05mFytaQO9hFWR',
    'logging': true,
    'autoReconnect': true
});

var slackMessage = ":green_apple::pear::banana::peach::apple::banana::banana::banana::banana::tada:" + 
    ":the_horns::sunglasses::the_horns::tada::banana::banana::banana::banana::apple::peach::banana:" + 
    ":pear::green_apple:\n\n:green_apple::pear::banana::peach::apple: The Snacks have arrived in Stotters" + 
    " House! :apple::peach::banana::pear::green_apple:\n\n:green_apple::pear::banana::peach::apple::banana:" + 
    ":banana::banana::banana::tada::the_horns::sunglasses::the_horns::tada::banana::banana::banana::banana:" + 
    ":apple::peach::banana::pear::green_apple:"

// Set up a URL routes
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get("/snack9", function(req, res) {
    // post to channel for workers on floor 9
    slack.sendMsg("C6WJF8CJX", slackMessage);

    res.status(200).send("success");
})

app.get("/snack11", function(req, res) {
    // post to channel for workers on floor 11 
    slack.sendMsg("C6WLN7CR0", slackMessage);

    // post msg to Brooke 
    slack.sendPM("brooke", "Snack notification sent sucessfully");
        
    res.status(200).send("success");
})

app.get("/battery", function(req, res) {        
    // send notification to Tristan and I that the battery is low
    slack.sendPM("justin.carlson", "Puck battery low");
    slack.sendPM("tristanmarshall", "Puck battery low");

    res.status(200).send("success");
})

// bind the app to listen for connections on a specified port
var port = process.env.PORT || 8080;
app.listen(port);

// Render some console log output
console.log("Listening on port " + port);