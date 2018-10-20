//Projekt tehtud youtube näidetel Traversy Media kanalilt seeria pealkirjaga Node.js & Express From Scratch

const express = require('express');
const port = 3000;
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

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
let article= new Article();
article.title=req.body.title;
article.author=req.body.author;
article.body=req.body.body;
article.save(function(err){
if(err){
    console.log(err);
}
else{
res.redirect('/');

}
});
})



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

