const SerialPort = require('serialport'); // Include Serial port library
const Readline = require('@serialport/parser-readline');
const port = new SerialPort('/dev/ttyACM0', { baudRate: 9600 }); // Set port to Dev/ttyACM0
const parser = port.pipe(new Readline({ delimiter: '\n' })); // Split data as new line inserted
const fs = require('fs'); // Include FileSystem lib
// Connect to the port
port.on("open", () => {
  console.log('serial port open');
}); 
// While there is data recevied from the port do next
parser.on('data', data =>{
  console.log('got word from arduino:', data);
// Save the incoming data in txt file
fs.writeFile("locations.txt", data, function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("File saved!");
});
});