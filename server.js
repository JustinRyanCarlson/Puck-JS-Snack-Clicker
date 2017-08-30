var express = require("express");
var app = express();
var path = require("path");
var SlackBot = require('slackbots');

app.use(express.static(path.join(__dirname, 'static_files')));

// Create bot 
var bot = new SlackBot({
    token: 'xoxb-233947548631-yKcq5eWOOr5CEjBFFslZBi0V', 
    name: "Snacky Snackerton"
});

// more information about additional params https://api.slack.com/methods/chat.postMessage 
var params = {
    icon_emoji: ':popcorn:'
};

// Set up a URL route
app.get("/", function(req, res) {
 res.sendFile(path.join(__dirname + '/index.html'));
});

var slackMessage = ":green_apple::pear::banana::peach::apple::banana::banana::banana::banana::tada:" + 
    ":the_horns::sunglasses::the_horns::tada::banana::banana::banana::banana::apple::peach::banana:" + 
    ":pear::green_apple:\n\n:green_apple::pear::banana::peach::apple: The Snacks have arrived in Stotters" + 
    " House! :apple::peach::banana::pear::green_apple:\n\n:green_apple::pear::banana::peach::apple::banana:" + 
    ":banana::banana::banana::tada::the_horns::sunglasses::the_horns::tada::banana::banana::banana::banana:" + 
    ":apple::peach::banana::pear::green_apple:"

app.get("/snack", function(req, res) {
        // define channel, where bot exist. You can adjust it there https://my.slack.com/services  
        bot.postMessageToChannel('snackbottest', slackMessage, params);
        
        // define existing username instead of 'user_name' 
        bot.postMessageToUser('justin.carlson', 'Snack notifications sent successfully', params); 

        res.status(200).send("success");
})

// bind the app to listen for connections on a specified port
var port = process.env.PORT || 8080;
app.listen(port);

// Render some console log output
console.log("Listening on port " + port);