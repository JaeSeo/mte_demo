const mongoose = require('mongoose');

const Schedule = require('../models/schedule');

//date js object
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

// exports.getEditProduct = (req, res, next) => {
//   const editMode = req.query.edit;
//   if (!editMode) {
//     return res.redirect('/');
//   }
//   const prodId = req.params.productId;
//   Product.findById(prodId)
//     .then(product => {
//       if (!product) {
//         return res.redirect('/');
//       }
//       res.render('admin/edit-product', {
//         pageTitle: 'Edit Product',
//         path: '/admin/edit-product',
//         editing: editMode,
//         product: product,
//         hasError: false,
//         errorMessage: null,
//         validationErrors: []
//       });
//     })
//     .catch(err => {
//       const error = new Error(err);
//       error.httpStatusCode = 500;
//       return next(error);
//     });
// };

// exports.postEditProduct = (req, res, next) => {
//   const prodId = req.body.productId;
//   const updatedTitle = req.body.title;
//   const updatedPrice = req.body.price;
//   const updatedImageUrl = req.body.imageUrl;
//   const updatedDesc = req.body.description;

//   const errors = validationResult(req);

//   if (!errors.isEmpty()) {
//     return res.status(422).render('admin/edit-product', {
//       pageTitle: 'Edit Product',
//       path: '/admin/edit-product',
//       editing: true,
//       hasError: true,
//       product: {
//         title: updatedTitle,
//         imageUrl: updatedImageUrl,
//         price: updatedPrice,
//         description: updatedDesc,
//         _id: prodId
//       },
//       errorMessage: errors.array()[0].msg,
//       validationErrors: errors.array()
//     });
//   }

//   Product.findById(prodId)
//     .then(product => {
//       if (product.userId.toString() !== req.user._id.toString()) {
//         return res.redirect('/');
//       }
//       product.title = updatedTitle;
//       product.price = updatedPrice;
//       product.description = updatedDesc;
//       product.imageUrl = updatedImageUrl;
//       return product.save().then(result => {
//         console.log('UPDATED PRODUCT!');
//         res.redirect('/admin/products');
//       });
//     })
//     .catch(err => {
//       const error = new Error(err);
//       error.httpStatusCode = 500;
//       return next(error);
//     });
// };

exports.getSchedule = (req, res, next) => {
  Schedule.find({ userId: req.user._id })
    // .select('title price -_id')
    // .populate('userId', 'name')
    .then(schedule => {
      console.log(products);
      res.render('/', {
        sales: sales,
        // pageTitle: 'Admin Products',
        // path: '/admin/products'
      });
    })
    .catch(err => {
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
