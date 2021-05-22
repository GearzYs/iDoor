/*
 Controlling a servo position 
Connect :
- brown cable to GND
- Red Cable to V_in (5V from USB)
- Orange to A0
 
*/

#include <Servo.h>

Servo myservo;  // create servo object to control a servo

int potpin = 0;  // analog pin used to connect the potentiometer
int val;    // variable to read the value from the analog pin

void setup() {
  myservo.attach(A0);  // attaches the servo on pin 9 to the servo object
   pinMode(2, INPUT);
}

void loop() {

  int buttonState = digitalRead(2);
  int ouvrir = 5;

  
if(buttonState == 0) {
  ouvrir=1;
  }

else if (buttonState ==1) {
  ouvrir=0;
  }

if(ouvrir == 1) {
  myservo.write(90);
  delay(5000);
  if (ouvrir == 1) {
    myservo.write(90);
    }
  else {
    myservo.write(0);
    }
  
  }

if (ouvrir == 0) {
  myservo.write(0);
  }
}
