var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongooes = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var addPagerouter = require('./routes/add');
var deleteRouter = require('./routes/delete');
var editRouter = require('./routes/edit');
var listPr = require('./routes/listpr');
var app = express();
var cors = require('cors');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use(addPagerouter);
app.use(listPr);
app.use(deleteRouter);
app.use(editRouter);

app.use(cors())

mongooes.connect('mongodb+srv://admin8386:toanpho1111@cluster0.9lwgy.mongodb.net/mydata?retryWrites=true&w=majority',error =>{
  if (error) {
    console.log("Connection error")
  } else {
    console.log("Connected to mongoDB")
  }
} )

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
