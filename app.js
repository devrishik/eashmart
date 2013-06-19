/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
//app.use(require('stylus').middleware(__dirname + '/public'));
//app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//

app.get('/',function(req,res){
    var prev; 
    if(req.session.lastPage) {
    prev=req.session.lastPage;
    }
    req.session.lastPage = '/home';
    //res.render('home',{"xyz":[{"prev":prev,"name":req.session.name }]});
    res.render('home', { "name":req.session.name, "prev":prev });
});
   

app.post('/users', function(req, res){
    console.log("1");
    app.use(express.bodyParser());
    console.log(req.body);
    req.session.name=req.body.name;  
    var prev; 
    if(req.session.lastPage) {
    prev=req.session.lastPage;
    console.log(prev);
    }
    //res.render('layout',{"xyz":[{ title: "Home" ,prev:prev, name:req.session.name }]});
    res.render('layout', { prev: prev , name: req.session.name});
});         


app.get('/awesome', function(req, res) {
    var prev; 
    if(req.session.lastPage) {
    prev=req.session.lastPage;
    //console.log('Last page was: ' + req.session.lastPage + '. ');
    }
    req.session.lastPage = '/awesome';
  //res.send('Your Awesome. ');
    res.render('awesome',{prev: prev, name: req.session.name});
});

app.get('/radical', function(req, res) {
    var prev; 
    if(req.session.lastPage) {
    prev=req.session.lastPage;
    //console.log('Last page was: ' + req.session.lastPage + '. ');
  }

       req.session.lastPage = '/radical';
  //res.send('Your Awesome. ');
   
    res.render('radical',{prev: prev, name:req.session.name});
});

app.get('/tubular', function(req, res) {
    var prev; 
    if(req.session.lastPage) {
    prev=req.session.lastPage;
    //console.log('Last page was: ' + req.session.lastPage + '. ');
  }

       req.session.lastPage = '/tubular';
  //res.send('Your Awesome. ');
   
    res.render('tubular',{prev: prev, name:req.session.name});
});

//
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});