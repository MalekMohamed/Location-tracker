'use strict'
var wia = require('wia')('d_sk_AJ3BVMWRzWjiB3ZsBRiu1R6u');
const fs = require('fs'); // Include FileSystem lib
var oldData;
var longi,lati;
fs.readFile('locations.txt', "utf8", function (err, data) {
  if(err){console.log(err);}else{
    data = data.split(","); // split the line to seprate the longitude and the latitude
longi = data[0].toString().replace(/[^\d.]/g, "");
lati = data[1].toString().replace(/[^\d.]/g, "");
sendData(); 
}
});

function sendData() {
console.log('Connecting to Wia Server...!');
wia.stream.on('connect', function () {
    console.log('Connected successfully to Wia Server!');
    setInterval(function () {
        console.log('Sending : '+longi +' && ' + lati + ' to server');
        // function to publish location data
        wia.locations.publish(
            {
                "latitude": lati,
                "longitude": longi,
                device: {
                    id: 'dev_faldy1tg'
                }
            },
            function (err, published) {
                if (err) console.log(err);
                if (published) console.log("Location published.");
            }
        );
    }, 5000);
});
wia.stream.connect();
}



