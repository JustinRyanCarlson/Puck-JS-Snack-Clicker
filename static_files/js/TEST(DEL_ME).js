var switcher = 0;
setInterval(function() {
    if (digitalRead(BTN) && switcher === 1 && digitalRead(LED2,0)) {
        digitalWrite(LED1,1);
        setTimeout(function() {
            digitalWrite(LED1,0);
        }, 5000);
    }
    if (digitalRead(BTN) && switcher === 0) {
        switcher = 1;
        digitalWrite(LED2,1);
        setTimeout(function() {
            digitalWrite(LED2,0);
            Bluetooth.println(11);
        }, 3000);
        setTimeout(function() {
            Bluetooth.println(9);
        }, 900000);
        setTimeout(function() {
            switcher = 0;
        }, 86400000);
    } 
}, 200);
setInterval(function() {
    if (Puck.getBatteryPercentage() <= 20) {
        Bluetooth.println(2);
    }
}, 4320000);

var switcher = 0;\nsetInterval(function() {\nif (digitalRead(BTN) && switcher === 1 && digitalRead(LED2,0)) {\ndigitalWrite(LED1,1);\nsetTimeout(function() {\ndigitalWrite(LED1,0);\n}, 5000);\n}\nif (digitalRead(BTN) && switcher === 0) {\nswitcher = 1;\ndigitalWrite(LED2,1);\nsetTimeout(function() {\ndigitalWrite(LED2,0);\nBluetooth.println(11);\n}, 3000);\nsetTimeout(function() {\nBluetooth.println(9);\n}, 900000);\nsetTimeout(function() {\nswitcher = 0;\n}, 86400000);\n}\n}, 200);\nsetInterval(function() {\nif (Puck.getBatteryPercentage() <= 20) {\nBluetooth.println(2);\n}\n}, 4320000);\n


