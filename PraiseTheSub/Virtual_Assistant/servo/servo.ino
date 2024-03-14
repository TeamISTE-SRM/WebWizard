#include <Servo.h>

int val;
int angle1, angle2, angle3;
int charsRead;
int chose;
char buffer[10];
Servo servo;
Servo servo1;
Servo servo2;
Servo servo3;
int STAT_Servo,STAT_Servo1,STAT_Servo2,STAT_Servo3;

void setup() {
  Serial.begin(9600);
  servo.attach(6);
  servo1.attach(7);
  servo2.attach(5);
  servo3.attach(4);
  STAT_Servo=90;
  STAT_Servo1=90;
  STAT_Servo2=30;
  STAT_Servo3=90;
  servo.write(STAT_Servo);
  servo1.write(STAT_Servo1);
  servo2.write(STAT_Servo2);
}

void loop() {
  Serial.println("Enter Command? ");

  while (Serial.available() > 0) {
  

  // String menuChoice = Serial.readStringUntil(',');
  int x = Serial.parseInt();

    if (x == 1){ // up 
      if(STAT_Servo2>10&&STAT_Servo2<170){
    STAT_Servo2 += 5;
    servo2.write(STAT_Servo2);
    Serial.println("up");}

      }

    if (x == 2){ // Down
      if(STAT_Servo2>10&&STAT_Servo2<170){
      STAT_Servo2 -= 5;
      servo2.write(STAT_Servo2);
      Serial.println("down");}                                                                                                                 
      }
      if (x == 4){ // left
      STAT_Servo1 -= 5;
      servo1.write(STAT_Servo1);
      Serial.println("Left");                                                                                                             
      }
      if (x == 6){ // Right
      
      STAT_Servo1 += 5;
      servo1.write(STAT_Servo1);
      Serial.println("Right");                                                                                                              
      }
    else if (x==3){// # 3 is reset
      STAT_Servo=90;
      STAT_Servo1=90;
      STAT_Servo2=30;
      STAT_Servo3=90;
        servo.write(STAT_Servo);
        servo1.write(STAT_Servo1);
        servo2.write(STAT_Servo2);
        Serial.println("default");
    }
    else if (x==5){// # 3 is reset

      STAT_Servo1=90;
      int pos=0;
      for (pos = 0; pos <= 180; pos += 1) { // goes from 0 degrees to 180 degrees
    // in steps of 1 degree
  servo1.write(pos);              // tell servo to go to position in variable 'pos'
    delay(10);                       // waits 15 ms for the servo to reach the position
  }
  for (pos = 180; pos >= 0; pos -= 1) { // goes from 180 degrees to 0 degrees
  servo1.write(pos);              // tell servo to go to position in variable 'pos'
    delay(10);                       // waits 15 ms for the servo to reach the position
  }
  servo1.write(STAT_Servo1);  }
 
  }}


  // for (int i=0;i<180;i++){
  //   servo.write(i);
  //   servo1.write(i);
  //   servo2.write(i);
  //   servo3.write(i);
  //   delay(100);}
  // for (int i=180;i>0;i--){
  //   servo.write(i);
  //   servo1.write(i);
  //   servo2.write(i);
  //   servo3.write(i);
  //   delay(100);}
  


