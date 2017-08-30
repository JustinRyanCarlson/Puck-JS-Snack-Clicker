var express = require("express");
var app = express();
var path = require("path");
var SlackBot = require('slackbots');

// Create bot 
var bot = new SlackBot({
    token: 'xoxb-233947548631-mKxOdJpjKATyoJpzItYSLjfJ', 
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
        bot.postMessageToChannel('snackbottest', 'meow!', params);
        
        // define existing username instead of 'user_name' 
        bot.postMessageToUser('justin.carlson', '/giphy ', params); 
        
        // If you add a 'slackbot' property,  
        // you will post to another user's slackbot channel instead of a direct message 
        bot.postMessageToUser('user_name', 'meow!', { 'slackbot': true, icon_emoji: ':cat:' }); 
        
        // define private group instead of 'private_group', where bot exist 
        bot.postMessageToGroup('private_group', 'meow!', params); 
        
        res.status(200).send("success");
})

// bind the app to listen for connections on a specified port
var port = process.env.PORT || 8080;
app.listen(port);

// Render some console log output
console.log("Listening on port " + port);