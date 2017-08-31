$(document).ready(function() {
    var path = document.getElementsByTagName('button')[0];
    var button = document.getElementById("buttonId");
    var connection;

    // When clicked, connect or disconnect
    path.addEventListener("click", function() {
        if (connection) {
            connection.close();
            connection = undefined;
            button.innerHTML = "CONNECT";
            button.classList.remove('successClass');
            button.classList.add('standardClass');
        }
        Puck.connect(function(c) {
            if (!c) {
                alert("Couldn't connect!");
                return;
            }

            button.innerHTML = "CONNECTED";
            button.classList.remove('standardClass');
            button.classList.add('successClass');

            connection = c;

            connection.on("data", function(data) {

                if (data == 9) {
                    $.get("/snack9", function() {
                        console.log("/snack on 9 attempted!");
                    });
                }

                if (data == 11) {
                    button.classList.remove('defaultBorderClass');
                    button.classList.add('clickClass');

                    setTimeout(function() {
                        button.classList.remove('clickClass');
                        button.classList.add('defaultBorderClass'); 
                    }, 300);
                    
                    $.get("/snack11", function() {
                        console.log("/snack on 11 attempted!");
                    });
                }

                if (data == 2) {
                    $.get("/battery", function() {
                        console.log("battery low");
                    });
                }
            });
            
            // First, reset Puck.js
            connection.write("reset();\n", function() {

                setTimeout(function() {
                    connection.write("var switcher = 0;\nsetInterval(function() {\nif (digitalRead(BTN) && switcher" + 
                    " === 1 && digitalRead(LED2,0)) {\ndigitalWrite(LED1,1);\nsetTimeout(function()" + 
                    " {\ndigitalWrite(LED1,0);\n}, 5000);\n}\nif (digitalRead(BTN) && switcher === 0) {\nswitcher =" + 
                    " 1;\ndigitalWrite(LED2,1);\nsetTimeout(function() {\ndigitalWrite(LED2,0);" + 
                    "\nBluetooth.println(11);\n}, 3000);\nsetTimeout(function() {\nBluetooth.println(9);\n}, 600000);" + 
                    "\nsetTimeout(function() {\nswitcher = 0;\n}, 86400000);\n}\n}, 200);\nsetInterval(function()" + 
                    " {\nif (Puck.getBatteryPercentage() <= 20) {\nBluetooth.println(2);\n}\n}, 4320000);\n",
                    function() { console.log("Ready..."); });
                }, 1500);

            });
        });
    });
});