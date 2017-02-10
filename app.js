var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mysql = require("mysql");
var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
 app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
var urlencodedparser = bodyParser.urlencoded({ extended: false });
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

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
var con =mysql.createConnection({
  host:"localhost",
  port:"3306",
  user:"root",
  password:"root",
   databse:"mydatabase"
});

con.query("use " + "mydatabase");
con.connect(function(err){
  if(err)
  console.log("database is not connected");
  else{
    console.log("db successfullly connected");
  }
})
app.post("/login",urlencodedparser,function(req,res){
  var count = 0;
  console.log("posted");
var uName =req.body.username;
var mail = req.body.mail;
var pwd = req.body.password;
con.query('select *from signupdetails',function(err,rows){
  if(err)
  throw err;
  else{
for( var i in rows)
{
console.log("called");
  if(rows[i].email==mail||rows[i].username==uName)
  {
     count++;
    console.log("user exist");
    res.render("login",{title:"already registered",id:"1"});
    res.end();
    console.log(count);
  }
 }
if(count==0){
   

con.query('insert into signupdetails (username,email,password) values("'+uName+'","'+mail+'","'+pwd+'")',function(err,result){
if(err){
  throw err;

}
console.log("successfully inserted");
} );


res.render("login",{title:"successfullly registered",id:"0"});

res.end();
}
  }
});

// con.query('delete from signupdetails where email= ?',["hgsd@ddsdd.bnn"]
// ,function(err,result){
//   if(err)
//   throw err;
//   else 
//   console.log("successfully deleted");
// })
// res.end();

});

app.post("/dashboard",urlencodedparser,function(req,res){
  console.log("hai found");
  count = 0;
  var uName = req.body.username;
  var pwd = req.body.password;
  con.query('select *from signupdetails',function(err,rows){
  if(err)
  throw err;
  else{
for( var i in rows)
{
console.log("called");
  if(rows[i].password == pwd && rows[i].username==uName)
  {
     count++;
    console.log("successfully logged in");
    // res.render("login",{title:"already registered",id:"1"});
    res.send("successfully logged in");
    res.end();
    console.log(count);
  }
 }
if(count==0){
 console.log("unsuccessfull login");

 res.render('login',{title:"username and password was wrong",id:"2"
 });
 
}
    }  });

});
app.listen(3000);