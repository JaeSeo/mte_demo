const mongoose = require('mongoose');
const Schedule = require('../models/schedule');

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

//js date object
const date = new Date();
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
let monthNum = date.getMonth();
let month = monthNames[monthNum];//this month
let year = date.getFullYear();//this year

let firstDate = new Date(date.getFullYear(), monthNum, 1);
let firstDay = firstDate.getDay();
let lastDate = new Date(date.getFullYear(), monthNum + 1, 0); 
let last = lastDate.getDate();
let preLastDate = new Date(date.getFullYear(), monthNum, 0);//전 달 마지막날
let preLast = preLastDate.getDate();

exports.getIndex = (req, res, next) => {
  Schedule.find()
  .then(schedules => {
    console.log(schedules);
    //date calculation when hitting next or previous month button.
    if (req.query.preMonth) {
      monthNum = +req.query.preMonth - 1;
      month = monthNames[monthNum];
      //Update start and last day
      firstDate = new Date(date.getFullYear(), monthNum, 1);//이 달 객체(첫날)
      firstDay = firstDate.getDay();//이달 요일
      lastDate = new Date(date.getFullYear(), monthNum + 1 , 0);//이 달 마지막날
      last = lastDate.getDate();
      preLastDate = new Date(date.getFullYear(), monthNum, 0);//전 달 마지막날
      preLast = preLastDate.getDate();
            
      if (monthNum < 0) {
        monthNum = 11
        month = monthNames[monthNum];
        year--;
      }
    }
    if (req.query.postMonth) {
      monthNum = +req.query.postMonth + 1;
      month = monthNames[monthNum];
      //Update start and last day
      firstDate = new Date(date.getFullYear(), monthNum, 1);
      firstDay = firstDate.getDay();
      lastDate = new Date(date.getFullYear(), monthNum + 1, 0);
      last = lastDate.getDate(); 
      preLastDate = new Date(date.getFullYear(), monthNum, 0);//전 달 마지막날
      preLast = preLastDate.getDate();

      if (monthNum > 11) {
        monthNum = 0
        month = monthNames[monthNum];
        year++;        
      }
    }  
    //rendering
    res.render('index', {
      schedules: schedules,
      firstDay: firstDay,
      lastDate: last,
      preLastDate: preLast,
      month: month,
      monthNum: monthNum,
      year: year
    });
  })
  .catch(err => {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  });
};

exports.postSchedule = (req, res, next) => {
  const cellId = req.body.cellId;
  const sa = req.body.sa;
  const sales = req.body.sales;
  const account = req.body.account;
  const start_time = req.body.start_time;
  const end_time = req.body.end_time;
  const room = req.body.room;

  const schedule = new Schedule({
    cellId: cellId,
    sa: sa,
    sales: sales,
    account: account,
    start_time: start_time,
    end_time: end_time,
    room: room
  });
  schedule
    .save()
    .then(result => {
      // console.log(result);
      console.log('Created Schedule');
      res.redirect('/');
    })
    .catch(err => {
      res.render('error');
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};



// exports.postDeleteProduct = (req, res, next) => {
//   const prodId = req.body.productId;
//   Product.deleteOne({ _id: prodId, userId: req.user._id })
//     .then(() => {
//       console.log('DESTROYED PRODUCT');
//       res.redirect('/admin/products');
//     })
//     .catch(err => {
//       const error = new Error(err);
//       error.httpStatusCode = 500;
//       return next(error);
//     });
// };
