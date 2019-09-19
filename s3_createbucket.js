// Load the SDK for JavaScript
var AWS = require('aws-sdk');
// Set the Region 
AWS.config.update({region: 'ap-northeast-2'});

// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({region: 'ap-northeast-2'});
var credentials = new AWS.SharedIniFileCredentials({profile: 'mte'});
AWS.config.credentials = credentials;

// Create S3 service object
s3 = new AWS.S3({apiVersion: '2006-03-01'});

// Create the parameters for calling createBucket
var bucketParams = {
  Bucket : process.argv[2]
};

// call S3 to create the bucket
s3.createBucket(bucketParams, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data.Location);
  }
});
