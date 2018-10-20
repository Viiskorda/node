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

//Init app
const app = express()

 //Load view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

 //Home route
  app.get('/', (req, res) => res.render('index',{

    title: 'Artiklid'
  }))
 
//add route





 //Start server
 app.listen(port, () => console.log(`Example app listening on port ${port}!`))


