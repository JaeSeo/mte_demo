const path = require('path');

// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({region: 'ap-northeast-2'});
var credentials = new AWS.SharedIniFileCredentials({profile: 'mte'});
AWS.config.credentials = credentials;

//multer
var multer = require('multer');
var multerS3 = require('multer-s3');

// Create S3 service object
s3 = new AWS.S3({apiVersion: '2006-03-01'});

module.exports = (req, res, next) => {

    let upload = multer({
        storage: multerS3({
            s3: s3,
            bucket: "meet-the-expert-dev",
            key: function (req, file, cb) {
            let extension = path.extname(file.originalname);
            cb(null, req.body.cellId + extension)
            }
        })
        })
        
    upload.single("files");
    next();
};

