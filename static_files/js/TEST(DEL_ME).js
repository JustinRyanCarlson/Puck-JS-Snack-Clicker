var switcher = 0;
setInterval(function() {
    if (digitalRead(BTN) && switcher === 0) {
        switcher = 1;
        digitalWrite(LED2,1);
        setTimeout(function() {
            digitalWrite(LED2,0);
            Bluetooth.println(1);
        }, 3000);
        setTimeout(function() {
            switcher = 0;
        }, 10000);
    }
}, 200);
