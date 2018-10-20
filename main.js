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


const express = require('express');
const port = 3000;
const path = require('path');
const mongoose = require('mongoose');

//Init app
const app = express()

 //Load view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

 //Home route
  app.get('/', function(req, res){
    let articles =[
    {   
        id:1,
        title: 'Esimene artikkel',
        author: 'Andres Kuku',
        body:'See on esimene artikkel'

    },
    {   
        id:2,
        title: 'Teine artikkel',
        author: 'Andreas Kukuu',
        body:'See on teineartikkel'

    },
    {   
        id:1,
        title: 'Kolmas artikkel',
        author: 'Andris Kukukuu',
        body:'See on kolmas artikkel'

    }  
  ];
  res.render('index',{
    title: 'Artiklid',
    articles: articles
  })
  
})
 
//add route
app.get('/articles/add', function(req, res){

    res.render('add_article',{
        title: 'Lisa artikkel'
      })


})




 //Start server
 app.listen(port, () => console.log(`Example app listening on port ${port}!`))


