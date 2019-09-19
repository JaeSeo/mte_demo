const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const MONGODB_URI = `mongodb+srv://jaehyes:52789ses@cluster0-ckra1.mongodb.net/mte?retryWrites=true&w=majority`;

const multer = require('multer');

const app = express();
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
});

//multer's file storage path
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'files');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const mainRoutes = require('./routes/main');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('files'));//getting file based on the name field of the request. 
app.use('/files', express.static(path.join(__dirname, 'files')));//multer's storage: fileStorage path setting.
app.use(express.static(path.join(__dirname, 'public')));

app.use(mainRoutes);

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });