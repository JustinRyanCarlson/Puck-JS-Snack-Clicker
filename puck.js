console.log("------------ INSIDE PUCK.JS ---------- ");

var SlackBot = require('slackbots');
 
// Create bot 
var bot = new SlackBot({
    token: 'xoxb-233947548631-VRyZ0Lwe6LMZU8Q1BtyuiMVy', 
    name: "Snacky Snackerton"
});
 
// What the bot does when connection to slack is established 
bot.on('start', function() {
    // more information about additional params https://api.slack.com/methods/chat.postMessage 
    var params = {
        icon_emoji: ':popcorn:'
    };
    
    // define channel, where bot exist. You can adjust it there https://my.slack.com/services  
    bot.postMessageToChannel('snackbottest', 'meow!', params);
    
    // define existing username instead of 'user_name' 
    bot.postMessageToUser('justin.carlson', '/giphy ', params); 
    
    // If you add a 'slackbot' property,  
    // you will post to another user's slackbot channel instead of a direct message 
    bot.postMessageToUser('user_name', 'meow!', { 'slackbot': true, icon_emoji: ':cat:' }); 
    
    // define private group instead of 'private_group', where bot exist 
    bot.postMessageToGroup('private_group', 'meow!', params); 
});

require('espruino').expr('/dev/cu.Bluetooth-Incoming-Port', 'E.getTemperature()', function(temp) {
        console.log('Current temperature is '+temp);
});
