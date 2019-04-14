'use strict'
var wia = require('wia')('d_sk_AJ3BVMWRzWjiB3ZsBRiu1R6u');
// Random places just for testing
var cities = [
    {"city": "El Shrouck", "lat": 30.110316, "lng": 31.670643},
    {"city": "ERU", "lat": 30.141656, "lng": 31.718580},
    {"city": "Cairo", "lat": 30.120184, "lng": 31.660615},
    {"city": "Abo Kamel", "lat": 30.162702, "lng": 31.604323}
];
console.log('Connecting to Wia API...!');
// Using the Wia stream
wia.stream.on('connect', function () {
    console.log('Stream connected!');
    setInterval(function () {
        // randomly choosing places`s location to publish
        var random = Math.floor(Math.random() * cities.length);
        var randomcity = cities[random];
        console.log('Published : ' + randomcity.city);
        // function to publish location data
        wia.locations.publish(
            {
                "latitude": randomcity.lat,
                "longitude": randomcity.lng,
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
