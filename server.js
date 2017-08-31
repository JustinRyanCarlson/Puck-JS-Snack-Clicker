var express = require("express");
var app = express();
var path = require("path");
var SlackBot = require('slackbots');

app.use(express.static(path.join(__dirname, 'static_files')));

// Create bot 
var bot = new SlackBot({
    token: 'xoxb-233947548631-gWb1A6CtklRyxAChG2orq0iA', 
    name: "Mr. Snacks"
});

// params for bot
var params = {
    icon_emoji: ':popcorn:'
};

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
    bot.postMessageToChannel('snacks_9th', slackMessage, params);

    res.status(200).send("success");
})

app.get("/snack11", function(req, res) {
    // post to channel for workers on floor 11 
    bot.postMessageToChannel('snacks_11th', slackMessage, params);
        
    // CHANGEME to brooke
    bot.postMessageToUser('justin.carlson', 'Snack notifications sent successfully', params); 

    res.status(200).send("success");
})

app.get("/battery", function(req, res) {        
    // define existing username instead of 'user_name' 
    bot.postMessageToUser('justin.carlson', ':battery: Puck battery low :battery:', params); 
    bot.postMessageToUser('tristanmarshall', 'Puck battery low', params); 

    res.status(200).send("success");
})

// bind the app to listen for connections on a specified port
var port = process.env.PORT || 8080;
app.listen(port);

// Render some console log output
console.log("Listening on port " + port);