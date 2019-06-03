var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var port = Number(process.env.PORT || '3000');
var http=require('http');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var mongoose  = require('mongoose');
var app = express();


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

// app.get('*', function(){
// 	console.log("Hello!!");
// 	next()
// })
var modelVar = require('./public/models/dbmodel').dd;

app.get('/api/showData', function(req, res) { 
	console.log("ggggg")
        var db = mongoose.connect('mongodb://localhost:27017/hbdbdemo' ,{ useNewUrlParser: true });
        var modelVarObj = new modelVar();
        // use mongoose to get all todos in the database
        modelVar.find(function(err, data) {
            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)
            console.log(data);
            res.json(data); // return all todos in JSON format
        });
    });
app.get('/hello', function(req, res){
	console.log("hi");
	res.send("bye");
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

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


var server = http.createServer(app).listen(port,function(){
  console.log("server start from "+port);
});

module.exports = app;

// code from server.js

