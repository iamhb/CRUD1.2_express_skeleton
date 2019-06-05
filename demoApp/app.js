/****************************************************************************************
*  Created By  : Haribalan                                                              *
*  Purpose:    : Creating connection btw ./public/indexCtrl.js and db                                      *
*  Created At  : 05-05-2019                                                             *
*  Modified At :                                                                        *
****************************************************************************************/

//Requiring modules
var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var port = Number(process.env.PORT || '3000');
var http=require('http');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var express = require('express');
var app = express();
var mongoose  = require('mongoose');

//user defined modules and their reference for routing
var  create= require('./routes/rcreate');
var  remove= require('./routes/rremove');
var  update= require('./routes/rupdate');
var  read  = require('./routes/rread');

var db = mongoose.connect('mongodb://localhost:27017/hbdbdemo' ,{ useNewUrlParser: true });


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);


app.get('/', function(req,res){
	res.sendFile("./public/index.html");
});

app.get('/api/showData',read.showData);

app.post('/api/showColumnData',read.showColumnData);

app.post('/api/addData',create.addData);

app.post('/api/removeData',remove.removeData);

app.post('/api/updateData', update.updateData);

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

var server = http.createServer(app).listen(port,function(){
  console.log("server listening at "+port);
});

module.exports = app;

// code from server.js


