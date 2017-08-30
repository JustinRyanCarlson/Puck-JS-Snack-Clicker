var express = require("express");
var app = express();
var path = require("path");
var SlackBot = require('slackbots');

// Create bot 
var bot = new SlackBot({
    token: 'xoxb-233947548631-0VKMbPBTiUpOIt0clnzsEjUA', 
    name: "Snacky Snackerton"
});

// more information about additional params https://api.slack.com/methods/chat.postMessage 
var params = {
    icon_emoji: ':popcorn:'
};

// Set up a URL route
app.get("/", function(req, res) {
 res.sendFile(path.join(__dirname + '/test.html'));
});

app.get("/snack", function(req, res) {
        // define channel, where bot exist. You can adjust it there https://my.slack.com/services  
        bot.postMessageToChannel('snackbottest', 'test alpha', params);
        
        // define existing username instead of 'user_name' 
        bot.postMessageToUser('justin.carlson', 'Snack notifications sent successfully', params); 

        res.status(200).send("success");
})

// bind the app to listen for connections on a specified port
var port = process.env.PORT || 8080;
app.listen(port);

// Render some console log output
console.log("Listening on port " + port);