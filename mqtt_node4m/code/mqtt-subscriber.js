const maxApi = require('max-api');
const mqtt   = require('mqtt');

let client;
let clientId;


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


maxApi.addHandler('subscribe', (topic) => {
    client.subscribe(topic);
    client.on('message', (topic,value) => {
        maxApi.outlet(topic.toString(), value.toString());
    });
});

maxApi.addHandler('unsubscribe', (topic) => {
    client.unsubscribe(topic);
    client.on('unsubscribe', (topic) => {
        maxApi.outlet(`unsubscribed ${topic}`);
    });
});

