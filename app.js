const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
//const session = require('express-session');
//const MongoDBStore = require('connect-mongodb-session')(session);
const f = require('util').format;
const fs = require('fs');
const ca = [fs.readFileSync("./rds-combined-ca-bundle.pem")];
const MONGODB_URI = `mongodb://mte:52789ses@docdb-2019-10-06-16-11-57.cluster-c2osdxpx9h2o.ap-northeast-2.docdb.amazonaws.com:27017/test?ssl=true&ssl_ca_certs=rds-combined-ca-bundle.pem&replicaSet=rs0`;

// const app = express();
// const store = new MongoDBStore({
//   uri: MONGODB_URI,
//   collection: 'sessions'
// });

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const mainRoutes = require('./routes/main');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(mainRoutes);

mongoose
  .connect(MONGODB_URI, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    sslValidate: true,
    sslCA: ca
  })
  .then(result => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });