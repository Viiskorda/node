//Projekt tehtud youtube näidetel Traversy Media kanalilt seeria pealkirjaga Node.js & Express From Scratch

const express = require('express');
const port = 3000;
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');


mongoose.connect('mongodb://localhost/node');
let db=mongoose.connection;

//check for db errors
db.on('error', function(err){
console.log(err);
});


//check connection
db.once('open', function(){
console.log('Connected to mongodb')
});



//Init app
const app = express();
//bring in  Models
let Article = require('./models/article');


 //Load view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//Body parser middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//Set public folder
app.use(express.static(path.join(__dirname, 'public')));


//Express Session Middleware
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
  }));

  //Express Messages Middleware

  app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

// Express Validator Middleware
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
        , root    = namespace.shift()
        , formParam = root;
  
      while(namespace.length) {
        formParam += '[' + namespace.shift() + ']';
      }
      return {
        param : formParam,
        msg   : msg,
        value : value
      };
    }
  }));



 //Home route
  app.get('/', function(req, res){
    
 Article.find({}, function(err, articles){

if(err){
console.log(err);    
}
else{
    res.render('index',{
        title: 'Artiklid',
        articles: articles });

        }
      })
  });
 
//Get Single Article
app.get('/article/:id', function(req, res){
    Article.findById(req.params.id, function(err, article){
        res.render('article', {
            article:article
          });

});

});


//add route
app.get('/articles/add', function(req, res){

    res.render('add_article',{
        title: 'Lisa artikkel'
      })
});




//add sutmin POST route

app.post('/articles/add', function(req, res){
    req.checkBody('title', 'Pealkiri on nõutud').notEmpty();
    req.checkBody('author', 'Autor on nõutud').notEmpty();
    req.checkBody('body', 'Sisu on nõutud').notEmpty();

let errors=req.validationErrors();
    if(errors){
        res.render('add_article', {
            title: 'Lisa artikkel',
            errors:errors

})    

}else{

let article= new Article();
article.title=req.body.title;
article.author=req.body.author;
article.body=req.body.body;


article.save(function(err){
if(err){
    console.log(err);
}
else{
    req.flash('success', "Artikkel lisatud");
res.redirect('/');

}
});
};


});


//Load edit form
app.get('/article/edit/:id', function(req, res){
    Article.findById(req.params.id, function(err, article){
        res.render('edit_article', {
            title: 'Artikli muutmine',
            article:article
          });

});

});

//update Submit Post Route
app.post('/articles/edit/:id', function(req, res){
    let article ={};
    article.title=req.body.title;
    article.author=req.body.author;
    article.body=req.body.body;

    let query = {_id:req.params.id} ;

    Article.update(query, article, function(err){
    if(err){
        console.log(err);
    }
    else{
    req.flash('sucess', 'Artikkel uuendatud')
    res.redirect('/');
    
    }
    });
    });
    
     
    

//Delete article
app.delete('/article/:id', function(req,res){
let query = {_id:req.params.id}

Article.remove(query, function(err){
    if(err){
console.log(err);

    }
    res.send('Success')

})

});




 //Start server
 app.listen(port, () => console.log(`Example app listening on port ${port}!`))






 //õpin ja vaatan https://www.tutorialspoint.com/nodejs/nodejs_repl_terminal.htm
/*
var http = require("http");

http.createServer(function (request, response) {
    // Send the HTTP header 
    // HTTP Status: 200 : OK
    // Content Type: text/plain
    response.writeHead(200, {'Content-Type': 'text/plain'});
    
    // Send the response body as "Hello World"
    response.end('Hello World\n');
 }).listen(8081);
 
 // Console will print the message
 console.log('Server running at http://127.0.0.1:8081/');
*/

