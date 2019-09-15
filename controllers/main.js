const mongoose = require('mongoose');

const Schedule = require('../models/schedule');

// exports.getIndex = (req, res, next) => {
//     res.render('index');
// };

exports.getIndex = (req, res, next) => {
  Schedule.find()
    .then(schedules => {
      console.log(schedules);
      res.render('index', {
        schedules: schedules
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

// exports.getIndex = (req, res, next) => {
//     Schedule.find()
//     .then(schedules => {
//         for (let schedule of schedules) {
//             console.log(schedule);
//             res.render('index', {
//                 schedule: schedule
//             });
//         };
//     })
//     .catch(err => {
//     const error = new Error(err);
//     error.httpStatusCode = 500;
//     return next(error);
//     });
// };  

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
