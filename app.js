var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// var mysql = require('mysql');
var routes = require('./routes/index');
var users = require('./routes/users');
var users = require('./routes/sandbox');
var food = require('./routes/food');
var testData = require('./routes/testdata');
var testStoresData = require('./routes/testStoresData')


var app = express();
 



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/food', food);
app.use('/sandbox', users);
app.use('/testData', testData);
app.use('/testStoresData', testStoresData);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

var http = require('http');
var server = http.createServer(app);

//mysql connection

// var con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database : "groceraid"
// });
// con.connect(function(err){
//     if(err){
//       console.log('Error connecting to Db', err);
//       return;
//     }
//   console.log('Connection established');
// });



// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

server.listen(3000); //, '10.136.103.170');
console.log('Express server started on port %d', server.address().port);


module.exports = app;
