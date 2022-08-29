#include <Arduino.h>

#define X_PIN A4
#define Y_PIN A5

#define DEBOUNCE_TIME 500
int debounce = 0;

void setup() {
  Serial.begin(9600);
}

void loop() {
  int x = analogRead(X_PIN);
  int y = analogRead(Y_PIN);

  Serial.print("x");
  Serial.print(x);
  Serial.print("y");
  Serial.println(y);
}