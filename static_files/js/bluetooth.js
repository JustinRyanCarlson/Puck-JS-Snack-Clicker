$(document).ready(function() {
    var path = document.getElementsByTagName('button')[0];
    var button = document.getElementById("buttonId");
    
    // When clicked, connect or disconnect
    var connection;

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

                if (data == 1) {
                    button.classList.remove('defaultBorderClass');
                    button.classList.add('clickClass');

                    setTimeout(function() {
                        button.classList.remove('clickClass');
                        button.classList.add('defaultBorderClass'); 
                    }, 300);
                    
                    $.get("/snack", function() {
                        console.log("/snacks attempted!");
                    });
                }
            });
            
            // First, reset Puck.js
            connection.write("reset();\n", function() {

                setTimeout(function() {
                    connection.write("var switcher = 0;\nsetInterval(function() {\nif (digitalRead(BTN) &&" + 
                        " switcher === 0) {\nswitcher = 1;\ndigitalWrite(LED2,1);\nsetTimeout(function()" + 
                        " {\ndigitalWrite(LED2,0);\nBluetooth.println(1);\n}, 3000);\nsetTimeout(function()" + 
                        " {\nswitcher = 0;\n}, 720000);\n}\n}, 200);\n",
                    function() { console.log("Ready..."); });
                }, 1500);

            });
        });
    });
});