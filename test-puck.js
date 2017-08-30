function flash() {
    console.log("click");
  digitalWrite(LED1,1);
  setTimeout(function() { 
    digitalWrite(LED1,0);
  }, 20000);
}

if (digitalRead(BTN)) flash();

setInterval(function() {
  if (digitalRead(BTN)) flash();
}, 500);


console.log(Puck.getBatteryPercentage());

setInterval(function() {if (digitalRead(BTN)) Bluetooth.println("yyuuupppp!!!!");}, 500);