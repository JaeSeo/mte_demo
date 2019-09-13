exports.getIndex = (req, res, next) => {
    res.render('index');
};

// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set region
AWS.config.update({region: 'us-east-1'});
var credentials = new AWS.SharedIniFileCredentials({profile: 'default'});
AWS.config.credentials = credentials;

exports.postMessages = (req, res, next) => {
    const phone = req.body.phone;
    const messages = req.body.messages;
    // console.log(phone);
    // console.log(messages);

    // Create publish parameters
    var params = {
        Message: messages, /* required */
        PhoneNumber: phone
    };
  
    var publishTextPromise = new AWS.SNS({apiVersion: '2010-03-31'}).publish(params).promise();
    publishTextPromise.then(
        function(data) {
          console.log("MessageID is " + data.MessageId);
        }).catch(
          function(err) {
          console.error(err, err.stack);
    });    

    res.render('index');
};