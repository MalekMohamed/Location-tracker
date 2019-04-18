#include <TinyGPS++.h>
#include <SoftwareSerial.h>    
static const int RXPin = 4, TXPin = 3;
static const uint32_t GPSBaud = 115200;
// The TinyGPS++ object
TinyGPSPlus gps;
// The serial connection to the GPS device
SoftwareSerial ss(RXPin, TXPin);
double longi,lati;
void setup()  
{
  // Open serial communications and wait for port to open:
  Serial.begin(9600);
  ss.begin(GPSBaud);
  while (!Serial) {
    ; // wait for serial port to connect. Needed for Leonardo only
  }
  //Serial.println("Start");
}

void loop() // run over and over
{
 // This sketch displays information every time a new sentence is correctly encoded.
  while (ss.available() > 0)
    if (gps.encode(ss.read()))
      displayInfo();

  if (millis() > 5000 && gps.charsProcessed() < 10)
  {
    Serial.println(F("No GPS detected: check wiring."));
    while(true);
  }
}
void displayInfo(){
  if (gps.location.isValid())
  {
    
    longi = gps.location.lng();
    lati = gps.location.lat();
    char longi_char[12];
    char lati_char[12];
    dtostrf(longi, 6, 6, longi_char); 
    dtostrf(lati, 6, 6, lati_char);
    String sth = String("longitude: ") + longi_char + " , latitude: " + lati_char;
    Serial.println(sth);
  }
}
