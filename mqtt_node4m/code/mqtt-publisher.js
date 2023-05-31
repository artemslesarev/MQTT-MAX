const maxApi = require('max-api');
const mqtt = require('mqtt');

let client;
let clientName;


maxApi.addHandler('connect', (url, clientId)  => {
    
    client = mqtt.connect(url, {
        clientId,
    });
    client.on('connect', () => {
        maxApi.outlet('connected');
    
    });
});


maxApi.addHandler('disconnect', () => {

    client.end();
    client.on('end', () => {
        maxApi.outlet('disconnected');
    });
 });



maxApi.addHandler('publish',(topic,value) => {
    client.publish(topic, value.toString());
})