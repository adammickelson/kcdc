'use-strict'

/**
 *  The following lambda handles incoming IoT button input and publishes it to either an IoT topic or update a device shadow...depending on the input
 * 
 *  Example IoT button input
 *          
 *  Example IoT button input
 *  {
 *    "serialNumber": "GXXXXXXXXXXXXXXXXX",
 *    "batteryVoltage": "xxmV",
 *    "clickType": "SINGLE" | "DOUBLE" | "LONG"
 *  }
 * 
 *  Process of the lambda
 *  1. Check the click type
 *  2. Respond on topic or by updating the shadow
 * 
 * 
 *  Click types:
 *  SINGLE   =   < 1.5 sec 
 *  LONG     =   > 1.t sec
 *  DOUBLE   =   two clicks in quick succession
 * 
 */

const AWS = require('aws-sdk');
let iotdata = new AWS.IotData({endpoint: 'xxxxxxxxxxxxxx.iot.eu-west-1.amazonaws.com'}); //TODO: uncomment before committing

const topicName = "kcdc/stoplight/update";

exports.handler = async function(event, context) {
    console.log('Received event:', event.clickType);

    switch(event.clickType) {
        case "SINGLE":
          updateTopic();
          console.log("call to updateTopic() COMPLETE");
          break;
        case "DOUBLE":
          updateShadow();
          console.log("call to updateShadow() COMPLETE");
          break;
        case "LONG":
          turnOff();
          console.log("call to turnOff() COMPLETE");
          break;
      }

}

function updateTopic() {
    console.log("creating params");
    var params = {
        topic: topicName,
        payload: '{status: state-change}',
        qos: 1 // Possible values: 0 or 1
    };

    iotdata.publish(params, function(err, data) {
        if(err){
            console.log(err);
        }
        else{
            console.log("Published");
        }
    });
}

function updateShadow() {
    // TODO: Implement AWSIOT.thingShadow();
}

function turnOff() {
    // TODO: Implement
}
